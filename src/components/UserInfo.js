export default class UserInfo {
    constructor({profileName, profileDescription, avatarPicture}) {
        this._nameElement = document.querySelector(profileName);
        this._jobElement = document.querySelector(profileDescription);
        this._avatarElement = document.querySelector(avatarPicture);
    }

    getUserInfo() {
        this._userData = {
        name: this._nameElement.textContent,
        about: this._jobElement.textContent,
        avatar: this._avatarElement.src
        };

        return this._userData;
    }
    
    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._jobElement.textContent = data.about;      
        this._avatarElement.src = data.avatar;
        this._id = data._id;
    }

    getUserId() {
        return this._id
      }
}