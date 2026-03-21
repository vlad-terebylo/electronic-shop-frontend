import {useState} from "react";
import {useTranslation} from "react-i18next";


const SearchItemByTitle = ({onSearch}) => {
    const [itemTitle, setItemTitle] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();


    const handleSearch = (e) => {
        e.preventDefault();

        if (!itemTitle) {
            setError(t("item_title_error"));
            return;
        }

        setLoading(true);
        setError(null);

        onSearch(itemTitle);

        setLoading(false);
    };

    return (
        <div style={{marginBottom: "20px"}}>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder={t("search")}
                    value={itemTitle}
                    onChange={(e) => setItemTitle(e.target.value)}
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

export default SearchItemByTitle;
