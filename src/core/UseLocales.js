import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SUPPORTED_LOCALES = ["en", "cz"];

export const useLocale = () => {
    const { i18n } = useTranslation();
    const { lang } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!lang || !SUPPORTED_LOCALES.includes(lang)) {
            // редирект на дефолтный язык (например, английский)
            const path = location.pathname.split("/").slice(2).join("/");
            navigate(`/en/${path}`, { replace: true });
            return;
        }

        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n, navigate, location]);

    const changeLang = (newLang) => {
        if (!SUPPORTED_LOCALES.includes(newLang)) return; // защитный фильтр
        const path = location.pathname.split("/").slice(2).join("/");
        navigate(`/${newLang}/${path}`);
    };

    return { lang: i18n.language, changeLang, SUPPORTED_LOCALES };
};