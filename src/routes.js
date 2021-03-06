
let blocks = require('./pages/Blocks.vue')
let transactions = require('./pages/Txs.vue')
let mempool = require('./pages/Mempool.vue')
let transaction = require('./pages/Tx.vue')
let address = require('./pages/Address.vue')
let utxo = require('./pages/Utxo.vue')

// nft
let nftCodehash = require('./pages/NFTCodeHash.vue')
let nftCodehashInfo = require('./pages/NFTCodeHashInfo.vue')

let nftOwners = require('./pages/NFTOwners.vue')
let nftUtxo = require('./pages/NFTUtxo.vue')
let nftHistory = require('./pages/NFTHistory.vue')
let nftAddressSummary = require('./pages/NFTAddressSummary.vue')

// ft
let ftCodehash = require('./pages/FTCodeHash.vue')
let ftCodehashInfo = require('./pages/FTCodeHashInfo.vue')

let ftOwners = require('./pages/FTOwners.vue')
let ftUtxo = require('./pages/FTUtxo.vue')
let ftHistory = require('./pages/FTHistory.vue')
let ftAddressSummary = require('./pages/FTAddressSummary.vue')

export default [
  { path: '/', component: blocks },
  { path: '/blocks', component: blocks },
  { path: '/txs', component: transactions },
  { path: '/mempool', component: mempool },
  { path: '/tx', component: transaction },
  { path: '/address', component: address },
  { path: '/utxo', component: utxo },

  { path: '/nft/codehash', component: nftCodehash },
  { path: '/nft/codehash/:codehash', component: nftCodehashInfo },
  { path: '/nft/owners/:codehash/:genesis', component: nftOwners },
  { path: '/nft/utxo/:codehash/:genesis/:address', component: nftUtxo },
  { path: '/nft/history/:codehash/:genesis/:address', component: nftHistory },
  { path: '/nft/summary/:address', component: nftAddressSummary },

  { path: '/ft/codehash', component: ftCodehash },
  { path: '/ft/codehash/:codehash', component: ftCodehashInfo },
  { path: '/ft/owners/:codehash/:genesis', component: ftOwners },
  { path: '/ft/utxo/:codehash/:genesis/:address', component: ftUtxo },
  { path: '/ft/history/:codehash/:genesis/:address', component: ftHistory },
  { path: '/ft/summary/:address', component: ftAddressSummary },

  { path: '/blocks/id/:blkid', component: blocks },
  { path: '/blocks/:height', component: blocks },

  { path: '/txs-of-blkid/:blkid', component: transactions },
  { path: '/txs/:height/:blkid', component: transactions },

  { path: '/txid/:txid', component: transaction },
  { path: '/tx/:height/:txid', component: transaction },

  { path: '/txout/:txid/:vout', component: transaction },
  { path: '/address/:address', component: address },
  { path: '/utxo/:address', component: utxo },
]
