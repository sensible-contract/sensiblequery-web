
let blocks = require('./pages/Blocks.vue')
let transactions = require('./pages/Txs.vue')
let transaction = require('./pages/Tx.vue')
let address = require('./pages/Address.vue')
let utxo = require('./pages/Utxo.vue')
let genesis = require('./pages/Genesis.vue')
let genesisUtxo = require('./pages/GenesisUtxo.vue')

export default [
  { path: '/', component: blocks },
  { path: '/blocks', component: blocks },
  { path: '/txs', component: transactions },
  { path: '/tx', component: transaction },
  { path: '/address', component: address },
  { path: '/utxo', component: utxo },
  { path: '/genesis', component: genesis },
  { path: '/genesis-utxo', component: genesisUtxo },


  { path: '/blocks/id/:blkid', component: blocks },
  { path: '/blocks/:height', component: blocks },

  { path: '/txs-of-blkid/:blkid', component: transactions },
  { path: '/txs/:height/:blkid', component: transactions },

  { path: '/txid/:txid', component: transaction },
  { path: '/tx/:height/:txid', component: transaction },

  { path: '/txout/:txid/:vout', component: transaction },
  { path: '/address/:address', component: address },
  { path: '/utxo/:address', component: utxo },

  { path: '/genesis/:genesis', component: genesis },
  { path: '/genesis-utxo/:genesis', component: genesisUtxo }

]
