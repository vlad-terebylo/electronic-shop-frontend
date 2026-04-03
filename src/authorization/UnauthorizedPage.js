import {useNavigate} from "react-router-dom";
import {useLocale} from "../core/UseLocales";
import {useTranslation} from "react-i18next";


const UnauthorizedPage = () => {
    const navigate = useNavigate();
    const {prefix} = useLocale();
    const {t} = useTranslation();


    return (
        <div className="container" style={{textAlign: 'center', marginTop: '80px'}}>
            <h1>401 — Unauthorized</h1>
            <p>{t("you_must_be_logged_in_to_access_this_page")}</p>
            <button onClick={() => navigate(`${prefix}/`)}>{t("home")}</button>
        </div>
    );
};

export default UnauthorizedPage;