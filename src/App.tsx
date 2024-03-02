import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import PageRoutes from "./PageRoutes";
import { Toaster } from "react-hot-toast";


function App() {
  
  return (
    <>
      <Provider store={store}>
        <PageRoutes />
      </Provider>
      <Toaster />
    </>
  );
}

export default App;
