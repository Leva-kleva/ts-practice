export const saveTokenToLocalStorage = (token: string) => {
  localStorage.token = token;
};

export const getTokenFromLocalStorage = () => {
  window.token = localStorage.token;
};

export const checkUserEmail = (email: string) => {
  if (
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  )
    return true;
  return false;
};

export const checkUserPassword = (password: string) => {
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password))
    return true;
  return false;
};

export const checkUserName = (field: string) => {
  const regexp = /(-?([A-Z].\s)?([A-Z][a-z]+)\s?)+([A-Z]'([A-Z][a-z]+))?/g;
  return regexp.test(field);
};

export const emptyChecker = (value: string) => !!value;
