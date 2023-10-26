import Cookie from "js-cookie";
const getCookie = (nameCookie) => {
  return Cookie.get(nameCookie);
};
export default getCookie;
