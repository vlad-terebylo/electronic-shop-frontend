import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const AddNewItemType = () => {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!title || !title.trim()) newErrors.title = 'Title is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleAddItemType = async () => {
        if (!validate()) return;
        if (!title.trim()) return;
        try {
            await axios.post('http://localhost:1409/shop/itemTypes', {title});
            console.log('ItemType added:', title);
            setTitle('');
            navigate('/');
        } catch (err) {
            console.error('Error adding item type:', err);
        }
    };

    return (
        <div>
            <h2>Add New Item Type</h2>
            <input
                type="text"
                placeholder="Item type title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{marginBottom: '10px', padding: '5px', width: '250px'}}
            />
            {errors.title && <p style={{color: 'red'}}>{errors.title}</p>}

            <div>
                <button onClick={handleAddItemType} style={{marginRight: '10px'}}>
                    Add Type
                </button>
                <button onClick={() => navigate(-2)}>
                    ← Home
                </button>
            </div>
        </div>
    );
};

export default AddNewItemType;
