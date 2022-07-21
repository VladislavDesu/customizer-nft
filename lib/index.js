import {useProvider} from "./hooks/useProvider";
import {OpenseaServices} from "./api";

export const useCustomizerNFT = () => {
    const provider = useProvider(window.ethereum);

    const connectWallet = async () => {
        if (!provider) {
            window.open(`https://metamask.app.link/dapp/${window.location.host}`);
            return null;
        }

        const accounts = await provider.request({method: "eth_requestAccounts"});
        return accounts[0];
    };

    const isWalletInstalled = async () => {
        try {
            if (!provider) return null;

            const accounts = await provider.request({method: "eth_accounts"});

            if (accounts.length !== 0) {
                return accounts[0];
            }

            return null;
        } catch (error) {
            console.log(error);
        }
    };

    const changeAddress = (accounts, dispatch) => {
        const address = accounts[0];
        dispatch(address ? address : null);
    };

    const eventChangeAccount = (dispatch) => {
        if (!provider) return null;

        const getAddress = (accounts) => {
            changeAddress(accounts, dispatch);
        };

        provider.on("accountsChanged", getAddress);
    }

    const formatNFTsResult = (list, formatsFilter) => {
        const listImages = list.map((item) => {
            const filtered = {
                image: item.image_url,
                imageOriginal: item.image_original_url,
                imagePreview: item.image_preview_url,
            };

            for (const filteredKey in filtered) {
                if (filtered[filteredKey]?.startsWith("ipfs://")) {
                    filtered[filteredKey] = null;
                }
            }

            if (formatsFilter.length !== 0) {
                let result = null;

                for (const filteredKey in filtered) {
                    for (let i = 0; i < formatsFilter.length; i++) {
                        const founded = filtered[filteredKey]?.endsWith(formatsFilter[i].toLowerCase());

                        if (founded) {
                            result = founded;
                            break;
                        }
                    }
                }

                return result ? filtered: null;
            } else {
                return filtered;
            }
        });

        const onlyImage = listImages.map((item) => {
            if (item?.imagePreview) {
                return item.imagePreview;
            } else if (item?.image) {
                return item.image;
            } else if (item?.imageOriginal) {
                return item.imageOriginal;
            } else {
                return null;
            }
        });

        return onlyImage.filter((item) => item);
    }

    const getAllNFTs = async (address, net= "mainnet", formatsFilter = [], limit = 200) => {
        try {
            if (!address) return null;
            let cursor = null;
            let list = null;
            let url = "";

            if (net === "mainnet") {
                url = "https://api.opensea.io/api/v1/";
            }

            if (net === "testnet") {
                url = "https://testnets-api.opensea.io/api/v1/";
            }

            const response = await OpenseaServices.getAllNFTsByAddress(url, address, cursor, limit);

            if (response.data.assets.length === 0) {
                return [];
            }

            list = [...response.data.assets]
            let next = response.data.next;
            cursor = next;

            async function* asyncGenerator() {
                while (cursor !== null) {
                    yield next;
                }
            }

            if (cursor) {
                for await (const currentCursor of asyncGenerator()) {
                    const response = await OpenseaServices.getAllNFTsByAddress(url, address, cursor, limit);

                    list = [...list, ...response.data.assets]
                    next = response.data.next;
                    cursor = next;
                }
            }

            return formatNFTsResult(list, formatsFilter);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        connectWallet,
        isWalletInstalled,
        eventChangeAccount,
        getAllNFTs
    }
}