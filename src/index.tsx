import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index";
import { Provider } from "react-redux";
import ErrorBoundary from "./ErrorBaundary";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
);

reportWebVitals();
