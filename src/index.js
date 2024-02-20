import "./styles/index.css";
import { 
  initialCards
 } from "./scripts/cards.js";
import { 
  createCard, 
  deletePhoto, 
  likeIcon 
} from './scripts/card.js'
import {
  openModal,
  closeModal,
} from "./scripts/modal.js";

import { enableValidation, clearValidation } from './scripts/validation.js';
//import { getCardsFromServer, getProfileInfoFromServer, updateProfileInfoOnServer,
 // addCardToServer, updatAvatarOnServer } from './scripts/api.js';

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

// Находим форму в DOM
// Воспользуйтесь методом querySelector()

const formEditProfile = document.forms['edit-profile'];
const formCard = document.forms['new-place'];


// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const urlInput = formCard.querySelector('.popup__input_type_url');
const placeInput = formCard.querySelector('.popup__input_type_card-name');
const userProfile = document.querySelector('.popup_type_edit');
const buttonProfile = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const newCard = document.querySelector('.popup_type_new-card');
const cardsContainer = document.querySelector('.places__list');
const popupType = document.querySelector('.popup_type_image');
const profileEditForm = document.querySelector('.popup__form');


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handleFormSubmit(event) {
  event.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Вставьте новые значения с помощью textContent

  profileTitle.textContent = nameValue;
  profileJob.textContent = jobValue;

  closeModal(userProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formEditProfile.addEventListener('submit', handleFormSubmit);


// Photo content 

initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, deletePhoto, likeIcon, mestoImage));
});
function mestoImage(card) {
  popupType.querySelector('.popup__image').src = card.link;
  popupType.querySelector('.popup__image').alt = card.name;
  popupType.querySelector('.popup__caption').textContent = card.name;
  openModal(popupType);
}

// Form for add new card

function handleCardFormSubmit(event) {
  event.preventDefault();

    const card = {
      name: placeInput.value,
      link: urlInput.value,
    }
    cardsContainer.prepend(createCard(card, deletePhoto, likeIcon, mestoImage));
    formCard.reset();
    closeModal(newCard);
}

formCard.addEventListener('submit', handleCardFormSubmit);

// Edit profile 

buttonProfile.addEventListener('click', function () {
  jobInput.value = document.querySelector('.profile__description').textContent;
  nameInput.value = document.querySelector('.profile__title').textContent;
  clearValidation(profileEditForm, validationConfig);
  openModal(userProfile);
});


// Form for plus button

buttonAdd.addEventListener('click', function () {
  clearValidation(formCard, validationConfig);
  openModal(newCard);
});


//Form edit avatar

