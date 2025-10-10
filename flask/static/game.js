/**
 * Перечисление для идентификации команд
 */
const Teams = {
    TEAM1: 'team1',
    TEAM2: 'team2'
};

/**
 * Перечисление для типов действий
 */
const Actions = {
    INCREASE: 'increase',
    DECREASE: 'decrease'
};

/**
 * Перечисление для типов счетчиков
 */
const CounterTypes = {
    GOALS: 'goals',
    FOULS: 'fouls'
};

/**
 * Класс Game представляет спортивную игру между двумя командами
 * Содержит функционал для отслеживания голов, фолов и управления командами
 */
class Game {
    /**
     * Конструктор класса Game
     * @param {string} team1 - Название первой команды (по умолчанию "Команда 1")
     * @param {string} team2 - Название второй команды (по умолчанию "Команда 2")
     */
    constructor(team1 = "Команда 1", team2 = "Команда 2") {
        /** @type {string} Название первой команды */
        this.team1 = team1;

        /** @type {string} Название второй команды */
        this.team2 = team2;

        /** @type {number} Количество голов первой команды */
        this.team1Goals = 0;

        /** @type {number} Количество голов второй команды */
        this.team2Goals = 0;

        /** @type {number} Количество фолов первой команды */
        this.team1Fouls = 0;

        /** @type {number} Количество фолов второй команды */
        this.team2Fouls = 0;

        /** @type {Array<string>} Лог игровых событий */
        this.gameLog = [];

        /** @type {Timer} Игровой таймер */
        this.timer = new Timer();

        // this._addLog(`Начало матча: ${this.team1} vs ${this.team2}`);
    }

    /**
     * Приватный метод для изменения любых счетчиков
     * @param {Teams} team - Команда из перечисления Teams
     * @param {Actions} action - Действие из перечисления Actions
     * @param {CounterTypes} counterType - Тип счетчика из перечисления CounterTypes
     * @returns {boolean} true если операция успешна, false если ошибка
     * @private
     */
    _changeCounter(team, action, counterType) {
        // Проверка валидности параметров
        if (!Object.values(Teams).includes(team)) {
            this._addLog(`Ошибка: неверное название команды: ${team}`);
            return false;
        }

        if (!Object.values(Actions).includes(action)) {
            this._addLog(`Ошибка: неверное действие: ${action}`);
            return false;
        }

        if (!Object.values(CounterTypes).includes(counterType)) {
            this._addLog(`Ошибка: неверный тип счетчика: ${counterType}`);
            return false;
        }

        const teamName = team === Teams.TEAM1 ? this.team1 : this.team2;
        const counterField = team + (counterType === CounterTypes.GOALS ? 'Goals' : 'Fouls');
        const counterName = counterType === CounterTypes.GOALS ? 'гол' : 'фол';
        const currentValue = this[counterField];

        if (action === Actions.INCREASE) {
            this[counterField]++;
            this._addLog(`${teamName}: ${counterName}!`);
            return true;
        } else if (action === Actions.DECREASE) {
            if (this[counterField] > 0) {
                this[counterField]--;
                this._addLog(`${teamName}: ${counterName} отменен`);
                return true;
            } else {
                this._addLog(`${teamName}: попытка уменьшить ${counterName} ниже 0`);
                return false;
            }
        }
    }

    /**
     * Универсальный метод для получения значения счетчика
     * @param {Teams} team - Команда из перечисления Teams
     * @param {CounterTypes} counterType - Тип счетчика из перечисления CounterTypes
     * @returns {number} Значение счетчика
     */
    getCounter(team, counterType) {
        if (!Object.values(Teams).includes(team)) {
            this._addLog(`Ошибка получения счетчика: неверное название команды: ${team}`);
            return 0;
        }

        if (!Object.values(CounterTypes).includes(counterType)) {
            this._addLog(`Ошибка получения счетчика: неверный тип счетчика: ${counterType}`);
            return 0;
        }

        const counterField = team + (counterType === CounterTypes.GOALS ? 'Goals' : 'Fouls');
        return this[counterField];
    }

    /**
     * Изменяет названия обеих команд
     * @param {string} newTeam1 - Новое название первой команды
     * @param {string} newTeam2 - Новое название второй команды
     */
    changeTeamNames(newTeam1, newTeam2) {
        const oldNames = `${this.team1} vs ${this.team2}`;
        this.team1 = newTeam1;
        this.team2 = newTeam2;
        const newNames = `${this.team1} vs ${this.team2}`;
        this._addLog(`Смена названий команд: ${oldNames} → ${newNames}`);
    }

    /**
     * Меняет местами названия команд
     */
    swapTeamNames() {
        const oldNames = `${this.team1} vs ${this.team2}`;
        [this.team1, this.team2] = [this.team2, this.team1];
        const newNames = `${this.team1} vs ${this.team2}`;
        this._addLog(`Команды поменялись местами: ${oldNames} → ${newNames}`);
    }

    /**
     * Сбрасывает все счетчики (голы и фолы) к нулю
     */
    resetCounters() {
        this.team1Goals = 0;
        this.team2Goals = 0;
        this.team1Fouls = 0;
        this.team2Fouls = 0;
        this._addLog('Все счетчики сброшены к нулю');
    }

    /**
     * Возвращает лог игры
     * @returns {Array<string>} Массив строк с логом событий
     */
    getGameLog() {
        return this.gameLog;
    }

    /**
     * Очищает лог игры
     */
    clearGameLog() {
        this.gameLog = [];
        this._addLog('Лог игры очищен');
    }

    /**
     * Приватный метод для добавления записи в лог
     * @param {string} message - Сообщение для лога
     * @private
     */
    _addLog(message) {
        const timestamp = new Date().toLocaleTimeString();
        this.gameLog.push(`[${timestamp}] ${message}`);
    }
    /**
 * Увеличивает количество голов первой команды
 * @returns {boolean} true если операция успешна, false если ошибка
 */
    increaseTeam1Goals() {
        return this._changeCounter(Teams.TEAM1, Actions.INCREASE, CounterTypes.GOALS);
    }

    /**
     * Уменьшает количество голов первой команды
     * @returns {boolean} true если операция успешна, false если ошибка
     */
    decreaseTeam1Goals() {
        return this._changeCounter(Teams.TEAM1, Actions.DECREASE, CounterTypes.GOALS);
    }

    /**
     * Увеличивает количество фолов первой команды
     * @returns {boolean} true если операция успешна, false если ошибка
     */
    increaseTeam1Fouls() {
        return this._changeCounter(Teams.TEAM1, Actions.INCREASE, CounterTypes.FOULS);
    }

    /**
     * Уменьшает количество фолов первой команды
     * @returns {boolean} true если операция успешна, false если ошибка
     */
    decreaseTeam1Fouls() {
        return this._changeCounter(Teams.TEAM1, Actions.DECREASE, CounterTypes.FOULS);
    }

    /**
     * Увеличивает количество голов второй команды
     * @returns {boolean} true если операция успешна, false если ошибка
     */
    increaseTeam2Goals() {
        return this._changeCounter(Teams.TEAM2, Actions.INCREASE, CounterTypes.GOALS);
    }

    /**
     * Уменьшает количество голов второй команды
     * @returns {boolean} true если операция успешна, false если ошибка
     */
    decreaseTeam2Goals() {
        return this._changeCounter(Teams.TEAM2, Actions.DECREASE, CounterTypes.GOALS);
    }

    /**
     * Увеличивает количество фолов второй команды
     * @returns {boolean} true если операция успешна, false если ошибка
     */
    increaseTeam2Fouls() {
        return this._changeCounter(Teams.TEAM2, Actions.INCREASE, CounterTypes.FOULS);
    }

    /**
     * Уменьшает количество фолов второй команды
     * @returns {boolean} true если операция успешна, false если ошибка
     */
    decreaseTeam2Fouls() {
        return this._changeCounter(Teams.TEAM2, Actions.DECREASE, CounterTypes.FOULS);
    }
}