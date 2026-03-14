import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const PurchasePage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        setTotalPrice(total);
    }, [cartItems]);

    const handlePay = async () => {
        if (!email || !cardNumber) {
            setError('Please fill in all fields');
            return;
        }

        if (cartItems.length === 0) {
            setError('Your cart is empty');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const payload = {
                email,
                cardNumber,
                purchaseItems: cartItems.map(item => ({
                    itemId: item.id,
                    quantity: item.quantity
                }))
            };

            await axios.post('http://localhost:1409/api/purchase', payload);

            localStorage.removeItem('cart');
            setCartItems([]);
            setTotalPrice(0);

            alert('Purchase successful');
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Failed to complete purchase');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Make a purchase</h1>

            <button onClick={() => navigate('/items/cart')} style={{margin: '5px'}}>
                Back to cart
            </button>
            <button onClick={() => navigate('/')} style={{margin: '5px'}}>
                Home
            </button>

            {cartItems.map(item => (
                <div key={item.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <h3>{item.title}</h3>
                    <p>Total quantity: {item.quantity}</p>
                    <p>Price per item: {item.price}</p>
                    <p>Price for {item.quantity} items: {item.price * item.quantity}</p>
                </div>
            ))}

            <div style={{
                borderTop: '2px solid black',
                marginTop: '15px',
                paddingTop: '10px'
            }}>
                <h2>Total price: {totalPrice}</h2>
            </div>

            <div style={{marginTop: '20px'}}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{marginBottom: '10px', display: 'block'}}
                />
                <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    style={{marginBottom: '10px', display: 'block'}}
                />
            </div>

            {error && <p style={{color: 'red'}}>{error}</p>}

            <div style={{margin: '5px'}}>
                {cartItems.length > 0 && (
                    <button onClick={handlePay} disabled={loading} style={{marginRight: '10px'}}>
                        {loading ? 'Processing...' : 'Pay'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PurchasePage;