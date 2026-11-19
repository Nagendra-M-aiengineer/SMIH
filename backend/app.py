import os
import datetime
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
import jwt
from passlib.context import CryptContext

from database import engine, Base, get_db
import models

# Initialize Tables
Base.metadata.create_all(bind=engine)

SECRET_KEY = os.getenv("JWT_SECRET", "smih-super-secret-eco-key-2026")
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI(
    title="SMIH API",
    description="Smart Environmental Learning Hub Backend API",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Security Utilities ----------------- #
def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Quick fallback for demo plain passwords
    if hashed_password.startswith("$2b$") or hashed_password.startswith("$2a$"):
        return pwd_context.verify(plain_password, hashed_password)
    return plain_password == hashed_password

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[datetime.timedelta] = None):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + (expires_delta or datetime.timedelta(days=7))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ----------------- Pydantic Schemas ----------------- #
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "student"
    department: Optional[str] = "AI & DS"

class LoginRequest(BaseModel):
    email: str
    password: str

class QuizSubmitRequest(BaseModel):
    user_id: int
    answers: dict  # { "question_id": "selected_option" }

class MissionCompleteRequest(BaseModel):
    user_id: int
    proof_text: Optional[str] = "Completed environmental action"

class CreateQuizRequest(BaseModel):
    title: str
    category: str
    description: str
    xp_reward: int
    questions: List[dict]

class CreateMissionRequest(BaseModel):
    title: str
    category: str
    description: str
    xp_reward: int
    co2_offset_kg: float
    frequency: str

class AITutorRequest(BaseModel):
    message: str
    user_level: Optional[int] = 12
    topic: Optional[str] = "General"

# ----------------- Environmental RAG Knowledge Base ----------------- #
RAG_KNOWLEDGE_BASE = {
    "plastic": "Single-use plastics take between 450 to 1,000 years to decompose in landfills and oceans. By swapping plastic bottles for reusable steel flasks and carrying cloth bags, a single student saves over 160 plastic containers per year and prevents 18kg of carbon emissions.",
    "climate": "Anthropogenic greenhouse gas emissions have raised global temperatures by approximately 1.2°C above pre-industrial baselines. Primary mitigation strategies include transitioning to solar/wind grids, electrifying transit, and boosting forest carbon sinks.",
    "energy": "Leaving laptops, monitors, and chargers plugged in on standby accounts for up to 10% of campus electricity usage ('vampire draw'). Turning off power strips when leaving dorms saves energy and cuts campus utility bills.",
    "water": "A typical 10-minute shower consumes 75-100 liters of water. Shortening shower times by 3 minutes saves over 25 liters daily. In addition, fixing a single leaky faucet preserves up to 11,000 liters of potable water annually.",
    "waste": "Segregating wet (organic/biodegradable) and dry (recyclable paper, metals, plastics) waste prevents compostable organics from generating methane in landfills. Clean paper can be recycled 5 to 7 times.",
    "biodiversity": "Biodiversity supports vital ecosystem services including pollination, water filtration, soil formation, and climate regulation. Urban greening and campus native pollinator gardens directly assist declining bee and butterfly populations."
}

def retrieve_rag_context(query: str) -> str:
    query_lower = query.lower()
    matches = []
    for key, text in RAG_KNOWLEDGE_BASE.items():
        if key in query_lower:
            matches.append(text)
    if not matches:
        return "SMIH Core Principle: Small, daily actionable eco-habits compounded across campus communities create massive planetary impact."
    return " ".join(matches)

# ----------------- Seed Database Helper ----------------- #
@app.on_event("startup")
def seed_initial_data():
    db = next(get_db())
    # Check if already seeded
    if db.query(models.User).count() == 0:
        # Seed Nagendra (Student)
        nagendra = models.User(
            name="Nagendra M",
            email="nagendra@smih.edu",
            hashed_password=get_password_hash("password123"),
            role="student",
            department="AI & DS",
            xp=2450,
            level=12,
            streak=7,
            eco_score=185,
            carbon_offset_kg=42.8
        )
        # Seed Teacher
        teacher = models.User(
            name="Dr. Sarah Green",
            email="sarah.green@smih.edu",
            hashed_password=get_password_hash("teacher123"),
            role="teacher",
            department="Environmental Science",
            xp=5400,
            level=25,
            streak=30,
            eco_score=420,
            carbon_offset_kg=128.5
        )
        # Seed Institution Admin
        institution = models.User(
            name="Campus Sustainability Dean",
            email="admin@campus.edu",
            hashed_password=get_password_hash("admin123"),
            role="institution",
            department="Administration",
            xp=18450,
            level=50,
            streak=90,
            eco_score=950,
            carbon_offset_kg=2450.0
        )
        db.add_all([nagendra, teacher, institution])

        # Seed Departments
        depts = [
            models.Department(name="Artificial Intelligence & Data Science", code="AI & DS", total_xp=18450, students_count=142, eco_score=94, co2_saved_kg=840.5),
            models.Department(name="Computer Science & Engineering", code="CSE", total_xp=17820, students_count=160, eco_score=89, co2_saved_kg=795.0),
            models.Department(name="Electronics & Communication", code="ECE", total_xp=15900, students_count=130, eco_score=82, co2_saved_kg=650.0),
            models.Department(name="Mechanical Engineering", code="MECH", total_xp=13400, students_count=115, eco_score=78, co2_saved_kg=540.0),
            models.Department(name="Civil Engineering", code="CIVIL", total_xp=12800, students_count=98, eco_score=85, co2_saved_kg=510.0),
        ]
        db.add_all(depts)

        # Seed Courses
        c1 = models.Course(title="Climate Change & Planetary Action", category="Climate", description="Master atmospheric science, global warming tipping points, and climate justice.", icon="🌡️", modules_count=5, default_progress=72)
        c2 = models.Course(title="Biodiversity & Ecosystem Health", category="Biodiversity", description="Explore living systems, keystone species, and urban wildlife corridors.", icon="🌳", modules_count=4, default_progress=45)
        c3 = models.Course(title="Waste Management & Circular Systems", category="Waste", description="Zero-waste philosophy, industrial ecology, and upcycling dynamics.", icon="♻️", modules_count=6, default_progress=91)
        c4 = models.Course(title="Renewable Energy Revolution", category="Energy", description="Solar photovoltaic basics, wind turbines, and smart microgrids.", icon="⚡", modules_count=4, default_progress=60)
        c5 = models.Course(title="Water Stewardship & Conservation", category="Water", description="Hydrological cycles, rainwater harvesting, and water footprint reduction.", icon="💧", modules_count=4, default_progress=35)
        db.add_all([c1, c2, c3, c4, c5])
        db.commit()

        # Seed Quizzes & Questions
        q1 = models.Quiz(course_id=c1.id, title="Climate Action Essentials", category="Climate", description="Test your understanding of greenhouse gases and carbon neutrality.", xp_reward=100)
        db.add(q1)
        db.commit()

        questions = [
            models.Question(
                quiz_id=q1.id,
                question_text="Which gas accounts for the largest proportion of global human-induced greenhouse emissions?",
                option_a="Methane (CH4)",
                option_b="Carbon Dioxide (CO2)",
                option_c="Nitrous Oxide (N2O)",
                option_d="Fluorinated Gases",
                correct_option="B",
                explanation="Carbon dioxide (CO2) from fossil fuel burning and deforestation makes up approximately 76% of all global greenhouse gas emissions."
            ),
            models.Question(
                quiz_id=q1.id,
                question_text="What is the global target warming limit agreed upon in the Paris Climate Agreement?",
                option_a="1.0°C",
                option_b="1.5°C to 2.0°C",
                option_c="3.0°C",
                option_d="4.5°C",
                correct_option="B",
                explanation="The Paris Agreement aims to limit global temperature rise to well below 2°C above pre-industrial levels, with ambitious efforts toward 1.5°C."
            ),
            models.Question(
                quiz_id=q1.id,
                question_text="Which of the following actions has the most direct impact on reducing campus food-related emissions?",
                option_a="Choosing locally sourced plant-rich meal options",
                option_b="Using plastic utensils instead of steel",
                option_c="Drinking more bottled mineral water",
                option_d="Storing leftovers without covering",
                correct_option="A",
                explanation="Plant-forward diets drastically reduce land and water usage while emitting significantly fewer greenhouse gases than livestock-heavy options."
            )
        ]
        db.add_all(questions)

        # Seed Missions
        m1 = models.Mission(title="Reduce one single-use plastic item", category="Plastic", description="Refuse single-use cutlery, straws, or plastic bottles today. Use reusable alternatives.", icon="🎯", xp_reward=100, co2_offset_kg=1.2, frequency="daily")
        m2 = models.Mission(title="Campus Clean-up & Segregation", category="Waste", description="Collect 5 pieces of recyclable litter on campus and place them into the appropriate bin.", icon="♻️", xp_reward=150, co2_offset_kg=2.5, frequency="daily")
        m3 = models.Mission(title="Vampire Power Hunt", category="Energy", description="Unplug 3 inactive electronic chargers and dorm equipment before leaving.", icon="⚡", xp_reward=80, co2_offset_kg=0.9, frequency="daily")
        m4 = models.Mission(title="BYOC - Bring Your Own Cup", category="Waste", description="Use your own coffee mug or water container at the campus cafeteria.", icon="☕", xp_reward=75, co2_offset_kg=0.8, frequency="weekly")
        m5 = models.Mission(title="Plant a Native Sapling or Herbs", category="Biodiversity", description="Plant or care for a plant in your hostel garden or dorm window.", icon="🌱", xp_reward=300, co2_offset_kg=8.0, frequency="weekly")
        db.add_all([m1, m2, m3, m4, m5])

        # Seed Badges
        b1 = models.Badge(code="first_step", name="Eco Seedling", description="Joined SMIH and completed the first learning milestone.", icon="🌱", xp_required=100)
        b2 = models.Badge(code="plastic_buster", name="Plastic Buster", description="Avoided single-use plastics across 5 consecutive missions.", icon="🛡️", xp_required=500)
        b3 = models.Badge(code="streak_master", name="7-Day Streak Titan", description="Maintained an uninterrupted 7-day green learning streak.", icon="🔥", xp_required=1000)
        b4 = models.Badge(code="climate_scholar", name="Climate Scholar", description="Scored 100% on the Climate Action Mastery Quiz.", icon="🎓", xp_required=1500)
        b5 = models.Badge(code="carbon_champion", name="Carbon Neutral Champion", description="Offset over 40kg of CO2 equivalent through certified green tasks.", icon="🌍", xp_required=2000)
        db.add_all([b1, b2, b3, b4, b5])

        # Seed Challenge
        chal = models.Challenge(
            title="Great Campus Plastic-Free Sprint",
            description="All departments unite to divert 5,000 plastic items from landfills this week.",
            target_xp=25000,
            current_xp=19500,
            days_left=4,
            badge_name="Zero-Waste Campus Vanguard"
        )
        db.add(chal)
        db.commit()

# ----------------- Auth Routes ----------------- #
@app.post("/api/auth/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Account with this email already exists.")
    
    user = models.User(
        name=req.name,
        email=req.email,
        hashed_password=get_password_hash(req.password),
        role=req.role or "student",
        department=req.department or "AI & DS",
        xp=100,
        level=1,
        streak=1,
        eco_score=10,
        carbon_offset_kg=1.5
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.email, "id": user.id, "role": user.role})
    return {
        "success": True,
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "department": user.department,
            "xp": user.xp,
            "level": user.level,
            "streak": user.streak,
            "ecoScore": user.eco_score,
            "carbonOffset": user.carbon_offset_kg
        }
    }

@app.post("/api/auth/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    
    token = create_access_token({"sub": user.email, "id": user.id, "role": user.role})
    return {
        "success": True,
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "department": user.department,
            "xp": user.xp,
            "level": user.level,
            "streak": user.streak,
            "ecoScore": user.eco_score,
            "carbonOffset": user.carbon_offset_kg
        }
    }

# ----------------- Courses Routes ----------------- #
@app.get("/api/courses")
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(models.Course).all()
    return [{"id": c.id, "title": c.title, "category": c.category, "description": c.description, "icon": c.icon, "progress": c.default_progress, "modules": c.modules_count} for c in courses]

@app.get("/api/courses/{course_id}")
def get_course_detail(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    quizzes = db.query(models.Quiz).filter(models.Quiz.course_id == course_id).all()
    return {
        "id": course.id,
        "title": course.title,
        "category": course.category,
        "description": course.description,
        "icon": course.icon,
        "progress": course.default_progress,
        "quizzes": [{"id": q.id, "title": q.title, "xp": q.xp_reward} for q in quizzes]
    }

# ----------------- Quiz Routes ----------------- #
@app.get("/api/quizzes")
def get_quizzes(db: Session = Depends(get_db)):
    quizzes = db.query(models.Quiz).all()
    out = []
    for q in quizzes:
        out.append({
            "id": q.id,
            "title": q.title,
            "category": q.category,
            "description": q.description,
            "xpReward": q.xp_reward,
            "questionCount": len(q.questions)
        })
    return out

@app.get("/api/quizzes/{quiz_id}")
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    quiz = db.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return {
        "id": quiz.id,
        "title": quiz.title,
        "category": quiz.category,
        "description": quiz.description,
        "xpReward": quiz.xp_reward,
        "questions": [
            {
                "id": q.id,
                "question": q.question_text,
                "options": {
                    "A": q.option_a,
                    "B": q.option_b,
                    "C": q.option_c,
                    "D": q.option_d
                },
                "correctOption": q.correct_option,
                "explanation": q.explanation
            }
            for q in quiz.questions
        ]
    }

@app.post("/api/quizzes/{quiz_id}/submit")
def submit_quiz(quiz_id: int, req: QuizSubmitRequest, db: Session = Depends(get_db)):
    quiz = db.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    score = 0
    total = len(quiz.questions)
    for q in quiz.questions:
        user_ans = req.answers.get(str(q.id)) or req.answers.get(q.id)
        if user_ans and user_ans.upper() == q.correct_option.upper():
            score += 1
            
    earned_xp = int((score / (total if total > 0 else 1)) * quiz.xp_reward)
    
    user = db.query(models.User).filter(models.User.id == req.user_id).first()
    if user:
        user.xp += earned_xp
        user.level = (user.xp // 200) + 1
        user.eco_score += int(earned_xp / 10)
        db.commit()

    return {
        "success": True,
        "score": score,
        "total": total,
        "earnedXP": earned_xp,
        "percentage": int((score / (total if total > 0 else 1)) * 100),
        "newTotalXP": user.xp if user else None
    }

@app.post("/api/quizzes/create")
def create_quiz(req: CreateQuizRequest, db: Session = Depends(get_db)):
    new_quiz = models.Quiz(
        title=req.title,
        category=req.category,
        description=req.description,
        xp_reward=req.xp_reward
    )
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)

    for q in req.questions:
        question = models.Question(
            quiz_id=new_quiz.id,
            question_text=q.get("question"),
            option_a=q.get("options", {}).get("A", "Option A"),
            option_b=q.get("options", {}).get("B", "Option B"),
            option_c=q.get("options", {}).get("C", "Option C"),
            option_d=q.get("options", {}).get("D", "Option D"),
            correct_option=q.get("correctOption", "A"),
            explanation=q.get("explanation", "Great job!")
        )
        db.add(question)
    db.commit()
    return {"success": True, "quizId": new_quiz.id, "message": "Quiz created successfully!"}

# ----------------- Missions Routes ----------------- #
@app.get("/api/missions")
def get_missions(db: Session = Depends(get_db)):
    missions = db.query(models.Mission).filter(models.Mission.is_active == True).all()
    return [
        {
            "id": m.id,
            "title": m.title,
            "category": m.category,
            "description": m.description,
            "icon": m.icon,
            "xpReward": m.xp_reward,
            "co2OffsetKg": m.co2_offset_kg,
            "frequency": m.frequency
        }
        for m in missions
    ]

@app.post("/api/missions/{mission_id}/complete")
def complete_mission(mission_id: int, req: MissionCompleteRequest, db: Session = Depends(get_db)):
    mission = db.query(models.Mission).filter(models.Mission.id == mission_id).first()
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    
    user = db.query(models.User).filter(models.User.id == req.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_mission = models.UserMission(
        user_id=user.id,
        mission_id=mission.id,
        proof_text=req.proof_text,
        status="verified"
    )
    db.add(user_mission)

    # Award XP and Carbon Offset
    user.xp += mission.xp_reward
    user.level = (user.xp // 200) + 1
    user.eco_score += int(mission.xp_reward / 10)
    user.carbon_offset_kg = round(user.carbon_offset_kg + mission.co2_offset_kg, 2)
    db.commit()

    return {
        "success": True,
        "message": f"Mission '{mission.title}' verified! +{mission.xp_reward} XP added.",
        "user": {
            "xp": user.xp,
            "level": user.level,
            "ecoScore": user.eco_score,
            "carbonOffset": user.carbon_offset_kg
        }
    }

# ----------------- Leaderboard Routes ----------------- #
@app.get("/api/leaderboard/students")
def get_student_leaderboard(db: Session = Depends(get_db)):
    students = db.query(models.User).filter(models.User.role == "student").order_by(models.User.xp.desc()).limit(20).all()
    return [
        {
            "rank": idx + 1,
            "id": s.id,
            "name": s.name,
            "department": s.department,
            "xp": s.xp,
            "level": s.level,
            "streak": s.streak,
            "carbonOffset": s.carbon_offset_kg
        }
        for idx, s in enumerate(students)
    ]

@app.get("/api/leaderboard/departments")
def get_department_leaderboard(db: Session = Depends(get_db)):
    departments = db.query(models.Department).order_by(models.Department.total_xp.desc()).all()
    return [
        {
            "rank": idx + 1,
            "name": d.name,
            "code": d.code,
            "totalXP": d.total_xp,
            "studentsCount": d.students_count,
            "ecoScore": d.eco_score,
            "co2SavedKg": d.co2_saved_kg
        }
        for idx, d in enumerate(departments)
    ]

# ----------------- Challenges Route ----------------- #
@app.get("/api/challenges")
def get_challenges(db: Session = Depends(get_db)):
    chals = db.query(models.Challenge).all()
    return [
        {
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "targetXP": c.target_xp,
            "currentXP": c.current_xp,
            "percentage": int((c.current_xp / c.target_xp) * 100),
            "daysLeft": c.days_left,
            "badgeName": c.badge_name
        }
        for c in chals
    ]

# ----------------- AI Eco Tutor (RAG + Interactive Advice) ----------------- #
@app.post("/api/ai-tutor/chat")
def ai_tutor_chat(req: AITutorRequest):
    rag_context = retrieve_rag_context(req.message)
    msg_lower = req.message.lower()

    if "single-use plastic" in msg_lower or "plastic" in msg_lower:
        advice = "💡 Pro-Tip for Campus: Keep a portable stainless-steel cutlery set and a foldable cotton tote in your backpack. By refusing disposable plastic cups and cutlery at the campus canteen, you save an average of 4.5kg of plastic waste per academic semester!"
    elif "carbon" in msg_lower or "footprint" in msg_lower:
        advice = "🌱 Quick Action: Switching one meal a day to a plant-based option cuts your individual dietary greenhouse footprint by up to 35%. Pair this with carpooling or cycling to campus for maximum impact!"
    elif "energy" in msg_lower or "electricity" in msg_lower:
        advice = "⚡ Energy Audit Tip: Always turn off dorm lights and unplug high-draw adapters when heading to class. Enabling 'Eco Mode' on your laptop can also stretch battery life and lower overall energy consumption."
    elif "water" in msg_lower:
        advice = "💧 Hydration Wisdom: Never dump leftover water from your bottle into the drain—use it to hydrate campus or dorm plants! Report any dripping taps to campus maintenance right away."
    else:
        advice = "🌍 Sustainability Habit: The most powerful green action is consistency! Complete today's Eco Mission in your SMIH dashboard to earn XP, increase your campus department ranking, and inspire your peers."

    response_text = f"**Eco AI Tutor Guidance:**\n\n{rag_context}\n\n{advice}"

    return {
        "success": True,
        "reply": response_text,
        "topicDetected": req.topic or "Environmental Action",
        "xpReward": 10  # Engaging with AI tutor awards 10 micro-XP
    }

# ----------------- Eco Passport Route ----------------- #
@app.get("/api/passport/{user_id}")
def get_eco_passport(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "passportId": f"SMIH-ECO-{user.id:04d}",
        "name": user.name,
        "department": user.department,
        "level": user.level,
        "totalXP": user.xp,
        "streak": user.streak,
        "carbonOffsetKg": user.carbon_offset_kg,
        "ecoScore": user.eco_score,
        "verifiedStamps": [
            {"title": "Zero Waste Advocate", "date": "Verified 2026", "icon": "♻️"},
            {"title": "Energy Vampire Hunter", "date": "Verified 2026", "icon": "⚡"},
            {"title": "Climate Literacy Pioneer", "date": "Verified 2026", "icon": "🎓"},
            {"title": "Campus Green Vanguard", "date": "Verified 2026", "icon": "🌱"}
        ],
        "issueDate": user.created_at.strftime("%B %d, %Y")
    }

# ----------------- Teacher & Institution Analytics ----------------- #
@app.get("/api/teacher/overview")
def teacher_overview(db: Session = Depends(get_db)):
    student_count = db.query(models.User).filter(models.User.role == "student").count()
    courses_count = db.query(models.Course).count()
    quizzes_count = db.query(models.Quiz).count()
    missions_count = db.query(models.Mission).count()
    
    return {
        "totalStudents": student_count,
        "activeCourses": courses_count,
        "quizzesCreated": quizzes_count,
        "missionsActive": missions_count,
        "averageCompletionRate": 76.5,
        "topPerformingClass": "AI & DS - Semester 4",
        "pendingVerifications": 3
    }

@app.get("/api/institution/metrics")
def institution_metrics(db: Session = Depends(get_db)):
    depts = db.query(models.Department).all()
    total_co2 = sum([d.co2_saved_kg for d in depts])
    total_xp = sum([d.total_xp for d in depts])
    avg_score = int(sum([d.eco_score for d in depts]) / (len(depts) if depts else 1))

    return {
        "campusEcoScore": avg_score,
        "totalCampusXP": total_xp,
        "totalCO2SavedKg": round(total_co2, 2),
        "totalActiveStudents": sum([d.students_count for d in depts]),
        "sustainabilityRating": "A+ Green Campus Certified",
        "solarEnergyGeneratedKWh": 14250,
        "waterRecycledLiters": 85000
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
