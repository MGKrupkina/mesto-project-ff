//Как сделать запрос к серверу:
// fetch("https://nomoreparties.co/v1/wff-cohort-7", {
//   headers: {
//     authorization: "b10cb82a-65c8-43c6-bcb7-f07aee30814e"
//   }
// })  
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
// }); 

//Загрузка информации о пользователе с сервера:
// fetch("https://nomoreparties.co/v1/wff-cohort-7/users/me", {
//   method: 'GET',
//   headers: {
//     authorization: "b10cb82a-65c8-43c6-bcb7-f07aee30814e"
//   }
// })  
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
// });

export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "b10cb82a-65c8-43c6-bcb7-f07aee30814e",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    
  }).then((res) => {
    return getResponse(res);
  });
};

export const uploadCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    return getResponse(res);
  });
};

export const updateProfileInfo = (profileName, profileInfo) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileInfo,
    }),
  }).then((res) => {
    return getResponse(res);
  });
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponse(res);
  });
};

export const setProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return getResponse(res);
  });
};

export const putLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return getResponse(res);
  });
};

export const putDislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponse(res);
  });
};

export const putAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then((res) => {
    return getResponse(res);
  });
};

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};
