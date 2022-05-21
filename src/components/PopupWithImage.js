import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = this._popup.querySelector('.popup__img');
    this._popupDescription = this._popup.querySelector('.popup__photo-text');
  }

  open(name, link) {
    this._popupDescription.textContent = name;
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    super.open();
  }
}