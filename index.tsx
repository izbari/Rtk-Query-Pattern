import { registerRootComponent } from "expo";
import React from "react";
import App from "./src/navigations/root";
import { Provider } from "react-redux";
import { store } from "./store";
import { NativeBaseProvider } from "native-base";
import { usersApiSlice } from "./src/features/users/usersSlice";
import { extendedApiSlice } from "./src/features/posts/postsSlice";
store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

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
