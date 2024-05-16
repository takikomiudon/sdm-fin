import React, { useState } from "react";
import GameYearAndPeriod from "./components/gameYearAndPeriod/GameYearAndPeriod";
import PlayerInfoList from "./components/playerInfo/PlayerInfoList";
import StockPriceChart from "./components/stockPriceChart/StockPriceChart";
import StockSelector from "./components/stockSelector/StockSelector";
import Event from "./components/event/Event";
import Result from "./components/result/Result";
import Logs from "./components/log/Logs";
import Start from "./components/start/Start";
import { Log } from "./types/log";
import AlertDialog from "./components/alertDialog/AlertDialog";
import { SnackbarProvider } from "notistack";

function App() {
  const initialPlayerState = (name: string) => {
    return {
      name: name,
      stocks: [0, 0, 0, 0, 0],
      money: 1000,
    };
  };

  const arrayShuffle = (array: number[]) => {
    for (let i = array.length - 1; 0 < i; i--) {
      let r = Math.floor(Math.random() * (i + 1));
      let tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array;
  };

  const [eventOrder, setEventOrder] = useState(
    arrayShuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
  );
  const [player1, setPlayer1] = useState(initialPlayerState("あなた"));
  const [player2, setPlayer2] = useState(initialPlayerState("Claude1"));
  const [player3, setPlayer3] = useState(initialPlayerState("Claude2"));
  const [player4, setPlayer4] = useState(initialPlayerState("Claude3"));

  const [stockPrices, setStockPrices] = useState([15, 15, 15, 15, 15]);

  const [year, setYear] = useState(1);
  const [period, setPeriod] = useState(1);

  const [isFinished, setIsFinished] = useState(false);

  const [eventNum, setEventNum] = useState(0);

  const [logs, setLogs] = useState<Log[]>([]);

  return (
    <SnackbarProvider maxSnack={5}>
      <div className="text-center bg-gray-800 text-white flex flex-row h-screen">
        {year === 4 && period === 1 ? <AlertDialog /> : null}
        <Start />
        <StockPriceChart stockPrices={stockPrices} />
        <div className="flex flex-col justify-evenly">
          <GameYearAndPeriod year={year} period={period} />
          <PlayerInfoList
            player1={player1}
            player2={player2}
            player3={player3}
            player4={player4}
          />
          <Event eventNum={eventNum} eventOrder={eventOrder} />
          <StockSelector
            player1={player1}
            player2={player2}
            player3={player3}
            player4={player4}
            stockPrices={stockPrices}
            setPlayer1={setPlayer1}
            setPlayer2={setPlayer2}
            setPlayer3={setPlayer3}
            setPlayer4={setPlayer4}
            setStockPrices={setStockPrices}
            year={year}
            setYear={setYear}
            period={period}
            setPeriod={setPeriod}
            setIsFinished={setIsFinished}
            logs={logs}
            setLogs={setLogs}
            eventNum={eventNum}
            setEventNum={setEventNum}
            eventOrder={eventOrder}
          />
        </div>
        <Logs logs={logs} />
        <Result
          player1={player1}
          player2={player2}
          player3={player3}
          player4={player4}
          isFinished={isFinished}
        />
      </div>
    </SnackbarProvider>
  );
}

export default App;
