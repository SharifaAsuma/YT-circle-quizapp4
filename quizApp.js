import { questions } from "./questions.js";

// =============================
// 変数
// =============================

let current = 0;

let score = 0;

let timeLeft = 60;

let timer;


// =============================
// 問題表示
// =============================

function showQuestion() {

    document.getElementById("quiz-screen")
        .style.display = "block";

    document.getElementById("result-screen")
        .style.display = "none";

    document.getElementById("final-screen")
        .style.display = "none";

    document.getElementById("question")
        .textContent =
        questions[current].question;


    document.getElementById("count")
        .textContent =
        `${current + 1} / ${questions.length}`;


    // タイマーリセット
    startTimer();
}


// =============================
// タイマー
// =============================

function startTimer() {

    clearInterval(timer);

    document.getElementById("timer")
        .textContent = timeLeft;


    timer = setInterval(function() {

        timeLeft--;

        document.getElementById("timer")
            .textContent = timeLeft;


        if (timeLeft <= 0) {

            clearInterval(timer);

            // 時間切れ
            showTimeUp();
        }

    }, 1000);
}


// =============================
// 時間切れ
// =============================

function showTimeUp() {

    document.getElementById("quiz-screen")
        .style.display = "none";

    document.getElementById("result-screen")
        .style.display = "block";


    document.getElementById("result-title")
        .textContent = "⏰ 時間切れ！";


    document.getElementById("explanation")
        .textContent =
        "時間内に回答できませんでした。";


    document.querySelector(".next-btn")
        .textContent =
        current === questions.length - 1
            ? "結果を見る"
            : "次の問題 →";
}


// =============================
// 回答処理
// =============================

function answer(choice) {

    clearInterval(timer);


    const q = questions[current];


    if (choice === q.answer) {

        score++;

        document.getElementById("result-title")
            .textContent = "⭕ 正解！";

    } else {

        document.getElementById("result-title")
            .textContent = "❌ 不正解";
    }


    document.getElementById("explanation")
        .textContent = q.explanation;


    document.getElementById("quiz-screen")
        .style.display = "none";

    document.getElementById("result-screen")
        .style.display = "block";


    document.querySelector(".next-btn")
        .textContent =
        current === questions.length - 1
            ? "結果を見る"
            : "次の問題 →";
}


// =============================
// 次の問題
// =============================

function nextQuestion() {

    current++;


    if (current < questions.length) {

        showQuestion();

    } else {

        showFinalResult();
    }
}


// =============================
// 最終結果
// =============================

function showFinalResult() {

    clearInterval(timer);


    document.getElementById("quiz-screen")
        .style.display = "none";

    document.getElementById("result-screen")
        .style.display = "none";

    document.getElementById("final-screen")
        .style.display = "block";


    document.getElementById("final-score")
        .textContent =
        `${questions.length}問中 ${score}問正解！`;
}


// =============================
// リスタート
// =============================

function restartQuiz() {

    current = 0;

    score = 0;

    showQuestion();
}


// =============================
// イベントリスナー登録
// =============================

document.getElementById("true-btn")
    .addEventListener("click", () => answer(true));

document.getElementById("false-btn")
    .addEventListener("click", () => answer(false));

document.getElementById("next-btn")
    .addEventListener("click", nextQuestion);

document.getElementById("restart-btn")
    .addEventListener("click", restartQuiz);


// =============================
// 最初の問題
// =============================

showQuestion();
