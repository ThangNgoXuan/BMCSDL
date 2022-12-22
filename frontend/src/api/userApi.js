import axios from "axios";
import axiosClient from "./axiosClient";

const userApi = {
    getUser: () => {
        const url = '/user';
        return axiosClient.get(url);
    },
    // postLogin: async (params) => {
    //     const myLogin = await axiosClient.post('',params)
    //     return myLogin.data;
    // },
    postLogin: ({data}) => {
        // console.log("qqqq", data);
        const url = '/login';
        return axiosClient.post(url, data);
    },

    getInfoPP: (token) => {
        const url = "/accuracy/infoPP"
        return axiosClient.get(url, token)
    },

    getRegister: ({token}) => {
        const url = "/accuracy/getRegister"
        return axiosClient.get(url, token)
    }
}

export default userApi;