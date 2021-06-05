/* function hideInputError(formElement, inputElement) {
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
} */

class FormValidator {
    constructor(conf, form) {
        this._conf = conf;
        this._form = form;

        this._inputSelector = conf.inputSelector;
        this._submitButtonSelector = conf.submitButtonSelector;
        this._inputErrorClass = conf.inputErrorClass;
        this._errorClass = conf.errorClass;
        this._inactiveButtonClass = conf.inactiveButtonClass;

        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    }

    _hideInputError = (inputElement) => {
        this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = "";
    };

    _showInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    };

    _checkInputValidity = (inputElement) => {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    };

    _hazInvalidInput = () => {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    };

    _toggleButtonState = (buttonElement) => {
        if (this._hazInvalidInput(this._inputList)) {
            //   this._buttonElement.disabled = true;
            //this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            //            this._buttonElement.disabled = false;
            //this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    _setEventListeners = () => {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (evt) => {
                evt.preventDefault();
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
            this._toggleButtonState();
        });
    };

    enableValidation = () => {
        this._setEventListeners();
    };

    checkFormValidity = () => {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
            this._toggleButtonState();
        });
    };
}