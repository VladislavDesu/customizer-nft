import axios from "axios";

export const OpenseaServices = {
    async getAllNFTsByAddress(url, address, cursor, limit) {
        const hasCursor = cursor ? "&cursor=" + cursor: "";
        const GET_ASSETS = url + "assets";

        return await axios.get(`${GET_ASSETS}?owner=${address}&limit=${limit}${hasCursor}`);
    },
};