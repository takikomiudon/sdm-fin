import './StockSelectButton.css';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const StockSelectButton = (props) => {
    return (
        <div className='StockSelectButton'>
            <span>Stock {props.stockId}</span>
            <Button variant="contained" onClick={() => props.setStock(props.stock + 1)}><AddIcon /></Button>
            <span>{props.stock}</span>
            <Button variant="contained" onClick={() => props.setStock(props.stock - 1)}><RemoveIcon /></Button>
        </div>
    );
}

export default StockSelectButton;