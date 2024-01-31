import './PlayerInfo.css'
import logo from './img/logo192.png'

const PlayerInfo = (props) => {
    return (
        <div className='PlayerInfo'>
            <img src={logo}/>
            <p>Stocks: {props.props.player.stocks}</p>
            <p>Money: {props.props.player.money}万円</p>
        </div>
    );
}

export default PlayerInfo;