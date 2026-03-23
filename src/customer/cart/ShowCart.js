import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getCart, removeFromCart, clearCart, updateCartItemQuantity} from "./CartService";
import {useTranslation} from "react-i18next";

const ShowCart = () => {
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const {t, i18n} = useTranslation();


    useEffect(() => {
        setCartItems(getCart());
    }, []);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        setTotalPrice(total);
    }, [cartItems]);

    const removeItemHandler = (id) => {
        removeFromCart(id);
        setCartItems(getCart());
    };

    const clearCartHandler = () => {
        clearCart();
        setCartItems([]);
    };

    const handleQuantityChange = (id, newQty) => {
        const cart = getCart();
        const item = cart.find(i => i.id === id);

        if (!item) return;

        if (!newQty || newQty < 1) {
            item.quantity = 1;
        } else if (newQty > item.stock) {
            alert(`Cannot exceed available stock (${item.stock})`);
            return;
        } else {
            item.quantity = newQty;
        }

        updateCartItemQuantity(id, newQty);
        setCartItems(getCart());
    };

    const handlePurchase = () => {
        navigate('/:lang/items/cart/purchase');
    };

    return (
        <div className="container">
            <h1>{t("cart")}</h1>
            {cartItems.map(item => (
                <div key={item.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <h3>{item.title}</h3>
                    <p>{t("price_for_one_item")}: {item.price}</p>
                    <p>{t("price")}: {item.price * item.quantity}</p>
                    <div style={{display: "flex", alignItems: "center", marginBottom: "5px"}}>
                        <label>{t("quantity")}: </label>
                        <input
                            value={item.quantity}
                            min={1}
                            max={item.stock}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            style={{width: "60px", marginLeft: "5px"}}
                        />
                        <span style={{marginLeft: "10px", color: "gray"}}>
                            / {item.stock} available
                        </span>
                    </div>
                    <button onClick={() => removeItemHandler(item.id)} style={{margin: '5px'}}>
                        {t("remove")}
                    </button>
                </div>
            ))}

            {cartItems.length > 0 && (
                <>
                    <div style={{
                        borderTop: '2px solid black',
                        marginTop: '15px',
                        paddingTop: '10px'
                    }}>
                        <h2>Total price: {totalPrice}</h2>
                    </div>

                    <button
                        onClick={handlePurchase}
                        disabled={cartItems.some(item => !item.quantity || item.quantity <= 0)}
                        style={{margin: '10px'}}>
                        {t("make_purchase")}
                    </button>
                    <button onClick={clearCartHandler} style={{margin: '5px'}}>
                        {t("clear_cart")}
                    </button>
                </>
            )}

            <button style={{margin: '5px'}} onClick={() => i18n.changeLanguage('en')}>EN</button>
            <button style={{margin: '5px'}} onClick={() => i18n.changeLanguage('cz')}>CZ</button>
            <button onClick={() => navigate("/:lang/")} className="button-group">
                ← {t("home")}
            </button>
        </div>
    );
};

export default ShowCart;