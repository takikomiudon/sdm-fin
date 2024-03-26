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
        for (let p = 1; p < 5; p++){
            const player = props.props[`player${p}`];
            const setPlayer = props.props[`setPlayer${p}`];

            for (let i = 0; i < 5; i++) {
                let stock = 0

                switch(i) {
                case 0: stock = stock0; break;
                case 1: stock = stock1; break;
                case 2: stock = stock2; break;
                case 3: stock = stock3; break;
                case 4: stock = stock4; break;
                default: break;
                }

                if (stock === 0) {
                    continue;
                }

                const isBuy = stock > 0;
                stock = isBuy ? stock : -stock;

                const dealingPrice = priceArrey[props.props.stockPrices[i] - !isBuy];

                const updatedMoney = player.money + stock * dealingPrice;
                const updatedStocks = isBuy ? player.stocks[i] + stock : player.stocks[i] - stock;

                const updatedPrice = props.props.stockPrices[i] + (isBuy ? 1 : -1);

                setPlayer({
                    stocks: [
                        ...player.stocks.slice(0, i),
                        updatedStocks,
                        ...player.stocks.slice(i + 1)
                    ],
                    money: updatedMoney
                });

                console.log(props.props.stockPrices)

                props.props.setStockPrices([
                    ...props.props.stockPrices.slice(0, i),
                    updatedPrice,
                    ...props.props.stockPrices.slice(i + 1)
                ]);

                console.log(props.props.stockPrices)
                
                props.props.addActionLog(props.props.year, props.props.period, `player1`, `stock${i}`, isBuy, dealingPrice, stock);
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