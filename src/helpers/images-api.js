import axios from "axios";

const UNSPLASH_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_KEY = "Client-ID tSV24TxZuwntbIF_uG_gKPio8HDIDnPkONhO9vkHNyc";

export const fetchUnsplashImages = async (queryString, page) => {
    const response = await axios.get(UNSPLASH_URL, {
        headers: {
            Authorization: UNSPLASH_KEY,
            Accept_version: "v1",
        },
        params: {
            query: queryString,
            page: page,
            per_page: 12,
        },
    });
    return response.data;
};
