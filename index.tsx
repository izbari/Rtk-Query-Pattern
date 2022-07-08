import { registerRootComponent } from "expo";
import React from "react";
import App from "./src/navigations/root";
import { Provider } from "react-redux";
import { store } from "./store";
import { NativeBaseProvider } from "native-base";
const Root = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NativeBaseProvider>
  );
};
registerRootComponent(Root);
