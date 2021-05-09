<template>
  <div class="container-fluent">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand">BSV Browser</a>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/blocks">Block</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/txs">Txs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/tx">Tx</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/address">Address</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/utxo">UTXO</router-link>
          </li>

          <li class="nav-item">
              <router-link class="nav-link" to="/nft/codehash">NFTCode</router-link>
          </li>

          <li class="nav-item">
              <router-link class="nav-link" to="/ft/codehash">FTCode</router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"
               id="navbarDropdown"
               role="button"
               data-toggle="dropdown"
               aria-haspopup="true"
               aria-expanded="false"> More </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">

              <router-link class="nav-link" to="/nft/codehash">NFTCode</router-link>

              <div class="dropdown-divider"></div>

              <router-link class="nav-link" to="/ft/codehash">FTCode</router-link>

              <div class="dropdown-divider"></div>

              <router-link class="nav-link" to="/mempool">Mempool</router-link>

            </div>
          </li>

        </ul>
      </div>
      <form class="form-inline col-5">
        <input class="form-control mr-sm-2 col" type="search" v-model="navInputValue"
               placeholder="Search" aria-label="Search">
        <a class="btn btn-outline-success my-2 my-sm-0" v-on:click="pressNavButton">Go</a>
      </form>
    </nav>

    <div class="col">

      <router-view></router-view>

    </div>
  </div>

</template>

<script>
  export default {
    data: function () {
      return {
        navInputValue: ""
      }
    },
    methods: {
      pressNavButton: function () {
        if (this.$route.path.startsWith("/blocks")) {
          this.$router.push(`/blocks/id/${this.navInputValue}`)
        } else if (this.$route.path.startsWith("/txs")) {
          this.$router.push(`/txs-of-blkid/${this.navInputValue}`)
        } else if (this.$route.path.startsWith("/tx")) {
          this.$router.push(`/txid/${this.navInputValue}`)
        } else if (this.$route.path.startsWith("/address")) {
          this.$router.push(`/address/${this.navInputValue}`)
        } else if (this.$route.path.startsWith("/utxo")) {
          this.$router.push(`/utxo/${this.navInputValue}`)
        }
      },

    }

  }
</script>
