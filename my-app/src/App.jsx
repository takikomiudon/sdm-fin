import React, { useState } from "react";
import "./App.css";
import GameYearAndPeriod from "./gameYearAndPeriod/GameYearAndPeriod";
import PlayerInfoList from "./playerInfo/PlayerInfoList";
import StockPriceChart from "./stockPriceChart/StockPriceChart";
import StockSelector from "./stockSelector/StockSelector";
import Event from "./event/Event";
import Result from "./result/Result";
import Log from "./log/Log";
import Start from "./start/Start";

function App() {
  // 4プレイヤーの所持株式、所持金をstateを用いて管理する
  const initialPlayerState = {
    stocks: [0, 0, 0, 0, 0],
    money: 1000,
  };
  const [player1, setPlayer1] = useState(initialPlayerState);
  const [player2, setPlayer2] = useState(initialPlayerState);
  const [player3, setPlayer3] = useState(initialPlayerState);
  const [player4, setPlayer4] = useState(initialPlayerState);

  // 5種類の株式の買値のindexをstateを用いて管理する
  const initialStockPriceState = [5, 5, 5, 5, 5];
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
  const [eventNum, setEventNum] = useState(0); //eventNameArrayの何番目を表示するか

  const [actionLogs, setActionLogs] = useState([]);

  const addActionLog = (
    year,
    period,
    playerName,
    stockType,
    isBuy,
    price,
    quantity
  ) => {
    const newLogEntry = [
      year,
      period,
      playerName,
      stockType,
      isBuy,
      price,
      quantity,
    ];
    setActionLogs([...actionLogs, newLogEntry]);
  };

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
    <div className="App">
      <GameYearAndPeriod props={{ year, period, isFinished }} />
      <PlayerInfoList props={{ player1, player2, player3, player4 }} />
      <Log props={{ actionLogs }} />
      <div className="mainDisplay">
        <StockPriceChart props={stockPrices} />
        <Event
          props={{
            eventNum,
            setEventNum,
            eventNameArray,
            eventArray,
            isFinished,
          }}
        />
      </div>
      <StockSelector
        props={{
          player1,
          player2,
          player3,
          player4,
          stockPrices,
          setPlayer1,
          setPlayer2,
          setPlayer3,
          setPlayer4,
          setStockPrices,
          year,
          setYear,
          period,
          setPeriod,
          isFinished,
          setIsFinished,
          addActionLog,
          eventNum,
          setEventNum,
          eventArray,
        }}
      />
    </div>
  );
}

export default App;
