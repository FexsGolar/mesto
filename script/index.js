//Переменные
const edit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditCloseBtn = document.querySelector('.popup__button_edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const formElementEdit = document.querySelector('.form_type_edit-card');
const profileNameElement = document.querySelector('#name');
const profileJobElement = document.querySelector('#job');
// Форма на добавление
const popupAdd = document.querySelector('.popup_type_add');
const popupAddCloseBtn = document.querySelector('.popup__button_add');
const profileAddButton = document.querySelector('.profile__add-button');
const place = document.querySelector('#place');
const img = document.querySelector('#img');
const formElementAdd = document.querySelector('.form_type_add-card');
// Попап с картинкой
const popupImage = document.querySelector('.popup_type_image');
const popupImageCloseBtn = document.querySelector('.popup__button_close');
// выбираем родительский блок для всех карточек 
const cardsContainer = document.querySelector('.elements');
// Все input и кнопка из формы с добавлением карточки для функции toggleButtonState
const formAddInputs = popupAdd.querySelectorAll('.form__item');
const formAddButton = popupAdd.querySelector('.form__button_add');
// Инпуты с данными формы Add
const formInputName = formElementAdd.querySelector('.form__item_type_place');
const formInputImage = formElementAdd.querySelector('.form__item_type_img');
// Картинка full
const popupImgFull = document.querySelector('.popup__image');
const popupTitleFull = document.querySelector('.popup__title');

//Обработчики
/* Открываю окно по клику на edit + заполняю value */
edit.addEventListener('click', () => {
    openPopupWindow(popupEdit);
    profileNameElement.value = profileTitle.textContent;
    profileJobElement.value = profileSubTitle.textContent;

});
/* При клике на крестик закрываю форму без изменений */
popupEditCloseBtn.addEventListener('click', () => closePopupWindow(popupEdit));
/* Выполнянем функцию при нажатии на Сохранить */
formElementEdit.addEventListener('submit', handleProfileFormSubmit);
/* Открываю окно по клику на edit + value не заполняю, оно должно быть пустое */
profileAddButton.addEventListener('click', () => openPopupWindow(popupAdd));
/* При клике на крестик закрываю форму без изменений */
popupAddCloseBtn.addEventListener('click', () => closePopupWindow(popupAdd));
/* При клике на фон закрываем любой попап */
document.addEventListener("click", closePopupClick);
/* Закрываем popup c картинкой по клику на крест*/
popupImageCloseBtn.addEventListener('click', () => closePopupWindow(popupImage));
// Слушаем отправку формы на добавление карточки
formElementAdd.addEventListener('submit', onFormSubmit);

//Функции

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popUpOpened = document.querySelector('.popup_opened');
        closePopupWindow(popUpOpened);
    }
}

function openPopupWindow(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", closePopupEsc);
}

function closePopupWindow(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", closePopupEsc);
}


/* При сохранении формы меняются значения в html и вызывается функция на закрытие формы */
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileNameElement.value;
    profileSubTitle.textContent = profileJobElement.value;
    closePopupWindow(popupEdit);
}

/* Закрытие при клике на фон */
function closePopupClick(evt) {
    if (evt.target.classList.contains("popup")) {
        const popUpOpened = document.querySelector('.popup_opened');
        closePopupWindow(popUpOpened);
    }
}


/* class Card {
    constructor(cardData, template) {
        this._template = document.querySelector(template).content;
        this._cardData = cardData;
    }
    _imageClickHandler = () => {
        const popupImage = document.querySelector('.popup_type_image');
        const popupImgFull = popupImage.querySelector('.popup__image');
        const popupTitleFull = popupImage.querySelector('.popup__title');
        popupImgFull.src = this._cardImg.src;
        const popupText = this._cardTitle.textContent;
        popupTitleFull.textContent = popupText;
        popupImgFull.alt = popupText;
        openPopupWindow(popupImage);
    }

    _addEventListeners() {
        this._cardDeleteBtn.addEventListener('click', this._deleteCard);
        this._cardLikeBtn.addEventListener('click', () => this._cardLikeBtn.classList.toggle('card__button_active'));
        this._cardImg.addEventListener('click', this._imageClickHandler);
    }

    _deleteCard = () => {
        this._cardElement.remove();
    };

    _createCard = () => {
        this._card = this._template.cloneNode(true);
        this._cardImg = this._card.querySelector(".card__img");
        this._cardTitle = this._card.querySelector(".card__title");
        this._cardDeleteBtn = this._card.querySelector(".card__delete-button");
        this._cardLikeBtn = this._card.querySelector(".card__button");
        this._cardElement = this._cardDeleteBtn.closest(".card");

        this._cardTitle.textContent = this._cardData.name;
        this._cardImg.src = this._cardData.link;
        this._cardImg.alt = this._cardData.name;

        this._addEventListeners();

    }

    getCard = () => {
        this._createCard();
        return this._card;
    };
} */


//Добавление карточек из массива
cards.forEach((card) => {
    // Создали DOM элемент (его возвращает функция).
    const cardElement = new Card(card, ".card-template").getCard();
    // Вставили его на страницу.
    cardsContainer.append(cardElement);
});

// Функция-коллбэк события отправки формы.
function onFormSubmit(event) {
    // Предотвращаем перезагрузку страницы при реальной отправке формы.
    event.preventDefault();
    // Достаём значения из инпутов.
    const name = formInputName.value;
    const imageSrc = formInputImage.value;
    // Создаём объект для передачи в функцию создания элемента-карточки.
    // Она на входе ожидает объект, а у нас пока только 2 строки есть.
    const cardData = {
        name: name,
        link: imageSrc
    };
    // Получаем DOM-элемент из функции.
    const cardElement = new Card(cardData, ".card-template").getCard();
    // Вставляем его в DOM, но первым ребёнком`, а не в конце, как первоначальные карточки.
    cardsContainer.prepend(cardElement);

    //после этого закрываем popup
    closePopupWindow(popupAdd);

    // Обнуляем поля формы через метод reset (все поля, сколько бы их не было)
    formElementAdd.reset();

    // берем функцию из validate.js для обнуления кнопки при повторном создании карточки
    //toggleButtonState(formAddButton, Array.from(formAddInputs));
    ProfileAddIsValid.toggleButtonState();
}

// функция на валидацию форм, в качестве аргумента берет конфиг из validate.js
//enableValidation(config);

const ProfileEditIsValid = new FormValidator(config, popupEdit);
ProfileEditIsValid.enableValidation();

const ProfileAddIsValid = new FormValidator(config, popupAdd);
ProfileAddIsValid.enableValidation();