// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placeImg = document.querySelector('.places__list');

// @todo: Функция создания карточки

function photoCard(card, deleteButton) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {deleteButton(evt);
    });
  return cardElement;
}

// @todo: Вывести карточки на страницу

const photoContent = initialCards.map((card) => photoCard(card, deleteCard));
photoContent.forEach((card) => {
placeImg.append(card);
});

// @todo: Функция удаления карточки
 
function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}
