import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {Navigate} from "react-router-dom";

const AdminRoute = ({children}) => {
    const isAuthenticated = useIsAuthenticated();
    const {accounts} = useMsal();
    const account = accounts[0];

    console.log(accounts);
    console.log(isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/non-authorized" replace/>;
    }

    const roles = account.idTokenClaims?.roles ?? [];
    console.log(roles);

    if (!roles.includes("admin")) {
        return <Navigate to="/:lang/non-authorized" replace/>;
    }

    return children;
};

export default AdminRoute;