
let secondMilCount = 993;
let countMin = 15; // длительность тайма
let tim = countMin * 60;
let timeOut;
let flagPere = true;
let flag_time = true;
let currentAudio = null;
let isAutoAlarm = true;
const player = new FootballPlayer();

function timerUbdate() {
    document.getElementById("pause").disabled = false;
    document.getElementById("start").disabled = true;
    tim = tim - 1;
    minutes = Math.floor(tim / 60);
    seco = tim - minutes * 60
    let str_out = minutes.toString().padStart(2, '0') + ":" + seco.toString().padStart(2, '0')
    if (tim > 0) {
        timeOut = setTimeout(timerUbdate, secondMilCount);
    }
    else {
        document.getElementById('divbot').style.background = "white"
        if (isAutoAlarm) {
            player.playSiren()
            // playRandomGoalSound(true)
        }
    }
    if (tim < 30) {
        if (flag_time) {
            flag_time = false;
            document.getElementById('divbot').style.background = "tomato"
        } else {
            flag_time = true;
            document.getElementById('divbot').style.background = "white"
        }

    }
    let elem = document.getElementById('time');
    elem.textContent = str_out
}
function stop() {
    document.getElementById("pause").disabled = true;
    document.getElementById("start").disabled = false;
    clearTimeout(timeOut);
    timeOut = undefined
}
function start() {
    if (tim == 0) {
        return
    }
    if (timeOut == undefined) {
        player.fadeOut(1500)
        timerUbdate()
    }
}
function timeNew() {
    tim = countMin * 60;
    document.getElementById('time').textContent = countMin.toString() + ":00";
}

function btn_click_load(isNulPoint) {
    document.getElementById('divbot').style.background = "white"
    let inp_k1 = document.getElementById('name');
    let inp_k2 = document.getElementById('name2');
    let out_k1 = document.getElementById('k1_name');
    out_k1.textContent = inp_k1.value
    let out_k2 = document.getElementById('k2_name');
    out_k2.textContent = inp_k2.value
    if (isNulPoint) {
        btn_click_nulPoint()
        timeNew()
        document.getElementById('name').value = ""
        document.getElementById('name2').value = ""
        setNumberTime(1);
    }
    console.log("555")
}
function btn_click_revers() {
    let out_k1 = document.getElementById('k1_name');
    let sv1 = out_k1.textContent
    let out_k2 = document.getElementById('k2_name');
    out_k1.textContent = out_k2.textContent
    out_k2.textContent = sv1

    let out_p1 = document.getElementById('k1_point');
    sv1 = out_p1.textContent
    let out_p2 = document.getElementById('k2_point');
    out_p1.textContent = out_p2.textContent
    out_p2.textContent = sv1
    console.log("555")
}
function btn_click_add(val, id, butElem) {
    if (val == 1) {
        // playRandomGoalSound()
        player.playRandomGoal()

    }
    let out_p = document.getElementById(id);
    let newVal = Number(out_p.textContent) + val
    if (newVal >= 0) {
        out_p.textContent = newVal
    }
    butElem.blur()
}
function btn_click_nulPoint() {
    document.getElementById('k1_point').textContent = 0;
    document.getElementById('k2_point').textContent = 0;
}
function setNumberTime(numb) {
    document.getElementById('timeAdd').textContent = "т" + numb.toString();
}
function setPere() {
    if (flagPere) {
        // document.getElementById('4').style.visibility = 'hidden';
        // document.getElementById('time').textContent = "Перерыв";
        document.getElementById('perer').textContent = "Начать тайм 2";
        let element = document.getElementsByClassName("time");
        element[0].style.display = "none";
        element[1].style.display = "none";
        element = document.getElementsByClassName("text");
        element[0].style.display = "block";
        flagPere = false;
    } else {
        let element = document.getElementsByClassName("time");
        element[0].style.display = "block";
        element[1].style.display = "block";
        element = document.getElementsByClassName("text");
        element[0].style.display = "none";
        // document.getElementById('4').style.visibility = 'visible';
        document.getElementById('time').textContent = countMin.toString() + ":00";
        document.getElementById('perer').innerHTML = "Перерыв<br>между тайм";
        timeNew();
        setNumberTime(2);
        flagPere = true;
        timerUbdate();
    }
}
/**Изменяет длительность секунды для того чтобы можно было выровняться с настоящим табло */
function retimeMinute(val) {
    secondMilCount += val;
    document.getElementById('seclent').textContent = secondMilCount.toString();
}

window.onload = function () {
    document.getElementById('buSetTimeManual').textContent = "Выставить на " + countMin.toString() + ":00";
    document.getElementById('seclent').textContent = secondMilCount.toString();
}

function setTimeLents() {
    let data = parseInt(document.getElementById('minCount').value)
    if (!isNaN(data)) {
        countMin = data;
        tim = countMin * 60;
        document.getElementById('buSetTimeManual').textContent = "Выставить на " + countMin.toString() + ":00";
    }
}

function timeCiller() {
    let eTime = document.getElementById('period')
    let bu = document.getElementById('timeCiller')
    if (eTime.style.display == "none") {
        eTime.style.display = "block";
        bu.textContent = "Скрыть тайм";
    }
    else {
        eTime.style.display = "none";
        bu.textContent = "Показать тайм";
    }
}


function autoAlarmSwith() {
    let bu = document.getElementById('autoAlarm')
    if (isAutoAlarm == true) {
        isAutoAlarm = false;
        bu.textContent = "Включить автосирену";
    }
    else {
        isAutoAlarm = true;
        bu.textContent = "Отключить автосирену";
    }
}
function timOut() {
    stop()
    player.startAutoBreak()
}
function stopGoalSound() {
    player.fadeOut(1000)
}

function playMusic() {
     player.startAutoBreak()
}
function alrmPlay() {
    player.playSiren()
}
document.addEventListener('keydown', function (event) {
    if (event.repeat) {
        return
    }
    let id
    if (event.key === 'ArrowRight') {
        id = 'bu_right';
    }
    if (event.key === 'ArrowLeft') {
        id = 'bu_left';
    }
    if (event.key === 'ArrowUp') {
        if (document.getElementById("pause").disabled) {
            id = 'start';
        } else {
            id = 'pause';
        }
    }
    if (event.key === 'ArrowDown') {
        id = 'bu_down';
    }
    if (event.key === ' ') {
        id = 'timout';
    }
    button = document.getElementById(id);
    if (button) {
        // Добавляем класс активного состояния
        button.classList.add('active');

        setTimeout(() => {
            button.classList.remove('active');
            button.click();
        }, 400);
    }
});
