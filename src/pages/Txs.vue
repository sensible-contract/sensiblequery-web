<template>
  <div>
    <h3> Txs <small>in block</small></h3>

    <div class="row">
      <div class="col">

        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="text-right">Height/BlockId:</th>
              <th class="text-left"><samp> {{ currBlockObj.height }} / {{currBlockId}} </samp></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="text-right">Prev BlockId:</th>
              <td class="text-left">
                <router-link :to="{path:`/txs/${currBlockObj.height-1}/${currBlockObj.prev}`}">
                  <small><samp>{{ currBlockObj.prev }}</samp></small></router-link>
		        </td>
            </tr>

            <tr>
              <th class="text-right">Next BlockId:</th>
              <td class="text-left">
                <router-link :to="{path:`/txs/${currBlockObj.height+1}/${currBlockObj.next}`}">
                  <small><samp>{{ currBlockObj.next }}</samp></small></router-link>
		        </td>
            </tr>

            <tr>
              <th class="text-right">Merkle:</th>
              <td class="text-left"><samp>{{currBlockObj.merkle}}</samp></td>
            </tr>

            <tr>
              <th class="text-right">Time:</th>
		        <td class="text-left"><samp>{{ new Date(currBlockObj.timestamp*1000).toISOString().slice(0, 19).replace('T', ' ') }}</samp></td>
            </tr>

            <tr>
              <th class="text-right">Size:</th>
              <td class="text-left"><samp> {{ formatBytes(currBlockObj.size) }} </samp></td>
            </tr>

            <tr>
              <th class="text-right">Tx Count:</th>
              <td class="text-left"><samp> {{ currBlockObj.ntx }} </samp></td>
            </tr>

          </tbody>
        </table>

      </div>
    </div>

    <div v-if="currBlockObj.ntx > 16">
      <Pagination :total="currBlockObj.ntx" @change="changeTxPagination"></Pagination>
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
        <tr v-for="tx in currBlockTxs">
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
       currBlockId: "",
       currBlockObj: {timestamp:0},
       currBlockTxs: []
     }
   },

   watch: {
     $route(to, from) {
       if (this.currBlockTxs === undefined) {
         this.currBlockTxs = []
       }

       if (to.path.startsWith("/txs-of-blkid/")) {
         this.viewBlockIdTxs(to.params.blkid)
       } else if (to.path.startsWith("/txs/")) {
         this.viewBlockHeightTxs(to.params.height, to.params.blkid, 0)
       }

       this.viewBlockIdInfo(this.$route.params.blkid)
     }
   },

   created: function () {
     console.log(this.$route, this.currBlockTxs)

     if (this.currBlockTxs === undefined) {
       this.currBlockTxs = []
     }
     if (this.$route.path != "/txs") {
       this.viewBlockHeightTxs(this.$route.params.height, this.$route.params.blkid, 0)
     }
	  this.viewBlockIdInfo(this.$route.params.blkid)
   },

   methods: {
     changeTxPagination: function (current) {
       this.viewBlockHeightTxs(this.currBlockObj.height, this.currBlockObj.blkid, (current-1)*16)
     },

     viewBlockHeightTxs: function (height, blkid, cursor) {
       this.currBlockId = blkid
       this.currBlockTxs = []
       axios
         .get(this.$root.apiPoint + "height/"+ height +"/block/txs", {
           params: {
		       cursor: cursor,
		       size: 16
	        }
         })
         .then(
           response => {
             this.currBlockTxs = response.data.data
             this.$root.message = response.data.msg
           }
         )
     },

     viewBlockIdTxs: function (blkid) {
       this.currBlockId = blkid
       this.currBlockTxs = []
       axios
         .get(this.$root.apiPoint + "block/txs/"+ blkid)
         .then(
           response => {
             this.currBlockTxs = response.data.data
             this.$root.message = response.data.msg
           }
         )
     },

     viewBlockIdInfo: function (blkid) {
       this.currBlockId = blkid
       axios
         .get(this.$root.apiPoint + "block/id/"+ blkid)
         .then(
           response => {
             this.currBlockObj = response.data.data
             this.$root.message = response.data.msg
           }
         )
     },

   }


 }
</script>
