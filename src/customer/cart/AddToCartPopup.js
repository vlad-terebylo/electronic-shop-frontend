import React, { useState } from 'react';

const AddToCartPopup = ({ item, onClose, onAdd }) => {
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

    const handleAdd = () => {
        if (quantity <= 0) {
            setError("Quantity must be at least 1");
            return;
        }
        if (quantity > item.quantity) {
            setError(`Cannot add more than ${item.quantity} items`);
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
                <p>Quantity in storage: {item.quantity}</p>

                <input
                    type="number"
                    min="1"
                    max={item.quantity}
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value))}
                    style={{ width: "60px", marginBottom: "10px" }}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div>
                    <button onClick={handleAdd} style={{ marginRight: "10px" }}>
                        Add to Cart
                    </button>
                    <button onClick={onClose} style={{ color: "red" }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToCartPopup;