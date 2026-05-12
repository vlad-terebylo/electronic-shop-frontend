import React from 'react';
import { useTranslation } from "react-i18next";

const ConfirmPopup = ({ message, onConfirm, onCancel }) => {
    const { t } = useTranslation();

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 2000
        }}>
            <div style={{
                background: 'white', padding: '30px', borderRadius: '10px',
                textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
                <p>{message}</p>
                <button
                    onClick={onConfirm}
                    style={{ marginRight: '10px', padding: '8px 20px', cursor: 'pointer' }}
                >
                    {t("yes")}
                </button>
                <button
                    onClick={onCancel}
                    style={{ padding: '8px 20px', cursor: 'pointer', border: '1px solid #ccc' }}
                >
                    {t("cancel")}
                </button>
            </div>
        </div>
    );
};

export default ConfirmPopup;