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
            <router-link class="nav-link" to="/genesis">Genesis</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/genesis-utxo">GenesisUTXO</router-link>
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
      <slot></slot>

      <div class="alert alert-info" role="alert">
        {{message}}
      </div>

      <!-- router -->
      <router-view></router-view>

    </div>
  </div>

</template>

<script>
  export default {
    data: function () {
      return {
        apiPoint: "http://120.92.153.221:5555/",
        // apiPoint: "http://192.168.31.236:5555/",
        message: "",
        navInputValue: "",
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
        } else if (this.$route.path.startsWith("/genesis-utxo")) {
          this.$router.push(`/genesis-utxo/${this.navInputValue}`)
        } else if (this.$route.path.startsWith("/genesis")) {
          this.$router.push(`/genesis/${this.navInputValue}`)
        }
      },

    }

  }
</script>
