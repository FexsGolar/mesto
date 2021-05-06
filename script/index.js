//Переменные
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
const profileAddButton = document.querySelector('.profile__add-button');
const place = document.querySelector('#place');
const img = document.querySelector('#img');
const formElementAdd = document.querySelector('.form_type_add-card');
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

//Обработчики
/* Открываю окно по клику на edit + заполняю value */
edit.addEventListener('click', () => {
    togglePopupWindow(popup);
    name.value = profileTitle.textContent;
    job.value = profileSubTitle.textContent;

});
/* При клике на крестик закрываю форму без изменений */
close.addEventListener('click', () => togglePopupWindow(popup));
/* Выполнянем функцию при нажатии на Сохранить */
formElement.addEventListener('submit', formSubmitHandler);
/* Открываю окно по клику на edit + value не заполняю, оно должно быть пустое */
profileAddButton.addEventListener('click', () => togglePopupWindow(popupAdd));
/* При клике на крестик закрываю форму без изменений */
popupAddCloseBtn.addEventListener('click', () => togglePopupWindow(popupAdd));
/* При клике на фон закрываем любой попап */
document.addEventListener("click", closePopupClick);
/* Закрываем popup c картинкой по клику на крест*/
popupImageCloseBtn.addEventListener('click', () => togglePopupWindow(popupImage));
// Слушаем отправку формы на добавление карточки
formElementAdd.addEventListener('submit', onFormSubmit);

//Функции

//Универсальная функция на открытие всех PopUp
function togglePopupWindow(popup) {
    popup.classList.toggle('popup_opened')
}

/* При сохранении формы меняются значения в html и вызывается функция на закрытие формы */
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = name.value;
    profileSubTitle.textContent = job.value;
    togglePopupWindow(popup);
}

/* Закрытие при клике на фон */
function closePopupClick(evt) {
    if (evt.target.classList.contains("popup")) {
        const popUpOpened = document.querySelector('.popup_opened');
        togglePopupWindow(popUpOpened);
    }
}


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
    imageElement.alt = cardData.name;
    // Открытие попса с картинкой
    function imageClickHandler() {
        popupImgFull.src = cardData.link;
        popupImgFull.alt = cardData.name;
        popupTitleFull.textContent = cardData.name;
        togglePopupWindow(popupImage);
    }
    // Удаление, лайк, увеличение
    removeIconElement.addEventListener('click', deleteCard);
    likeIconElement.addEventListener('click', () => likeIconElement.classList.toggle('card__button_active'));
    imageElement.addEventListener('click', imageClickHandler);
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
    togglePopupWindow(popupAdd);

    // Обнуляем поля формы через метод reset (все поля, сколько бы их не было)
    formElementAdd.reset();
}