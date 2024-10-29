import PropTypes from "prop-types";
import { useState, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CircularProgress from "@mui/material/CircularProgress";

// Square QR box with edge size = 80% of the smaller edge of the viewfinder.
const qrBoxFunction = (viewfinderWidth, viewfinderHeight) => {
  const minEdgePercentage = 0.8; // 80% size square
  const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
  const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
  return {
    width: qrboxSize,
    height: qrboxSize,
  };
};

const QR_READER_ID = "id_qr_reader";
const SCANNER_CAMERA_CONFIG = { facingMode: "environment" };
const SCANNER_CONFIG = { fps: 10, qrbox: qrBoxFunction };

const QrScanButton = ({
  buttonProps,
  onScanSuccess,
  onScanFail = () => {},
  onCloseScanner = () => {},
  children = "Escanear QR",
}) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [loadingScanner, setLoadingScanner] = useState(false);
  const scannerRef = useRef(null);

  const startScanner = () => {
    setIsScannerOpen(true);
    initializeScanner();
  };

  const stopScanner = useCallback(() => {
    if (scannerRef.current) {
      scannerRef.current
        .stop()
        .catch((err) => console.error("Failed to stop scanner:", err));
      scannerRef.current = null;
      onCloseScanner();
    }
    setIsScannerOpen(false);
  }, [onCloseScanner]);

  const handleScanSuccess = useCallback(
    (decodedValue) => {
      stopScanner();
      onScanSuccess(decodedValue);
    },
    [onScanSuccess, stopScanner]
  );

  const initializeScanner = useCallback(() => {
    console.log(isScannerOpen);
    setLoadingScanner(true);
    setTimeout(() => {
      setLoadingScanner(false);
      const qrCodeScanner = new Html5Qrcode(QR_READER_ID);
      qrCodeScanner
        .start(
          SCANNER_CAMERA_CONFIG,
          SCANNER_CONFIG,
          handleScanSuccess,
          onScanFail
        )
        .catch((err) => {
          console.error("Unable to start scanning:", err);
          setIsScannerOpen(false);
        });
      scannerRef.current = qrCodeScanner;
    }, 500); // Delay to ensure 'reader' is in the DOM
  }, [handleScanSuccess, onScanFail, isScannerOpen]);

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
        PaperProps={{
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
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
        {loadingScanner && <CircularProgress size={40} />}
        <Box
          id={QR_READER_ID}
          component="div"
          style={{
            width: "100%",
            height: "100%",
            display: loadingScanner ? "none" : "flex",
            flexDirection: "row",
            alignContent: "center",
            overflow: "hidden",
          }}
        ></Box>
      </Dialog>
    </>
  );
};

QrScanButton.propTypes = {
  buttonProps: PropTypes.object,
  children: PropTypes.node,
  onScanSuccess: PropTypes.func.isRequired,
  onScanFail: PropTypes.func,
  onCloseScanner: PropTypes.func,
};

export default QrScanButton;
