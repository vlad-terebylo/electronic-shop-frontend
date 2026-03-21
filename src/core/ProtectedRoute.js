import {useIsAuthenticated} from "@azure/msal-react";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const isAuthenticated = useIsAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/non-authorized" replace/>;
    }

    return children;
};

export default ProtectedRoute;