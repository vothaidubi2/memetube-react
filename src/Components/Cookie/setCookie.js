import  Cookie  from 'js-cookie';
const setCookie=(nameCookie,titleCookie) => {
    var d=new Date();
      d.setTime(d.getTime()+(1*60*60*1000)); //1hour 
    Cookie.set(nameCookie,titleCookie,{
        expires:d,
        secure: true,
        sameSite:'None',
        path:'/'
    })
};
export default setCookie;