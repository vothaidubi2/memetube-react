import axios from "axios"

class SubscriptionAPI{
    getAllVideo = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
    }

}
export default new SubscriptionAPI