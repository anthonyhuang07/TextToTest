const createPg = document.getElementById('create');
const main = document.querySelector('main');
const cover = document.getElementById('cover');
const content = document.getElementById('content');
const quiz = document.getElementById('quiz');
const mondai = document.getElementById('question');
const seleciao = document.getElementById('select');

let cOn = 0
let title = "Title"
let questions = ["Q1", "Q2", "Q3", "Q4"]
let answers = ["A1", "A2", "A3", "A4"]

let pressSound = new Audio('https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true');
pressSound.volume = 0.5;

let initialIndex = Math.floor(Math.random() * questions.length)
let question = questions[initialIndex];
let correct = answers[initialIndex];

content.innerHTML = `# Title
## Q1
A1
## Q2
A2
## Q3
A3
## Q4
A4
## Q5
A5
## Q6
A6`

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
        } else {
            answers.push(lines[i])
        }
    }
    console.log(title)
    console.log(questions)
    console.log(answers)

    if (questions.length < 4 || answers.length < 4 || answers.length != questions.length) {

    } else {
        create()
        main.style.display = 'none';
        quiz.style.display = 'flex';

        quizTime()
    }
}

function quizTime() {
    playSound()
    mondai.innerHTML = ""
    seleciao.innerHTML = ""

    quiz.querySelector("h1").innerHTML = title;
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
    if(ans == correct){
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
}

function finish(){
    
}