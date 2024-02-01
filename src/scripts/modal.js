export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', сlickPopup);
  document.addEventListener('keydown', keyDown);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('mousedown', сlickPopup);
  document.removeEventListener('keydown', keyDown);
}

function keyDown(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function сlickPopup(event) {
  if (
    event.currentTarget === event.target ||
    event.target.classList.contains("popup__close")
  )
  closeModal(event.currentTarget);
} //еще добавила закрытие крестиком