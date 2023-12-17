import axios from "axios"

class TrendingAPI{
    getAllVideoTrend = async (url) => {
        return await fetch(process.env.REACT_APP_BASE_DOMAIN + url)
            .then((res) => res.json())
            .then(data => data.data);
    }
    PostVideo = async (url) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url)
            .then(data => data.data);
    }
}
export default new TrendingAPI