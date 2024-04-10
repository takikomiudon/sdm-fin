import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

const AlertDialog = () => {
  const [open, setOpen] = useState(true);
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        4年目第1期、最後の年です！
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          終了まであと4期！ゲーム終了までに持っている株券を全て売り切りましょう！
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          決定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
