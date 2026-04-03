import {useMsal, useIsAuthenticated} from "@azure/msal-react";
import {apiRequest} from "../authConfig";
import {useNavigate} from "react-router-dom";
import {useLocale} from "./UseLocales";

const AuthButton = () => {
    const {instance} = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const {prefix} = useLocale();

    const handleLogin = async () => {
        try {
            const result = await instance.loginPopup(apiRequest);
            const payload = JSON.parse(atob(result.accessToken.split('.')[1]));
            const roles = payload.roles ?? [];
            sessionStorage.setItem('app.user.roles', JSON.stringify(roles));
            navigate(roles.includes("admin") ? `${prefix}/admin` : `${prefix}/`);
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    const handleLogout = async () => {
        try {
            await instance.logoutPopup();
        } finally {
            sessionStorage.removeItem('app.user.roles');
            navigate(`${prefix}/`);
        }
    };

    if (!isAuthenticated) {
        return <button onClick={handleLogin}>Login</button>;
    }

    return <button onClick={handleLogout}>Logout</button>;
};

export default AuthButton;