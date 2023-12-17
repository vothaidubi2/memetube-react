import axios from "axios"
class NotificationAPI{
    addnotificationOnetoMany = async (url, data) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    addnotificationOnetoOne = async (url, data) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    getNotification = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data)
    }
    updateCheck = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data)
    }
}
export default new NotificationAPI
