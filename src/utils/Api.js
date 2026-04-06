class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  //Avoids using the code of ok checking so it isn't repeated in every request of the project. Uses the _checkResponse method that will check any response from the server if it’s ok or not.
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    Promise.reject(`Error: ${res.status}`);
  }

  // Creates another method, getUserInfo (different base url)
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getAppInfo() {
    //Calls getUserInfo in this array
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //Implements POST / cards
  addCardInfo({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      // Sends the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  editAvatarInfo({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      // Sends the data in the body as a JSON string.
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

// exports the class
export default Api;
