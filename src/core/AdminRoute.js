import {Navigate} from "react-router-dom";
import {useLocale} from "./UseLocales";

const AdminRoute = ({children}) => {
    const roles = JSON.parse(sessionStorage.getItem('app.user.roles') ?? '[]');
    const {prefix} = useLocale();

    if (!roles.includes("admin")) {
        return <Navigate to={`${prefix}/non-authorized`} replace/>;
    }

    return children;
};

export default AdminRoute;