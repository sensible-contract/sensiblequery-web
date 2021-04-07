<template>
  <div>
    <h3> FT UTXO:
      <small>
        <samp>{{ currCodeHash }} / {{ currGenesis }} / {{ currAddress }} </samp>
      </small>
    </h3>

    <table class="table">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-center">utxo</th>
          <th class="text-right">tokenAmount</th>
          <th class="text-right">satoshi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(txout, index) in currUTXOs">
          <td class="text-right"><samp>{{ index }}</samp></td>
          <td class="text-left">
            <router-link :to="{path:`/tx/${txout.height}/${txout.txid}`}">
              <samp>{{ txout.txid }}:{{ txout.vout }}</samp>
            </router-link>
            <div>
              <small><samp>script: {{ txout.scriptType }}</samp></small>
            </div>
          </td>
          <td class="text-right">
            <span class="badge badge-info">FT {{txout.tokenAmount / (10**txout.tokenDecimal)}}</span>
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
        currCodeHash: "",
        currGenesis: "",
        currAddress: "",
        currUTXOs: []
      }
    },

    watch: {
      $route(to, from) {
        console.log("watch", this.$route, this.currCodeHash, this.currGenesis, this.currAddress)

        if (this.currUTXOs === undefined) {
          this.currUTXOs = []
        }

        this.viewInfoByCodeHash(to.params.codehash, to.params.genesis, to.params.address)
      }
    },

    created: function () {
      console.log("create", this.$route, this.currCodeHash, this.currGenesis, this.currAddress)

      if (this.currUTXOs === undefined) {
        this.currUTXOs = []
      }
      this.viewInfoByCodeHash(this.$route.params.codehash, this.$route.params.genesis, this.$route.params.address)
    },

    methods: {
      viewInfoByCodeHash: function (codehash, genesis, address) {
        console.log(codehash, genesis, address)
        this.currCodeHash = codehash
        this.currGenesis = genesis
        this.currAddress = address
        this.currUTXOs = []
        this.$root.message = "..."
        axios
          .get(this.$root.apiPoint + "ft/utxo/"+ codehash + "/" + genesis + "/" + address)
          .then(
            response => {
              if (response.data.code == 0) {
                this.currUTXOs = response.data.data
                this.$root.message = response.data.msg
              } else {
                this.$root.message = "empty history"
              }
            }
          )
      },
    }

  }
</script>
