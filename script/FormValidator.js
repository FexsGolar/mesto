class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;

        this._inputSelector = config.inputSelector; //'.form__item'
        this._inputSelectorError = config.inputSelectorError; //'form__item_error'
        this._inputSelectorErrorActive = config.inputErrorActive; //'form__item-error_active'
        this._buttonSelector = config.buttonSelector; // '.form__button'
        this._buttonSelectorDisabled = config.buttonSelectorDisabled; //'form__button_disabled'
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._buttonSelector);

        /*         this.popupAdd = document.querySelector('.popup_type_add');
                this.formAddButton = this.popupAdd.querySelector('.form__button_add');
                this.formAddInputs = this.popupAdd.querySelectorAll('.form__item'); */
    }

    _hideInputError(inputElement) {
        this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputSelectorError);
        this._errorElement.classList.remove(this._inputSelectorErrorActive);
        this._errorElement.textContent = "";
    };

    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputSelectorError);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._inputSelectorErrorActive);
    };

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    };

    toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._buttonSelectorDisabled);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._buttonSelectorDisabled);
        }
    };

    _SetEventListeners() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (evt) => {
                evt.preventDefault();
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
            this.toggleButtonState();
        });
    };

    enableValidation() {
        this._SetEventListeners();
    };
};