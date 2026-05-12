import React from 'react';
import { useLocale } from "./UseLocales";

const LanguageSwitcher = () => {
    const { changeLang, SUPPORTED_LOCALES } = useLocale();

    return (
        <div className="lang-switcher">
            {SUPPORTED_LOCALES.map((locale) => (
                <button
                    key={locale}
                    style={{ margin: '5px', cursor: 'pointer' }}
                    onClick={() => changeLang(locale)}
                >
                    {locale.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;