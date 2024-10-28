import React, { useState, useRef, useEffect, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Box from "@mui/material/Box";

const SCREEN_RATIO = 0.5625;

// Square QR box with edge size = 70% of the smaller edge of the viewfinder.
const qrBoxFunction = (viewfinderWidth, viewfinderHeight) => {
  const minEdgePercentage = 0.8; // 70%
  const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
  const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
  return {
    width: qrboxSize,
    height: qrboxSize,
  };
};

const QRScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const scannerRef = useRef(null);

  const startScanner = () => {
    setIsScannerOpen(true);
  };

  const initializeScanner = useCallback(() => {
    setTimeout(() => {
      const qrCodeScanner = new Html5Qrcode("reader");
      qrCodeScanner
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: qrBoxFunction,
            aspectRatio: SCREEN_RATIO,
          },
          (decodedText) => {
            setScanResult(decodedText);
            stopScanner();
          },
          (errorMessage) => {
            console.warn("QR Code scanning error:", errorMessage);
          }
        )
        .catch((err) => {
          console.error("Unable to start scanning:", err);
          setIsScannerOpen(false);
        });
      scannerRef.current = qrCodeScanner;
    }, 500); // Delay to ensure 'reader' is in the DOM
  }, []);

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current
        .stop()
        .catch((err) => console.error("Failed to stop scanner:", err));
      scannerRef.current = null;
    }
    setIsScannerOpen(false);
  };

  useEffect(() => {
    if (isScannerOpen) {
      initializeScanner();
    }
    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch((err) => console.error("Failed to stop scanner:", err));
        scannerRef.current = null;
      }
    };
  }, [isScannerOpen, initializeScanner]);

  return (
    <div>
      <button type="button" onClick={startScanner}>
        Open Scanner
      </button>

      <Dialog
        fullScreen
        open={isScannerOpen}
        onClose={stopScanner}
        PaperProps={{
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
          },
        }}
      >
        <IconButton
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
        <Box
          id="reader"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            overflow: "hidden",
          }}
        ></Box>
      </Dialog>

      <div>
        <label>Scanned Result:</label>
        <input type="text" value={scanResult} readOnly />
      </div>
    </div>
  );
};

export default QRScanner;
