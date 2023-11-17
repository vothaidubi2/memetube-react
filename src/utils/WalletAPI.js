import axios from "axios"

class WalletAPI {
    getUser = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    getAll = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data);
    }
}
export default new WalletAPI