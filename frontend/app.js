/* ==================================================
   SMIH - Smart Environmental Learning Hub
   Next-Gen Application Engine & Data Layer
================================================== */

const API_BASE = "http://localhost:8000/api";

// Default Seed User (Nagendra - Student)
const DEFAULT_STUDENT = {
    id: 1,
    name: "Nagendra M",
    email: "nagendra@smih.edu",
    role: "student",
    department: "AI & DS",
    xp: 2450,
    level: 12,
    streak: 7,
    ecoScore: 185,
    carbonOffset: 42.8,
    badges: ["first_step", "plastic_buster", "streak_master"],
    completedMissions: ["plastic-free-day"],
    courseProgress: {
        climate: 72,
        biodiversity: 45,
        waste: 91,
        energy: 60,
        water: 35
    }
};

const DEFAULT_TEACHER = {
    id: 2,
    name: "Dr. Sarah Green",
    email: "sarah.green@smih.edu",
    role: "teacher",
    department: "Environmental Science",
    xp: 5400,
    level: 25,
    streak: 30,
    ecoScore: 420,
    carbonOffset: 128.5,
    badges: ["streak_master", "climate_scholar"],
    completedMissions: []
};

const DEFAULT_INSTITUTION = {
    id: 3,
    name: "Campus Sustainability Dean",
    email: "admin@campus.edu",
    role: "institution",
    department: "Administration",
    xp: 18450,
    level: 50,
    streak: 90,
    ecoScore: 950,
    carbonOffset: 2450.0,
    badges: ["streak_master", "carbon_champion"],
    completedMissions: []
};

// Seed Data for Courses
const COURSES_DATA = [
    {
        id: 1,
        title: "Climate Change & Action",
        category: "Climate",
        progressKey: "climate",
        icon: "🌡️",
        colorClass: "fill-climate",
        modules: 5,
        defaultProgress: 72,
        description: "Explore atmospheric greenhouse dynamics, tipping points, climate modeling, and real-world carbon reduction strategies.",
        lessons: [
            "1.1 Greenhouse Gases & The Global Energy Balance",
            "1.2 IPCC Projections & The 1.5°C Guardrail",
            "1.3 Ocean Acidification & Cryosphere Dynamics",
            "1.4 Campus Carbon Auditing & Net-Zero Pathways"
        ]
    },
    {
        id: 2,
        title: "Biodiversity & Living Systems",
        category: "Biodiversity",
        progressKey: "biodiversity",
        icon: "🌳",
        colorClass: "fill-bio",
        modules: 4,
        defaultProgress: 45,
        description: "Learn how ecosystems thrive, keystone species conservation, wildlife migration corridors, and urban pollinator habitats.",
        lessons: [
            "2.1 What is Biological Diversity?",
            "2.2 Keystone Species & Trophic Cascades",
            "2.3 Native Flora vs Invasive Species Management",
            "2.4 Designing Urban Pollinator Pockets on Campus"
        ]
    },
    {
        id: 3,
        title: "Waste Management & Circular Systems",
        category: "Waste",
        progressKey: "waste",
        icon: "♻️",
        colorClass: "fill-waste",
        modules: 6,
        defaultProgress: 91,
        description: "Master zero-waste design, industrial ecology, lifecycle assessment, and plastic-free campus frameworks.",
        lessons: [
            "3.1 Linear vs Circular Economy Models",
            "3.2 The Chemistry & Degradation of Single-Use Plastics",
            "3.3 Advanced Source Segregation & Compost Biology",
            "3.4 Upcycling & Material Recovery Facilities (MRF)"
        ]
    },
    {
        id: 4,
        title: "Renewable Energy Revolution",
        category: "Energy",
        progressKey: "energy",
        icon: "⚡",
        colorClass: "fill-energy",
        modules: 4,
        defaultProgress: 60,
        description: "Study solar photovoltaics, wind energy mechanics, decentralized battery microgrids, and green hydrogen.",
        lessons: [
            "4.1 Solar Photovoltaic Principles & Inverter Systems",
            "4.2 Wind Turbines & Aerodynamic Efficiencies",
            "4.3 Smart Energy Microgrids in Campus Infrastructure",
            "4.4 Hunting Standby Vampire Power Waste"
        ]
    },
    {
        id: 5,
        title: "Water Conservation & Stewardship",
        category: "Water",
        progressKey: "water",
        icon: "💧",
        colorClass: "fill-water",
        modules: 4,
        defaultProgress: 35,
        description: "Understand hydrological balance, watershed protection, rainwater harvesting systems, and wastewater recycling.",
        lessons: [
            "5.1 Global Freshwater Stress Index",
            "5.2 Rainwater Harvesting Engineering",
            "5.3 Greywater Filtration & Campus Recycling",
            "5.4 Reducing Personal Water Footprints"
        ]
    }
];

// Seed Missions
const MISSIONS_DATA = [
    {
        id: "plastic-free-day",
        title: "Reduce one single-use plastic item",
        category: "Plastic",
        frequency: "daily",
        xp: 100,
        co2: 1.2,
        icon: "🎯",
        description: "Refuse disposable cups, straws, or plastic bottles today. Use your reusable bottle or mug.",
        isToday: true
    },
    {
        id: "clean-campus-drive",
        title: "Campus Clean-Up & Segregation",
        category: "Waste",
        frequency: "daily",
        xp: 150,
        co2: 2.5,
        icon: "♻️",
        description: "Collect 5 recyclable discarded items on campus and drop them into the designated recycling bin."
    },
    {
        id: "vampire-power-hunt",
        title: "Vampire Power Hunt",
        category: "Energy",
        frequency: "daily",
        xp: 80,
        co2: 0.9,
        icon: "⚡",
        description: "Locate and unplug 3 idle chargers or unused devices in your dorm or lab."
    },
    {
        id: "byoc-challenge",
        title: "Bring Your Own Cup / Container",
        category: "Waste",
        frequency: "weekly",
        xp: 75,
        co2: 0.8,
        icon: "☕",
        description: "Order all campus canteen beverages or takeout meals with personal reusable containers."
    },
    {
        id: "plant-sapling",
        title: "Plant a Native Herb or Sapling",
        category: "Biodiversity",
        frequency: "weekly",
        xp: 300,
        co2: 8.0,
        icon: "🌱",
        description: "Plant a native species in the campus botanical garden or a dorm potted plant."
    },
    {
        id: "meatless-day",
        title: "Green Dining - Plant-Based Day",
        category: "Climate",
        frequency: "weekly",
        xp: 120,
        co2: 3.2,
        icon: "🥗",
        description: "Opt for healthy plant-rich meals for the whole day to reduce dietary emissions."
    }
];

// Seed Quizzes
const QUIZZES_DATA = [
    {
        id: 1,
        title: "Climate Change & Action Essentials",
        category: "Climate Action",
        description: "Test your grasp on greenhouse gases, Paris targets, and planetary feedback loops.",
        xpReward: 100,
        questions: [
            {
                id: 101,
                question: "Which greenhouse gas accounts for the greatest percentage of human-induced global warming?",
                options: {
                    A: "Methane (CH4)",
                    B: "Carbon Dioxide (CO2)",
                    C: "Nitrous Oxide (N2O)",
                    D: "Water Vapor"
                },
                correctOption: "B",
                explanation: "Carbon dioxide (CO2) from fossil fuels and deforestation represents ~76% of total anthropogenic greenhouse gas emissions."
            },
            {
                id: 102,
                question: "What is the global warming guardrail target articulated in the Paris Agreement?",
                options: {
                    A: "1.0°C above baseline",
                    B: "Well below 2.0°C, aiming for 1.5°C",
                    C: "3.0°C above baseline",
                    D: "4.0°C above baseline"
                },
                correctOption: "B",
                explanation: "The treaty commits nations to hold temperature increase well below 2°C and pursue efforts to limit warming to 1.5°C."
            },
            {
                id: 103,
                question: "What is the term for when an ecosystem warms, releases more trapped methane from permafrost, and triggers further warming?",
                options: {
                    A: "Negative Cooling",
                    B: "Positive Feedback Loop",
                    C: "Thermodynamic Neutrality",
                    D: "Albedo Amplification Zero"
                },
                correctOption: "B",
                explanation: "A positive climate feedback amplifies the initial warming effect, accelerating overall climate destabilization."
            }
        ]
    },
    {
        id: 2,
        title: "Zero-Waste & Circular Systems",
        category: "Waste Management",
        description: "Challenge your knowledge on plastics, recycling efficiency, and compost biology.",
        xpReward: 120,
        questions: [
            {
                id: 201,
                question: "How long does a standard polyethylene terephthalate (PET) plastic bottle take to decompose in a landfill?",
                options: {
                    A: "2 to 5 years",
                    B: "10 to 20 years",
                    C: "450 to 1,000 years",
                    D: "It never fragments into microplastics"
                },
                correctOption: "C",
                explanation: "PET plastics resist natural microbial decomposition and persist in environments for 450 to 1,000 years, breaking into toxic microplastics."
            },
            {
                id: 202,
                question: "In a circular economy, what happens to materials at the end of a product's lifecycle?",
                options: {
                    A: "They are incinerated",
                    B: "They are recovered, remanufactured, or composted",
                    C: "They are buried in sanitary landfills",
                    D: "They are exported overseas"
                },
                correctOption: "B",
                explanation: "Circular economies eliminate waste by designing products for closed-loop reuse, recycling, or organic reintegration."
            }
        ]
    }
];

// Department Rankings
const DEPARTMENTS_DATA = [
    { rank: 1, name: "Artificial Intelligence & Data Science", code: "AI & DS", xp: 18450, students: 142, ecoScore: 94, co2: 840.5 },
    { rank: 2, name: "Computer Science & Engineering", code: "CSE", xp: 17820, students: 160, ecoScore: 89, co2: 795.0 },
    { rank: 3, name: "Electronics & Communication", code: "ECE", xp: 15900, students: 130, ecoScore: 82, co2: 650.0 },
    { rank: 4, name: "Mechanical Engineering", code: "MECH", xp: 13400, students: 115, ecoScore: 78, co2: 540.0 },
    { rank: 5, name: "Civil Engineering", code: "CIVIL", xp: 12800, students: 98, ecoScore: 85, co2: 510.0 }
];

// Student Leaderboard
const STUDENTS_LEADERBOARD = [
    { rank: 1, name: "Nagendra M", dept: "AI & DS", xp: 2450, level: 12, streak: 7, co2: 42.8, isCurrent: true },
    { rank: 2, name: "Ananya Sharma", dept: "CSE", xp: 2380, level: 11, streak: 9, co2: 39.5 },
    { rank: 3, name: "Rohan Patel", dept: "AI & DS", xp: 2210, level: 11, streak: 6, co2: 36.2 },
    { rank: 4, name: "Pooja Reddy", dept: "ECE", xp: 2050, level: 10, streak: 5, co2: 32.0 },
    { rank: 5, name: "Vikram Sengupta", dept: "MECH", xp: 1980, level: 9, streak: 8, co2: 30.1 }
];

// Badges
const BADGES_DATA = [
    { code: "first_step", name: "Eco Seedling", icon: "🌱", desc: "Enrolled in SMIH and started your green journey.", xpNeeded: 100 },
    { code: "plastic_buster", name: "Plastic Buster", icon: "🛡️", desc: "Completed 5 single-use plastic elimination missions.", xpNeeded: 500 },
    { code: "streak_master", name: "7-Day Titan", icon: "🔥", desc: "Maintained a continuous 7-day green learning streak.", xpNeeded: 1000 },
    { code: "climate_scholar", name: "Climate Scholar", icon: "🎓", desc: "Scored 100% on the Climate Action Mastery Quiz.", xpNeeded: 1500 },
    { code: "carbon_champion", name: "Carbon Champion", icon: "🌍", desc: "Offset more than 40kg of verified CO2 emissions.", xpNeeded: 2000 },
    { code: "water_guardian", name: "Water Guardian", icon: "💧", desc: "Mastered water footprinting & campus audits.", xpNeeded: 3000 }
];

// ==================================================
// STORAGE & AUTH FUNCTIONS
// ==================================================
function getUsers() {
    let users = JSON.parse(localStorage.getItem("smihUsers") || "[]");
    if (!users.length) {
        users = [DEFAULT_STUDENT, DEFAULT_TEACHER, DEFAULT_INSTITUTION];
        localStorage.setItem("smihUsers", JSON.stringify(users));
    }
    return users;
}

function saveUsers(users) {
    localStorage.setItem("smihUsers", JSON.stringify(users));
}

function getCurrentUser() {
    let user = JSON.parse(localStorage.getItem("smihCurrentUser"));
    if (!user) {
        user = DEFAULT_STUDENT;
        localStorage.setItem("smihCurrentUser", JSON.stringify(user));
    }
    return user;
}

function setCurrentUser(user) {
    localStorage.setItem("smihCurrentUser", JSON.stringify(user));
    let users = getUsers();
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
        users[idx] = user;
    } else {
        users.push(user);
    }
    saveUsers(users);
}

function switchRole(role) {
    let users = getUsers();
    let target = users.find(u => u.role === role);
    if (!target) {
        if (role === "teacher") target = DEFAULT_TEACHER;
        else if (role === "institution") target = DEFAULT_INSTITUTION;
        else target = DEFAULT_STUDENT;
    }
    setCurrentUser(target);
    showToast(`Switched to ${role.charAt(0).toUpperCase() + role.slice(1)} Portal`);
    setTimeout(() => {
        window.location.reload();
    }, 250);
}

function requireLogin() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("smihCurrentUser");
    window.location.href = "login.html";
}

function fillDemo(email, pass, role) {
    const emailField = document.getElementById("loginEmail");
    const passField = document.getElementById("loginPassword");
    if (emailField && passField) {
        emailField.value = email;
        passField.value = pass;
        showToast(`Auto-filled: ${role.toUpperCase()} credentials`);
    }
}

// ==================================================
// HAMBURGER MENU & SIDEBAR CONTROLLER (DESKTOP + MOBILE)
// ==================================================
function toggleSidebar(forceState) {
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.getElementById("menuToggleBtn");
    const overlay = document.getElementById("sidebarOverlay");
    if (!sidebar) return;

    const isMobile = window.innerWidth <= 992;

    if (isMobile) {
        // Mobile / Tablet Drawer Slide
        const shouldOpen = forceState !== undefined ? forceState : !sidebar.classList.contains("open");
        sidebar.classList.toggle("open", shouldOpen);
        if (overlay) overlay.classList.toggle("active", shouldOpen);
        if (menuBtn) menuBtn.classList.toggle("active", shouldOpen);
        document.body.style.overflow = shouldOpen ? "hidden" : "";
    } else {
        // Desktop Icon-Rail Collapse / Expand
        const shouldCollapse = forceState !== undefined ? forceState : !sidebar.classList.contains("collapsed");
        sidebar.classList.toggle("collapsed", shouldCollapse);
        if (menuBtn) menuBtn.classList.toggle("active", shouldCollapse);
        localStorage.setItem("smihSidebarCollapsed", shouldCollapse ? "true" : "false");
        showToast(shouldCollapse ? "Sidebar minimized to compact rail" : "Sidebar expanded");
    }
}

// ==================================================
// TOAST NOTIFICATION SYSTEM
// ==================================================
function showToast(message, type = "success") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${type === "error" ? "⚠️" : "🌱"}</span>
        <span>${escapeHtml(message)}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// ==================================================
// GLOBAL SEARCH & KEYBOARD SHORTCUTS
// ==================================================
function handleGlobalSearch(event) {
    if (event.key === "Enter") {
        const query = event.target.value.trim().toLowerCase();
        if (!query) return;
        if (query.includes("course") || query.includes("climate") || query.includes("energy") || query.includes("water") || query.includes("learn")) {
            window.location.href = "courses.html";
        } else if (query.includes("quiz") || query.includes("test") || query.includes("play")) {
            window.location.href = "quiz.html";
        } else if (query.includes("mission") || query.includes("plastic") || query.includes("challenge") || query.includes("sprint")) {
            window.location.href = "missions.html";
        } else if (query.includes("rank") || query.includes("lead") || query.includes("score")) {
            window.location.href = "leaderboard.html";
        } else if (query.includes("badge") || query.includes("pass") || query.includes("ai") || query.includes("profile")) {
            window.location.href = "profile.html";
        } else {
            showToast(`Searched: "${query}". Navigating to Courses...`);
            setTimeout(() => { window.location.href = "courses.html"; }, 400);
        }
    }
}

document.addEventListener("keydown", (e) => {
    // Cmd+K or Ctrl+K focuses global search
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const searchInput = document.getElementById("globalSearchInput");
        if (searchInput) searchInput.focus();
    }
});

// ==================================================
// DOM INITIALIZATION
// ==================================================
document.addEventListener("DOMContentLoaded", () => {
    initAuthForms();
    initTopbar();
    initDashboard();
    initCoursesPage();
    initQuizPage();
    initMissionsPage();
    initLeaderboardPage();
    initProfilePage();
    initAITutor();
});

function initTopbar() {
    const user = getCurrentUser();
    if (!user) return;

    const streakEl = document.getElementById("topbarStreak");
    if (streakEl) streakEl.textContent = `🔥 ${user.streak || 7} days`;

    const nameEl = document.getElementById("topbarUserName");
    if (nameEl) nameEl.textContent = user.name.split(" ")[0];

    const avatarLetter = document.getElementById("topbarAvatarLetter");
    if (avatarLetter) avatarLetter.textContent = user.name.charAt(0).toUpperCase();

    const roleSelect = document.getElementById("topbarRoleSelect");
    if (roleSelect) {
        roleSelect.value = user.role;
    }

    const carbonMeter = document.getElementById("sidebarCarbonVal");
    if (carbonMeter) {
        carbonMeter.textContent = `${user.carbonOffset || 42.8} kg CO₂`;
    }

    // Attach Hamburger Toggle
    const menuBtn = document.getElementById("menuToggleBtn");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (menuBtn) {
        menuBtn.onclick = (e) => {
            e.stopPropagation();
            toggleSidebar();
        };
    }

    if (overlay) {
        overlay.onclick = () => toggleSidebar(false);
    }

    // Auto close mobile drawer on link click
    document.querySelectorAll(".sidebar .nav-item").forEach(item => {
        item.addEventListener("click", () => {
            if (window.innerWidth <= 992) {
                toggleSidebar(false);
            }
        });
    });

    // Restore desktop collapsed rail state from storage
    if (window.innerWidth > 992 && localStorage.getItem("smihSidebarCollapsed") === "true") {
        if (sidebar) sidebar.classList.add("collapsed");
        if (menuBtn) menuBtn.classList.add("active");
    }
}

// ==================================================
// AUTH FORMS
// ==================================================
function initAuthForms() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const users = getUsers();
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

            if (!user) {
                if (email.includes("nagendra")) {
                    setCurrentUser(DEFAULT_STUDENT);
                    window.location.href = "dashboard.html";
                    return;
                }
                showToast("Account not found. Select a demo profile below.", "error");
                return;
            }

            setCurrentUser(user);
            showToast(`Welcome back, ${user.name}!`);
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 400);
        });
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const role = document.getElementById("registerRole").value;

            let users = getUsers();
            if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
                showToast("An account with this email already exists.", "error");
                return;
            }

            const newUser = {
                id: Date.now(),
                name,
                email,
                role,
                department: role === "student" ? "AI & DS" : "Administration",
                xp: 150,
                level: 1,
                streak: 1,
                ecoScore: 15,
                carbonOffset: 2.0,
                badges: ["first_step"],
                completedMissions: [],
                courseProgress: { climate: 0, biodiversity: 0, waste: 0, energy: 0, water: 0 }
            };

            users.push(newUser);
            saveUsers(users);
            setCurrentUser(newUser);

            showToast("Account created successfully!");
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 500);
        });
    }
}

// ==================================================
// DASHBOARD VIEW ROUTING
// ==================================================
function initDashboard() {
    const dashboardContainer = document.getElementById("dashboardMain");
    if (!dashboardContainer) return;

    const user = getCurrentUser();
    if (!user) return;

    if (user.role === "teacher") {
        renderTeacherDashboard(dashboardContainer, user);
    } else if (user.role === "institution") {
        renderInstitutionDashboard(dashboardContainer, user);
    } else {
        renderStudentDashboard(dashboardContainer, user);
    }
}

function renderStudentDashboard(container, user) {
    const levelProgress = ((user.xp % 200) / 200) * 100;
    const progressPercent = Math.min(Math.max(Math.round(levelProgress), 15), 95);

    container.innerHTML = `
        <!-- Welcome Hero Banner -->
        <div class="welcome-hero">
            <div>
                <h1>Good afternoon, ${user.name.split(" ")[0]}! 🌍</h1>
                <p>Welcome back to your sustainability command deck. Small daily habits compound into massive planetary impact across our campus.</p>
            </div>
            <div class="hero-level-box">
                <div class="level-row">
                    <strong>Level ${user.level}</strong>
                    <span class="xp-count">${user.xp.toLocaleString()} XP</span>
                </div>
                <div class="level-progress-bg">
                    <div class="level-progress-bar" style="width: ${progressPercent}%;"></div>
                </div>
                <div class="level-subtext">${progressPercent}% towards Level ${user.level + 1}</div>
            </div>
        </div>

        <!-- 4 Key Metrics -->
        <div class="stats-grid-4">
            <div class="stat-metric-card">
                <div class="stat-metric-icon xp">⭐</div>
                <div class="stat-metric-info">
                    <small>Total Eco XP</small>
                    <h3>${user.xp.toLocaleString()}</h3>
                </div>
            </div>
            <div class="stat-metric-card">
                <div class="stat-metric-icon streak">🔥</div>
                <div class="stat-metric-info">
                    <small>Active Streak</small>
                    <h3>${user.streak} Days</h3>
                </div>
            </div>
            <div class="stat-metric-card">
                <div class="stat-metric-icon badges">🎖️</div>
                <div class="stat-metric-info">
                    <small>Badges Earned</small>
                    <h3>${(user.badges || []).length} Badges</h3>
                </div>
            </div>
            <div class="stat-metric-card">
                <div class="stat-metric-icon carbon">🌱</div>
                <div class="stat-metric-info">
                    <small>Carbon Offset</small>
                    <h3>${user.carbonOffset || 42.8} kg CO₂</h3>
                </div>
            </div>
        </div>

        <!-- 2-Column Split: Mission & Learning on Left, Leaderboard & Sprint on Right -->
        <div class="dashboard-columns">
            <div>
                <!-- Today's Eco Mission matching ASCII wireframe -->
                <div class="content-card today-mission-card">
                    <div class="mission-avatar">🎯</div>
                    <div class="mission-details">
                        <div class="mission-badge-row">
                            <span class="mission-reward-tag">+100 XP</span>
                            <span class="badge-tag badge-green">Today's Eco Mission</span>
                        </div>
                        <h3>Reduce one single-use plastic item</h3>
                        <p>Avoid single-use cups, bottles, or disposable cutlery on campus today. Bring your own reusable alternative!</p>
                        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                            <button id="completeTodayMissionBtn" class="primary-btn" onclick="openMissionProofModal('plastic-free-day')">
                                ✓ Complete & Verify (+100 XP)
                            </button>
                            <span id="missionStatusTag" style="font-size: 13px; font-weight: 700; color: #16a34a;"></span>
                        </div>
                    </div>
                </div>

                <!-- Continue Learning List -->
                <div class="content-card">
                    <div class="card-header-row">
                        <h2>📚 Continue Learning</h2>
                        <a href="courses.html" class="link-action">View All Courses →</a>
                    </div>
                    <div class="learning-list">
                        <div class="learning-item">
                            <div class="learning-icon">🌡️</div>
                            <div class="learning-info">
                                <div class="learning-title-row">
                                    <strong>Climate Change & Action</strong>
                                    <span>72%</span>
                                </div>
                                <div class="mini-progress-bg">
                                    <div class="mini-progress-fill fill-climate" style="width: 72%;"></div>
                                </div>
                            </div>
                            <button class="outline-btn" onclick="location.href='courses.html?course=1'">Resume</button>
                        </div>

                        <div class="learning-item">
                            <div class="learning-icon">🌳</div>
                            <div class="learning-info">
                                <div class="learning-title-row">
                                    <strong>Biodiversity & Living Systems</strong>
                                    <span>45%</span>
                                </div>
                                <div class="mini-progress-bg">
                                    <div class="mini-progress-fill fill-bio" style="width: 45%;"></div>
                                </div>
                            </div>
                            <button class="outline-btn" onclick="location.href='courses.html?course=2'">Resume</button>
                        </div>

                        <div class="learning-item">
                            <div class="learning-icon">♻️</div>
                            <div class="learning-info">
                                <div class="learning-title-row">
                                    <strong>Waste Management & Circular Systems</strong>
                                    <span>91%</span>
                                </div>
                                <div class="mini-progress-bg">
                                    <div class="mini-progress-fill fill-waste" style="width: 91%;"></div>
                                </div>
                            </div>
                            <button class="outline-btn" onclick="location.href='quiz.html?quiz=2'">Take Quiz</button>
                        </div>

                        <div class="learning-item">
                            <div class="learning-icon">⚡</div>
                            <div class="learning-info">
                                <div class="learning-title-row">
                                    <strong>Renewable Energy Revolution</strong>
                                    <span>60%</span>
                                </div>
                                <div class="mini-progress-bg">
                                    <div class="mini-progress-fill fill-energy" style="width: 60%;"></div>
                                </div>
                            </div>
                            <button class="outline-btn" onclick="location.href='courses.html?course=4'">Resume</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column -->
            <div>
                <!-- Campus Leaderboard Widget -->
                <div class="content-card" style="margin-bottom: 26px;">
                    <div class="card-header-row">
                        <h2>🏆 Campus Leaderboard</h2>
                        <a href="leaderboard.html" class="link-action">Full Rankings →</a>
                    </div>
                    <div class="dept-leaderboard-list">
                        <div class="dept-rank-item top-1">
                            <div class="dept-left">
                                <div class="rank-badge">1</div>
                                <div>
                                    <strong>AI & DS</strong>
                                    <div style="font-size: 11.5px; color: var(--slate-500);">142 Champions • 840kg CO₂ saved</div>
                                </div>
                            </div>
                            <span class="dept-xp">18,450 XP</span>
                        </div>

                        <div class="dept-rank-item">
                            <div class="dept-left">
                                <div class="rank-badge">2</div>
                                <div>
                                    <strong>CSE</strong>
                                    <div style="font-size: 11.5px; color: var(--slate-500);">160 Champions • 795kg CO₂ saved</div>
                                </div>
                            </div>
                            <span class="dept-xp">17,820 XP</span>
                        </div>

                        <div class="dept-rank-item">
                            <div class="dept-left">
                                <div class="rank-badge">3</div>
                                <div>
                                    <strong>ECE</strong>
                                    <div style="font-size: 11.5px; color: var(--slate-500);">130 Champions • 650kg CO₂ saved</div>
                                </div>
                            </div>
                            <span class="dept-xp">15,900 XP</span>
                        </div>

                        <div class="dept-rank-item">
                            <div class="dept-left">
                                <div class="rank-badge">4</div>
                                <div>
                                    <strong>MECH</strong>
                                    <div style="font-size: 11.5px; color: var(--slate-500);">115 Champions • 540kg CO₂ saved</div>
                                </div>
                            </div>
                            <span class="dept-xp">13,400 XP</span>
                        </div>
                    </div>
                </div>

                <!-- Community Challenge Box -->
                <div class="content-card" style="background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%); border: 1.5px solid #86efac;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span class="badge-tag badge-green">Active Campus Challenge</span>
                        <span style="font-size: 12px; font-weight: 800; color: #0284c7;">4 days remaining</span>
                    </div>
                    <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 6px;">The Great Plastic-Free Sprint 🏆</h3>
                    <p style="font-size: 13.5px; color: var(--slate-700); margin-bottom: 14px;">All campus departments unite to divert 5,000 plastic items this week.</p>
                    <div class="mini-progress-bg" style="height: 9px; margin-bottom: 8px;">
                        <div class="mini-progress-fill fill-bio" style="width: 78%; background: linear-gradient(90deg, #34d399, #10b981);"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 700;">
                        <span>19,500 / 25,000 XP</span>
                        <a href="missions.html" class="link-action">Join Challenge →</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Hub Grid -->
        <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 18px; letter-spacing: -0.02em;">Quick Exploration Hub</h2>
        <div class="quick-grid-4">
            <a href="courses.html" class="quick-hub-card">
                <span class="card-emoji">📚</span>
                <h3>Eco Courses</h3>
                <p>Interactive lessons on climate science, biodiversity, and clean energy.</p>
                <span class="link-action">Explore Courses →</span>
            </a>
            <a href="quiz.html" class="quick-hub-card">
                <span class="card-emoji">🎮</span>
                <h3>Play & Test</h3>
                <p>Test your environmental skills, earn XP, and unlock rare badges.</p>
                <span class="link-action">Start Quiz →</span>
            </a>
            <a href="missions.html" class="quick-hub-card">
                <span class="card-emoji">🌱</span>
                <h3>Eco Missions</h3>
                <p>Real-world green habits at home, hostel, and campus labs.</p>
                <span class="link-action">View Missions →</span>
            </a>
            <a href="profile.html" class="quick-hub-card">
                <span class="card-emoji">🌍</span>
                <h3>Eco Passport</h3>
                <p>Your verified green resume, stamped carbon offsets, and achievements.</p>
                <span class="link-action">View Passport →</span>
            </a>
        </div>
    `;

    checkDailyMissionStatus();
}

function checkDailyMissionStatus() {
    const user = getCurrentUser();
    const btn = document.getElementById("completeTodayMissionBtn");
    const statusTag = document.getElementById("missionStatusTag");
    if (user && user.completedMissions && user.completedMissions.includes("plastic-free-day")) {
        if (btn) {
            btn.textContent = "✓ Verified Today";
            btn.style.background = "#94a3b8";
            btn.style.cursor = "default";
            btn.disabled = true;
        }
        if (statusTag) {
            statusTag.textContent = "✓ +100 XP Stamped in Passport";
        }
    }
}

// Verification Modal for Missions
let pendingMissionId = null;

function openMissionProofModal(missionId) {
    const user = getCurrentUser();
    if (user && user.completedMissions && user.completedMissions.includes(missionId)) {
        showToast("You have already completed this mission today!");
        return;
    }
    pendingMissionId = missionId;
    const mission = MISSIONS_DATA.find(m => m.id === missionId);
    const titleEl = document.getElementById("proofModalTitle");
    if (titleEl && mission) {
        titleEl.textContent = `🎯 Verify: ${mission.title}`;
    }
    const modal = document.getElementById("missionProofModal");
    if (modal) modal.classList.add("open");
}

function confirmMissionCompletion() {
    const missionId = pendingMissionId || "plastic-free-day";
    const mission = MISSIONS_DATA.find(m => m.id === missionId) || { xp: 100, co2: 1.2, title: "Eco Mission" };
    const user = getCurrentUser();
    if (!user) return;

    user.completedMissions = user.completedMissions || [];
    if (!user.completedMissions.includes(missionId)) {
        user.completedMissions.push(missionId);
        user.xp += mission.xp;
        user.carbonOffset = Number(((user.carbonOffset || 42.8) + mission.co2).toFixed(1));
        user.ecoScore = (user.ecoScore || 185) + 10;
        user.level = Math.floor(user.xp / 200) + 1;
        if (!user.badges.includes("plastic_buster")) {
            user.badges.push("plastic_buster");
        }
        setCurrentUser(user);
        closeModal("missionProofModal");
        showToast(`🎉 Verified: ${mission.title}! +${mission.xp} XP & +${mission.co2} kg CO₂ added.`);
        initDashboard();
        initTopbar();
        if (typeof initMissionsPage === "function") initMissionsPage();
    }
}

// ==================================================
// TEACHER & INSTITUTION VIEWS
// ==================================================
function renderTeacherDashboard(container, user) {
    container.innerHTML = `
        <div class="portal-banner">
            <div>
                <h1>👩‍🏫 Teacher Portal: ${user.name}</h1>
                <p>Department of ${user.department || "Environmental Science"} • Active Semester 4</p>
            </div>
            <button class="primary-btn large" onclick="openQuizBuilderModal()">
                + Create New Eco Quiz
            </button>
        </div>

        <div class="stats-grid-4">
            <div class="stat-metric-card">
                <div class="stat-metric-icon xp">👥</div>
                <div class="stat-metric-info">
                    <small>Enrolled Students</small>
                    <h3>142 Students</h3>
                </div>
            </div>
            <div class="stat-metric-card">
                <div class="stat-metric-icon streak">📊</div>
                <div class="stat-metric-info">
                    <small>Avg Course Mastery</small>
                    <h3>76.5%</h3>
                </div>
            </div>
            <div class="stat-metric-card">
                <div class="stat-metric-icon badges">📝</div>
                <div class="stat-metric-info">
                    <small>Active Quizzes</small>
                    <h3>5 Quizzes</h3>
                </div>
            </div>
            <div class="stat-metric-card">
                <div class="stat-metric-icon carbon">🔍</div>
                <div class="stat-metric-info">
                    <small>Missions To Verify</small>
                    <h3>3 Pending</h3>
                </div>
            </div>
        </div>

        <div class="content-card" style="padding: 0; overflow: hidden;">
            <div style="padding: 20px 24px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                <h3 style="font-size: 17px; font-weight: 800;">🎓 Student Progress & Eco Missions Roster</h3>
                <span class="badge-tag badge-blue">Class: AI & DS - Batch 2026</span>
            </div>
            <table class="leaderboard-table" style="box-shadow: none; border: none; border-radius: 0;">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Level & XP</th>
                        <th>Streak</th>
                        <th>Completed Missions</th>
                        <th>Course Mastery</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Nagendra M</strong></td>
                        <td>Level 12 • 2,450 XP</td>
                        <td>🔥 7 Days</td>
                        <td>Plastic-Free Day, Clean-Up</td>
                        <td><span class="badge-tag badge-green">88% (Distinction)</span></td>
                        <td><button class="outline-btn" onclick="showToast('Nagendra has full attendance record.')">View Log</button></td>
                    </tr>
                    <tr>
                        <td><strong>Ananya Sharma</strong></td>
                        <td>Level 11 • 2,380 XP</td>
                        <td>🔥 9 Days</td>
                        <td>BYOC, Sapling Plantation</td>
                        <td><span class="badge-tag badge-green">84%</span></td>
                        <td><button class="outline-btn" onclick="showToast('Viewing Ananya details')">View Log</button></td>
                    </tr>
                    <tr>
                        <td><strong>Rohan Patel</strong></td>
                        <td>Level 11 • 2,210 XP</td>
                        <td>🔥 6 Days</td>
                        <td>Vampire Power Hunt</td>
                        <td><span class="badge-tag badge-amber">74%</span></td>
                        <td><button class="outline-btn" onclick="showToast('Viewing Rohan details')">View Log</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderInstitutionDashboard(container, user) {
    container.innerHTML = `
        <div class="portal-banner institution">
            <div>
                <h1>🏛️ Campus Sustainability & ESG Command Center</h1>
                <p>Smart Green Campus Monitoring • Global Accreditation Rating: A+ Certified</p>
            </div>
            <button class="primary-btn large" onclick="downloadESGReport()">
                📑 Export Sustainability Report
            </button>
        </div>

        <div class="stats-grid-4">
            <div class="stat-metric-card">
                <div class="stat-metric-icon xp">🌿</div>
                <div class="stat-metric-info">
                    <small>Campus Eco Score</small>
                    <h3>88 / 100</h3>
                </div>
            </div>
            <div class="stat-metric-card">
                <div class="stat-metric-icon streak">⚡</div>
                <div class="stat-metric-info">
                    <small>Solar Gen this Month</small>
                    <h3>14,250 kWh</h3>
                </div>
            </div>
            <div class="stat-metric-card">
                <div class="stat-metric-icon badges">💧</div>
                <div class="stat-metric-info">
                    <small>Water Recycled</small>
                    <h3>85,000 L</h3>
                </div>
            </div>
            <div class="stat-metric-card">
                <div class="stat-metric-icon carbon">🌎</div>
                <div class="stat-metric-info">
                    <small>Total CO₂ Offset</small>
                    <h3>3,335.5 kg</h3>
                </div>
            </div>
        </div>

        <div class="content-card" style="padding: 0; overflow: hidden;">
            <div style="padding: 20px 24px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                <h3 style="font-size: 17px; font-weight: 800;">🏢 Inter-Department Sustainability League</h3>
                <span class="badge-tag badge-green">Cycle: Fall 2026</span>
            </div>
            <table class="leaderboard-table" style="box-shadow: none; border: none; border-radius: 0;">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Department</th>
                        <th>Code</th>
                        <th>Total Eco XP</th>
                        <th>Student Body</th>
                        <th>Eco Audit Score</th>
                        <th>CO₂ Prevented</th>
                    </tr>
                </thead>
                <tbody>
                    ${DEPARTMENTS_DATA.map(d => `
                        <tr>
                            <td><strong>#${d.rank}</strong></td>
                            <td><strong>${d.name}</strong></td>
                            <td><span class="badge-tag badge-blue">${d.code}</span></td>
                            <td><strong style="color: #059669;">${d.xp.toLocaleString()} XP</strong></td>
                            <td>${d.students}</td>
                            <td><strong>${d.ecoScore}/100</strong></td>
                            <td>${d.co2} kg</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function downloadESGReport() {
    showToast("📄 SMIH Official Campus ESG Report generated and prepped for download!");
}

// ==================================================
// COURSES PAGE
// ==================================================
function initCoursesPage() {
    const coursesList = document.getElementById("coursesGrid");
    if (!coursesList) return;

    renderCourses(COURSES_DATA);

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            const filter = this.getAttribute("data-filter");
            if (filter === "all") {
                renderCourses(COURSES_DATA);
            } else {
                const filtered = COURSES_DATA.filter(c => c.category.toLowerCase().includes(filter.toLowerCase()));
                renderCourses(filtered);
            }
        });
    });
}

function renderCourses(courses) {
    const container = document.getElementById("coursesGrid");
    if (!container) return;

    container.innerHTML = courses.map(c => `
        <div class="course-box">
            <div>
                <div class="course-top">
                    <div class="course-top-icon">${c.icon}</div>
                    <div>
                        <span class="badge-tag badge-blue">${c.category}</span>
                        <h3 style="margin-top: 4px;">${c.title}</h3>
                    </div>
                </div>
                <p>${c.description}</p>
                <div style="margin-bottom: 18px;">
                    <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; margin-bottom: 5px;">
                        <span>Course Progress</span>
                        <span>${c.defaultProgress}%</span>
                    </div>
                    <div class="mini-progress-bg">
                        <div class="mini-progress-fill ${c.colorClass}" style="width: ${c.defaultProgress}%;"></div>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="primary-btn full-btn" onclick="openLessonModal('${c.id}')">
                    📖 Open Course
                </button>
                <button class="outline-btn" onclick="location.href='quiz.html?course=${c.id}'">
                    Quiz
                </button>
            </div>
        </div>
    `).join("");
}

function openLessonModal(courseId) {
    const course = COURSES_DATA.find(c => String(c.id) === String(courseId));
    if (!course) return;

    const modal = document.getElementById("lessonModal");
    const title = document.getElementById("lessonModalTitle");
    const body = document.getElementById("lessonModalBody");
    if (modal && title && body) {
        title.innerHTML = `${course.icon} ${course.title}`;
        body.innerHTML = `
            <p style="font-size: 14px; color: var(--slate-600); margin-bottom: 18px;">${course.description}</p>
            <h4 style="margin-bottom: 12px; font-size: 15px; font-weight: 800;">Curriculum Modules & Lessons:</h4>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
                ${course.lessons.map((l, i) => `
                    <div style="padding: 14px 18px; border-radius: var(--radius-md); background: var(--slate-50); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 13.5px; font-weight: 600;">${l}</span>
                        <span class="badge-tag ${i < 2 ? 'badge-green' : 'badge-amber'}">${i < 2 ? 'Completed' : 'Next'}</span>
                    </div>
                `).join("")}
            </div>
            <button class="primary-btn full-btn" onclick="closeModal('lessonModal'); showToast('Lesson marked complete! +25 XP added');">
                ✓ Mark Lesson Complete & Earn +25 XP
            </button>
        `;
        modal.classList.add("open");
    }
}

// ==================================================
// QUIZ ENGINE
// ==================================================
let currentQuestionIndex = 0;
let userQuizAnswers = {};
let activeQuiz = QUIZZES_DATA[0];

function initQuizPage() {
    const quizArea = document.getElementById("quizEngineArea");
    if (!quizArea) return;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const quizArea = document.getElementById("quizEngineArea");
    if (!quizArea || !activeQuiz) return;

    const q = activeQuiz.questions[currentQuestionIndex];
    const totalQ = activeQuiz.questions.length;

    quizArea.innerHTML = `
        <div class="quiz-card">
            <div class="quiz-header">
                <div>
                    <span class="badge-tag badge-green">${activeQuiz.category}</span>
                    <h3 style="margin-top: 6px; font-size: 18px; font-weight: 800;">${activeQuiz.title}</h3>
                </div>
                <div>
                    <strong>Question ${currentQuestionIndex + 1} of ${totalQ}</strong>
                </div>
            </div>

            <div class="question-text">${q.question}</div>

            <div class="options-stack">
                ${Object.entries(q.options).map(([letter, text]) => `
                    <button class="option-btn" id="optionBtn_${letter}" onclick="selectQuizOption('${letter}')">
                        <span class="option-letter">${letter}</span>
                        <span>${text}</span>
                    </button>
                `).join("")}
            </div>

            <div id="quizFeedbackBox" style="display: none;"></div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px;">
                <button class="secondary-btn" onclick="prevQuizQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
                    ← Previous
                </button>
                <button class="primary-btn" id="submitOrNextBtn" onclick="nextQuizQuestion()">
                    ${currentQuestionIndex === totalQ - 1 ? 'Finish & Submit Quiz →' : 'Next Question →'}
                </button>
            </div>
        </div>
    `;
}

function selectQuizOption(letter) {
    const q = activeQuiz.questions[currentQuestionIndex];
    userQuizAnswers[q.id] = letter;

    document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
    const selectedBtn = document.getElementById(`optionBtn_${letter}`);
    if (selectedBtn) selectedBtn.classList.add("selected");

    const feedbackBox = document.getElementById("quizFeedbackBox");
    if (feedbackBox) {
        feedbackBox.style.display = "block";
        if (letter === q.correctOption) {
            feedbackBox.className = "explanation-box";
            feedbackBox.innerHTML = `<strong>✓ Correct!</strong> ${q.explanation}`;
        } else {
            feedbackBox.className = "explanation-box";
            feedbackBox.style.borderLeftColor = "#ef4444";
            feedbackBox.style.background = "#fee2e2";
            feedbackBox.style.color = "#991b1b";
            feedbackBox.innerHTML = `<strong>Notice:</strong> Option ${q.correctOption} is correct. ${q.explanation}`;
        }
    }
}

function nextQuizQuestion() {
    const q = activeQuiz.questions[currentQuestionIndex];
    if (!userQuizAnswers[q.id]) {
        showToast("Please choose an option before proceeding!", "error");
        return;
    }

    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
        currentQuestionIndex++;
        renderQuizQuestion();
    } else {
        finishQuiz();
    }
}

function prevQuizQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuizQuestion();
    }
}

function finishQuiz() {
    let score = 0;
    activeQuiz.questions.forEach(q => {
        if (userQuizAnswers[q.id] === q.correctOption) score++;
    });

    const total = activeQuiz.questions.length;
    const earnedXP = Math.round((score / total) * activeQuiz.xpReward);

    const user = getCurrentUser();
    user.xp += earnedXP;
    user.ecoScore += Math.round(earnedXP / 10);
    user.level = Math.floor(user.xp / 200) + 1;
    if (score === total && !user.badges.includes("climate_scholar")) {
        user.badges.push("climate_scholar");
    }
    setCurrentUser(user);

    showToast(`🎉 Quiz completed! +${earnedXP} XP added to your Eco Passport!`);

    const quizArea = document.getElementById("quizEngineArea");
    if (quizArea) {
        quizArea.innerHTML = `
            <div class="quiz-card" style="text-align: center; padding: 48px 32px;">
                <div style="font-size: 56px; margin-bottom: 12px;">🎉</div>
                <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">Quiz Completed!</h2>
                <p style="color: var(--slate-500); margin-bottom: 24px;">You scored ${score} out of ${total} correct answers.</p>
                
                <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: var(--radius-xl); padding: 22px; max-width: 360px; margin: 0 auto 30px;">
                    <div style="font-size: 12px; font-weight: 800; color: #166534; text-transform: uppercase;">Reward Earned</div>
                    <div style="font-size: 34px; font-weight: 800; color: #059669; margin: 4px 0;">+${earnedXP} XP</div>
                    <small style="color: var(--slate-500);">Added to Nagendra's Eco Passport</small>
                </div>

                <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                    <button class="primary-btn" onclick="location.href='dashboard.html'">
                        Return to Dashboard
                    </button>
                    <button class="secondary-btn" onclick="location.href='courses.html'">
                        Explore More Courses
                    </button>
                </div>
            </div>
        `;
    }
}

function openQuizBuilderModal() {
    const modal = document.getElementById("quizBuilderModal");
    if (modal) modal.classList.add("open");
}

function handleCreateQuizSubmit(e) {
    if (e) e.preventDefault();
    const title = document.getElementById("newQuizTitle").value;
    const cat = document.getElementById("newQuizCategory").value;
    const xp = parseInt(document.getElementById("newQuizXP").value) || 100;

    showToast(`Quiz '${title}' created successfully with ${xp} XP!`);
    closeModal("quizBuilderModal");
}

// ==================================================
// MISSIONS PAGE
// ==================================================
function initMissionsPage() {
    const missionsContainer = document.getElementById("missionsGridContainer");
    if (!missionsContainer) return;

    renderMissions(MISSIONS_DATA);

    document.querySelectorAll(".mission-tab").forEach(tab => {
        tab.addEventListener("click", function() {
            document.querySelectorAll(".mission-tab").forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            const filter = this.getAttribute("data-tab");
            if (filter === "all") {
                renderMissions(MISSIONS_DATA);
            } else {
                renderMissions(MISSIONS_DATA.filter(m => m.frequency === filter));
            }
        });
    });
}

function renderMissions(missions) {
    const container = document.getElementById("missionsGridContainer");
    if (!container) return;

    const user = getCurrentUser();
    const completedSet = new Set(user.completedMissions || []);

    container.innerHTML = missions.map(m => {
        const isDone = completedSet.has(m.id);
        return `
            <div class="mission-card ${isDone ? 'completed' : ''}">
                <div>
                    <div class="mission-head">
                        <div class="mission-icon-box">${m.icon}</div>
                        <span class="mission-reward-tag">+${m.xp} XP</span>
                    </div>
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--slate-400); margin-bottom: 4px;">
                        ${m.category} • ${m.frequency}
                    </div>
                    <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 6px;">${m.title}</h3>
                    <p style="font-size: 13.5px; color: var(--slate-500); margin-bottom: 18px; line-height: 1.5;">${m.description}</p>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; font-size: 12.5px; color: #047857; font-weight: 700; margin-bottom: 14px;">
                        <span>🌱 Offset: ~${m.co2} kg CO₂</span>
                        <span>${isDone ? '✓ Verified' : 'Pending Action'}</span>
                    </div>
                    <button class="${isDone ? 'secondary-btn' : 'primary-btn'} full-btn" 
                            onclick="openMissionProofModal('${m.id}')" 
                            ${isDone ? 'disabled' : ''}>
                        ${isDone ? '✓ Completed' : 'Complete Action + Earn XP'}
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

// ==================================================
// LEADERBOARD PAGE
// ==================================================
function initLeaderboardPage() {
    const tableBody = document.getElementById("leaderboardTableBody");
    if (!tableBody) return;

    renderStudentLeaderboard();

    const studentTab = document.getElementById("tabStudents");
    const deptTab = document.getElementById("tabDepts");

    if (studentTab && deptTab) {
        studentTab.addEventListener("click", () => {
            studentTab.classList.add("active");
            deptTab.classList.remove("active");
            renderStudentLeaderboard();
        });
        deptTab.addEventListener("click", () => {
            deptTab.classList.add("active");
            studentTab.classList.remove("active");
            renderDepartmentLeaderboard();
        });
    }
}

function renderStudentLeaderboard() {
    const headerRow = document.getElementById("leaderboardHeaderRow");
    const tableBody = document.getElementById("leaderboardTableBody");
    if (!tableBody) return;

    if (headerRow) {
        headerRow.innerHTML = `
            <th>Rank</th>
            <th>Eco Champion</th>
            <th>Department</th>
            <th>Level & XP</th>
            <th>Streak</th>
            <th>CO₂ Offset</th>
        `;
    }

    tableBody.innerHTML = STUDENTS_LEADERBOARD.map(s => `
        <tr class="${s.isCurrent ? 'highlight-user' : ''}">
            <td><strong>#${s.rank} ${s.rank === 1 ? '🥇' : s.rank === 2 ? '🥈' : s.rank === 3 ? '🥉' : ''}</strong></td>
            <td><strong>${s.name} ${s.isCurrent ? '(You)' : ''}</strong></td>
            <td><span class="badge-tag badge-blue">${s.dept}</span></td>
            <td><strong>Level ${s.level}</strong> • ${s.xp.toLocaleString()} XP</td>
            <td>🔥 ${s.streak} Days</td>
            <td>🌱 ${s.co2} kg</td>
        </tr>
    `).join("");
}

function renderDepartmentLeaderboard() {
    const headerRow = document.getElementById("leaderboardHeaderRow");
    const tableBody = document.getElementById("leaderboardTableBody");
    if (!tableBody) return;

    if (headerRow) {
        headerRow.innerHTML = `
            <th>Rank</th>
            <th>Department Name</th>
            <th>Code</th>
            <th>Total XP</th>
            <th>Eco Score</th>
            <th>Total CO₂ Offset</th>
        `;
    }

    tableBody.innerHTML = DEPARTMENTS_DATA.map(d => `
        <tr class="${d.code === 'AI & DS' ? 'highlight-user' : ''}">
            <td><strong>#${d.rank} ${d.rank === 1 ? '🥇' : d.rank === 2 ? '🥈' : d.rank === 3 ? '🥉' : ''}</strong></td>
            <td><strong>${d.name}</strong></td>
            <td><span class="badge-tag badge-green">${d.code}</span></td>
            <td><strong style="color: #059669;">${d.xp.toLocaleString()} XP</strong></td>
            <td>${d.ecoScore} / 100</td>
            <td>🌱 ${d.co2} kg</td>
        </tr>
    `).join("");
}

// ==================================================
// PROFILE & ECO PASSPORT
// ==================================================
function initProfilePage() {
    const user = getCurrentUser();
    const passportContainer = document.getElementById("ecoPassportCard");
    const badgesContainer = document.getElementById("badgesGalleryGrid");

    if (passportContainer) {
        passportContainer.innerHTML = `
            <div class="passport-card">
                <div class="passport-watermark">🌍</div>
                <div class="passport-header">
                    <div>
                        <span class="passport-badge-tag">OFFICIAL ECO PASSPORT • SMIH</span>
                        <h2 style="font-size: 24px; font-weight: 800; margin-top: 6px;">Global Green Credentials</h2>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 12px; color: #a7f3d0; font-weight: 700;">ID: SMIH-2026-NAGENDRA</span>
                        <div style="font-weight: 800; font-size: 13.5px;">VALIDATED BY AI & DS DEPT</div>
                    </div>
                </div>

                <div class="passport-body">
                    <div class="passport-photo">🧑‍🎓</div>
                    <div>
                        <div style="font-size: 11.5px; text-transform: uppercase; color: #a7f3d0; font-weight: 800; letter-spacing: 0.05em;">Certified Eco Champion</div>
                        <h3 style="font-size: 26px; font-weight: 800;">${user.name}</h3>
                        <p style="color: #d1fae5; font-size: 14.5px;">Department of ${user.department || 'AI & DS'} • Level ${user.level}</p>
                    </div>
                    <div style="background: rgba(0,0,0,0.22); padding: 16px 24px; border-radius: var(--radius-lg); backdrop-filter: blur(8px);">
                        <div style="font-size: 11px; text-transform: uppercase; color: #a7f3d0; font-weight: 700;">Verified Carbon Savings</div>
                        <div style="font-size: 30px; font-weight: 800; color: #34d399;">${user.carbonOffset || 42.8} kg CO₂</div>
                        <small style="color: #d1fae5;">Equivalent to planting 4 urban saplings</small>
                    </div>
                </div>

                <div class="passport-stamps-grid">
                    <div class="stamp-box">
                        <span class="stamp-icon">♻️</span>
                        <small>Zero Waste Verified</small>
                    </div>
                    <div class="stamp-box">
                        <span class="stamp-icon">⚡</span>
                        <small>Vampire Energy Hunter</small>
                    </div>
                    <div class="stamp-box">
                        <span class="stamp-icon">🎓</span>
                        <small>Climate Literacy Star</small>
                    </div>
                    <div class="stamp-box">
                        <span class="stamp-icon">🌱</span>
                        <small>Green Campus Vanguard</small>
                    </div>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-bottom: 34px;">
                <button class="secondary-btn" onclick="window.print()">🖨️ Print Digital Certificate</button>
                <button class="primary-btn" onclick="showToast('🔗 Digital Passport share link copied to clipboard!')">🔗 Share Green Passport</button>
            </div>
        `;
    }

    if (badgesContainer) {
        badgesContainer.innerHTML = BADGES_DATA.map(b => {
            const isUnlocked = (user.badges || []).includes(b.code);
            return `
                <div class="badge-item-card ${isUnlocked ? 'unlocked' : 'locked'}">
                    <span class="big-icon">${b.icon}</span>
                    <h4>${b.name}</h4>
                    <p>${b.desc}</p>
                    <div style="margin-top: 12px;">
                        <span class="badge-tag ${isUnlocked ? 'badge-green' : 'badge-amber'}">
                            ${isUnlocked ? '✓ Unlocked' : `${b.xpNeeded} XP Required`}
                        </span>
                    </div>
                </div>
            `;
        }).join("");
    }
}

// ==================================================
// AI TUTOR INTERACTION
// ==================================================
function initAITutor() {
    const sendBtn = document.getElementById("aiSendBtn");
    const input = document.getElementById("aiInput");
    if (!sendBtn || !input) return;

    sendBtn.addEventListener("click", () => handleAITutorMessage());
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleAITutorMessage();
    });
}

function handleAITutorMessage() {
    const input = document.getElementById("aiInput");
    const history = document.getElementById("aiChatHistory");
    if (!input || !history) return;

    const query = input.value.trim();
    if (!query) return;

    history.innerHTML += `
        <div class="chat-bubble user">
            ${escapeHtml(query)}
        </div>
    `;
    input.value = "";
    history.scrollTop = history.scrollHeight;

    setTimeout(() => {
        const botReply = generateAITutorResponse(query);
        history.innerHTML += `
            <div class="chat-bubble bot">
                ${botReply}
            </div>
        `;
        history.scrollTop = history.scrollHeight;

        const user = getCurrentUser();
        user.xp += 10;
        setCurrentUser(user);
        initTopbar();
        showToast("💡 +10 XP earned for environmental inquiry!");
    }, 450);
}

function askChip(promptText) {
    const input = document.getElementById("aiInput");
    if (input) {
        input.value = promptText;
        handleAITutorMessage();
    }
}

function generateAITutorResponse(msg) {
    const lower = msg.toLowerCase();
    if (lower.includes("plastic")) {
        return `<strong>🌱 Eco AI Tutor on Single-Use Plastics:</strong><br><br>
        Single-use plastics (PET, polystyrene, LDPE) take 450-1000 years to decompose. In oceans, ultraviolet radiation fragments them into hazardous microplastics that enter the marine food web.<br><br>
        <strong>Actionable Campus Tip:</strong> Bring your own stainless steel water bottle and canvas tote. Refusing disposable cutlery at the canteen prevents ~4.5kg of plastic waste per semester! <em>(+10 micro-XP earned)</em>`;
    } else if (lower.includes("carbon") || lower.includes("footprint")) {
        return `<strong>🌱 Eco AI Tutor on Carbon Footprints:</strong><br><br>
        Your carbon footprint measures the total greenhouse gas emissions (CO₂ equivalents) produced directly and indirectly by your daily activities.<br><br>
        <strong>Top 3 Student Impact Habits:</strong><br>
        1. Adopt a plant-forward dining pattern (cuts food emissions by up to 35%).<br>
        2. Walk or cycle across campus instead of taking motor vehicles.<br>
        3. Air-dry laundry in hostels whenever possible. <em>(+10 micro-XP earned)</em>`;
    } else if (lower.includes("energy") || lower.includes("electricity") || lower.includes("vampire")) {
        return `<strong>⚡ Eco AI Tutor on Energy Efficiency:</strong><br><br>
        'Vampire power' is the standby electric current drawn by devices even when switched off. In educational dorms and labs, this accounts for up to 10% of total electrical consumption.<br><br>
        <strong>Pro-Tip:</strong> Use a master power strip to shut down monitors and adapters when you leave for class! <em>(+10 micro-XP earned)</em>`;
    } else {
        return `<strong>🌍 Eco AI Tutor:</strong><br><br>
        Great question regarding environmental sustainability! The most fundamental principle of climate action is that <em>small habits compounded by campus communities create macro planetary impact</em>.<br><br>
        Check today's Eco Mission in your SMIH Dashboard to complete real-world challenges, raise your department ranking, and expand your Eco Passport! <em>(+10 micro-XP earned)</em>`;
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("open");
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
