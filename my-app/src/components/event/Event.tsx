import React from "react";
import events from "../../data/events";
import ScienceIcon from '@mui/icons-material/Science';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ComputerIcon from '@mui/icons-material/Computer';
import PsychologyIcon from '@mui/icons-material/Psychology';

const Event = ({ eventNum }: { eventNum: number }) => {
  return (
    <div>
      <h1>イベント</h1>
      <h2>{events[eventNum].name}</h2>
      <p className="flex flex-row justify-evenly">
        <ScienceIcon />{events[eventNum].effect[0]}
        <AccountBalanceWalletIcon />{events[eventNum].effect[1]}
        <LocalShippingIcon />{events[eventNum].effect[2]}
        <ComputerIcon />{events[eventNum].effect[3]}
        <PsychologyIcon />{events[eventNum].effect[4]}
      </p>
    </div>
  );
};

export default Event;
