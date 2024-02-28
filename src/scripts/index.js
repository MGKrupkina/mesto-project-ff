import "../pages/index.css";

import { createCard, handleLikeClick
} from "./card.js";

import { openModal,closeModal
} from "./modal.js";

import { enableValidation, clearValidation 
} from "./validation.js";

import { getInitialCards, uploadCard, updateProfileInfo, deleteCardFromServer, setProfileInfo, putAvatar
} from "./api.js";

// Включение валидации вызовом enableValidation
// Все настройки передаются при вызове

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);
//getInitialCards();

// Находим форму в DOM
// Воспользуйтесь методом querySelector()

//const formEditProfile = document.forms['edit-profile'];
//const formCard = document.forms['new-place'];

// Находим поля формы в DOM

const profileJob = document.querySelector(".profile__description");
const profileTitle = document.querySelector(".profile__title");
const buttonProfile = document.querySelector(".profile__edit-button");
const cardsContainer = document.querySelector(".places__list");
const buttonAdd = document.querySelector(".profile__add-button");

//КОНСТАНТЫ

// Константы для аватара

const userAvatar = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup__edit-avatar");
const popupFormAvatar = popupEditAvatar.querySelector(".popup__form");
const avatarFormInput = popupFormAvatar.querySelector(
  ".popup__avatar-url"
);

// Константы для попап Редактировать профиль

const userProfile = document.querySelector(".popup_type_edit");
const profileEditForm = userProfile.querySelector(".popup__form");
const editProfileName = userProfile.querySelector(
  ".popup__input_type_name"
);
const editProfileDescription = userProfile.querySelector(
  ".popup__input_type_description"
);

// Константы для попапа Новое место

const newCard = document.querySelector(".popup_type_new-card");
const newPlaceForm = newCard.querySelector(".popup__form");
const placeInput = newCard.querySelector(".popup__input_type_card-name");
const urlInput = newCard.querySelector(".popup__input_type_url");

// Константы для увеличения фотографии

const popupType = document.querySelector(".popup_type_image");
const popupTypeCard = popupType.querySelector(".popup__image");
const popupTypeCaption = popupType.querySelector(".popup__caption");

// Константы для попапа с вопросом по удалению карточки

const popupDeleteCard = document.querySelector(".popup__delete-card"); 
const formForDelete = document.forms["delete-card"];
const buttonForDelete = formForDelete.querySelector(".popup__button");

// Реализация функционала по лайку и удалению карточек
///функция для получения информации о пользователе и заполнение карточками с сервера

// id пользователя

let userId;

// Ожидание инфо о пользователе и контенте с сервера

Promise.all([setProfileInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData["_id"];
    profileTitle.textContent = userData.name;
    profileJob.textContent = userData.about;
    userAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    cards.reverse().forEach((card) => {
      renderCard(
        createCard(card, handleImageClick, handleLikeClick, openDeletePopup, userId)
      );
    });
  })
  .catch(console.error);

  //Кнопки сохранения

const renderLoading = (isLoading, formButton) => {
  if (isLoading) {
    formButton.textContent = "Сохранение...";
  } else {
    formButton.textContent = "Сохранить";
  }
};

// Фото контент

function handleImageClick(event) {
  popupTypeCard.src = event.target.src;
  popupTypeCard.alt = event.target.alt;
  popupTypeCaption.textContent = event.target.alt;
  openModal(popupType);
};

const renderCard = (cardElement) => {
  cardsContainer.prepend(cardElement);
};

// Обработчики отправки формы (вставьте новые значения с помощью textContent)
// Прикрепляем обработчики к кнопкам попапов
// они будут следить за событием “submit” - «отправка» для трех попапов

// РЕДАКТИРОВАТЬ ПРОФИЛЬ //

// Обработчик «отправки» формы

function handleAddForm(event) {
  event.preventDefault();
  renderLoading(
    true,
    event.submitter 
  );
  updateProfileInfo(editProfileName.value, editProfileDescription.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileJob.textContent = data.about;
      closeModal(userProfile);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(
        false,
        event.submitter
      );
    });

};

// Обработчик к кнопке попапа

buttonProfile.addEventListener("click", () => {
  openModal(userProfile);
  editProfileName.value = profileTitle.textContent;
  editProfileDescription.value = profileJob.textContent;
  clearValidation(profileEditForm, validationConfig);
});

// “submit” - «отправка» для попапа

profileEditForm.addEventListener("submit", handleAddForm);

// НОВОЕ МЕСТО //

// Обработчик «отправки» формы

function submitButtonAdd (event) {
  event.preventDefault();
  renderLoading(
    true,
    event.submitter
  );
  const newPlaceElement = {
    name: placeInput.value,
    link: urlInput.value,
  };
  uploadCard(newPlaceElement.name, newPlaceElement.link)
    .then((data) => {
      renderCard(
        createCard( data, handleImageClick, handleLikeClick, openDeletePopup, userId)
      );
      closeModal(newCard);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading( false,event.submitter
      );
    });
    event.target.reset();
};

// Обработчик к кнопке попапа

buttonAdd.addEventListener("click", () => {
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
  openModal(newCard);
});

// “submit” - «отправка» для попапа

newPlaceForm.addEventListener("submit", submitButtonAdd);

// АВАТАР //

function submitChangeAvatar (event) {
  event.preventDefault();
  renderLoading(
    true,
    event.submitter
  );
  putAvatar(avatarFormInput.value)
    .then((data) => {
      userAvatar.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(popupEditAvatar);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(
        false,
        event.submitter
      );
    });
};

// Обработчик к кнопке попапа

userAvatar.addEventListener("click", () => {
  popupFormAvatar.reset();
  clearValidation(popupFormAvatar, validationConfig);
  openModal(popupEditAvatar);
});

// “submit” - «отправка» для попапа

popupFormAvatar.addEventListener("submit", submitChangeAvatar);

// ЗАПРОС НА УДАЛЕНИЕ КАРТОЧКИ //
// функция удаления карточки по кнопке из попапа удаления buttonForDelete

function openDeletePopup(cardId) {
buttonForDelete.dataset.cardId = cardId;
 openModal(popupDeleteCard);
 };
 
 function deletePhotoCard (event) {
  event.preventDefault();
   const cardId = buttonForDelete.dataset.cardId;
   deleteCardFromServer(cardId)
   .then(() => {
     const deleteTarget = document.querySelector(`[id='${cardId}']`);
     deleteTarget.remove();
     //buttonForDelete.dataset.cardId = "";
     closeModal(popupDeleteCard);
 })
  .catch(console.error);
 };

formForDelete.addEventListener("submit", deletePhotoCard);
buttonForDelete.addEventListener("click", popupDeleteCard);
