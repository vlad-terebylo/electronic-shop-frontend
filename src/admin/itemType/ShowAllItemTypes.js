import {useState, useEffect} from 'react';
import apiClient from '../../core/ApiClient';
import {Link, useNavigate} from 'react-router-dom';
import '../../App.css';

const ShowAllItemTypes = () => {
    const [itemTypes, setItemType] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setItemIdForDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchItemTypes();
    }, []);

    const fetchItemTypes = async () => {
        try {
            const itemTypeList = await apiClient.get('/itemTypes');
            const data = Array.isArray(itemTypeList.data) ? itemTypeList.data : itemTypeList.data.itemType;
            setItemType(data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching items', error);
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        if (id == null) return;

        try {
            await apiClient.delete(`/admin/itemTypes/${id}`);
            setItemIdForDelete(null);
            fetchItemTypes();
        } catch (err) {
            console.error('Error deleting item', err);
        }
    };


    if (loading) return <p>Loading items...</p>;
    if (!itemTypes.length) return <p>No items found</p>;

    return (
        <div className="container">
            <h1>All item types</h1>
            <div className="button-group">
                <Link to="/:lang/admin/item-types/add">
                    <button style={{marginBottom: '20px'}}>Add New Item Type</button>
                </Link>
                <Link to="/:lang/admin">
                    <button style={{marginBottom: '20px'}}>← Back to main page</button>
                </Link>
            </div>

            {itemTypes.map(itemType => (
                <div key={itemType.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <h3>{itemType.title}</h3>
                    <button onClick={() => navigate(`/:lang/admin/itemTypes/update/${itemType.id}`)}
                            style={{marginRight: '10px'}}>
                        Update
                    </button>

                    <button onClick={() => setItemIdForDelete(itemType.id)}>
                        Remove
                    </button>
                </div>
            ))}

            {id && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <p>Are you sure you want to delete this item?</p>
                        <button onClick={handleDelete} style={{marginRight: '10px'}}>Yes</button>
                        <button onClick={() => setItemIdForDelete(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowAllItemTypes;
