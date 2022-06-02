# customizer-nft
> npm i customizer-nft

## Code Example
```javascript
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

#### returns object with all functions

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

#### getAllNFTs

#### returns array with NFTs paths or empty array

```javascript
    const allNFTs = await getAllNFTs();
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `formatsFilter` | `string[]` | **Not Required**. Array with need formats NFTs path. **Default**. Empty array.  |