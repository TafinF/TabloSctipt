/**
 * Получает названия команд из поле ввода
 * @returns кортеж с именами команд и источником данных
 */
function getTeamNames() {
    const leftTeamInput = document.getElementById('leftTeam');
    const rightTeamInput = document.getElementById('rightTeam');
    const pairedNamesInput = document.getElementById('pairedNames');

    const leftTeam = leftTeamInput ? leftTeamInput.value.trim() : '';
    const rightTeam = rightTeamInput ? rightTeamInput.value.trim() : '';
    const pairedNames = pairedNamesInput ? pairedNamesInput.value.trim() : '';


    // Проверяем, что заполнено только одно из вариантов
    const hasSeparateTeams = leftTeam || rightTeam;
    const hasPairedTeams = !!pairedNames;

    if (hasSeparateTeams && hasPairedTeams) {
        console.warn('Заполнены оба варианта ввода. Используется спареное поле.');
    }

    // Приоритет у парного поля
    if (pairedNames) {
        const teams = pairedNames.split('__').map(team => team.trim());

        if (teams.length >= 2 && teams[0] && teams[1]) {
            showCorrect(pairedNamesInput)
            // Успешное получение - очищаем все поля
            if (leftTeamInput) leftTeamInput.value = '';
            if (rightTeamInput) rightTeamInput.value = '';
            if (pairedNamesInput) pairedNamesInput.value = '';
            
            return {
                leftTeam: teams[0],
                rightTeam: teams[1],
                source: 'paired'
            };
        } else {
            // Неверный формат - подсвечиваем парное поле
            showError(pairedNamesInput);
            throw new Error('Некорректный формат в спареной команде. Используйте "Команда1__Команда2"');
        }
    }

    // Используем отдельные поля
    if (leftTeam && rightTeam) {
                showCorrect(leftTeamInput)
        showCorrect(rightTeamInput)
        // Успешное получение - очищаем все поля
        if (leftTeamInput) leftTeamInput.value = '';
        if (rightTeamInput) rightTeamInput.value = '';
        if (pairedNamesInput) pairedNamesInput.value = '';

        return {
            leftTeam: leftTeam,
            rightTeam: rightTeam,
            source: 'separate'
        };
    }

    // Все поля пустые - подсвечиваем все поля
    if (!leftTeam && !rightTeam && !pairedNames) {
        showError(pairedNamesInput);
        showError(rightTeamInput);
        showError(leftTeamInput);
        throw new Error('Все поля ввода пустые');
    }
    if (leftTeam && !rightTeam) {
        showError(rightTeamInput);
        throw new Error('Правая команда не заполнена');
    }
    if (!leftTeam && rightTeam) {
        showError(leftTeamInput);
        throw new Error('Левая команда не заполнена');
    }

}

// Функция подсветки ошибки для одного поля
function showError(inputElement) {
    if (inputElement) {
        // Устанавливаем плавный переход
        inputElement.style.transition = 'all 0.2s ease';

        // Добавляем красную подсветку с плавным появлением
        setTimeout(() => {
            inputElement.style.borderColor = '#ff4444';
            inputElement.style.backgroundColor = '#fff5f5';
            inputElement.style.boxShadow = '0 0 0 2px rgba(255, 68, 68, 0.1)';
        }, 10);

        // Убираем подсветку через 1 секунду с плавным исчезновением
        setTimeout(() => {
            inputElement.style.borderColor = '';
            inputElement.style.backgroundColor = '';
            inputElement.style.boxShadow = '';
        }, 1000);
    }
}

// Функция подсветки успеха для одного поля
function showCorrect(inputElement) {
    if (inputElement) {
        // Устанавливаем плавный переход
        inputElement.style.transition = 'all 0.2s ease';
        
        // Добавляем зеленую подсветку с плавным появлением
        setTimeout(() => {
            inputElement.style.borderColor = '#4CAF50';
            inputElement.style.backgroundColor = '#f0fff0';
            inputElement.style.boxShadow = '0 0 0 2px rgba(76, 175, 80, 0.1)';
        }, 10);
        
        // Убираем подсветку через 1 секунду с плавным исчезновением
        setTimeout(() => {
            inputElement.style.borderColor = '';
            inputElement.style.backgroundColor = '';
            inputElement.style.boxShadow = '';
        }, 500);
    }
}