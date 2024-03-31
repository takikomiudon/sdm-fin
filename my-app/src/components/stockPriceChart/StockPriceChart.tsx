import React from "react";
import priceArray from "../../data/priceArray";

const StockPriceChart = ({ stockPrices }: { stockPrices: number[] }) => {
  const isCurrentPrice = (index: number, stock: number) => {
    if (index === stockPrices[stock]) {
      return "bg-blue-700";
    } else if (index === stockPrices[stock] + 1) {
      return "bg-red-700";
    } else if (index < 3) {
      return "bg-black text-amber-400 font-serif font-bold";
    } else if (index < 6) {
      return "bg-gray-500 text-amber-200 font-serif font-bold";
    } else if (index < 11) {
      return "bg-amber-100 text-black font-bold";
    } else if (index < 17) {
      return "bg-amber-100 text-black";
    } else {
      return "bg-red-100 text-red-600 font-mono";
    }
  };
  return (
    <div className="mt-10">
      <h1 className="text-amber-400 text-xl font-serif font-bold">
        現在の株価
      </h1>
      <table className="w-96 m-10 mt-0">
        <thead>
          <tr>
            <th>A社</th>
            <th>B社</th>
            <th>C社</th>
            <th>D社</th>
            <th>E社</th>
          </tr>
        </thead>
        <tbody>
          {priceArray.map((price, index) => (
            <tr key={index}>
              <td className={isCurrentPrice(index, 0)}>{price}</td>
              <td className={isCurrentPrice(index, 1)}>{price}</td>
              <td className={isCurrentPrice(index, 2)}>{price}</td>
              <td className={isCurrentPrice(index, 3)}>{price}</td>
              <td className={isCurrentPrice(index, 4)}>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockPriceChart;
