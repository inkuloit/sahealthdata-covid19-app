import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Session } from 'bc-react-session';

function PrivateRoute({ component: Component, ...rest }) {
    const session = Session.getSession();
  
    return(
        <Route
            {...rest}
            render={props =>
                session.isValid ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/cpanel/login" />
                )
            }
        />
    );
}

export default PrivateRoute;