import axios from "axios"

class ChannelAPI{
    getOneItem = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data)
    }
    getAllItem = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data)
    }
    updateStatus = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
        
    }
    updateChannel = async (url,data) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url,data,{
            headers: {
                'Content-Type': 'application/json',
            },})
        
    }
}
export default new ChannelAPI