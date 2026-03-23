import {useNavigate} from "react-router-dom";

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{textAlign: 'center', marginTop: '80px'}}>
            <h1>401 — Unauthorized</h1>
            <p>You must be logged in to access this page.</p>
            <button onClick={() => navigate("/:lang/")}>Go to Home</button>
        </div>
    );
};

export default UnauthorizedPage;