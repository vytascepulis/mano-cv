export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return undefined;
}

export function setCookie(name: string, value: string, expiresInDays: number) {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  const maxAge = expiresInDays * 24 * 60 * 60;

  const expiryDate = new Date();
  expiryDate.setTime(
    expiryDate.getTime() + expiresInDays * 24 * 60 * 60 * 1000,
  );
  cookieStr += `; max-age=${maxAge}`;

  cookieStr += "; path=/";
  document.cookie = cookieStr;
}
