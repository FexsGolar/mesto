function hideInputError(formElement, inputElement) {
    // прячем ошибку
    inputElement.classList.remove(config.inputErrorActive);
    // находим отдельный span с текстом ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    //Убираем текст об ошибки из input внизу
    errorElement.classList.remove(config.inputErrorActive);
    inputElement.classList.remove(config.inputSelectorError);
    errorElement.textContent = '';
}

function showInputError(formElement, inputElement) {
    // показываем ошибку
    inputElement.classList.add(config.inputErrorActive);
    // находим отдельный span с текстом ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    // показываем состояние ошибки
    inputElement.classList.add(config.inputSelectorError);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(config.inputErrorActive);
}

function checkInputValidity(formElement, inputElement) {
    //проверяем валидный ли inputElement
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement);
    }
    //если валидный прячем ошибку, иначе показываем ошибку
}

// методом some проверяем каждый из input на валидность
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

function toggleButtonState(buttonElement, inputList) {
    //если форма валидная то включаем кнопку, иначе выключаем
    if (hasInvalidInput(inputList)) {
        //выключаем форму
        buttonElement.disabled = true;
        buttonElement.classList.add(config.buttonSelectorDisabled);
    } else {
        //включаем форму
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.buttonSelectorDisabled);
    }
}




function setEventListeners(formElement) {
    //найти все input в формах
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    // находим кнопку отправки формы
    const buttonElement = formElement.querySelector(config.buttonSelector);
    //добавить слушатель на каждый input
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            //проверить валидность input
            checkInputValidity(formElement, inputElement);
            toggleButtonState(buttonElement, inputList);
        })
    })

    // установка кнопки в начальное положение
    toggleButtonState(buttonElement, inputList);
}

function enableValidation(config) {
    //найти все формы
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    //поставить слушатели на каждую из форм
    formList.forEach(formElement => {
        setEventListeners(formElement);
    })
}

//конфиг для "универсальности" валидации
const config = {
    formSelector: '.form',
    inputSelector: '.form__item',
    inputSelectorError: 'form__item_error',
    inputErrorActive: 'form__item-error_active',
    buttonSelector: '.form__button',
    buttonSelectorDisabled: 'form__button_disabled',
}