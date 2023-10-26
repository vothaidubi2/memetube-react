import axios from "axios"

class ImageAPI {
    uploadImage = async (url, content) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url, content)
            .then(data => data.data)
    }
}
export default new ImageAPI