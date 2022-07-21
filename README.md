# customizer-nft v2.1.0

The Customizer NFT is a library for get all NFTs

## Installation

Using npm:

```bash
  $ npm i customizer-nft
 ```

## Code Example

```javascript
import {useCustomizerNFT} from "customizer-nft";

function App() {
    const [address, setAddress] = useState(null);
    const [listNFTs, setListNFTs] = useState(null);

    const {
        isWalletInstalled,
        eventChangeAccount,
        getAllNFTs,
        connectWallet,
    } = useCustomizerNFT();

    useEffect(() => {
        isWalletInstalled().then(account => setAddress(account));
    }, []);

    useEffect(() => {
        eventChangeAccount(setAddress);
    }, []);

    useEffect(() => {
        getAllNFTs(address).then(NFTs => setListNFTs(NFTs));
    }, [address]);

    const handleConnectWallet = () => {
        connectWallet().then(r => setAddress(r));
    };

    return (
        <div className="App">
            <button onClick={handleConnectWallet}>Connect Wallet</button>

            <div className="list">
                {
                    listNFTs !== null ? listNFTs.map((nft, index) => {
                        return <img src={nft}/>
                    }) : null
                }
            </div>
        </div>
    );
}

export default App;
```

## Package Reference


### useCustomizerNFT

returns object with all functions

```javascript
const {
    isWalletInstalled,
    eventChangeAccount,
    getAllNFTs,
    connectWallet,
} = useCustomizerNFT();
```


### isWalletInstalled

check if wallet is installed and connected

```javascript
useEffect(() => {
    isWalletInstalled().then(account => setAddress(account));
}, []);
```


### eventChangeAccount

check if user changed account in metamask

```javascript
useEffect(() => {
    eventChangeAccount(setAddress);
}, []);
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `dispatch` | `Dispatch<SetStateAction<string>>` | **Required**. Set address state |


### getAllNFTs

get all NFTs used user address and return array with images link

```javascript
useEffect(() => {
    getAllNFTs(address).then(NFTs => setListNFTs(NFTs));
}, [address]);
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `address` | `string` | **Required**. user address from metamask |
| `net` | `mainnet testnet` | **Not Required**. Default state is mainnet, looking for all nfts in mainnet. Second state is testnet looking for nfts in testnet |
| `formatsFilter` | `string[]` | **Not Required**. Default is []. Filter with image format. Example ['.png', '.svg', '.jpg'] |
| `limit` | `number` | **Not Required**. Default is 200 and this max value. Get 200 nfts from account for 1 request. If user has more than limit, make requests after not get all nfts from account |


### connectWallet

connect wallet after click button event

```javascript
const handleConnectWallet = () => {
    connectWallet().then(r => setAddress(r));
};
```