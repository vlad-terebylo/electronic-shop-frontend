import {useIsAuthenticated} from "@azure/msal-react";
import {Navigate} from "react-router-dom";
import {useLocale} from "./UseLocales";

const ProtectedRoute = ({children}) => {
    const isAuthenticated = useIsAuthenticated();
    const {prefix} = useLocale();

    if (!isAuthenticated) {
        return <Navigate to={`${prefix}/non-authorized`} replace/>;
    }

    return children;
};

export default ProtectedRoute;