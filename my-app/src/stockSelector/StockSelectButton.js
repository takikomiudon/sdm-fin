import './StockSelectButton.css';

const StockSelectButton = ({ stock, setStock, stockId }) => {
    return (
        <div className='StockSelectButton'>
            <button onClick={() => setStock(stock + 1)}>+</button>
            <span>stock{stockId + 1}: {stock}</span>
            <button onClick={() => setStock(stock - 1)}>-</button>
        </div>
    );
}

export default StockSelectButton;