export type isWalletInstalled = () => Promise<string | null>;
export type connectWallet = () => Promise<string | null>;
export type eventChangeAccount = (dispatch: any) => null | void;
export type getAllNFTs = (address: string | null, formatsFilter?: string[], limit?: number) => Promise<string[]>;

export type useCustomizerNFT = () => {
    isWalletInstalled: isWalletInstalled,
    connectWallet: connectWallet,
    eventChangeAccount: eventChangeAccount,
    getAllNFTs: getAllNFTs,
};

declare const useCustomizerNFT: useCustomizerNFT;