const API_BASE = import.meta.env.VITE_API_BASE;
const API_AUTH = `${API_BASE}/auth`;
const API_COLLECTION = `${API_BASE}/collection`;
const API_TASK = `${API_BASE}/task`;
const API_EXAM_COUNTER = `${API_BASE}/exam-counter`;
const API_STATISTICS = `${API_BASE}/statistics`;

export { API_AUTH, API_COLLECTION, API_TASK, API_EXAM_COUNTER, API_STATISTICS };

export default API_BASE;
