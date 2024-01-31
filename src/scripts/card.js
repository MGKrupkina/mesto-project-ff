// Export
export { createCard, deletePhoto, likeIcon }; 

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

function createCard(card, deletePhoto, likeIcon, mestoImage) {

  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const template = cardElement.querySelector('.card');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  deleteButton.addEventListener('click', () => deletePhoto(template));
  likeButton.addEventListener('click', () => likeIcon(likeButton));
  cardImage.addEventListener('click', () => mestoImage(card));

  return cardElement;
}

// @todo: Delete photo
function deletePhoto(template) {
  template.remove();
} 

// @todo: LikeIcon
function likeIcon(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active')
}



