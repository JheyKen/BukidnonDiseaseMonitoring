import React from "react";
import { Route, Redirect } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
  path: string;
  exact?: any;
}

const PrivateRoute = (props: IProps) => {
  const { children, ...rest } = props;
  const isLogin = localStorage.getItem("login");

  const routeComponent = () => {
    if (isLogin) {
      return children;
    } else {
      return <Redirect to={{ pathname: "/" }} />;
    }
  };

  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;