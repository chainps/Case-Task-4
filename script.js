// Базовые математические функции
const getSum = (a, b) => a + b;
const getDiff = (a, b) => a - b;
const getProd = (a, b) => a * b;
const getDiv = (a, b) => b === 0 ? "Деление на ноль" : a / b;

// Функция для вывода ответа с анимацией
function showResult(value, isError = false) {
    const resBox = document.getElementById('result-output');
    
    // Сбрасываем классы для повторной анимации
    resBox.className = 'result-box';
    void resBox.offsetWidth; 

    if (isError) {
        resBox.textContent = value;
        resBox.classList.add('result-error');
    } else {
        // Убираем лишние нули у дробей
        resBox.textContent = !Number.isInteger(value) ? parseFloat(value.toFixed(4)) : value;
        resBox.classList.add('fade-in-up');
    }
}

// Основная логика
function calculate(operation) {
    const v1 = document.getElementById('input1').value.trim();
    const v2 = document.getElementById('input2').value.trim();

    // Меняем запятые на точки на случай, если введут дробь с запятой
    const n1 = Number(v1.replace(',', '.'));
    const n2 = Number(v2.replace(',', '.'));

    if (v1 === "" || v2 === "" || isNaN(n1) || isNaN(n2)) {
        showResult("Ошибка: Введите числа", true);
        return;
    }

    let res;
    switch (operation) {
        case 'sum': res = getSum(n1, n2); break;
        case 'diff': res = getDiff(n1, n2); break;
        case 'prod': res = getProd(n1, n2); break;
        case 'div': res = getDiv(n1, n2); break;
    }

    // Если вернулась строка (деление на ноль) - это ошибка
    showResult(res, typeof res === 'string');
}

// Вешаем события на кнопки
document.getElementById('btn-sum').addEventListener('click', () => calculate('sum'));
document.getElementById('btn-diff').addEventListener('click', () => calculate('diff'));
document.getElementById('btn-prod').addEventListener('click', () => calculate('prod'));
document.getElementById('btn-div').addEventListener('click', () => calculate('div'));