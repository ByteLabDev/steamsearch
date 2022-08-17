# steamsearch

SteamSearch searches for apps on the Steam store.


## Usage

```javascript
const { steamSearch } = require(`@bytelab/steamsearch`);

steamSearch(`Half-Life`, `us`).then(game=>{
    console.log(game.price_overview.final_formatted);
    // Returns $9.99
})

steamSearch(`Portal`, `gb`).then(game=>{
    console.log(game.price_overview.final_formatted);
    // Returns £7.19
})

steamSearch(`Team Fortress 2`, `us`).then(game=>{
    console.log(game.release_date.date);
    // Returns Oct 10, 2007
})
```