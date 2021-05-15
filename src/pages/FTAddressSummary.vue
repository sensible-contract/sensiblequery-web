<template>
  <div>
    <h3> FT Address Summary:
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
          <th class="text-left">FT balance (see UTXO)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(info, index) in currSummarys">
          <td class="text-right"><samp>{{ index }}</samp></td>

          <td class="text-center">
            <router-link :to="{path:`/ft/codehash/${info.codehash}`}">
              <samp><small>{{ info.codehash }}</small></samp>
            </router-link>
          </td>

          <td class="text-center">
            <router-link :to="{path:`/ft/owners/${info.codehash}/${info.genesis}`}">
              <samp><small>{{ info.genesis }}</small></samp>
            </router-link>
          </td>

          <td class="text-left">
            <router-link :to="{path:`/ft/utxo/${info.codehash}/${info.genesis}/${currAddress}`}">
              <samp>{{ info.balance }}</samp>
            </router-link>
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

        if (to.path != "/ft/summary" ) {
          this.viewTokenSummaryByAddress(to.params.address)
        }
      }
    },

    created: function () {
      console.log("create", this.$route, this.currAddress)

      if (this.currSummarys === undefined) {
        this.currSummarys = []
      }
      if (this.$route.path != "/ft/summary") {
        this.viewTokenSummaryByAddress(this.$route.params.address)
      }
    },

    methods: {
      viewTokenSummaryByAddress: function (address) {
        this.currAddress = address
        this.currSummarys = []
        this.$root.message = "..."
        axios
          .get(this.$root.apiPoint + "ft/summary/"+ address)
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
