<template>
  <div>
    <h3> NFT Address Summary:
      <small>
        <samp>{{ currAddress }} </samp>
      </small>
    </h3>

    <table class="table">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-center">codehash (see all genesis)</th>
          <th class="text-center">genesis (see all owners)</th>
          <th class="text-left"> count (UTXO)</th>
          <th class="text-left"> pending</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(info, index) in currSummarys">
          <td class="text-right"><samp>{{ index }}</samp></td>

          <td class="text-center">
            <router-link :to="{path:`/nft/codehash/${info.codehash}`}">
              <samp><small>{{ info.codehash }}</small></samp>
            </router-link>
          </td>

          <td class="text-center">
            <router-link :to="{path:`/nft/owners/${info.codehash}/${info.genesis}`}">
              <samp><small>{{ info.genesis }}</small></samp>
            </router-link>
          </td>

          <td class="text-left">
            <router-link :to="{path:`/nft/utxo/${info.codehash}/${info.genesis}/${currAddress}`}">
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
        currAddress: "",
        currSummarys: []
      }
    },

    watch: {
      $route(to, from) {
        console.log("watch", this.$route, this.currAddress)

        if (this.currSummarys === undefined) {
          this.currSummarys = []
        }

        if (to.path != "/nft/summary" ) {
          this.viewTokenSummaryByAddress(to.params.address)
        }
      }
    },

    created: function () {
      console.log("create", this.$route, this.currAddress)

      if (this.currSummarys === undefined) {
        this.currSummarys = []
      }
      if (this.$route.path != "/nft/summary") {
        this.viewTokenSummaryByAddress(this.$route.params.address)
      }
    },

    methods: {
      viewTokenSummaryByAddress: function (address) {
        this.currAddress = address
        this.currSummarys = []
        this.$root.message = "..."
        axios
          .get(this.$root.apiPoint + "nft/summary/"+ address)
          .then(
            response => {
              if (response.data.code == 0) {
                this.currSummarys = response.data.data
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
