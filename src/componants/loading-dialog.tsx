import React from "react";
import { Dialog, DialogContent, CircularProgress, Box } from "@mui/material";

interface LoadingDialogProps {
  open: boolean;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ open }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: { backgroundColor: "transparent", boxShadow: "none" },
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100px"
        >
          <CircularProgress />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
