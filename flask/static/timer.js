/**
 * Класс таймера с паузой
 */
class Timer {
    /**
 * @param {string} timeString Время в формате ММ:СС
 */
    constructor(timeString = "15:00") {
        // Парсим строку формата ММ:СС
        const [minutes, seconds] = timeString.split(':').map(Number);

        // Проверяем валидность входных данных
        if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0 || seconds > 59) {
            throw new Error('Неверный формат времени. Используйте ММ:СС');
        }

        /**
 * @type {number} Длительность таймера в мс установленная при создании
 */
        this.initialTime_ms = (minutes * 60 + seconds) * 1000;
        /**
* @type {number} Сколько оставалось идти таймеру в мс до паузы
*/
        this.remainedTime_ms = 0;
        /**
* @type {number} Прошлое значение Сколько оставалось идти таймеру в секундах
*/
        this.oldTime_s = 0;
        /**
* @type {Date} Дата/Время когда таймер истечёт
*/
        this.endTime = null;
        /**
* @type {Boolean} Флаг запущен ли таймер сейчас
*/
        this.isRunning = false;
        /**
* @type {Boolean} Флаг остановлен ли таймер сейчас
*/
        this.isPaused = false;
        /**
* @type {number} id интервала метода tick
*/
        this.intervalId = null;

        /**
 * @type {function(string): void | null}
 * @param {string} formattedTime Время в формате ММ:СС
 */
        this.onTick = null;
        /**
 * @type {function(): void | null}
 *Функция вызывается при истечеии таймера
 */
        this.onComplete = null;
    }
    /**
* Запускает таймер
*/
    start() {
        if (this.isRunning) return; // если таймер уже запущен ничего не делаем
        if (this.isPaused) { //если таймер стоял на паузе до этого
            let end = Date.now() + this.remainedTime_ms //определяем новое время завершения в милисекундах
            this.endTime = new Date(end);
            this.isPaused = false; // откючаем паузу
        } else { // если таймер запускают в первый раз
            let end = Date.now() + this.initialTime_ms // определям время в милисекндах когда таймер истечёт
            this.endTime = new Date(end); // создаём объект даты заверешения таймера
        }
        this.intervalId = setInterval(this.#tick.bind(this), 200) // каждые 200мс запускаем тик
        this.isRunning = true; // ставим флаг что таймер работает
    }
    /**
 * Ставит таймер на паузу
 */
    pause() {
        if (!this.isRunning) return; // если таймер не запущен, ничего не делаем

        clearInterval(this.intervalId); // останавливаем интервал
        this.isRunning = false;
        this.isPaused = true;

        // сохраняем оставшееся время
        this.remainedTime_ms = this.endTime - Date.now();
    }
    /**
* Отсчёт таймера, запускается каждые 200мс
*/
    #tick() {
        let ost = this.endTime - Date.now() // узнаем сколько милисекунд осталоь до истечения времени
        if (ost < 1000) { // если время вышло
            clearTimeout(this.intervalId); // останавливаем вызов этого метода
            //console.log(`Время вышло!`);
            this.isRunning = false; // снимаем флаг включения таймера
            if (this.onComplete) { // вызываем колбек завершения таймера
                this.onComplete();
            }
            return
        }
        let ost_sec = parseInt(ost / 1000) // сколько осталось таймеру идти в секундах
        if (this.oldTime_s != ost_sec) { // если значение изменилось
            this.oldTime_s = ost_sec // записываем новое значнеие в память
            let out_str = this.#time_to_str(ost) // получам строку с оставшимся временем таймера
            this.onTick(out_str) // вызываем колбек и отдаём туда оставшееся время в мм:сс
            //console.log(`Осталось: ${out_str}`);
        }
    }
    /**
* Переводит время из в милисекунд в ММ:СС
@param {number} time_ms Время в мс
@returns {string} Строка в формате ММ:СС
*/
    #time_to_str(time_ms) {
        let time = new Date(time_ms);
        let min = '00' + time.getMinutes()
        let sec = '00' + time.getSeconds()
        return `${min.slice(-2)}:${sec.slice(-2)}`
    }
    /**
* Установка обработчика тика
* @param {function(string): void | null} callback 
*/
    setOnTick(callback) {
        this.onTick = callback;
    }
    /**
* Установка обработчика завершения таймера
* @param {function(string): void | null} callback 
*/
    setOnComplete(callback) {
        this.onComplete = callback;
    }

    /**
* Возвращает время на которое изначально был установлен таймер
@returns {string} Строка в формате ММ:СС
*/
    getDurationTimer() {
        return this.#time_to_str(this.initialTime_ms)
    }
}