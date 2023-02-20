import { ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import themeDefault from "./config/theme/Default";
import AppRoutes from "./routes/AppRoutes";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themeDefault}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoutes />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
