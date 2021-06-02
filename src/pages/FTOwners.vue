<template>
  <div>
    <h3> FT Owners:
      <small>
        <samp>{{ currCodeHash }} / {{ currGenesis }} </samp>
      </small>
    </h3>

    <table class="table">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-center">address (see all FT hold)</th>
          <th class="text-left">FT balance (see UTXO)</th>
          <th class="text-left">pending</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(info, index) in currOwners">
          <td class="text-right"><samp>{{ index }}</samp></td>

          <td class="text-center">
            <router-link :to="{path:`/ft/summary/${info.address}`}">
              <samp>{{ info.address }}</samp>
            </router-link>
          </td>

          <td class="text-left">
            <router-link :to="{path:`/ft/utxo/${currCodeHash}/${currGenesis}/${info.address}`}">
              <span class="badge badge-info">FT: {{info.balance / (10**info.decimal)}}</span>
            </router-link>
          </td>

          <td class="text-left">
            <span class="badge badge-info">FT: {{info.pendingBalance / (10**info.decimal)}}</span>
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

        this.viewInfoByCodeHash(to.params.codehash, to.params.genesis)
      }
    },

    created: function () {
      console.log("create", this.$route, this.currCodeHash, this.currGenesis)

      if (this.currOwners === undefined) {
        this.currOwners = []
      }

      this.viewInfoByCodeHash(this.$route.params.codehash, this.$route.params.genesis)
    },

    methods: {
      viewInfoByCodeHash: function (codehash, genesis) {
        console.log(codehash, genesis)
        this.currCodeHash = codehash
        this.currGenesis = genesis
        this.currOwners = []
        this.$root.message = "..."
        axios
          .get(this.$root.apiPoint + "ft/owners/"+ codehash + "/" + genesis)
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
