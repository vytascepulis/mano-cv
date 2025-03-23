import { NextApiResponse } from "next";

export const setCookie = (name: string, value: string, hours: number): void => {
  if (!name || !value || !hours) {
    console.error("Error setting cookie");
    return;
  }

  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);

  const expires = date.toUTCString();

  document.cookie = name + "=" + value + `;expires=${expires};path=/`;
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : null;
};

export const setResponseCookie = (res: NextApiResponse) => {};
