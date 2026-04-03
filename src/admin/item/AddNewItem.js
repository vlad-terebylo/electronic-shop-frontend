import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import apiClient from '../../core/ApiClient';
import {useTranslation} from 'react-i18next';
import {useLocale} from "../../core/UseLocales";


const AddNewItem = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [producingYear, setProducingYear] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [quantity, setQuantity] = useState('');
    const [itemTypeId, setItemTypeId] = useState('');

    const [itemTypes, setItemTypes] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {changeLang, SUPPORTED_LOCALES, prefix} = useLocale();


    useEffect(() => {
        apiClient.get('/itemTypes')
            .then(res => setItemTypes(res.data))
            .catch(err => console.error('Error fetching item types:', err));
    }, []);

    const validate = () => {
        const newErrors = {};

        if (!title || !title.trim()) newErrors.title = t("required");
        if (!price || isNaN(price) || parseInt(price) <= 0) newErrors.price = t("required");
        if (!producingYear) newErrors.producingYear = t("required");
        if (!manufacturer || !manufacturer.trim()) newErrors.manufacturer = t("required");
        if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) newErrors.quantity = t("only_positive_quantity");
        if (!itemTypeId) newErrors.itemTypeId = t("required");

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleAddItem = async () => {
        if (!validate()) return;

        try {
            await apiClient.post('/admin/items', {
                title: title.trim(),
                price: parseInt(price),
                producingYear: producingYear,
                manufacturer: manufacturer.trim(),
                quantity: parseInt(quantity),
                itemTypeId: parseInt(itemTypeId)
            });

            setTitle('');
            setPrice('');
            setProducingYear('');
            setManufacturer('');
            setQuantity('');
            setItemTypeId('');
            navigate(`${prefix}/admin`)
        } catch (error
            ) {
            console.log("Error - ", error);
            alert(t("failed_to_add_new_item"));
        }
    };

    return (
        <div className="container">
            <h2>{t("add_item")}</h2>
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p style={{color: 'red'}}>{errors.title}</p>}
            <p></p>

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
            <p></p>

            <input
                type="datetime-local"
                placeholder="Producing date"
                value={producingYear}
                onChange={(e) => setProducingYear(e.target.value)}
            />
            {errors.producingYear && <p style={{color: 'red'}}>{errors.producingYear}</p>}
            <p></p>

            <input
                type="text"
                placeholder="manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
            />
            {errors.manufacturer && <p style={{color: 'red'}}>{errors.manufacturer}</p>}
            <p></p>

            <input
                type="number"
                placeholder="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.quantity && <p style={{color: 'red'}}>{errors.quantity}</p>}
            <p></p>

            <select value={itemTypeId} onChange={e => setItemTypeId(e.target.value)}>
                <option value="">{t("select_item_type")}</option>
                {itemTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.title}</option>
                ))}
            </select>
            {errors.itemTypeId && <p style={{color: 'red'}}>{errors.itemTypeId}</p>}
            <p></p>

            <button onClick={handleAddItem}>{t("add_item")}</button>
            <button onClick={() => navigate(`${prefix}/admin`)} style={{margin: '10px'}}>
                ← {t("home")}
            </button>

            <div className="lang-switcher">
                {SUPPORTED_LOCALES.map((locale) => (
                    <button
                        key={locale}
                        style={{margin: '5px'}}
                        onClick={() => changeLang(locale)}
                    >
                        {locale.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AddNewItem;