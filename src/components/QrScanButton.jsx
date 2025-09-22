import PropTypes from "prop-types";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Button from "@mui/material/Button";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

const QrScanButton = ({
  buttonProps,
  onScanSuccess,
  onScanFail = () => {},
  onCancel = () => {},
  children = "Escanear QR",
}) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const startScanner = () => {
    setIsScannerOpen(true);
  };

  const stopScanner = () => {
    setIsScannerOpen(false);
    onCancel();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<QrCodeScannerIcon />}
        {...buttonProps}
        onClick={startScanner}
      >
        {children}
      </Button>
      <Dialog
        fullScreen
        open={isScannerOpen}
        onClose={stopScanner}
        slotProps={{
          paper: {
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
          },
        }}
      >
        <IconButton
          size="large"
          edge="end"
          onClick={stopScanner}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#ffffff",
            zIndex: 1000,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Scanner
          onScan={(answer) => alert(JSON.stringify(answer))}
          onError={onScanFail}
          components={{
            torch: true,
            zoom: true,
            finder: true,
            onOff: true,
          }}
        />
        ;
      </Dialog>
    </>
  );
};

QrScanButton.propTypes = {
  buttonProps: PropTypes.object,
  children: PropTypes.node,
  onScanSuccess: PropTypes.func.isRequired,
  onScanFail: PropTypes.func,
  onCancel: PropTypes.func,
};

export default QrScanButton;
