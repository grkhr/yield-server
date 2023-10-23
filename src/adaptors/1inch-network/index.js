

// interface Pool {
//   pool: string;
//   chain: string;
//   project: string;
//   symbol: string;
//   tvlUsd: number; // for lending protocols: tvlUsd = totalSupplyUsd - totalBorrowUsd
//   apyBase?: number;
//   apyReward?: number;
//   rewardTokens?: Array<string>;
//   underlyingTokens?: Array<string>;
//   poolMeta?: string;
//   url?: string;
//   // optional lending protocol specific fields:
//   apyBaseBorrow?: number;
//   apyRewardBorrow?: number;
//   totalSupplyUsd?: number;
//   totalBorrowUsd?: number;
//   ltv?: number; // btw [0, 1]
// }


const utils = require('../utils');

const ADDRESSES = {
  ethereum: {
    "1INCH": "0x111111111117dc0aa78b770fa6a738034120c302",
    "dst1INCH": "0x9a0c8ff858d273f57072d714bca7411d717501d7",
  }
}

const main = async() => {
  const data = await utils.getData('https://data-distributor.1inch.io/resolversMetrics');
  // {"2023-10-23":[{"pool":"0xa621..b902","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":127.95404554545392,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0xa260..ac8a","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":694978.8341799953,"apyBase":11.563471972685235,"rewardTokens":["1INCH"]},{"pool":"0x21b7..118c","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":42.15094804020425,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0xee23..8509","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":924.9664523216197,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0x12e5..74ac","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":1617.487016151582,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0x1113..b3f1","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":0.20153242227003756,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0xd7f6..fb49","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":735102.3156701425,"apyBase":11.099164985159451,"rewardTokens":["1INCH"]},{"pool":"0x754b..17b8","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":26102.454532776377,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0xdcdf..c995","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":1380294.724107885,"apyBase":11.635739625376099,"rewardTokens":["1INCH"]},{"pool":"0xb215..95ce","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":12670.167615976594,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0x7c70..09bb","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":12.56933145792982,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0xc975..6a2c","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":38853.76602889513,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0xcfa6..116f","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":782.2577259646835,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0xe023..2a41","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":737806.149206311,"apyBase":12.11121273094004,"rewardTokens":["1INCH"]},{"pool":"0x05d1..752b","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":119.48683172546718,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0xf633..e91a","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":976512.3091588165,"apyBase":10.083479140659328,"rewardTokens":["1INCH"]},{"pool":"0x6850..6255","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":51.971137454192764,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0x74c6..adb0","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":43.96013995196832,"apyBase":0.0,"rewardTokens":["1INCH"]},{"pool":"0xaf38..d2af","chain":"Ethereum","project":"1inch-network","symbol":"dst1INCH","tvlUsd":4367.914345812277,"apyBase":0.0,"rewardTokens":["1INCH"]}]}
  const result = Object.values(data)[0].map((pool) => {
    return {
      pool: `${pool.pool}-${pool.chain}`.toLowerCase(),
      chain: utils.formatChain(pool.chain),
      project: "1inch-network",
      symbol: utils.formatSymbol(pool.symbol), // ??? or 1inch
      tvlUsd: Number(pool.tvlUsd),
      apyBase: Number(pool.apyBase),
      url: `https://app.1inch.io/#/1/earn/delegate/${pool.pool}`,
      rewardTokens: pool.rewardTokens,
      underlyingTokens: [
        ADDRESSES[pool.chain.toLowerCase()]['1INCH'],
        ADDRESSES[pool.chain.toLowerCase()]['dst1INCH'],
      ]
    }
  });
  return result;
};

module.exports = {
  timetravel: false,
  apy: main,
  url: "https://app.1inch.io/#/1/dao/staking",
};



