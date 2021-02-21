import React from 'react';
import {
  BrowserRouter,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import Route from './components/Route';
import AppRoutes, { AppRoute } from './routes';
import { AuthProvider } from './hooks/auth';
import './App.css';

function App() {
  function renderRoutes(): React.ReactNode[] {
    return AppRoutes.map((route: AppRoute, i: number): React.ReactNode => {
      return (
        <Route
          key={`${i}-${route.label}`}
          exact
          public={route.public}
          path={route.path}
          render={(props: RouteComponentProps): React.ReactNode => {
            return (
              <route.layout>
                <route.component {...props} />
              </route.layout>
            );
          }}
        />
      );
    });
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          {renderRoutes()}
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
