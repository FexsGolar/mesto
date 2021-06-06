import { openPopupWindow } from "./index.js";

export default class Card {
    constructor(cardData, templateSelector) {
        this._templateSelector = document.querySelector(templateSelector).content;
        this._cardData = cardData;
    }

    _handleImageClick = () => {
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
        this._cardImg.addEventListener('click', this._handleImageClick);
    }

    _deleteCard = () => {
        this._cardElement.remove();
    };

    _createCard() {
        this._card = this._templateSelector.cloneNode(true);
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

    getCard() {
        this._createCard();
        return this._card;
    };
};