/* Работа 5 */


/* Форма на добавление */
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

/* Функции на обновление, не на генерацию */
/* const formAddHandler = evt => {
    evt.preventDefault();
    profileTitle.textContent = place.value;
    profileSubTitle.textContent = img.value;
    popupAddClose();
};

formElementAdd.addEventListener('submit', formAddHandler); */

/* Добавление карточек */

let initialCards = [{
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
    }
];


const cardItem = document.createElement('article');
const cardContainer = document.querySelector('.elements');
const formAddButton = document.querySelector('.form__button_add');

/* Функция на создание карточки */
function addCard(cardValue, titleValue) {
    const cardTemplate = document.querySelector('#card').content; /* Выбрали template для добавления */
    const CardElement = cardTemplate.querySelector('.card').cloneNode(true); /* В template выбрали родительский блок и клонировали его */


    cardElement.querySelector('.card__img').src = cardValue.link; /* Тут надо поставить замену атрибута src */
    cardElement.querySelector('.card__title').textContent = titleValue; /* Заголовок song title будет равен введенному в форму значению value */

    cardElement.querySelector('.card__button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__button_active');
    });
    /* При клике на себя сердечко становится активным
     */

    cardContainer.append(cardElement); /* Добавляем cardElement в конец cardContainer*/
}

/* По клику на создать выполняем функцию */
formAddButton.addEventListener('click', function() {
    const place = document.querySelector('.form__item_type_place');
    const img = document.querySelector('.form__item_type_img');

    addCard(place.value, img.value); /* Выполяем функцию addsong для value */

    place.value = ''; /* Скидываем текст, введенный в форму, тк он уже применился */
    img.value = ''; /* Скидываем текст, введенный в форму, тк он уже применился */
});

const formAddHandler = evt => {
    evt.preventDefault();
    addCard(place.value, img.value);

};

formElementAdd.addEventListener('submit', formAddHandler);


/* Функция на удаление карточки (надо переписать) */
/* resetButton.addEventListener('click', function() {
    const songs = document.querySelectorAll('.song')

    songs.forEach((item) => {
        item.remove();
    });

    renderNoSongs();
}); */

/* Добавление карточки */

const profileAddButton = document.querySelector('.profile__add-button');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content; /* Выбрали template для добавления */
const clone = cardTemplate.querySelector('.card').cloneNode(true);

function cloneCard() {

    cardContainer.prepend(clone);
}

profileAddButton.addEventListener('click', function() {
    cloneCard();
})



/* Код Паши */

function onCardLike(event) {
    // Тут ставите/снимаете лайк с иконки. Иконка находится в event.target, т.к. на ней и установлен слушатель.
}

function onCardImagePopup(event) {
    // Тут открываете попап с большой картинкой. Картинка находится в event.target, , т.к. на ней и установлен слушатель.
}
// Общая функция, которая создаёт DOM-элемент с карточкой и возращает его.
function createCard(cardData) {
    // Находим шаблон и клонируем его
    const element = document.querySelector('.card__template').cloneNode(true);
    // Находим элементы в **клонированном шаблоне**, с которыми будем работать.
    const titleElement = element.querySelector('.card__title');
    const imageElement = element.querySelector('.card__img');
    const likeIconElement = element.querySelector('.card__button');
    const removeIconElement = element.querySelector('.card__remove');
    // Устанавливаем заголовок и URL картинки из объекта параметров (аргумента функции)
    titleElement.textContent = cardData.title;
    imageElement.src = cardData.link;
    // Устанавливаем слушатели нажатий.
    likeIconElement.addEventListener('click', onCardLike);
    removeIconElement.addEventListener('click', onCardImagePopup);
    // Возвращаем готовый элемент DOM.
    // Обратите внимание, мы его никуда не вставили на страницу, в DOM его нет.
    // Он пока хранится в переменной в памяти и нигде больше.
    return element;
}
// Массив первоначальных карточек
const cards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, ];
// Элемент, куда будем вставлять карточки.
const cardsContainer = document.querySelector('.elements');
// Итерируемся по карточкам в цикле. Для каждой карточки создаем элемент DOM из шаблона и вставляем его в страницу.
cards.forEach((card) => {
    // Создали DOM элемент (его возвращает функция).
    const cardElement = createCard(card);
    // Вставили его на страницу.
    cardsContainer.append(cardElement);
});
// Форма добавления новой карточки.
// const formElement = document.querySelector('.form'); закрыл тк объявлена выше
// Инпуты с данными этой формы
const formInputName = formElement.querySelector('form__name');
const formInputImage = formElement.querySelector('form__image');
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
}
// Слушаем отправку формы
formElement.addEventListener('submit', onFormSubmit);