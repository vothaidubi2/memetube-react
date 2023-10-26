import  Cookie  from 'js-cookie';
const removeCookie=(nameCookie) => {
    Cookie.remove(nameCookie)
};
export default removeCookie;