import axios from "axios"

class UsersAPI {
    sendUser = async (url, data) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    sendEmail = async (url, data) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    checkUser = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url,{
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    updateUser = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
        
    }
    updateStatus = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
        
    }
    updateRole = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
        
    }
    forgotPass = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
        
    }
    updateBalance = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data)
    }
    setBalance = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data)
    }
    receiveUserByToken = async (url, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` ${token}`
            }
        };
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url, null, config);
    }
    getall = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data)
    }
}
export default new UsersAPI