let edit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let close = document.querySelector('.popup__button');
let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.forma');
let name = document.querySelector('#name');
let job = document.querySelector('#job');



edit.onclick = function popupOpen() {
    popup.classList.add('popup_opened');
}

close.onclick = function popupClose() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = name.value;
    profileSubTitle.textContent = job.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);