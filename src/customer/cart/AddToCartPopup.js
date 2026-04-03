import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

const AddToCartPopup = ({item, onClose, onAdd}) => {
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const [t] = useTranslation();

    const handleAdd = () => {
        if (quantity <= 0) {
            setError(t("quantity_must_me_more_than_one"));
            return;
        }
        if (quantity > item.quantity) {
            setError(` ${t("cannot_add_more_than")} ${item.quantity}`);
            return;
        }

        onAdd(item, quantity);
        onClose();
    };

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        }}>
            <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                minWidth: "300px",
                textAlign: "center"
            }}>
                <h3>{item.title}</h3>
                <p>{t("quantity")}: {item.quantity}</p>

                <input
                    type="number"
                    min="1"
                    max={item.quantity}
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value))}
                    style={{width: "60px", marginBottom: "10px"}}
                />
                {error && <p style={{color: "red"}}>{error}</p>}

                <div>
                    <button onClick={handleAdd} style={{marginRight: "10px"}}>
                        {t("add")}
                    </button>
                    <button onClick={onClose} style={{color: "red"}}>
                        {t("cancel")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToCartPopup;