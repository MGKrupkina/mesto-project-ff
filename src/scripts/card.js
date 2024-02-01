// Export
export { createCard, deletePhoto, likeIcon }; 

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: Функция создания карточки

function createCard(card, deletePhoto, likeIcon, mestoImage) {

  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeIcon(likeButton));
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', () => mestoImage(card));
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', (event) => {deletePhoto(event);
  });
  return cardElement;
}

// @todo: Delete photo

function deletePhoto(event) {
  const parent = event.target.parentElement;
  parent.remove();
}

// @todo: LikeIcon

function likeIcon(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active')
}
