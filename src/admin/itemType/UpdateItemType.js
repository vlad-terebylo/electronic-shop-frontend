import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import apiClient from '../../core/ApiClient';

const UpdateItemType = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [title, setItemTypeItem] = useState('');
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        apiClient.get(`/itemTypes/${id}`)
            .then(res => {
                setItemTypeItem(res.data.title);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching item type', err);
                setLoading(false);
            });
    }, [id]);

    const validate = () => {
        const newErrors = {};

        if (!title || !title.trim()) newErrors.title = 'Title is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await apiClient.patch(`/admin/itemTypes/${id}`, {title});
            navigate('/:lang/admin/item-types');
        } catch (err) {
            console.error('Error updating item type', err);
            alert('Failed to save changes');
        }
    };

    if (loading) return <p>Loading item type...</p>;

    return (
        <div className="container">
            <h2>Update Item Type: {title}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setItemTypeItem(e.target.value)}
                    style={{padding: '5px', width: '250px', marginBottom: '10px'}}
                />
                {errors.title && <p style={{color: 'red'}}>{errors.title}</p>}
                <div>
                    <button type="submit" style={{marginRight: '10px'}}>Save Changes</button>
                    <button type="button" onClick={() => navigate(-1)}>← Back</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateItemType;
