export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
};
export type HomeStackParamList = {
  UserList: undefined;
  SingleUser: { userId: string, userName: string };
  SinglePost: { postId: string };
};
export type AllScreenParamList = {
  userId: string;
};

export interface RootStackParamList
  extends AuthStackParamList,
    HomeStackParamList {}
    
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
