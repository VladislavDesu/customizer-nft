export const useProvider = (ethereum) => {
    if (ethereum.providers) {
        const provider = ethereum.providers.find((provider) => provider.isMetaMask);
        return provider ? provider : null;
    } else {
        return ethereum.isMetaMask ? ethereum : null;
    }
};