import * as React from 'react';
import { getRedirectUrl } from '../routes';
import { useAuth } from '../hooks/auth';
import { Redirect } from 'react-router-dom';

function Home() {
  const auth = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [redirectUrl, setRedirectUrl] = React.useState('/login');

  React.useEffect(() => {
    if (auth.userData) {
      const url = getRedirectUrl(auth.userData.type);
      setRedirectUrl(url);
    }
    setLoading(false);
  }, [auth.userData]);

  if (!loading) {
    return <Redirect to={redirectUrl} />;
  }

  return <span>Home</span>;
}

export default Home;

