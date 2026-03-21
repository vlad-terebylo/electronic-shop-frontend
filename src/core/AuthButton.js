import {useMsal, useIsAuthenticated} from "@azure/msal-react";
import {apiRequest} from "../authConfig";
import {useNavigate} from "react-router-dom";

const AuthButton = () => {
    const {instance} = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await instance.loginPopup(apiRequest);
            const roles = result?.idTokenClaims?.roles || [];
            navigate(roles.includes("admin") ? "/admin" : "/");
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    const handleLogout = async () => {
        try {
            await instance.logoutPopup();
        } finally {
            navigate("/");
        }
    };

    if (!isAuthenticated) {
        return <button onClick={handleLogin}>Login</button>;
    }

    return <button onClick={handleLogout}>Logout</button>;
};

export default AuthButton;