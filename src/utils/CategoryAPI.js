import axios from "axios"

class CategoryAPI{
    getAll = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    getOneItem = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data)
    }
    updateStatus = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
        
    }
    sendUser = async (url, data) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    updateCategory = async (url,data) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url,data,{
            headers: {
                'Content-Type': 'application/json',
            },})
        
    }
    addCategory = async (url) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data)
    }
    // addRate = async (url) => {
    //     return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url)
    // }
    // updateRate = async (url) => {
    //     return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
    // }
    // deleteRate = async (url) => {
    //     return await axios.delete(process.env.REACT_APP_BASE_DOMAIN + url)
    // }
}
export default new CategoryAPI