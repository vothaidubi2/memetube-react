import axios from "axios"

class ChannelAPI{
    getOneItem = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data)
    }
}
export default new ChannelAPI