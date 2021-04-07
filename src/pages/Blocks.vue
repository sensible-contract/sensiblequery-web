<template>
  <div>

    <h3> Blocks </h3>

    <div class="row justify-content-center">
      <div class="col-1">
        <div class="btn-group btn-group-lg mr-2" role="group" aria-label="First group">
          <a class="btn btn-secondary mb-2" v-on:click="viewBlockRange(-pageSize)" title="prev page">Prev</a>
        </div>
      </div>

      <div class="col-4">
        <form class="form-inline col">
          <div class="form-group col">
            <label for="blockEndHeight" class="sr-only">End</label>
            <input type="text" class="form-control col" v-model="blockEndHeight" id="blockEndHeight"
                   placeholder="input start blk height">
          </div>
        </form>
      </div>

      <div class="col-1">
        <div class="btn-group btn-group-lg mr-2" role="group" aria-label="First group">
          <a class="btn btn-secondary mb-2" v-on:click="viewBlockRange(pageSize)" title="next page">Next</a>
        </div>
      </div>

      <div class="col-1">
        <div class="btn-group btn-group-lg mr-2" role="group" aria-label="First group">
          <a class="btn btn-primary mb-2" v-on:click="viewBlockRange(0)" title="View Blocks">Go</a>
        </div>
      </div>
    </div>

    <Pagination :total="blockMaxHeight" @change="changeBlockPagination"></Pagination>

    <table class="table">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-center">Id</th>
          <th class="text-right">Time</th>
          <th class="text-right">Size</th>
          <th class="text-right">nTx</th>
          <th class="text-right">vOut</th>
          <th class="text-right">Reward</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="blk in Blocks">
          <td class="text-right"><small><samp>{{ blk.height }}</samp></small></td>
          <td class="text-center">
            <router-link :to="{path:`/txs/${blk.height}/${blk.id}`}"><small><samp>{{ blk.id }}</samp></small></router-link>
          </td>
          <td class="text-right"><small><samp>{{ new Date(blk.timestamp*1000).toISOString().slice(0, 19).replace('T', ' ') }}</samp></small></td>
          <td class="text-right"><small><samp>{{ formatBytes(blk.size) }}</samp></small></td>
          <td class="text-right"><small><samp>{{ blk.ntx }}</samp></small></td>
          <td class="text-right"><small><samp>{{ blk.outSatoshi/100000000.0 }}</samp></small></td>
          <td class="text-right"><small><samp>{{ blk.coinbaseOut/100000000.0 }}</samp></small></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
 import axios from 'axios'
 import Pagination from '../components/page.vue'

 export default {
   components: {
     Pagination
   },

   data: function () {
     return {
       pageSize: 16,
       blockStartHeight: 0,
       blockEndHeight: 0,
       blockMaxHeight: 0,
       Blocks: []
     }
   },

   created: function () {
     this.viewLatestBlock()
     console.log("finishi init")
   },

   watch: {
     $route(to, from) {
       if (to.path.startsWith("/blocks/id/")) {
         this.viewBlockById(to.params.blkid)
       } else if (to.path.startsWith("/blocks/")) {
         this.viewBlockRange(to.params.height)
       }
     }
   },

   methods: {
     changeBlockPagination: function (current) {
       this.blockEndHeight = current*16
       this.viewBlockRange(0)
     },

     viewBlockRange: function (step) {
       this.blockEndHeight = parseInt(this.blockEndHeight) + step
       this.blockStartHeight = this.blockEndHeight - this.pageSize
       if (this.blockStartHeight < 0) {
         this.blockStartHeight = 0
       }

       axios.get(this.$root.apiPoint + "blocks", {
	      params: {
		     start: this.blockStartHeight,
		     end: this.blockEndHeight
	      }
	    }).then(
         response => {
           if (response.data.code == 0) {
             this.Blocks = response.data.data.reverse()
           }
           this.$root.message = response.data.msg
         }
       )
     },

     viewBlockById: function (blkid) {
       axios
         .get(this.$root.apiPoint + "block/id/"+ blkid)
         .then(
           response => {
             this.blockEndHeight = response.data.data.height
             this.viewBlockRange(0)
             this.$root.message = response.data.msg
           }
         )
     },

     viewLatestBlock: function () {
       axios
         .get(this.$root.apiPoint + "blockchain/info")
         .then(
           response => {
             this.blockEndHeight = response.data.data.blocks
             this.blockMaxHeight = this.blockEndHeight
             this.viewBlockRange(0)
             this.$root.message = response.data.msg
           }
         )
     }

   }

 }
</script>
