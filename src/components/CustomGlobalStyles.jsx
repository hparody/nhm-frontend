import GlobalStyles from "@mui/material/GlobalStyles";

const CustomGlobalStyles = () => (
  <GlobalStyles
    styles={(theme) => ({
      html: {
        WebkitFontSmoothing: "auto",
        minHeight: "100dvh",
        overscrollBehaviorY: "contain",
      },
      body: {
        height: "100vh",
        minHeight: "100dvh",
        width: "100vw",
        overflow: "hidden auto",
        overscrollBehaviorY: "contain",
        backgroundColor: "#f1f1f1",
      },
      "#root": {
        minHeight: "100dvh",
        overscrollBehaviorY: "contain",
      },
      ".MuiFormLabel-asterisk": { color: "red" },
      ".MuiInputBase-input.MuiOutlinedInput-input": {
        padding: theme.spacing(1.2),
      },
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "10px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    })}
  />
);

export default CustomGlobalStyles;
