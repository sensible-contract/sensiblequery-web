<template>
  <div>
    <h3> Txs <small>in mempool</small></h3>

    <div class="row">
      <div class="col">

        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="text-left"> Txs in Mempool: <samp> {{ currTotalTx }} </samp></th>
            </tr>
          </thead>
        </table>

      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-center">Id</th>
          <th class="text-right">Size</th>
          <th class="text-right">nIn</th>
          <th class="text-right">nOut</th>
          <th class="text-right">vOut</th>
          <th class="text-right">Fee</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in currMempoolTxs">
          <td class="text-right"><samp>{{ tx.idx }}</samp></td>
          <td class="text-center">
            <router-link :to="{path:`/tx/${tx.height}/${tx.txid}`}"><small><samp>{{ tx.txid }}</samp></small></router-link>
          </td>
          <td class="text-right"><small><samp>{{ formatBytes(tx.size) }}</samp></small></td>
          <td class="text-right"><small><samp>{{ tx.nIn }}</samp></small></td>
          <td class="text-right"><small><samp>{{ tx.nOut }}</samp></small></td>
          <td class="text-right"><small><samp>{{ tx.outSatoshi/100000000.0 }}</samp></small></td>
          <td class="text-right"><small><samp>{{ (tx.inSatoshi - tx.outSatoshi)/100000000.0 }}</samp></small></td>
        </tr>
      </tbody>
    </table>

    <div v-if="currTotalTx > 16">
      <Pagination :total="currTotalTx" @change="changeTxPagination"></Pagination>
    </div>

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
       currTotalTx: 16,
       currMempoolTxs: []
     }
   },

   watch: {
     $route(to, from) {
       if (this.currMempoolTxs === undefined) {
         this.currMempoolTxs = []
       }

       if (to.path.startsWith("/txs/")) {
         this.viewBlockHeightTxs(0)
         this.getMempoolTxCount()
       }
     }
   },

   created: function () {
     console.log(this.$route, this.currMempoolTxs)

     if (this.currMempoolTxs === undefined) {
       this.currMempoolTxs = []
     }
     if (this.$route.path != "/txs") {
       this.viewBlockHeightTxs(0)
       this.getMempoolTxCount()
     }
   },

   methods: {
     changeTxPagination: function (current) {
       this.viewBlockHeightTxs((current-1)*16)
       this.getMempoolTxCount()
     },

     viewBlockHeightTxs: function (cursor) {
       this.currMempoolTxs = []
       axios
         .get(this.$root.apiPoint + "height/4294967295/block/txs", {
           params: {
		       cursor: cursor,
		       size: 16
	        }
         })
         .then(
           response => {
             this.currMempoolTxs = response.data.data
             this.$root.message = response.data.msg
           }
         )
     },

     getMempoolTxCount: function () {
       axios
         .get(this.$root.apiPoint + "mempool/info")
         .then(
           response => {
             this.currTotalTx = response.data.data.ntx
             this.$root.message = response.data.msg
           }
         )
     },

   }
 }
</script>
