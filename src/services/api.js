import { API_AUTH, API_COLLECTION, API_TASK } from "../../config";

const registerRequest = (userData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("POST", `${API_AUTH}/register`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = () => {
      request.readyState == 4 && request.status == 201
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = (err) => reject(err);
    request.send(JSON.stringify(userData));
  });
};

const loginRequest = (userData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("POST", `${API_AUTH}/login`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = () => {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = (err) => reject(err);
    request.send(JSON.stringify(userData));
  });
};

const createCollectionRequest = (collectionData, jwtToken) => {
  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.open("POST", `${API_COLLECTION}/create`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 201
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = (err) => reject(err);
    request.send(JSON.stringify(collectionData));
  });
};

const getAllCollectionsRequest = (jwtToken) => {
  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.open("GET", `${API_COLLECTION}/get-all`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      if (request.readyState == 4 && request.status == 200) {
        resolve(JSON.parse(request.response));
      } else {
        reject(JSON.parse(request.response));
      }
    };
    request.onerror = (err) => reject(err);
    request.send();
  });
};

const createTaskRequest = (taskData, jwtToken) => {
  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.open("POST", `${API_TASK}/create`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 201
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = (err) => reject(err);
    request.send(JSON.stringify(taskData));
  });
};

export {
  registerRequest,
  loginRequest,
  createCollectionRequest,
  getAllCollectionsRequest,
  createTaskRequest,
};
