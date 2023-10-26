import axios from "axios"

class CommentAPI{
    getAllBaseCmt = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    postComment = async (url) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url)
    }
}
export default new CommentAPI