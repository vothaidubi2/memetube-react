import axios from "axios"

class UsersAPI{
    sendUser = async (url,data) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url,data ,{
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    updateUser = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
        
    }
    receiveUserByToken = async (url,token ) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` ${token}`
            }
        };
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url, null, config);    
    }
}
export default new UsersAPI