export type logout = () => Promise<void>;
export type getAllNFTs = (formatsFilter?: string[]) => Promise<string[]>;
export type useCustomizerNFT = (serverUrl: string, appId: string) => {  getAllNFTs: getAllNFTs, logout?: logout };

declare const useCustomizerNFT: useCustomizerNFT;