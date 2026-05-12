import React from 'react';
import { useTranslation } from "react-i18next";

const SuccessModal = ({ isOpen, message, onClose }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white', padding: '30px', borderRadius: '15px',
                textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                maxWidth: '400px', width: '90%'
            }}>
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>🎉</div>
                <h2 style={{ color: '#2ecc71' }}>{message || t("purchase_successful")}</h2>
                <button
                    onClick={onClose}
                    style={{
                        backgroundColor: '#2ecc71', color: 'white', border: 'none',
                        padding: '10px 20px', borderRadius: '5px', cursor: 'pointer',
                        fontSize: '16px', marginTop: '10px'
                    }}
                >
                    {t("home")}
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;