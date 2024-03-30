import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StockSelectButton = ({ stocks, setStocks, stockId }) => {
  const getNewStock = (isBuy) => {
    return stocks.map((stock, i) => {
      if (i === stockId) {
        return stock + (isBuy ? 1 : -1);
      }
      return stock;
    });
  }

  return (
    <div className="flex flex-col">
      <span>Stock {stockId}</span>
      <Button variant="contained" onClick={() => setStocks(getNewStock(true))}>
        <AddIcon />
      </Button>
      <span>{stocks[stockId]}</span>
      <Button variant="contained" onClick={() => setStocks(getNewStock(false))}>
        <RemoveIcon />
      </Button>
    </div>
  );
};

export default StockSelectButton;
