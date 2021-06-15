<template> 
  <el-dialog title="订单跟踪"
             :visible.sync="visible"
             :before-close="handleClose"
             width="40%">
    <el-steps direction="vertical"
              :active="logisticsList.length - 1"
              finish-status="success"
              space="50px">
      <el-step  v-for="item in logisticsList"
                :key="item.context"
                :title="item.context"
                :description="item.time"></el-step>
    </el-steps>
  </el-dialog>
</template>
<script>
  import {getExpress} from '@/api/order';
  import { Message } from "element-ui";

  export default {
    name:'logisticsDialog',
    props: {
      value: Boolean,
      orderId: {
        type:Number,
        default:'2'
      }
    },
    computed:{
      visible: {
        get() {
          return this.value;
        },
        set(visible){
          this.value=visible;
        }
      }
    },
    watch: {
      value() {
        if (this.value){
          console.log(this.orderId)
          getExpress(this.orderId).then(response => {
            if (response.code != 200) {
              this.$message({
                showClose: true,
                type: 'error'
              });
              this.logisticsList = response.data
            } else {
              this.logisticsList = response.data
            }
            console.log(response)
          })
        }
      }
    },
    data() {
      return {
        logisticsList: [{context: null, time: null}]
      }
    },
    methods:{
      emitInput(val) {
        this.$emit('input', val)
      },
      handleClose(){
        this.emitInput(false);
      }
    }
  }
</script>
<style></style>


