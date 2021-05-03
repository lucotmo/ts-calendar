import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: any) => {
  return (
    <Route { ...rest }
      component={ (props: any) => (
        ( isAuthenticated )
          ? ( <Redirect to="/" /> )
          : ( <Component { ...props } /> )
      )}
    />
  )
}

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
}
