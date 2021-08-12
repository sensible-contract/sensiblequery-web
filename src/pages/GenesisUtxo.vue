<template>
  <div>
    <h3> Genesis UTXO: <small><samp>{{ currGenesis }}</samp></small></h3>
    <router-link :to="{path:`/genesis/${currGenesis}`}"><samp>View History</samp></router-link>
    <table class="table">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-center">utxo</th>
          <th class="text-right">value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(txout, index) in currGenesisTxOuts">
          <td class="text-right"><samp>{{ index }}</samp></td>
          <td class="text-left">
            <router-link :to="{path:`/tx/${txout.height}/${txout.txid}`}">
              <samp>{{ txout.txid }}:{{ txout.vout }}</samp>
            </router-link>
            <div>
              <small><samp>script: {{ txout.scriptType }}</samp></small>
            </div>
            <div v-if="txout.genesis != '' && txout.genesis != '00'">
              <router-link :to="{path:`/address/${txout.address}`}">
                <small><samp>address: {{ txout.address }}</samp></small>
              </router-link>
            </div>
          </td>
          <td class="text-right"><samp>{{ txout.satoshi/100000000.0 }}</samp></td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data: function () {
      return {
        currGenesis: "",
        currGenesisTxOuts: []
      }
    },

    watch: {
      $route(to, from) {
        console.log("watch", this.$route, this.currBlockTxs)

        if (this.currGenesisTxOuts === undefined) {
          this.currGenesisTxOuts = []
        }

        if (to.path != "/genesis-utxo" ) {
          this.viewTxOutpointByGenesis(to.params.genesis)
        }
      }
    },

    created: function () {
      console.log("create", this.$route, this.currBlockTxs)

      if (this.currGenesisTxOuts === undefined) {
        this.currGenesisTxOuts = []
      }
      if (this.$route.path != "/genesis-utxo") {
        this.viewTxOutpointByGenesis(this.$route.params.genesis)
      }
    },

    methods: {
      viewTxOutpointByGenesis: function (genesis) {
        console.log(genesis)
        this.currGenesis = genesis
        this.currGenesisTxOuts = []
        this.$root.message = "..."
        axios
          .get(this.$root.apiPoint + "genesis/"+ genesis +"/utxo")
          .then(
            response => {
              if (response.data.code == 0) {
                this.currGenesisTxOuts = response.data.data
                this.$root.message = response.data.msg
              } else {
                this.$root.message = "empty utxo"
              }
            }
          )
      },
    }

  }
</script>
