import Moralis from "moralis";
import {login} from "./user";

export const getNFTsImage = async (formatsFilter) => {
    try {
        const response = await Moralis.Web3API.account.getNFTs();

        const userEthNFTs = response.result;
        const NFTsWithMetadata = userEthNFTs.filter(nft => nft.metadata);
        const images = NFTsWithMetadata.map(nft => JSON.parse(nft.metadata).image);

        if (formatsFilter.length !== 0) {
            return images.filter(image => {
                for (let i = 0; i < formatsFilter.length; i++) {
                    const result = image.endsWith(formatsFilter[i]);
                    if (result) return image;
                }
            });
        }

        return images;
    } catch {
        return [];
    }
};

export const getAllNFTs = async (formatsFilter = []) => {
    try {
        const user = await login();

        if (!user) {
            return [];
        } else {
            return await getNFTsImage(formatsFilter);
        }
    } catch {
        return [];
    }
};