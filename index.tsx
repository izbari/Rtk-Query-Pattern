import { registerRootComponent } from "expo";
import React from 'react'
import App from "./src/navigations/root";
import { Provider } from "react-redux";
import { store } from "./store";
import {usersApiSlice} from './src/features/users/usersSlice'
store.dispatch(usersApiSlice.endpoints.getUsers.initiate("User"));
const Root = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
registerRootComponent(Root);
