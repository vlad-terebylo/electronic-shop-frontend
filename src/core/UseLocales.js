import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = ["en", "cz"];

const getLocalePrefix = (locale) => {
    return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
};

export const useLocale = () => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const segments = location.pathname.split("/");
        const maybeLang = segments[1];

        if (SUPPORTED_LOCALES.includes(maybeLang)) {
            if (i18n.language !== maybeLang) {
                i18n.changeLanguage(maybeLang);
            }
            return;
        }

        if (i18n.language !== DEFAULT_LOCALE) {
            i18n.changeLanguage(DEFAULT_LOCALE);
        }

    }, [location.pathname, i18n]);

    const changeLang = (newLang) => {
        if (!SUPPORTED_LOCALES.includes(newLang)) return;

        const segments = location.pathname.split("/");
        let pathWithoutLang = location.pathname;

        if (SUPPORTED_LOCALES.includes(segments[1])) {
            pathWithoutLang = "/" + segments.slice(2).join("/");
        }

        const prefix = getLocalePrefix(newLang);

        navigate(`${prefix}${pathWithoutLang}`);
    };

    const currentLang = i18n.language || DEFAULT_LOCALE;
    const prefix = getLocalePrefix(currentLang);

    return {
        lang: currentLang,
        changeLang,
        SUPPORTED_LOCALES,
        prefix
    };
};