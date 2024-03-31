import React, { useState } from "react";
import GameYearAndPeriod from "./gameYearAndPeriod/GameYearAndPeriod";
import PlayerInfoList from "./playerInfo/PlayerInfoList";
import StockPriceChart from "./stockPriceChart/StockPriceChart";
import StockSelector from "./stockSelector/StockSelector";
import Event from "./event/Event";
import Result from "./result/Result";
import Log from "./log/Log";
import Start from "./start/Start";

function App() {
  const initialPlayerState = (name) => {
    return {
      name: name,
      stocks: [0, 0, 0, 0, 0],
      money: 1000,
    };
  };
  const [player1, setPlayer1] = useState(initialPlayerState("あなた"));
  const [player2, setPlayer2] = useState(initialPlayerState("claude"));
  const [player3, setPlayer3] = useState(initialPlayerState("CPU1"));
  const [player4, setPlayer4] = useState(initialPlayerState("CPU2"));

  const initialStockPriceState = [15, 15, 15, 15, 15];
  const [stockPrices, setStockPrices] = useState(initialStockPriceState);

  const [year, setYear] = useState(1);
  const [period, setPeriod] = useState(1);

  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const longTermInterestRateRise = [0, 3, 0, 0, 0];
  const itBabble = [0, 1, 0, 0, 3];
  const highCrudeOilPrice = [-1, 0, 0, 1, 0];
  const dCompanyDeficitAnnouncement = [0, 0, 0, -3, 0];
  const monetaryEasing = [0, 1, 0, 1, 2];
  const tokyoOlympics = [0, 2, 2, 1, 2];
  const coronaShock = [-1, -1, 0, -2, -1];
  const recession = [0, -1, -1, -1, -2];
  const cCompanyProductHit = [0, 0, 3, 0, 0];
  const aCompanyWarehouseFire = [-3, 0, 0, 0, 0];
  const economicBoom = [0, 3, 1, 0, 2];
  const aCompanyNewProductAnnouncement = [3, 0, 0, 0, 0];
  const lehmanShock = [0, -3, 0, -1, -2];
  const lowCrudeOilPrice = [1, 0, 0, -1, 0];
  const bubbleEconomy = [0, 2, 1, 0, 3];
  const primeMinisterResignation = [1, 1, 1, 1, 2];

  const eventArray = [
    longTermInterestRateRise,
    itBabble,
    highCrudeOilPrice,
    dCompanyDeficitAnnouncement,
    monetaryEasing,
    tokyoOlympics,
    coronaShock,
    recession,
    cCompanyProductHit,
    aCompanyWarehouseFire,
    economicBoom,
    aCompanyNewProductAnnouncement,
    lehmanShock,
    lowCrudeOilPrice,
    bubbleEconomy,
    primeMinisterResignation,
  ];

  const eventNameArray = [
    "長期金利の上昇",
    "ITバブル",
    "原油高",
    "D社赤字を発表",
    "金融緩和",
    "東京オリンピック",
    "コロナショック",
    "不景気",
    "C社商品の大ヒット",
    "A社倉庫で火災",
    "好景気",
    "A社新製品発表",
    "リーマンショック",
    "原油安",
    "バブル経済",
    "総理大臣辞任",
  ];

  const [eventNum, setEventNum] = useState(0);

  const [actionLogs, setActionLogs] = useState([]);

  // スタート画面が表示されないバグ
  if (isStarted) {
    return (
      <div className="App">
        <Start props={{ isStarted, setIsStarted }} />
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="App">
        <Result
          props={{ isFinished, year, player1, player2, player3, player4 }}
        />
      </div>
    );
  }

  return (
    <div className="text-center bg-gray-800 text-white flex flex-row ">
      <StockPriceChart stockPrices={stockPrices} />
      <div className="flex flex-col justify-evenly">
        <GameYearAndPeriod
          year={year}
          period={period}
          isFinished={isFinished}
        />
        <PlayerInfoList
          player1={player1}
          player2={player2}
          player3={player3}
          player4={player4}
        />
        <Event
          eventNum={eventNum}
          setEventNum={setEventNum}
          eventNameArray={eventNameArray}
          eventArray={eventArray}
          isFinished={isFinished}
        />
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
          isFinished={isFinished}
          setIsFinished={setIsFinished}
          actionLogs={actionLogs}
          setActionLogs={setActionLogs}
          eventNum={eventNum}
          setEventNum={setEventNum}
          eventArray={eventArray}
        />
      </div>
      <Log actionLogs={actionLogs} />
    </div>
  );
}

export default App;
