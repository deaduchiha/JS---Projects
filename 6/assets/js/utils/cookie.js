const setCookie = (data) => {
  document.cookie = `token=${data}; max-age:${24 * 60 * 60}; path=/;`;
};

const getCookie = () => {
  const cookie = document.cookie;

  if (cookie) {
    const spitedCookie = cookie.split("=");

    return {
      [spitedCookie[0]]: spitedCookie[1],
    };
  } else {
    return false;
  }
};

export { setCookie, getCookie };
