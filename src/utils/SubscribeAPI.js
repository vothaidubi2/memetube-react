import axios from "axios"

class SubscribeAPI{
    getOneItem = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    addSub = async (url) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    deleteSub = async (url) => {
        return await axios.delete(process.env.REACT_APP_BASE_DOMAIN + url)
    }
}
export default new SubscribeAPI