import axios from "axios"

class RatingAPI{
    countRating = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    getLikedvideo = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    getOneItem = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    addRate = async (url) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    updateRate = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    deleteRate = async (url) => {
        return await axios.delete(process.env.REACT_APP_BASE_DOMAIN + url)
    }
}
export default new RatingAPI