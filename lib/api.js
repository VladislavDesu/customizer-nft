import axios from "axios";

const URL = "https://api.opensea.io/api/v1/";
const GET_ASSETS = URL + "assets";

export const OpenseaServices = {
    async getAllNFTsByAddress(address, cursor, limit) {
        const hasCursor = cursor ? "&cursor=" + cursor: "";

        return await axios.get(`${GET_ASSETS}?owner=${address}&limit=${limit}${hasCursor}`);
    },
};