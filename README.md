# customizer-nft v1.1.4

The Customizer NFT is a library for get all NFTs from Moralis API

## Installation
Using npm:
```bash
  $ npm i customizer-nft
 ```

Install [types declarations](https://www.npmjs.com/package/types-customizer-nft)
```bash
  $ npm i types-customizer-nft
 ```

## Code Example
```javascript
    import {useCustomizerNFT} from "customizer-nft";

    const [NFTs, setNFTs] = useState();

    const {getAllNFTs} = useCustomizerNFT(
        "https:/YOUR_SERVER_URL/server",
        "YOUR_APP_ID"
    );

    const handleClick = async () => {
        const allNFTs = await getAllNFTs();
        setNFTs(allNFTs);
    };
```

## Package Reference

### useCustomizerNFT

returns object with all functions

```javascript
    const {getAllNFTs} = useCustomizerNFT(
        "https:/YOUR_SERVER_URL/server",
        "YOUR_APP_ID"
    );
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `serverUrl` | `string` | **Required**. Your Server url |
| `appId` | `string` | **Required**. Your App Id key |

### getAllNFTs

returns array with NFTs paths or empty array

```javascript
    const allNFTs = await getAllNFTs();
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `formatsFilter` | `string[]` | **Not Required**. Array with need formats NFTs path. **Default**. Empty array.  |