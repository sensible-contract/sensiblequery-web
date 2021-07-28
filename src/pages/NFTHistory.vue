<template>
  <div>
    <h3> NFT History:
      <small>
        <samp>{{ currCodeHash }} / {{ currGenesis }} / {{ currAddress }} </samp>
      </small>
    </h3>
    <router-link :to="{path:`/nft/utxo/${currCodeHash}/${currGenesis}/${currAddress}`}"><samp>View UTXO</samp></router-link>

    <table class="table">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-center">UTXO</th>
          <th class="text-right">tokenIndex</th>
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
            <samp v-if="txout.height == 4294967295">
              <span class="badge badge-warning">Unconfirmed</span>
            </samp>

          </td>
          <td class="text-right">
            <span class="badge badge-success">NFT {{txout.tokenIndex}}</span>
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

        if (to.path != "/nft/utxo" ) {
          this.viewInfoByCodeHash(to.params.codehash, to.params.genesis, to.params.address)
        }
      }
    },

    created: function () {
      console.log("create", this.$route, this.currCodeHash, this.currGenesis, this.currAddress)

      if (this.currUTXOs === undefined) {
        this.currUTXOs = []
      }
      if (this.$route.path != "/nft/utxo") {
        this.viewInfoByCodeHash(this.$route.params.codehash, this.$route.params.genesis, this.$route.params.address)
      }
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
          .get(this.$root.apiPoint + "nft/history/"+ codehash + "/" + genesis + "/" + address)
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
