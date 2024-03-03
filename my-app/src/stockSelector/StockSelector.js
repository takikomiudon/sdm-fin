import React, { useState } from 'react';
import { Button } from '@mui/material';
import './StockSelector.css';
import StockSelectButton from './StockSelectButton';

const StockSelector = (props) => {
    // 5種類の株式について、売買する個数をボタンを用いて入力する
    // 買う場合は正の数、売る場合は負の数を入力する
    const [stock0, setStock0] = useState(0);
    const [stock1, setStock1] = useState(0);
    const [stock2, setStock2] = useState(0);
    const [stock3, setStock3] = useState(0);
    const [stock4, setStock4] = useState(0);

    const handleClick = () => {
        validateTrade()
        trade()
        initialTrade()
        event()

        if (props.props.year === 4 && props.props.period === 4) {
            props.props.setIsFinished(true);
        } else if (props.props.period === 4) {
            props.props.setYear(props.props.year + 1);
            props.props.setPeriod(1);
        } else {
            props.props.setPeriod(props.props.period + 1);
        }
    }

    const validateTrade = () => {
        // 売買数が不正である場合処理を中断 吉岡くん
    }

    const initialTrade = () => {
        // 売買数の初期化(0, 0, 0, 0, 0) 吉岡くん
    }

    //　株価の配列　(前田が勝手に作りました)
    const priceArrey = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 
                        100, 120, 140, 160, 180, 200, 240, 280, 330, 390, 460];

    const trade = () => {
        // 売買プロセス(所持金、持ち株、株価の更新)を記述　前田くん
        // player1からplayer4まで繰り返す
        for (let p = 1; p < 5; p++){

            // 現在のプレイヤーの状態を取得
            const currentPlayer = props.props[`player${p}`];
            const updatePlayer = props.props[`setPlayer${p}`];

            //売却プロセス
            for (let i = 0; i < 5; i++){

                // stock"i"の売却数を取得(未完)
                const numSelling = ;

                // stock"i"の現在の売価のindexを取得
                const sellingPrice = priceArrey[props.props.stockPrices[i] - 1];

                // 所持金をプラスし、持ち株数をマイナスする
                const updatedMoney = currentPlayer.money + numSelling * sellingPrice;
                const updatedStocks = currentPlayer.stocks[i] - numSelling;

                // 株価を下げる(下限より下にはいかない)
                const updatedPrice = props.props.stockPrices[i] - numSelling >= 1 ? props.props.stockPrices[i] - numSelling : 1;

                // プレイヤーの所持金と持ち株数を更新
                updatePlayer({
                    ...currentPlayer,
                    money: updatedMoney,
                    stocks: updatedStocks
                });

                // 株価を更新
                props.props.setStockPrices(updatedPrice)

                // ヒストリーを更新
                props.props.addActionLog(props.props.year, props.props.period, `player${p}`, `stock${i}`, sellingPrice, -numSelling);

            }


            //購入プロセス
            for (let i = 0; i < 5; i++){
                
                // stock"i"の希望購入数を取得(未完)
                const numBuyingDesired = ;

                // stock"i"の現在の買価のindexを取得
                const buyingPrice = priceArrey[props.props.stockPrices[i]];

                // 現在の所持金で買える最大の株数を計算
                const maxAffordable = Math.floor(currentPlayer.money / buyingPrice);

                // stock"i"の購入数を決定(希望購入数買えない場合は、買える分だけ)
                const numBuying = numBuyingDesired <= maxAffordable ? numBuyingDesired : maxAffordable;
                
                // 所持金をマイナスし、持ち株数をプラスする
                const updatedMoney = currentPlayer.money - numBuying * buyingPrice;
                const updatedStocks = currentPlayer.stocks[i] + numBuying;

                // 株価を上げる(上限より上にはいかない)
                const updatedPrice = props.props.stockPrices[i] + numBuying <= 20 ? props.props.stockPrices[i] + numBuying : 20;

                // プレイヤーの所持金と持ち株数を更新
                updatePlayer({
                    ...currentPlayer,
                    money: updatedMoney,
                    stocks: updatedStocks
                });

                // 株価を更新
                props.props.setStockPrices(updatedPrice)

                // ヒストリーを更新
                props.props.addActionLog(props.props.year, props.props.period, `player${p}`, `stock${i}`, buyingPrice, numBuying);


            }



        }
    }

    const event = () => {
        // イベントの内容に応じて株価などを変化させる 丸山くん
    }

    return (
        <div className='StockSelector'>
            <div className='StockSelectButtons'>
                <StockSelectButton stock={stock0} setStock={setStock0} stockId={0}/>
                <StockSelectButton stock={stock1} setStock={setStock1} stockId={1}/>
                <StockSelectButton stock={stock2} setStock={setStock2} stockId={2}/>
                <StockSelectButton stock={stock3} setStock={setStock3} stockId={3}/>
                <StockSelectButton stock={stock4} setStock={setStock4} stockId={4}/>
            </div>
            {/* ここに売買数が不正である際のメッセージを書く isValidというbooleanの変数を定義して、不正の時falseにすることで表示非表示を管理する 吉岡くん */}
            <Button variant="contained" sx = {{margin: '16px'}}
            onClick={handleClick} 
            className='button'>決定</Button>
        </div>
    );
}

export default StockSelector;