import { useState, useEffect } from "react";
import Item from "./Item";
import axios from "axios";

const ItemList = ({ apiUri }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(apiUri);
                setItems(response.data);
                setError(null); // Clear error on successful fetch
            } catch (error) {
                console.error("Error fetching items:", error);
                if (error.response) {
                    // Server responded with a status other than 200 range
                    setError(`Error: ${error.response.status} - ${error.response.data}`);
                } else if (error.request) {
                    // Request was made but no response received
                    setError("Network Error: Please check your connection and try again.");
                } else {
                    // Something else happened
                    setError(`Error: ${error.message}`);
                }
            }
        };

        fetchItems();
    }, [apiUri, retry]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUri}/${id}`);
            setItems(items.filter(item => item.id !== id));
            setError(null); // Clear error on successful delete
        } catch (error) {
            console.error("Error deleting item:", error);
            if (error.response) {
                setError(`Error: ${error.response.status} - ${error.response.data}`);
            } else if (error.request) {
                setError("Network Error: Please check your connection and try again.");
            } else {
                setError(`Error: ${error.message}`);
            }
        }
    };

    const handleRetry = () => {
        setRetry(prev => prev + 1);
    };

    return (
        <>
            {error && (
                <div className="error">
                    {error}
                    <button onClick={handleRetry}>Retry</button>
                </div>
            )}
            {items.map((item) => (
                <Item key={item.id} item={item} onDelete={handleDelete} />
            ))}
        </>
    );
};

export default ItemList;
