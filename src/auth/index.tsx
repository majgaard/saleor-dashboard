import { User } from "@saleor/fragments/types/User";
import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout";
import LoginLoading from "./components/LoginLoading";
import {
  newPasswordPath,
  passwordResetPath,
  passwordResetSuccessPath
} from "./urls";
import LoginView from "./views/Login";
import NewPassword from "./views/NewPassword";
import ResetPassword from "./views/ResetPassword";
import ResetPasswordSuccess from "./views/ResetPasswordSuccess";

interface UserContext {
  login: (username: string, password: string) => void;
  loginByToken: (token: string, user: User) => void;
  logout: () => void;
  tokenAuthLoading: boolean;
  tokenRefresh: () => Promise<void>;
  tokenVerifyLoading: boolean;
  user?: User;
}

export const UserContext = React.createContext<UserContext>({
  login: undefined,
  loginByToken: undefined,
  logout: undefined,
  tokenAuthLoading: false,
  tokenRefresh: undefined,
  tokenVerifyLoading: false
});

interface AuthRouterProps {
  hasToken: boolean;
}

const AuthRouter: React.FC<AuthRouterProps> = ({ hasToken }) => (
  <Layout>
    <Switch>
      <Route path={passwordResetSuccessPath} component={ResetPasswordSuccess} />
      <Route path={passwordResetPath} component={ResetPassword} />
      {!hasToken ? (
        <Route path={newPasswordPath} component={NewPassword} />
      ) : (
        <LoginLoading />
      )}
      <Route component={LoginView} />
    </Switch>
  </Layout>
);

AuthRouter.displayName = "AuthRouter";
export default AuthRouter;

export * from "./utils";
