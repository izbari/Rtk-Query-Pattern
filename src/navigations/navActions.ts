import * as React from "react";
import {
  StackActions,
  NavigationContainerRef,
  NavigationAction,
} from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";
import { AllScreenParamList, RootStackParamList } from "../types/navigationTypes";
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// export const navigation = navigationRef.current
export function navigate(name:keyof RootStackParamList, params?: AllScreenParamList) {
  if(navigationRef.isReady()){
    navigationRef.navigate(name,params);
  }
}
// export function dispatch(action) {
//   navigationRef.current?.dispatch(action);
// }
// export function replace(name, params) {
//   navigationRef.current?.dispatch(StackActions.replace(name, params));
// }
// export function push(name, params) {
//   navigationRef.current?.dispatch(StackActions.push(name, params));
// }
// export function goBack() {
//   navigationRef.current?.goBack();
// }
export const navigation = {
  navigate,
//   dispatch,
//   replace,
//   push,
//   goBack,
};
