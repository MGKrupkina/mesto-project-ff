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

// Находим форму в DOM
// Воспользуйтесь методом querySelector()

const formEditProfile = document.forms['edit-profile'];

// Находим поля формы в DOM
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handleFormSubmit(event) {
  event.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Вставьте новые значения с помощью textContent

  profileTitle.textContent = nameValue;
  profileJob.textContent = jobValue;

  closeModal(editprofile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formEditProfile.addEventListener('submit', handleFormSubmit);

// Photo content 

const cardsContainer = document.querySelector('.places__list');
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, deletePhoto, likeIcon, mestoImage));
});
const PopupTypeImage = document.querySelector('.popup_type_image');
function mestoImage(card) {
  PopupTypeImage.querySelector('.popup__image').src = card.link;
  PopupTypeImage.querySelector('.popup__image').alt = card.name;
  PopupTypeImage.querySelector('.popup__caption').textContent = card.name;
  openModal(PopupTypeImage);
}

// Form for add new card

const formCard = document.forms['new-place'];
const urlInput = formCard.querySelector('.popup__input_type_url');
const placeInput = formCard.querySelector('.popup__input_type_card-name');
function handleCardFormSubmit(event) {
  event.preventDefault();

    const card = {
      name: placeInput.value,
      link: urlInput.value,
    }
    cardsContainer.prepend(createCard(card, deletePhoto, likeIcon, mestoImage));
    
    formCard.reset();

    closeModal(popupClick);
}
formCard.addEventListener('submit', handleCardFormSubmit);

// Edit profile 

const editprofile = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
  const jobInput = document.querySelector('.popup__input_type_description');
  const nameInput = document.querySelector('.popup__input_type_name');
  jobInput.value = document.querySelector('.profile__description').textContent;
  nameInput.value = document.querySelector('.profile__title').textContent;
  openModal(editprofile);
});

// Form fot plus button

const buttonAdd = document.querySelector('.profile__add-button');
const popupClick = document.querySelector('.popup_type_new-card');
buttonAdd.addEventListener('click', function () {
  openModal(popupClick);
});

