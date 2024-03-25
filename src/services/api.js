import {
  API_AUTH,
  API_COLLECTION,
  API_EXAM_COUNTER,
  API_STATISTICS,
  API_TASK,
} from "../../config";

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

const createCollectionRequest = (jwtToken, collectionData) => {
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

const createTaskRequest = (jwtToken, taskData) => {
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

const editTaskRequest = (jwtToken, requestData) => {
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

const updateCompletedTaskRequest = (jwtToken, requestData) => {
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

const deleteTaskRequest = (jwtToken, requestData) => {
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

const getCollectionTasksRequest = (jwtToken, requestData) => {
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

const getCollectionStatisticsRequest = (jwtToken, requestData) => {
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

const deleteCollectionRequest = (jwtToken, requestData) => {
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

const editCollectionRequest = (jwtToken, requestData) => {
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

const createExamCounterRequest = (jwtToken, examCounterData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("POST", `${API_EXAM_COUNTER}/create`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 201
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = (err) => reject(err);
    request.send(JSON.stringify(examCounterData));
  });
};

const getAllExamCountersRequest = (jwtToken) => {
  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.open("GET", `${API_EXAM_COUNTER}/get-all`);
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

const updateExamCounterAsExpiredRequest = (jwtToken, examCounterData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("PATCH", `${API_EXAM_COUNTER}/update-expired`);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
      request.onerror = (err) => reject(err);
    };
    request.send(JSON.stringify(examCounterData));
  });
};

const deleteExamCounterRequest = (jwtToken, examCounterData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("DELETE", `${API_EXAM_COUNTER}/delete`);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
      request.onerror = (err) => reject(err);
    };
    request.send(JSON.stringify(examCounterData));
  });
};

const getStatisticsRequest = (jwtToken, collectionData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("POST", `${API_STATISTICS}/get-collection-statistics`);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
      request.onerror = (err) => reject(err);
    };
    request.send(JSON.stringify(collectionData));
  });
};

const deleteAcccountRequest = (accessToken, userData) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("DELETE", `${API_AUTH}/delete`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    request.onload = () => {
      request.readyState == 4 && request.status == 200
        ? resolve(JSON.parse(request.response))
        : reject(JSON.parse(request.response));
    };
    request.onerror = (err) => reject(err);
    request.send(JSON.stringify(userData));
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
  createExamCounterRequest,
  getAllExamCountersRequest,
  updateExamCounterAsExpiredRequest,
  deleteExamCounterRequest,
  getStatisticsRequest,
  deleteAcccountRequest,
};
