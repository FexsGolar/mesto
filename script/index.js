const edit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const close = document.querySelector('.popup__button');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.form');
const name = document.querySelector('#name');
const job = document.querySelector('#job');


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

// Спринт 5

// Форма на добавление
const popupAdd = document.querySelector('.popup_add');
const popupAddCloseBtn = document.querySelector('.popup__button_add');
const add = document.querySelector('.profile__add-button');
const place = document.querySelector('#place');
const img = document.querySelector('#img');
const formElementAdd = document.querySelector('.form__add-card')

/* Функция на открытие popup */
function popupAddOpen() {
    popupAdd.classList.add('popup_opened');
}

/* Функция на закрытие popup */
function popupAddClose() {
    popupAdd.classList.remove('popup_opened');
}

/* Открываю окно по клику на edit + value не заполняю, оно должно быть пустое */
add.addEventListener('click', () => {
    popupAddOpen();
});

/* При клике на крестик закрываю форму без изменений */
popupAddCloseBtn.addEventListener('click', popupAddClose);


// Рендеринг карточек из массива
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

const userTemplate = document.querySelector('.card__template').content;
const elements = document.querySelector('.elements');
const templateImage = userTemplate.querySelector('.card__img');
const templateTitle = userTemplate.querySelector('.card__title');


cards.forEach(function(render) {
    const userElement = userTemplate.querySelector('.card').cloneNode(true);
    userElement.querySelector('.card__img').src = render.link;
    userElement.querySelector('.card__title').textContent = render.name;
    userElement.querySelector('.card__img').alt = render.name;

    elements.append(userElement);

})

// Кнопка лайк

// Функция 1
const likeButton = document.querySelectorAll('.card__button');
likeButton.forEach(function(el) {
    el.addEventListener('click', function() {
        alert('Работает!');
    });
});

// Функция 2
// const likeButton = document.querySelector('.card__button');
// likeButton.addEventListener('click', () => likeButton.classList.toggle('card__button_active'));


// создание карточек
const cardTemplateContentCard = document.querySelector('.card__template').content.querySelector('.card');
const newCardImage = formElementAdd.querySelector('.form__item_type_img');
const newCardTitle = formElementAdd.querySelector('.form__item_type_place');


function addNewCard(evt) {
    evt.preventDefault()
    const inputTitle = newCardTitle.value
    const inputImage = newCardImage.value
    const cardTemplate = cardTemplateContentCard.cloneNode(true)
    const startCardTitle = cardTemplate.querySelector('.card__title')
    const startCardImage = cardTemplate.querySelector('.card__img')
    startCardTitle.textContent = inputTitle;
    startCardImage.src = inputImage;
    startCardImage.alt = inputTitle;

    elements.prepend(cardTemplate)

    popupAddClose();

    newCardTitle.value = '';
    newCardImage.value = '';


}

formElementAdd.addEventListener('submit', addNewCard);

// удаление карточек
const deleteCardBtn = document.querySelector('.card__delete-button');

function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

deleteCardBtn.addEventListener('click', deleteCard);