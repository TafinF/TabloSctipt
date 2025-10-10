// Функция для добавления записи в лог
function addToLog(message, type = 'info') {
    const logContainer = document.getElementById('log-container');
    const timestamp = new Date().toLocaleTimeString();
    
    // Создаем элемент для новой записи
    const logEntry = document.createElement('div');
    
    // Добавляем класс в зависимости от типа сообщения
    logEntry.className = `log-entry log-${type}`;
    
    // Форматируем сообщение
    logEntry.innerHTML = `<span class="log-time">[${timestamp}]</span> ${message}`;
    
    // Добавляем запись в начало контейнера (новые сверху)
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Альтернативный вариант: добавлять в конец (новые снизу)
    // logContainer.appendChild(logEntry);
    
    // Автоматическая прокрутка к новой записи (если добавляем в конец)
    // logContainer.scrollTop = logContainer.scrollHeight;
}

// Функция для очистки лога
function clearLog() {
    const logContainer = document.getElementById('log-container');
    logContainer.innerHTML = '';
}

// Пример использования с существующими кнопками
document.addEventListener('DOMContentLoaded', function() {
    // Очистка начального содержимого
    clearLog();
    addToLog('Система инициализирована', 'system');
    
    // Пример привязки к кнопкам голов
    document.getElementById('goal_bu_left_add').addEventListener('click', function() {
        const teamName = document.getElementById('team_label_left').textContent;
        addToLog(`⚽ ГОЛ! Команда "${teamName}" забила гол`, 'goal');
    });
    
    document.getElementById('goal_bu_right_add').addEventListener('click', function() {
        const teamName = document.getElementById('team_label_right').textContent;
        addToLog(`⚽ ГОЛ! Команда "${teamName}" забила гол`, 'goal');
    });
    
    // Пример для кнопок счета
    document.getElementById('goal_bu_left_sub').addEventListener('click', function() {
        const teamName = document.getElementById('team_label_left').textContent;
        addToLog(`➖ У команды "${teamName}" отнят гол`, 'warning');
    });
    
    document.getElementById('goal_bu_right_sub').addEventListener('click', function() {
        const teamName = document.getElementById('team_label_right').textContent;
        addToLog(`➖ У команды "${teamName}" отнят гол`, 'warning');
    });
    
    // Пример для таймера
    document.getElementById('bu_time_stat_stop').addEventListener('click', function() {
        const button = this;
        if (button.textContent === 'Старт') {
            addToLog('▶️ Таймер запущен', 'info');
            button.textContent = 'Стоп';
        } else {
            addToLog('⏸️ Таймер остановлен', 'info');
            button.textContent = 'Старт';
        }
    });
    
    // Пример для загрузки названий команд
    document.getElementById('loadNames').addEventListener('click', function() {
        addToLog('🔄 Загрузка названий команд', 'system');
    });
    
    document.getElementById('reverseNames').addEventListener('click', function() {
        addToLog('🔄 Реверс названий команд', 'system');
    });
    
    // Пример для фолов
    const foulButtons = document.querySelectorAll('.foul-button');
    foulButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const teamSide = index === 0 ? 'левой' : 'правой';
            addToLog(`🟨 Фол зафиксирован для ${teamSide} команды`, 'foul');
        });
    });
    
    // Пример для отмен
    const cancelButtons = document.querySelectorAll('.cancel-button');
    cancelButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const teamSide = index === 0 ? 'левой' : 'правой';
            addToLog(`↩️ Отмена действия для ${teamSide} команды`, 'info');
        });
    });
});