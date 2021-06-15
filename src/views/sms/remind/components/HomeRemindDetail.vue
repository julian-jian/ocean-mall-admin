<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="homeRemind"
             :rules="rules"
             ref="homeRemindFrom"
             label-width="150px"
             size="small">
      <el-form-item label="温馨提示内容：" prop="content">
        <el-input v-model="homeRemind.content" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="上线/下线：">
        <el-radio-group v-model="homeRemind.status">
          <el-radio :label="0">下线</el-radio>
          <el-radio :label="1">上线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="homeRemind.sort" class="input-width"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeRemindFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeRemindFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import SingleUpload from '@/components/Upload/singleUpload'
  import {createHomeRemind, getHomeRemind, updateHomeRemind} from '@/api/homeRemind'
  const defaultTypeOptions = [
  ];
  const defaultHomeRemind = {
    name: null,
    startTime: null,
    updateTime: null,
    status: 0,
    sort: 0
  };
  export default {
    name: 'HomeRemindDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        homeRemind: null,
        typeOptions: Object.assign({}, defaultTypeOptions)
      }
    },
    created(){
      if (this.isEdit) {
        getHomeRemind(this.$route.query.id).then(response => {
          this.homeRemind = response.data;
        });
      }else{
        this.homeRemind = Object.assign({},defaultHomeRemind);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateHomeRemind(this.$route.query.id, this.homeRemind).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createHomeRemind(this.homeRemind).then(response => {
                  this.$refs[formName].resetFields();
                  this.homeRemind = Object.assign({},defaultHomeRemind);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.homeRemind = Object.assign({},defaultHomeRemind);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


