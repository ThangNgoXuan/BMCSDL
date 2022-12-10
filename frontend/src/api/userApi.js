import axiosClient from "./axiosClient";

const userApi = {
    getUser: () => {
        const url = '/user';
        return axiosClient.get(url);
    }
}

export default userApi;