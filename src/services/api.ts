export enum apiMethods {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete',
};
type apiParams = {
  method: apiMethods,
  url: string,
  data?: any,
};
type apiResponse = {
  Success: boolean,
  Data?: any,
  Error?: string,
};

export default async function api(params: apiParams): Promise<any> {
  const token = await localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-type': 'application/json',
  };
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchParams = {
      headers,
      method: params.method,
      body: JSON.stringify(params.data || {}),
    };

    const fetchResult = await fetch(apiUrl + params.url, fetchParams);

    return fetchResult.json();
  } catch (error) {
    const response: apiResponse = {
      Success: false,
      Error: error.message,
    };

    return response;
  }
}