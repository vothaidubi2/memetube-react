import axios from "axios"
class VideoAPI {
    getallData = async (url) => {
        return await fetch(process.env.REACT_APP_BASE_DOMAIN + url)
            .then((res) => res.json())
            .then(data => data.data);
    }
    getallByUser = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
        .then(data => data.data)
    }
    getByCate = async (url) => {
        return await fetch(process.env.REACT_APP_BASE_DOMAIN + url)
            .then((res) => res.json())
            .then(data => data.data);
    }
    searchData = async (url) => {
        return await fetch(process.env.REACT_APP_BASE_DOMAIN + url)
            .then((res) => res.json())
            .then(data => data.data);
    }
    getOneItem = async (url) => {
        return await axios.get(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    deleteItem = async (url) => {
        return await axios.delete(process.env.REACT_APP_BASE_DOMAIN + url)
    }
    postVideo = async (url,content) => {
        return await axios.post(process.env.REACT_APP_BASE_DOMAIN + url, content)
            .then(data => data);
    }
    updateVideo = async (url,content) => {
        return await axios.put(process.env.REACT_APP_BASE_DOMAIN + url, content)
            .then(data => data);
    }

    setCount = async (url) => {
        return await
            fetch(process.env.REACT_APP_BASE_DOMAIN + url, {
                method: 'PUT',
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('View count increased successfully');
                        // Nếu bạn muốn xử lý thêm điều gì đó sau khi tăng view count, bạn có thể thực hiện ở đây.
                    } else if (response.status === 404) {
                        console.error('Video not found');
                        // Xử lý khi video không được tìm thấy
                    } else {
                        console.error('Failed to increase view count');
                        // Xử lý lỗi khác
                    }
                })
    }
}
export default new VideoAPI;