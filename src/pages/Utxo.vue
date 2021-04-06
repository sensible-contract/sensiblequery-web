<template>
  <div>
    <h3> Address UTXO: <small>{{ currAddress }}</small></h3>
    <router-link :to="{path:`/address/${currAddress}`}"><samp>View History</samp></router-link>

    <table class="table">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-center">utxo</th>
          <th class="text-right">value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(txout, index) in currAddressTxOuts">
          <td class="text-right"><samp>{{ index }}</samp></td>
          <td class="text-left">
            <router-link :to="{path:`/tx/${txout.height}/${txout.txid}`}">
              <samp>{{ txout.txid }}:{{ txout.vout }}</samp>
            </router-link>
            <div>
              <small><samp>script: {{ txout.scriptType }}</samp></small>
            </div>
            <div v-if="txout.genesis != '00'">
              <router-link :to="{path:`/genesis/${txout.genesis}`}">
                <small><samp>genesis: {{ txout.genesis }}</samp></small>
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
        currAddress: "",
        currAddressTxOuts: []
      }
    },

    watch: {
      $route(to, from) {
        console.log("watch", this.$route, this.currBlockTxs)

        if (this.currAddressTxOuts === undefined) {
          this.currAddressTxOuts = []
        }

        if (to.path != "/utxo" ) {
          this.viewTxOutpointByAddress(to.params.address)
        }
      }
    },

    created: function () {
      console.log("create", this.$route, this.currBlockTxs)

      if (this.currAddressTxOuts === undefined) {
        this.currAddressTxOuts = []
      }
      if (this.$route.path != "/utxo") {
        this.viewTxOutpointByAddress(this.$route.params.address)
      }
    },

    methods: {
      viewTxOutpointByAddress: function (address) {
        console.log(address)
        this.currAddress = address
        this.currAddressTxOuts = []
        this.$root.message = "..."
        axios
          .get(this.$root.apiPoint + "address/"+ address +"/utxo")
          .then(
            response => {
              if (response.data.code == 0) {
                this.currAddressTxOuts = response.data.data
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
