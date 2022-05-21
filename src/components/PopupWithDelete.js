import Popup from './Popup.js';
export default class PopupWithDelete extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button');
  }

  toggleButtonText(text) {
    this._submitButton.textContent = text;
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._formHandleSubmit);
  }

  _formHandleSubmit = (evt) => {
    evt.preventDefault();
    this._handleSubmit();
  }

  close() {
    super.close();
    this._popupForm.removeEventListener('submit', this._formHandleSubmit);
  }
}