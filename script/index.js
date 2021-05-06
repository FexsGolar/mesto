const edit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const close = document.querySelector('.popup__button');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.form');
const name = document.querySelector('#name');
const job = document.querySelector('#job');
// Форма на добавление
const popupAdd = document.querySelector('.popup_type_add');
const popupAddCloseBtn = document.querySelector('.popup__button_add');
const add = document.querySelector('.profile__add-button');
const place = document.querySelector('#place');
const img = document.querySelector('#img');
const formElementAdd = document.querySelector('.form__add-card');
// Попап с картинкой
const popupImage = document.querySelector('.popup_type_image');
const popupImageCloseBtn = document.querySelector('.popup__button_close');
// выбираем родительский блок для всех карточек 
const cardsContainer = document.querySelector('.elements');
// Инпуты с данными формы
const formInputName = formElementAdd.querySelector('.form__item_type_place');
const formInputImage = formElementAdd.querySelector('.form__item_type_img');
// Картинка full
const popupImgFull = document.querySelector('.popup__image');
const popupTitleFull = document.querySelector('.popup__title');
// Массив карточек для начальной генерации
const cards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
];



/* Функция на открытие popup */
function popupOpen() {
    popup.classList.add('popup_opened');
}

/* Функция на закрытие popup */
function popupClose() {
    popup.classList.remove('popup_opened');
}

/* Открываю окно по клику на edit + заполняю value */
edit.addEventListener('click', () => {
    popupOpen();
    name.value = profileTitle.textContent;
    job.value = profileSubTitle.textContent;

});

/* При клике на крестик закрываю форму без изменений */
close.addEventListener('click', popupClose);

/* При сохранении формы меняются значения в html и вызывается функция на закрытие формы */
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = name.value;
    profileSubTitle.textContent = job.value;
    popupClose();
}


/* Выполнянем функцию при нажатии на Сохранить */
formElement.addEventListener('submit', formSubmitHandler);

/* Функция на открытие popup c добавлением карточки*/
function popupAddOpen() {
    popupAdd.classList.add('popup_opened');
}

/* Функция на закрытие popup c добавлением карточки*/
function popupAddClose() {
    popupAdd.classList.remove('popup_opened');
}

/* Открываю окно по клику на edit + value не заполняю, оно должно быть пустое */
add.addEventListener('click', () => {
    popupAddOpen();
});

/* При клике на крестик закрываю форму без изменений */
popupAddCloseBtn.addEventListener('click', popupAddClose);

/* Функция на закрытие popup c картинкой */
function popupImageClose() {
    popupImage.classList.remove('popup_opened');
}

/* Закрытие при клике на фон */
/* Для всех 3 функций, тк они не могут быть открыты одновременно */
function closePopupClick(evt) {
    if (evt.target.classList.contains("popup")) {
        popupClose();
        popupImageClose();
        popupAddClose();
    }
}

/* При клике на фон закрываем любой попап */
document.addEventListener("click", closePopupClick);

/* Закрываем popup c картинкой по клику на крест*/
popupImageCloseBtn.addEventListener('click', popupImageClose);

// Функция на открытие popup
function popupImageZoom() {
    popupImage.classList.add('popup_opened');
}


/* Общая функция на popup c картинкой */
/* function openPreviewPopup(name, link) {
    popupImgFull.src = link;
    popupImgFull.alt = name;
    popupImgFull.textContent = name;
    popupImageZoom();
} */

// Функция на удаление карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

// Функция генерации карточки
function createCard(cardData) {
    // Находим template и клонируем его содержимое, длальше действия идут с ним
    const element = document.querySelector('.card__template').content.cloneNode(true);
    // Находим элементы в **клонированном шаблоне**, с которыми будем работать.
    const titleElement = element.querySelector('.card__title');
    const imageElement = element.querySelector('.card__img');
    const likeIconElement = element.querySelector('.card__button');
    const removeIconElement = element.querySelector('.card__delete-button');
    // Устанавливаем заголовок и URL картинки из объекта параметров (аргумента функции)
    titleElement.textContent = cardData.name;
    imageElement.src = cardData.link;
    // Открытие попса с картинкой
    function ImageClickHandler() {
        popupImgFull.src = cardData.link;
        popupTitleFull.textContent = cardData.name;
        popupImageZoom();
    }
    // Удаление, лайк, увеличение
    removeIconElement.addEventListener('click', deleteCard);
    likeIconElement.addEventListener('click', () => likeIconElement.classList.toggle('card__button_active'));
    imageElement.addEventListener('click', ImageClickHandler);
    // Возвращаем готовый элемент DOM.
    // Обратите внимание, мы его никуда не вставили на страницу, в DOM его нет.
    // Он пока хранится в переменной в памяти и нигде больше.
    return element;
}

cards.forEach((card) => {
    // Создали DOM элемент (его возвращает функция).
    const cardElement = createCard(card);
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
    const cardElement = createCard(cardData);
    // Вставляем его в DOM, но первым ребёнком, а не в конце, как первоначальные карточки.
    cardsContainer.prepend(cardElement);

    //после этого закрываем popup
    popupAddClose();

    // Обнуляем поля формы
    formInputName.value = '';
    formInputImage.value = '';
}
// Слушаем отправку формы
formElementAdd.addEventListener('submit', onFormSubmit);