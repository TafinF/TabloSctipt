window.addEventListener('load', function () {
    const timeInput = document.getElementById('duration_input'); // замените на ваш элемент

    let previousValue = '';

    timeInput.addEventListener('input', function (e) {
        let value = e.target.value;

        // Сохраняем позицию курсора
        let cursorPosition = e.target.selectionStart;

        // Удаляем все нецифры кроме двоеточия
        let cleanValue = value.replace(/[^\d:]/g, '');

        // Удаляем лишние двоеточия (оставляем только первое)
        const parts = cleanValue.split(':');
        if (parts.length > 2) {
            cleanValue = parts[0] + ':' + parts.slice(1).join('');
        }

        // Форматируем значение
        let formattedValue = '';
        let digitsOnly = cleanValue.replace(/\D/g, '');

        if (digitsOnly.length > 0) {
            formattedValue = digitsOnly.substring(0, 2); // минуты
        }

        if (digitsOnly.length > 2) {
            let seconds = digitsOnly.substring(2, 4);
            formattedValue += ':' + seconds;
        }

        // Обновляем значение
        e.target.value = formattedValue;
        previousValue = formattedValue;

        // Восстанавливаем позицию курсора с корректировкой
        let newCursorPosition = cursorPosition;

        // Если удалили символ, корректируем позицию
        if (formattedValue.length < value.length) {
            newCursorPosition = Math.max(0, cursorPosition - (value.length - formattedValue.length));
        }
        // Если добавили двоеточие, сдвигаем курсор вперед
        else if (formattedValue.length > value.length && formattedValue.includes(':') && !value.includes(':')) {
            newCursorPosition = cursorPosition + 1;
        }

        e.target.setSelectionRange(newCursorPosition, newCursorPosition);
    });

    // Валидация при потере фокуса
    timeInput.addEventListener('blur', function (e) {
        let value = e.target.value;

        if (value.includes(':')) {
            let [minutes, seconds] = value.split(':');

            // Дополняем минуты нулями слева и проверяем максимальное значение
            if (minutes) {
                minutes = minutes.padStart(2, '0');
                if (parseInt(minutes) > 59) {
                    minutes = '59';
                }
            }

            // Дополняем секунды нулями слева и проверяем максимальное значение
            if (seconds) {
                seconds = seconds.padStart(2, '0');
                if (parseInt(seconds) > 59) {
                    seconds = '59';
                }
            }

            // Собираем обратно
            value = (minutes || '00') + ':' + (seconds || '00');
        } else if (value.length > 0) {
            // Если введены только цифры (минуты)
            let minutes = value.padStart(2, '0');
            if (parseInt(minutes) > 59) {
                minutes = '59';
            }
            value = minutes + ':00';
        } else {
            // Если поле пустое
            value = '00:00';
        }

        e.target.value = value;
    });

    // Опционально: разрешаем удаление и навигацию
    timeInput.addEventListener('keydown', function (e) {
        // Разрешаем стандартное поведение для служебных клавиш
        if ([8, 9, 13, 37, 38, 39, 40, 46].includes(e.keyCode)) {
            return;
        }
    });
});