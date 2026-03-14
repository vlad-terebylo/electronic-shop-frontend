const CART_KEY = "cart";

export const getCart = () => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (item, qty = 1) => {
    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (qty <= 0) return false;
    if (qty > item.quantity) return "exceed";

    if (existingItem) {
        const newQty = existingItem.quantity + qty;
        if (newQty > item.quantity) {
            return "exceed";
        } else {
            existingItem.quantity = newQty;
            saveCart(cart);
            return false;
        }
    } else {
        cart.push({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: qty,
            stock: item.quantity
        });
        saveCart(cart);
        return true;
    }
};

export const updateCartItemQuantity = (id, qty) => {
    const cart = getCart();
    const item = cart.find(i => i.id === id);

    if (!item) return;

    item.quantity = qty;
    saveCart(cart);
};

export const removeFromCart = (id) => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== id);
    saveCart(updatedCart);
};

export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
};