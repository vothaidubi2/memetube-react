import axios from "axios"

class WalletAPI {
    getUser = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
    }
}
export default new WalletAPI