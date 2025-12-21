let selectedQuestions = [];
let correctAnswers = [];
let wrongAnswers = [];

let category, index, score, timer, timeLeft;

/* ================= HIGH SCORE ================= */

function saveHighScore(score, category) {
    let highScores = JSON.parse(localStorage.getItem("islamicIQHighScores")) || {};

    if (!highScores[category] || score > highScores[category]) {
        highScores[category] = score;
        localStorage.setItem("islamicIQHighScores", JSON.stringify(highScores));
    }
}

function loadHighScores() {
    return JSON.parse(localStorage.getItem("islamicIQHighScores")) || {};
}

/* ================= QUESTION BANK ================= */

const questionBank = {
    pillars: [
        {
            question: "How many pillars are there in Islam?",
            options: ["4", "5", "6", "7"],
            correct: 1,
            explanation: "Islam has five pillars."
        },
        {
            question: "Which pillar is prayer?",
            options: ["Zakat", "Hajj", "Salah", "Sawm"],
            correct: 2,
            explanation: "Salah means prayer."
        },
        {
            question: "Which pillar is fasting?",
            options: ["Hajj", "Sawm", "Zakat", "Shahada"],
            correct: 1,
            explanation: "Sawm means fasting."
        },
        {
            question: "Which pillar is charity?",
            options: ["Zakat", "Salah", "Hajj", "Sawm"],
            correct: 0,
            explanation: "Zakat is charity."
        },
        {
            question: "Which pillar is pilgrimage?",
            options: ["Salah", "Zakat", "Hajj", "Sawm"],
            correct: 2,
            explanation: "Hajj is pilgrimage."
        },
        {
            question: "What is Shahada?",
            options: ["Prayer", "Faith", "Fasting", "Charity"],
            correct: 1,
            explanation: "Shahada is declaration of faith."
        },
        {
            question: "How many times is Salah offered daily?",
            options: ["3", "4", "5", "6"],
            correct: 2,
            explanation: "Muslims pray five times a day."
        },
        {
            question: "In which month do Muslims fast?",
            options: ["Shaban", "Ramadan", "Muharram", "Rajab"],
            correct: 1,
            explanation: "Fasting is observed in Ramadan."
        },
        {
            question: "Zakat is given to whom?",
            options: ["Poor", "Rich", "Kings", "Merchants"],
            correct: 0,
            explanation: "Zakat is given to the poor and needy."
        },
        {
            question: "Hajj is performed in which city?",
            options: ["Madina", "Taif", "Makkah", "Jerusalem"],
            correct: 2,
            explanation: "Hajj is performed in Makkah."
        }
    ],

    prophets: [
        {
            question: "Who was the first Prophet of Islam?",
            options: ["Muhammad (PBUH)", "Adam (AS)", "Noah (AS)", "Ibrahim (AS)"],
            correct: 1,
            explanation: "Prophet Adam (AS) was the first prophet."
        },
        {
            question: "Who was the last Prophet?",
            options: ["Isa (AS)", "Musa (AS)", "Muhammad (PBUH)", "Ibrahim (AS)"],
            correct: 2,
            explanation: "Prophet Muhammad (PBUH) is the last prophet."
        },
        {
            question: "Which prophet built the Ark?",
            options: ["Adam (AS)", "Noah (AS)", "Musa (AS)", "Isa (AS)"],
            correct: 1,
            explanation: "Prophet Noah (AS) built the Ark."
        },
        {
            question: "Which prophet was swallowed by a fish?",
            options: ["Yusuf (AS)", "Yunus (AS)", "Musa (AS)", "Isa (AS)"],
            correct: 1,
            explanation: "Prophet Yunus (AS) was swallowed by a fish."
        },
        {
            question: "Which prophet could interpret dreams?",
            options: ["Ibrahim (AS)", "Yusuf (AS)", "Nuh (AS)", "Musa (AS)"],
            correct: 1,
            explanation: "Prophet Yusuf (AS) interpreted dreams."
        },
        {
            question: "Which prophet spoke to Allah directly?",
            options: ["Isa (AS)", "Musa (AS)", "Muhammad (PBUH)", "Nuh (AS)"],
            correct: 1,
            explanation: "Prophet Musa (AS) spoke to Allah."
        },
        {
            question: "Which prophet was born without a father?",
            options: ["Adam (AS)", "Isa (AS)", "Musa (AS)", "Yusuf (AS)"],
            correct: 1,
            explanation: "Prophet Isa (AS) was born without a father."
        },
        {
            question: "Who was known as Khalilullah?",
            options: ["Muhammad (PBUH)", "Ibrahim (AS)", "Nuh (AS)", "Isa (AS)"],
            correct: 1,
            explanation: "Prophet Ibrahim (AS) is known as Khalilullah."
        },
        {
            question: "How many prophets are mentioned in the Quran?",
            options: ["15", "20", "25", "30"],
            correct: 2,
            explanation: "25 prophets are mentioned in the Quran."
        },
        {
            question: "Which prophet received the Quran?",
            options: ["Isa (AS)", "Musa (AS)", "Muhammad (PBUH)", "Ibrahim (AS)"],
            correct: 2,
            explanation: "The Quran was revealed to Prophet Muhammad (PBUH)."
        }
    ],

    quran: [
        {
            question: "In which month was the Quran revealed?",
            options: ["Muharram", "Ramadan", "Shaban", "Rajab"],
            correct: 1,
            explanation: "The Quran was revealed in Ramadan."
        },
        {
            question: "How many Surahs are in the Quran?",
            options: ["112", "113", "114", "115"],
            correct: 2,
            explanation: "There are 114 Surahs in the Quran."
        },
        {
            question: "Which is the first Surah of the Quran?",
            options: ["Al-Baqarah", "Al-Fatiha", "Al-Ikhlas", "An-Nas"],
            correct: 1,
            explanation: "Al-Fatiha is the first Surah."
        },
        {
            question: "Which is the longest Surah?",
            options: ["Al-Imran", "Al-Baqarah", "An-Nisa", "Al-Maidah"],
            correct: 1,
            explanation: "Al-Baqarah is the longest Surah."
        },
        {
            question: "Which Surah has only one verse?",
            options: ["Al-Ikhlas", "Al-Kawthar", "An-Nasr", "Al-Falaq"],
            correct: 1,
            explanation: "Surah Al-Kawthar has one verse."
        },
        {
            question: "In which language was the Quran revealed?",
            options: ["Arabic", "Hebrew", "Urdu", "Persian"],
            correct: 0,
            explanation: "The Quran was revealed in Arabic."
        },
        {
            question: "Which Surah is known as the heart of the Quran?",
            options: ["Al-Fatiha", "Ya-Sin", "Ar-Rahman", "Al-Mulk"],
            correct: 1,
            explanation: "Surah Ya-Sin is called the heart of the Quran."
        },
        {
            question: "Which Surah is recited for protection?",
            options: ["Al-Falaq", "An-Nas", "Both A & B", "Al-Kafirun"],
            correct: 2,
            explanation: "Al-Falaq and An-Nas are recited for protection."
        },
        {
            question: "How many Juz are in the Quran?",
            options: ["20", "25", "30", "35"],
            correct: 2,
            explanation: "There are 30 Juz in the Quran."
        },
        {
            question: "Which Surah was revealed first?",
            options: ["Al-Fatiha", "Al-Alaq", "Al-Baqarah", "An-Nas"],
            correct: 1,
            explanation: "Surah Al-Alaq was revealed first."
        }
    ]
};


/* ================= START QUIZ ================= */

function startQuiz(selectedCategory) {
    category = selectedCategory;
    index = 0;
    score = 0;
    correctAnswers = [];
    wrongAnswers = [];

    // RANDOM 10 QUESTIONS
    const shuffled = [...questionBank[category]].sort(() => 0.5 - Math.random());
    selectedQuestions = shuffled.slice(0, 10);

    document.getElementById("welcome-screen").classList.add("d-none");
    document.getElementById("quiz-screen").classList.remove("d-none");

    showQuestion();
}

/* ================= SHOW QUESTION ================= */

function showQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById("timer").innerText = `⏱ ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `⏱ ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);

    const q = selectedQuestions[index];

    document.getElementById("question-text").innerText = q.question;
    document.getElementById("question-count").innerText =
        `Question ${index + 1} / ${selectedQuestions.length}`;

    document.getElementById("progress-bar").style.width =
        ((index + 1) / selectedQuestions.length) * 100 + "%";

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-success w-100";
        btn.innerText = opt;
        btn.onclick = () => selectAnswer(i);
        optionsDiv.appendChild(btn);
    });
}

/* ================= SELECT ANSWER ================= */

function selectAnswer(selected) {
    clearInterval(timer);
    const q = selectedQuestions[index];
    const optionsDiv = document.getElementById("options");
    const buttons = optionsDiv.querySelectorAll("button");

    // Disable all buttons and apply highlighting
    buttons.forEach((btn, i) => {
        btn.disabled = true; // prevent further clicks

        if (i === q.correct) {
            // Correct answer → green background, white text
            btn.classList.add("correct");
        } else if (i === selected && i !== q.correct) {
            // Wrong selected answer → red background, white text
            btn.classList.add("wrong");
        } else {
            // Unselected wrong options → keep default outline
            btn.classList.remove("correct", "wrong");
        }
    });

    // Update score
    if (selected === q.correct) {
        score++;
        correctAnswers.push(1);
    } else {
        wrongAnswers.push(1);
    }

    // Show explanation and next button
    document.getElementById("explanation").innerText = q.explanation;
    document.getElementById("explanation").classList.remove("d-none");
    document.getElementById("next-btn").classList.remove("d-none");
}



/* ================= NEXT QUESTION ================= */

function nextQuestion() {
    index++;
    document.getElementById("explanation").classList.add("d-none");
    document.getElementById("next-btn").classList.add("d-none");

    if (index < selectedQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

/* ================= END QUIZ ================= */

function endQuiz() {
    document.getElementById("quiz-screen").classList.add("d-none");
    document.getElementById("result-screen").classList.remove("d-none");

    saveHighScore(score, category);
    const highScores = loadHighScores();

    const total = selectedQuestions.length;
    const correct = correctAnswers.length;
    const wrong = wrongAnswers.length;
    const percentage = ((correct / total) * 100).toFixed(2);

    document.getElementById("total-questions").innerText =
        `Total Questions: ${total}`;

    document.getElementById("correct-count").innerText =
        `✔ Correct Answers: ${correct}`;

    document.getElementById("wrong-count").innerText =
        `✘ Wrong Answers: ${wrong}`;

    document.getElementById("percentage").innerText =
        `Percentage: ${percentage}%`;

    document.getElementById("high-score").innerText =
        `Highest Score (${category.toUpperCase()}): ${highScores[category]}`;
}

/* ================= RESET ================= */

function resetQuiz() {
    location.reload();
}

function showScreen(screenId) {
    const screens = ['welcome-screen', 'quiz-screen', 'result-screen', 'documentation-screen', 'about-screen'];
    screens.forEach(id => {
        document.getElementById(id).classList.add('d-none');
    });
    document.getElementById(screenId).classList.remove('d-none');
}

