import {
  API_AUTH,
  API_COLLECTION,
  API_STATISTICS,
  API_TASK,
} from "../../config";

const jwtToken = localStorage.getItem("access_token");

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

const createCollectionRequest = (collectionData) => {
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

const getAllCollectionsRequest = () => {
  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.open("GET", `${API_COLLECTION}/get-all`);
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

const createTaskRequest = (taskData) => {
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

const editTaskRequest = (requestData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("PATCH", `${API_TASK}/edit-decription`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = (err) => reject(err);
    request.send(JSON.stringify(requestData));
  });
};

const updateCompletedTaskRequest = (requestData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("PATCH", `${API_TASK}/update-completed`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = (err) => reject(err);
    request.send(JSON.stringify(requestData));
  });
};

const deleteTaskRequest = (requestData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("DELETE", `${API_TASK}/delete`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = (err) => reject(err);
    request.send(JSON.stringify(requestData));
  });
};

const getCollectionTasksRequest = (requestData) => {
  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.open("POST", `${API_COLLECTION}/get-tasks`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);

    request.onload = function () {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = () => reject(request.statusText);
    request.send(JSON.stringify(requestData));
  });
};

const getCollectionStatisticsRequest = (requestData) => {
  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.open("POST", `${API_STATISTICS}/get-collection-statistics`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);

    request.onload = function () {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = () => reject(request.statusText);
    request.send(JSON.stringify(requestData));
  });
};

const deleteCollectionRequest = (requestData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("DELETE", `${API_COLLECTION}/delete`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = (err) => reject(err);
    request.send(JSON.stringify(requestData));
  });
};

const editCollectionRequest = (requestData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("PATCH", `${API_COLLECTION}/edit`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = (err) => reject(err);
    request.send(JSON.stringify(requestData));
  });
};

export {
  registerRequest,
  loginRequest,
  createCollectionRequest,
  getAllCollectionsRequest,
  createTaskRequest,
  getCollectionTasksRequest,
  getCollectionStatisticsRequest,
  deleteCollectionRequest,
  editCollectionRequest,
  editTaskRequest,
  updateCompletedTaskRequest,
  deleteTaskRequest,
};
