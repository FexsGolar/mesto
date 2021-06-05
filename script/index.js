import Card from './Card.js';
import {
    cards
} from './initial-cards.js';
import FormValidator from './FormValidator.js';

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
//конфиг для "универсальности" валидации
const config = {
    formSelector: '.form',
    inputSelector: '.form__item',
    inputSelectorError: 'form__item_error',
    inputErrorActive: 'form__item-error_active',
    buttonSelector: '.form__button',
    buttonSelectorDisabled: 'form__button_disabled',
}

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

export function openPopupWindow(popup) {
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