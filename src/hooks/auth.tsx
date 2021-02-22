import * as React from 'react';
import { signIn } from '../services/auth';

type AuthProviderProps = {
  children: React.ReactNode,
};
type AuthProviderValue = {
  loading: boolean,
  signIn: (user: string, password: string) => Promise<SignInResponse>,
  userData: any,
  refreshCachedUserData: () => void,
  signOut: () => void,
};
type SignInResponse = {
  Success: boolean,
  Message?: string,
  Data?: any,
};
type User = {
  availability: boolean,
  createdAt: string,
  email: string,
  isLogged: boolean,
  password: string,
  token: string,
  type: string,
  user: string,
  _id: string,
  __v: number,
};
const AuthContext = React.createContext({});

function useProviderValue(): AuthProviderValue {
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState<User | null>(null);

  async function refreshCachedUserData() {
    const rawUserData = await localStorage.getItem('userData');
    const computedUserData = JSON.parse(rawUserData || '{}');
    
    if (Object.keys(computedUserData).length > 0) {
      setUserData(computedUserData);
    } else {
      setUserData(null);
    }
  }

  async function doSignIn(user: string, password: string): Promise<SignInResponse> {
    setLoading(true);
    try {
      const result = await signIn(user, password);

      if(result.Success) {
        setUserData(result.Data);
      }

      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      return {
        Success: false,
        Message: error.message,
      };
    }
  }

  async function doSignOut(): Promise<void> {
    await localStorage.removeItem('token');
    await localStorage.removeItem('userData');
    setUserData(null);
  }

  return {
    loading,
    signIn: doSignIn,
    userData,
    refreshCachedUserData,
    signOut: doSignOut,
  };
}

export const AuthProvider = (props: AuthProviderProps) => (
  <AuthContext.Provider value={useProviderValue()}>
    {props.children}
  </AuthContext.Provider>
);

export const useAuth = (): any => React.useContext(AuthContext);