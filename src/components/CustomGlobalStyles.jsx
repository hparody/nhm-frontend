import GlobalStyles from "@mui/material/GlobalStyles";

const CustomGlobalStyles = () => (
  <GlobalStyles
    styles={(theme) => ({
      html: { WebkitFontSmoothing: "auto" },
      body: {
        height: "100vh",
        width: "100vw",
        overflow: "auto",
        backgroundColor: "#f1f1f1",
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
