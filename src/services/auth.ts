import api, { apiMethods } from './api';

export async function signIn(user: string, password: string): Promise<any> {
  const response = await api({
    method: apiMethods.post,
    url: 'signin',
    data: {
      user,
      password,
    },
  });

  if (response.Success) {
    await localStorage.setItem('userData', JSON.stringify(response.Data));
    await localStorage.setItem('token', response.Data.token);
  }

  return response;
}