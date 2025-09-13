import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface DialogConfirmProps {
  open: boolean;
  actionType: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({ open, actionType, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>ยืนยันการทำรายการ</DialogTitle>
      <DialogContent>
        <p>คุณต้องการ <strong>{actionType}</strong> ใช่หรือไม่?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          ยกเลิก
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          ยืนยัน
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
