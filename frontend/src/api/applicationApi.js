import axiosClient from "./axiosClient";

const ApplicationApi = {
    createApplication: (data) => {
        const url = '/';
        return axiosClient.post(url, data);
    }
}

export default ApplicationApi;