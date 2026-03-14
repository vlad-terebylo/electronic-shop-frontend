import {useMsal, useIsAuthenticated} from "@azure/msal-react";
import {loginRequest} from "../authConfig";
import {useNavigate} from "react-router-dom";

const AuthButton = () => {

    const {instance} = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    const handleLogin = () => {
        instance.loginPopup(loginRequest);

        navigate("/admin");
    };

    const handleLogout = () => {
        instance.logoutPopup();

        navigate("/");
    };

    if (!isAuthenticated) {
        return <button onClick={handleLogin}>Login</button>;
    }

    return <button onClick={handleLogout}>Logout</button>;
};

export default AuthButton;