import Moralis from "moralis";
import {logout} from "./user";
import {getAllNFTs} from "./getNFTs";

export const useCustomizerNFT = (serverUrl, appId) => {
    Moralis.start({serverUrl, appId});

    return {
        logout,
        getAllNFTs
    }
}