<template>
  <div>
    <h3> Tx </h3>

    <div class="row">
      <div class="col">

        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="text-right">TxId:</th>
              <th class="text-left"><samp>{{currTxId}}</samp></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="text-right">Height:</th>
              <td class="text-left"><samp> {{ currTxObj.height }} </samp></td>
            </tr>
            <tr>
              <th class="text-right">BlockId/Index:</th>
              <th class="text-left">
                <router-link :to="{path:`/txs/${currTxObj.height}/${currTxObj.blkid}`}"><small>
			         <samp>{{ currTxObj.blkid }} / {{currTxObj.idx}}</samp></small></router-link>
		        </th>
            </tr>

            <tr>
              <th class="text-right">Time:</th>
		        <td class="text-left"><samp>{{ new Date(currTxObj.timestamp*1000).toISOString().slice(0, 19).replace('T', ' ') }}</samp></td>
            </tr>

            <tr>
              <th class="text-right">Size:</th>
              <td class="text-left"><samp> {{ formatBytes(currTxObj.size) }} </samp></td>
            </tr>

            <tr>
              <th class="text-right">Fee:</th>
              <td class="text-left"><samp> {{ (currTxObj.inSatoshi - currTxObj.outSatoshi)/100000000.0 }} </samp></td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

    <div class="row">
      <div class="col-6">

        <table class="table">
          <thead>
            <tr>
              <th class="text-right">#</th>
              <th class="text-center">{{currTxObj.nIn}} Inputs</th>
              <th class="text-right">{{currTxObj.inSatoshi/100000000.0}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="txin in currTxIns">
              <td class="text-right">
                <router-link :to="{path:`/tx/${txin.heightTxo}/${txin.utxid}`}">
                  <small><samp>❰&nbsp;{{txin.idx}}</samp></small>
                </router-link>

              </td>
              <td class="text-left">
                <router-link :to="{path:`/address/${txin.address}`}"><samp>{{ txin.address }}</samp></router-link>
                <div>
                  <small><samp class="d-inline-block text-truncate"
                               v-bind:title="txin.scriptType"
                               style="max-width: 380px;">script: {{ txin.scriptType }}</samp></small>
                </div>
                <div v-if="txin.genesis != '00'">
                  <router-link :to="{path:`/genesis/${txin.genesis}`}">
                    <small><samp>genesis: {{ txin.genesis }}</samp></small>
                  </router-link>
                </div>
              </td>
              <td class="text-right">
                <small><samp>{{ txin.satoshi/100000000.0 }}</samp></small>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Input Page">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">Prev</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>

      </div>

      <div class="col-6">

        <table class="table">
          <thead>
            <tr>
              <th class="text-right">#</th>
              <th class="text-center">{{currTxObj.nOut}} Outputs</th>
              <th class="text-right">{{currTxObj.outSatoshi/100000000.0}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="txout in currTxOuts">
              <td class="text-right">
                <small><samp>{{txout.vout}}</samp></small>
              </td>
              <td class="text-left">
                <router-link :to="{path:`/address/${txout.address}`}"><samp>{{ txout.address }}</samp></router-link>
                <div>
                  <small><samp class="d-inline-block text-truncate"
                               v-bind:title="txout.scriptType"
                               style="max-width: 380px;">script: {{ txout.scriptType }}</samp></small>
                </div>
                <div v-if="txout.genesis != '00'">
                  <router-link :to="{path:`/genesis/${txout.genesis}`}">
                    <small><samp>genesis: {{ txout.genesis }}</samp></small>
                  </router-link>
                </div>
              </td>
              <td class="text-right">
                <router-link v-if="txout.heightSpent"
                        :to="{path:`/tx/${txout.heightSpent}/${txout.txidSpent}`}">
                  <small><samp>{{ txout.satoshi/100000000.0 }}&nbsp;❱</samp></small>
                </router-link>
                <div v-else>
                  <small>{{ txout.satoshi/100000000.0 }}&nbsp;❱</samp></small>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Output Page">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">Prev</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  </div>
</template>

<script>
 import axios from 'axios'

 export default {
   data: function () {
     return {
       currTxId: "",
       currTxObj: {timestamp:0},
       currTxIns: [],
       currTxOuts: []
     }
   },

   watch: {
     $route(to, from) {
       console.log("watch", to, this.currTxIns, this.currTxOuts)
       /* if (this.currTxIns === undefined || this.currTxOuts === undefined) {
        *   this.currTxIns = []
        *   this.currTxOuts = []
        * }*/
       if (to.path.startsWith("/txid/") == true ) {
	      this.viewTxIdInfo(to.params.txid)
         this.viewTxIns(to.params.txid)
         this.viewTxOuts(to.params.txid)
       } else if (to.path.startsWith("/tx/") == true ) {
         this.viewTxIdInfoInside(to.params.height, to.params.txid)
         this.viewTxInsInside(to.params.height, to.params.txid)
         this.viewTxOutsInside(to.params.height, to.params.txid)
       }

       if (to.path.startsWith("/txout/") == true ) {
         this.viewTxOutsStatus(to.params.txid, to.params.vout)
       }

     }
   },

   created: function () {
     console.log("create", this.$route, this.currTxIns, this.currTxOuts)
     /* if (this.currTxIns === undefined || this.currTxOuts === undefined) {
      *   this.currTxIns = []
      *   this.currTxOuts = []
      * }*/
     if (this.$route.path.startsWith("/txid/") == true ) {
	    this.viewTxIdInfo(this.$route.params.txid)
       this.viewTxIns(this.$route.params.txid)
       this.viewTxOuts(this.$route.params.txid)
     } else if (this.$route.path.startsWith("/tx/") == true ) {
       this.viewTxIdInfoInside(this.$route.params.height, this.$route.params.txid)
       this.viewTxInsInside(this.$route.params.height, this.$route.params.txid)
       this.viewTxOutsInside(this.$route.params.height, this.$route.params.txid)
     }

     if (this.$route.path.startsWith("/txout/") == true ) {
       this.viewTxOutsStatus(this.$route.params.txid, this.$route.params.vout)
     }

   },

   methods: {
     viewTxIns: function (txid) {
       this.updateTxIns(txid, this.$root.apiPoint + "tx/"+ txid +"/ins")
     },
     viewTxOuts: function (txid) {
       this.updateTxOuts(txid, this.$root.apiPoint + "tx/"+ txid +"/outs")
     },

     viewTxInsInside: function (height, txid) {
       this.updateTxIns(txid, this.$root.apiPoint + "height/"+ height +"/tx/"+ txid +"/ins")
     },
     viewTxOutsInside: function (height, txid) {
       this.updateTxOuts(txid, this.$root.apiPoint + "height/"+ height +"/tx/"+ txid +"/outs")
     },

     viewTxIdInfo: function (txid) {
       this.currTxId = txid
       axios
		   .get(this.$root.apiPoint + "tx/"+ txid)
		   .then(
		     response => {
			    this.currTxObj = response.data.data
			    this.$root.message = response.data.msg
		     }
		   )
     },

     viewTxIdInfoInside: function (height, txid) {
       this.currTxId = txid
       axios
		   .get(this.$root.apiPoint + "height/"+ height + "/tx/"+ txid)
		   .then(
		     response => {
			    this.currTxObj = response.data.data
			    this.$root.message = response.data.msg
		     }
		   )
     },

     viewTxOutsStatus: function (txid, idx) {
       let url = this.$root.apiPoint + "tx/"+ txid +"/out/"+idx+"/spent"
       axios
                     .get(url)
                     .then(
                       response => {
                         if (response.data.code == 0) {
                           this.viewTxInsInside(response.data.data.height, response.data.data.txid)
                           this.viewTxOutsInside(response.data.data.height, response.data.data.txid)
                         } else {
                           this.$root.message = "unspent"
                         }
                       }
                     )
     },

     updateTxIns: function(txid, url) {
       this.$root.message = "..."
       axios
         .get(url)
         .then(
           response => {
             if (response.data.code == 0) {
               this.currTxId = txid
               this.currTxIns = response.data.data
             }
             this.$root.message = response.data.msg
           }
         )
     },

     updateTxOuts: function(txid, url) {
       this.$root.message = "..."
       axios
         .get(url)
         .then(
           response => {
             if (response.data.code == 0) {
               this.currTxOuts = response.data.data
             }
             this.$root.message = response.data.msg
           }
         )
     },

   }

 }
</script>
