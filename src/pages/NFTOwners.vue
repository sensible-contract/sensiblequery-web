<template>
  <div>
    <h3> NFT Owners:
      <small>
        <samp>{{ currCodeHash }} / {{ currGenesis }} </samp>
      </small>
    </h3>

    <table class="table">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-center">address (see all NFT hold)</th>
          <th class="text-left">NFT total (see UTXO)</th>
          <th class="text-left">NFT pending total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(info, index) in currOwners">
          <td class="text-right"><samp>{{ index }}</samp></td>

          <td class="text-center">
            <router-link :to="{path:`/nft/summary/${info.address}`}">
              <samp>{{ info.address }}</samp>
            </router-link>
          </td>

          <td class="text-left">
            <router-link :to="{path:`/nft/utxo/${currCodeHash}/${currGenesis}/${info.address}`}">
              <samp>{{ info.count }}</samp>
            </router-link>
          </td>

          <td class="text-left">
              <samp>{{ info.pending_count }}</samp>
          </td>

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
        currOwners: []
      }
    },

    watch: {
      $route(to, from) {
        console.log("watch", this.$route, this.currCodeHash, this.currGenesis)

        if (this.currOwners === undefined) {
          this.currOwners = []
        }

        if (to.path != "/nft/codehash" ) {
          this.viewInfoByCodeHash(to.params.codehash, to.params.genesis)
        }
      }
    },

    created: function () {
      console.log("create", this.$route, this.currCodeHash, this.currGenesis)

      if (this.currOwners === undefined) {
        this.currOwners = []
      }
      if (this.$route.path != "/nft/codehash") {
        this.viewInfoByCodeHash(this.$route.params.codehash, this.$route.params.genesis)
      }
    },

    methods: {
      viewInfoByCodeHash: function (codehash, genesis) {
        console.log(codehash, genesis)
        this.currCodeHash = codehash
        this.currGenesis = genesis
        this.currOwners = []
        this.$root.message = "..."
        axios
          .get(this.$root.apiPoint + "nft/owners/"+ codehash + "/" + genesis)
          .then(
            response => {
              if (response.data.code == 0) {
                this.currOwners = response.data.data
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
