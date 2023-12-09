const createPg = document.getElementById('create');
const aboutPg = document.getElementById('about');
const helpPg = document.getElementById('help');

const main = document.querySelector('main');
const cover = document.getElementById('cover');
const content = document.getElementById('content');
const quiz = document.getElementById('quiz');
const mondai = document.getElementById('question');
const seleciao = document.getElementById('select');

let cOn = 0
let points = 0
let turn = 0
let title = "Title"
let questions = []
let answers = []

let pressSound = new Audio('https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true');
let bgm = new Audio('https://github.com/anthonyhuang07/TextToTest/blob/main/assets/bgm.mp3?raw=true');
pressSound.volume = 0.5;
bgm.volume = 0.5;
bgm.loop = true;

let initialIndex = Math.floor(Math.random() * questions.length)
let question = questions[initialIndex];
let correct = answers[initialIndex];

function playSound() {
    pressSound.currentTime = 0;
    pressSound.play();
}

function create() {
    playSound()
    if (cOn == 0) {
        createPg.style.display = 'flex';
        cover.style.display = 'block';
        cOn = 1;
    } else if (cOn == 1) {
        createPg.style.display = 'none';
        cover.style.display = 'none';
        cOn = 0;
    }
}

function aboutOpen() {
    playSound()
    if (cOn == 0) {
        aboutPg.style.display = 'flex';
        cover.style.display = 'block';
        cOn = 1;
    } else if (cOn == 1) {
        aboutPg.style.display = 'none';
        cover.style.display = 'none';
        cOn = 0;
    }
}

function help(){
    playSound()
    if (cOn == 0) {
        helpPg.style.display = 'flex';
        cover.style.display = 'block';
        cOn = 1;
    } else if (cOn == 1) {
        helpPg.style.display = 'none';
        cover.style.display = 'none';
        cOn = 0;
    }
}

function submit() {
    playSound()
    title = ""
    questions = []
    answers = []
    let lines = content.value.split('\n')
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("# ")) {
            title = lines[i].replace("# ", "")
            i++
        }
        if (lines[i].startsWith("## ")) {
            questions.push(lines[i].replace("## ", ""))
        } else if (lines[i] != "") {
            answers.push(lines[i])
        }
    }

    if (questions.length < 4 || answers.length < 4 || answers.length < questions.length) {

    } else {
        create()
        main.style.display = 'none';
        quiz.style.display = 'flex';
        ogQ = questions.slice()

        quizTime()
        bgm.currentTime = 0;
        bgm.play()
    }
}

function quizTime() {
    turn++
    playSound()

    initialIndex = Math.floor(Math.random() * questions.length);
    question = questions[initialIndex];
    correct = answers[initialIndex];

    mondai.innerHTML = ""
    seleciao.innerHTML = ""

    quiz.querySelector("h1").innerHTML = `${title} (${turn}/${ogQ.length})`;
    mondai.appendChild(document.createElement("h2")).innerHTML = question

    let tempAnswers = answers.slice()
    tempAnswers.splice(initialIndex, 1)
    let randomAnswers = []
    for (let i = 0; i < 3; i++) {
        let randIndex = Math.floor(Math.random() * tempAnswers.length)
        randomAnswers.push(tempAnswers[randIndex])
        tempAnswers.splice(randIndex, 1)
    }
    let correctIndex = Math.floor(Math.random() * 4);
    randomAnswers.splice(correctIndex, 0, correct);

    for (let i = 0; i < randomAnswers.length; i++) {
        let button = document.createElement("button");
        button.innerHTML = randomAnswers[i];
        button.setAttribute("onclick", "check(this.innerHTML)")
        seleciao.appendChild(button);
    }
}

function check(ans) {
    playSound()
    mondai.innerHTML = ""
    seleciao.innerHTML = ""
    if(ans == correct){
        points++
        let correctText = mondai.appendChild(document.createElement("h2"));
        correctText.innerHTML = "Correct Answer!";
        correctText.style.color = "rgb(0, 255, 0)";
        mondai.appendChild(document.createElement("br"))
        mondai.appendChild(document.createElement("h2")).innerHTML = `Question: ${question}`
        mondai.appendChild(document.createElement("h2")).innerHTML = `Answer: ${correct}`

        let button = document.createElement("button");
        button.innerHTML = "Next";
        button.setAttribute("onclick", "next()")
        seleciao.appendChild(button);
    } else if(ans != correct) {
        let correctText = mondai.appendChild(document.createElement("h2"));
        correctText.innerHTML = "Wrong Answer!";
        correctText.style.color = "rgb(255, 0, 0)";
        mondai.appendChild(document.createElement("br"))
        mondai.appendChild(document.createElement("h2")).innerHTML = `Question: ${question}`
        mondai.appendChild(document.createElement("h2")).innerHTML = `Answer: ${correct}`

        let button = document.createElement("button");
        button.innerHTML = "Next";
        button.setAttribute("onclick", "next()")
        seleciao.appendChild(button);
    }
}

function next(){
    questions.splice(initialIndex, 1)
    answers.splice(initialIndex, 1)
    answers.push(correct)

    if(questions.length == 0){
        finish()
    } else{
        initialIndex = Math.floor(Math.random() * questions.length)
        question = questions[initialIndex];
        correct = answers[initialIndex];
        quizTime()
    }
}

function finish(){
    bgm.pause()
    playSound()
    mondai.innerHTML = ""
    seleciao.innerHTML = ""

    mondai.appendChild(document.createElement("h2")).innerHTML = "Quiz Completed!"
    mondai.appendChild(document.createElement("br"))
    mondai.appendChild(document.createElement("h2")).innerHTML = `Your Score: ${points}/${ogQ.length}`

    let button = document.createElement("button");
    button.innerHTML = "Return to Home";
    button.setAttribute("onclick", "back()")
    seleciao.appendChild(button);
}

function back(){
    playSound()
    points = 0
    turn = 0
    main.style.display = 'flex';
    quiz.style.display = 'none';
}