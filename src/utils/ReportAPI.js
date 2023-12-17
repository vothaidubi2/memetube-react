import axios from "axios"

class ReportAPI{
    getAll = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    createReport = async (url) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    deleteReport = async (url) => {
        return await axios.delete(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    deleteVideoReport = async (url) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url)
    }
}
export default new ReportAPI