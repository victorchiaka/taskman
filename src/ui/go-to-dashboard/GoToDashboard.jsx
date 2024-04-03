import { useNavigate } from "react-router-dom";

import "./styles.css";

const GoToDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div>
        <button onClick={() => navigate("/dashboard")} className="floating-button">
          Go to Dashboard
        </button>
      </div>
      <div className="ping"></div>
    </div>
  );
};

export default GoToDashboard;
