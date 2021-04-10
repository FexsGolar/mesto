let edit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let close = document.querySelector('.popup__button');
let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.form');
let name = document.querySelector('#name');
let job = document.querySelector('#job');


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