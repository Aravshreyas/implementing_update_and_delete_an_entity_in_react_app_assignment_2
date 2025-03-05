const Item = ({ item, onDelete }) => {
    return (
        <div>
            <span>{item.name}</span>
            <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
    );
};

export default Item;
