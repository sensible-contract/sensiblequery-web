<template>
  <div>
    <h3> NFT CodeHash Info:
      <small>
        <samp>{{ currCodeHash }}</samp>
      </small>
    </h3>

    <table class="table">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-center">genesis (see all owners)</th>
          <th class="text-right">NFT total</th>
          <th class="text-right">in times</th>
          <th class="text-right">out times</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(info, index) in currCodeHashInfos">
          <td class="text-right"><samp>{{ index }}</samp></td>
          <td class="text-left">
            <router-link :to="{path:`/nft/owners/${info.codehash}/${info.genesis}`}">
              <samp>{{ info.genesis }}</samp>
            </router-link>
          </td>
          <td class="text-right">
            <samp>{{ info.count }}</samp>
          </td>
          <td class="text-right">
            <samp>+{{ info.inTimes }}</samp>
          </td>
          <td class="text-right">
            <code>-{{ info.outTimes }}</code>
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
        currCodeHashInfos: []
      }
    },

    watch: {
      $route(to, from) {
        console.log("watch", this.$route, this.currCodeHash)

        if (this.currCodeHashInfos === undefined) {
          this.currCodeHashInfos = []
        }

        if (to.path != "/nft/codehash" ) {
          this.viewInfoByCodeHash(to.params.codehash)
        }
      }
    },

    created: function () {
      console.log("create", this.$route, this.currCodeHash)

      if (this.currCodeHashInfos === undefined) {
        this.currCodeHashInfos = []
      }
      if (this.$route.path != "/nft/codehash") {
        this.viewInfoByCodeHash(this.$route.params.codehash)
      }
    },

    methods: {
      viewInfoByCodeHash: function (codehash) {
        console.log(codehash)
        this.currCodeHash = codehash
        this.currCodeHashInfos = []
        this.$root.message = "..."
        axios
          .get(this.$root.apiPoint + "nft/codehash-info/"+ codehash)
          .then(
            response => {
              if (response.data.code == 0) {
                this.currCodeHashInfos = response.data.data
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
