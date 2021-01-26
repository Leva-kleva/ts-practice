export const saveTokenToLocalStorage = (token: string) => {
  localStorage.token = token;
};

declare global {
  interface Window {
    token: string;
    authType: string;
  }
}

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

export const emptyChecker = (value: any) => !!value;

export const calculateLevelHeight = (innerWidth: number) => {
  if (innerWidth > 1440) return 145;
  if (innerWidth <= 1440 && innerWidth > 1215) return 160;
  if (innerWidth <= 1215 && innerWidth > 1110) return 180;
  if (innerWidth <= 1100 && innerWidth > 1010) return 200;
  if (innerWidth <= 1010 && innerWidth > 835) return 150;
  if (innerWidth <= 835 && innerWidth > 640) return 170;
  if (innerWidth <= 640 && innerWidth > 548) return 190;
  if (innerWidth <= 548 && innerWidth > 492) return 200;
  if (innerWidth <= 492 && innerWidth > 400) return 220;
  if (innerWidth <= 400) return 300;
};
