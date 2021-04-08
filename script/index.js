let edit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let close = document.querySelector('.popup__button');
let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.edit-profile');
let name = document.querySelector('#name');
let job = document.querySelector('#job');
let formButton = document.querySelector('.form__button');
let formValueName = document.querySelector('.form__item_name');
let formValueJob = document.querySelector('.form__item_job');
let popupOpened = document.querySelector('.popup_opened')

edit.addEventListener('click', () => {
    formValueName.value = profileTitle.textContent;
    formValueJob.value = profileSubTitle.textContent;
});

edit.onclick = function popupOpen() {
    popup.classList.add('popup_opened');
}

/* close.onclick = function popupClose() {
    popup.classList.remove('popup_opened');
} */

function popupClose() {
    popup.classList.remove('popup_opened');
}

close.addEventListener('click', popupClose);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = name.value;
    profileSubTitle.textContent = job.value;
    popupClose();
}



formElement.addEventListener('submit', formSubmitHandler);