import {useState} from "react";
import {useTranslation} from "react-i18next";

const ItemSearchById = ({onSearch}) => {
    const [itemId, setItemId] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();


    const handleSearch = (e) => {
        e.preventDefault();

        if (!itemId || isNaN(itemId)) {
            setError(t("wrong_id_error"));
            return;
        }

        setLoading(true);
        setError(null);

        onSearch(Number(itemId));

        setLoading(false);
    };

    return (
        <div style={{marginBottom: "20px"}}>
            <form onSubmit={handleSearch}>
                <input
                    type="number"
                    placeholder={t("search_by_id")}
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                    style={{marginRight: "10px"}}
                />
                <button type="submit" disabled={loading}>
                    {loading ? t("searching") : t("search_btn")}
                </button>
            </form>

            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
};

export default ItemSearchById;
