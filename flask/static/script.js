/**
 * @type {Game}
 */
let game
function collectNames() {
    let names = getTeamNames()
    console.log()
    game = new Game(names.leftTeam, names.rightTeam);
    document.querySelector("#team_label_left").textContent = game.team1
    document.querySelector("#team_label_right").textContent = game.team2
    setTimerColback()
}

function setTimerColback() {
    game.timer.setOnTick((strTime) => { document.querySelector('#time_label').textContent = strTime })
}

function reverse() {
    game.swapTeamNames()
    document.querySelector("#team_label_left").textContent = game.team1
    document.querySelector("#team_label_right").textContent = game.team2
}

function printGoals() {
    document.querySelector("#score_label").textContent = `${game.team1Goals}:${game.team2Goals}`
}

function timerChange() {
    bu = document.querySelector('#bu_time_stat_stop')
    if (game.timer.isRunning) {
        game.timer.pause()
        bu.textContent = "Старт"
        bu.classList.replace('stop-button', 'start-button');
    } else {
        game.timer.start()
        bu.textContent = "Стоп"
        bu.classList.replace('start-button', 'stop-button');
    }
}

function setTime() {
    time = document.querySelector('#duration_input').value
    t = new Timer(time)
    if (t) {
        game.timer = t
        document.querySelector('#time_label').textContent = game.timer.getDurationTimer()
        setTimerColback()
        document.querySelector('#duration_input').value = ""
    }
}

window.addEventListener('load', function () {
    document.querySelector('#loadNames').addEventListener('click', collectNames);// кнопка загрузить имена
    document.querySelector('#reverseNames').addEventListener('click', reverse);
    document.querySelector('#bu_time_stat_stop').addEventListener('click', timerChange);
    document.querySelector('#bu_set_time').addEventListener('click', setTime);
    document.querySelector('#goal_bu_left_add').addEventListener('click', () => { game.increaseTeam1Goals(); printGoals() });
    document.querySelector('#goal_bu_left_sub').addEventListener('click', () => { game.decreaseTeam1Goals(); printGoals() });
    document.querySelector('#goal_bu_right_sub').addEventListener('click', () => { game.decreaseTeam2Goals(); printGoals() });
    document.querySelector('#goal_bu_right_add').addEventListener('click', () => { game.increaseTeam2Goals(); printGoals() });
    
});
