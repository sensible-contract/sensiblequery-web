<template>
  <div>
    <h3> Address UTXO: <small>{{ currAddress }}</small></h3>
    <router-link :to="{path:`/address/${currAddress}`}"><samp>View History</samp></router-link>

    <div class="row">
      <div class="col">

        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="text-left"> Balance: </th>
              <th class="text-left"> <samp> {{ currBalance.satoshi/100000000.0 }} </samp></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="text-left"> Pending Balance: </samp></th>
              <th class="text-left"> <samp> {{ currBalance.pendingSatoshi/100000000.0 }} </samp></th>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-center">utxo</th>
          <th class="text-right">satoshi</th>
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
            <div v-if="txout.genesis != '' && txout.genesis != '00' && txout.genesis != undefined">
              <router-link :to="{path:`/genesis/${txout.genesis}`}">
                <small><samp>genesis: {{ txout.genesis }}</samp></small>
              </router-link>
            </div>
            <samp v-if="txout.height == 4294967295">
              <span class="badge badge-warning">Unconfirmed</span>
            </samp>

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
        currBalance: {},
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
          this.getAddressBalance(to.params.address)
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
        this.getAddressBalance(this.$route.params.address)
      }
    },

    methods: {
      getAddressBalance: function (address) {
        axios
          .get(this.$root.apiPoint + "address/" + address + "/balance")
          .then(
            response => {
              this.currBalance = response.data.data
              this.$root.message = response.data.msg
            }
          )
      },

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
