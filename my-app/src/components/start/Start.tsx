import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { Fragment, useState } from "react";

const Start = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"株取引ゲーム　VS生成AIClaude"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            株取引を通して、あなたの所持金を増やしましょう！
          </DialogContentText>
          <DialogContentText>
            1期につき合計5つまで、株を売買できます。
          </DialogContentText>
          <DialogContentText>
            2年間のゲームで、1年間に4回、合計8回の取引があります。
          </DialogContentText>
          <DialogContentText>
            株価は各プレーヤーがその株を買うことによって上がり、売ることによって下がります。また、各ターン終了後のイベントによっても変動します。
          </DialogContentText>
          <DialogContentText>
            2年目第4期終了時点で最も所持金が多かったプレーヤーの勝利です。(持ち株は所持金に換算されないのでそれまでに全て売りましょう！)
          </DialogContentText>
          <DialogContentText>
            生成AIClaudeに勝つことができるか、挑戦してみましょう！
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ゲームスタート！</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Start;
