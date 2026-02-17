import axios from 'axios';

const HttpClient = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/`,
});

export default HttpClient;

export const localHttpClient = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_LOCAL_API_URL}/`
});

export function setHttpClientUserAuthData(login: string, passwordHash: string) {
    HttpClient.defaults.params = {
        userlogin: login,
        userpsw: passwordHash
    };
    localHttpClient.defaults.params = {
        login,
        password: passwordHash
    };
}
