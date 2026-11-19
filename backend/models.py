import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="student")  # 'student', 'teacher', 'institution'
    department = Column(String(100), default="AI & DS")
    xp = Column(Integer, default=2450)
    level = Column(Integer, default=12)
    streak = Column(Integer, default=7)
    eco_score = Column(Integer, default=185)
    carbon_offset_kg = Column(Float, default=42.8)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    missions = relationship("UserMission", back_populates="user")
    badges = relationship("UserBadge", back_populates="user")

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    code = Column(String(20), unique=True, nullable=False)
    total_xp = Column(Integer, default=0)
    students_count = Column(Integer, default=0)
    eco_score = Column(Integer, default=80)
    co2_saved_kg = Column(Float, default=0.0)

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    icon = Column(String(20), default="🌱")
    modules_count = Column(Integer, default=4)
    default_progress = Column(Integer, default=0)

    quizzes = relationship("Quiz", back_populates="course")

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=True)
    title = Column(String(150), nullable=False)
    category = Column(String(100), default="General Eco")
    description = Column(Text)
    xp_reward = Column(Integer, default=100)

    course = relationship("Course", back_populates="quizzes")
    questions = relationship("Question", back_populates="quiz", cascade="all, delete-orphan")

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"))
    question_text = Column(Text, nullable=False)
    option_a = Column(String(255), nullable=False)
    option_b = Column(String(255), nullable=False)
    option_c = Column(String(255), nullable=False)
    option_d = Column(String(255), nullable=False)
    correct_option = Column(String(5), nullable=False)  # 'A', 'B', 'C', 'D'
    explanation = Column(Text, nullable=True)

    quiz = relationship("Quiz", back_populates="questions")

class Mission(Base):
    __tablename__ = "missions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    category = Column(String(100), default="Plastic & Waste")
    description = Column(Text, nullable=False)
    icon = Column(String(20), default="♻️")
    xp_reward = Column(Integer, default=100)
    co2_offset_kg = Column(Float, default=1.5)
    frequency = Column(String(50), default="daily")  # 'daily', 'weekly', 'campus'
    is_active = Column(Boolean, default=True)

class UserMission(Base):
    __tablename__ = "user_missions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    mission_id = Column(Integer, ForeignKey("missions.id"))
    proof_text = Column(Text, nullable=True)
    completed_at = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String(50), default="verified")  # 'pending', 'verified'

    user = relationship("User", back_populates="missions")
    mission = relationship("Mission")

class Badge(Base):
    __tablename__ = "badges"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    icon = Column(String(20), default="🎖️")
    xp_required = Column(Integer, default=500)

class UserBadge(Base):
    __tablename__ = "user_badges"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    badge_id = Column(Integer, ForeignKey("badges.id"))
    awarded_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="badges")
    badge = relationship("Badge")

class Challenge(Base):
    __tablename__ = "challenges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    target_xp = Column(Integer, default=25000)
    current_xp = Column(Integer, default=19500)
    days_left = Column(Integer, default=5)
    badge_name = Column(String(100), default="Campus Green Vanguard")
