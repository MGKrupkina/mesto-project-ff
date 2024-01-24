import './styles/index.css';




// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(card, deleteButton) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {deleteButton(evt);
    });
  return cardElement;
}

// @todo: Вывести карточки на страницу

const photoContent = initialCards.map((card) => createCard(card, deleteCard));

photoContent.forEach((card) => {
    cardsContainer.append(card);
});

// @todo: Функция удаления карточки
 
function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

