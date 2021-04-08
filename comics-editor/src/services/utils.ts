export const getHeaders = (token: string) => {
  if (token) {
    return {
      headers: {
        'Content-Type': 'application/json',
        //@ts-ignore
        Authorization: `${window.authType} ${window.token}`,
      },
    };
  } else
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
};
