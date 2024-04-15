import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StockSelectButton = ({
  stocks,
  setStocks,
  stockId,
  icon,
}: {
  stocks: number[];
  setStocks: (stocks: number[]) => void;
  stockId: number;
  icon: React.ReactNode;
}) => {
  const getNewStock = (isBuy: boolean) => {
    return stocks.map((stock: number, index: number) => {
      if (index === stockId) {
        const newStock = stock + (isBuy ? 1 : -1);
        return Math.max(-5, Math.min(5, newStock));
      }
      return stock;
    });
  };

  return (
    <div className="flex flex-col">
      <span>{icon}</span>
      <Button variant="contained" onClick={() => setStocks(getNewStock(true))}>
        <AddIcon />
      </Button>
      <span>{stocks[stockId]}</span>
      <Button
        variant="contained"
        color="error"
        onClick={() => setStocks(getNewStock(false))}
      >
        <RemoveIcon />
      </Button>
    </div>
  );
};

export default StockSelectButton;
