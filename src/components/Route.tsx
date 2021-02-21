/* eslint-disable react-hooks/exhaustive-deps */

import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

type ValidatedRouteProps = {
  public: boolean,
};

function ValidatedRoute(props: RouteProps & ValidatedRouteProps) {
  const {
    refreshCachedUserData,
    userData,
  } = useAuth();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      await refreshCachedUserData();
      setLoading(false);
    }

    loadData();
  }, []);

  function renderRoute() {
    if (loading) {
      return <span>Cargando...</span>;
    }

    if (!loading && !userData && !props.public) {
      return <Redirect to="/login" />;
    }

    return <Route {...props} />;
  }

  return renderRoute();
}

export default ValidatedRoute;
