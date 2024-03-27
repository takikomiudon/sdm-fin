import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StockSelectButton = ({ stock, setStock, stockId }) => {
  return (
    <div className="flex flex-col">
      <span>Stock {stockId}</span>
      <Button variant="contained" onClick={() => setStock(stock + 1)}>
        <AddIcon />
      </Button>
      <span>{stock}</span>
      <Button variant="contained" onClick={() => setStock(stock - 1)}>
        <RemoveIcon />
      </Button>
    </div>
  );
};

export default StockSelectButton;
