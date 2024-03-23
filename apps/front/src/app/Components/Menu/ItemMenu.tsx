import './ItemMenu.css'
interface ItemMenuProps {
    handleType: () => void;
    title: string;
}

const ItemMenu: React.FC<ItemMenuProps> = ({ handleType, title }) => {
    return (
        <div className="item">
            <span onClick={handleType}>{title}</span>
        </div>
    );
};

export default ItemMenu;
