import React from "react";
import { Route, Redirec } from "react-router-dom";
import { isAuthenticated } from "../Helpers/authenticated";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signup"
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;