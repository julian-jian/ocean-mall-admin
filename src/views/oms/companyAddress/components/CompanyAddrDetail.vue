<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="companyAddr"
             :rules="rules"
             ref="companyAddrFrom"
             label-width="180px">
      <el-form-item label="地址名称：" prop="addressName">
        <el-input v-model="companyAddr.addressName"></el-input>
      </el-form-item>
      <el-form-item label="收货人姓名：" prop="name">
        <el-input v-model="companyAddr.name"></el-input>
      </el-form-item>
      <el-form-item label="收货人电话：" prop="phone">
        <el-input v-model="companyAddr.phone"></el-input>
      </el-form-item>
      <el-form-item label="省/直辖市：" prop="province">
        <el-input v-model="companyAddr.province"></el-input>
      </el-form-item>
      <el-form-item label="市：" prop="city">
        <el-input v-model="companyAddr.city" ></el-input>
      </el-form-item>
      <el-form-item label="区：">
        <el-input v-model="companyAddr.region"></el-input>
      </el-form-item>
      <el-form-item label="详细地址：" prop="detailAddress">
        <el-input v-model="companyAddr.detailAddress"></el-input>
      </el-form-item>
      <el-form-item label="是否为默认地址：">
        <el-radio-group v-model="companyAddr.receiveStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('companyAddrFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('companyAddrFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList,deleteCompanyAddress,createCompanyAddr,updateCompanyAddr, getCompanyAddress} from '@/api/companyAddress';
  import {createCompanyAddress, updateCompanyAddress} from "../../../../api/companyAddress";

  const defaultCompanyAddr = {
    id: '',
    addressName: '',
    sendStatus: '',
    receiveStatus: 0,
    name: '',
    phone: '',
    province: '',
    city: '',
    region: '',
    detailAddress: ''
  };
  export default {
    name: "CompanyAddrDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        companyAddr: Object.assign({}, defaultCompanyAddr),
        rules: {
          addressName: [
            {required: true, message: '请输入地址名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入地址名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入地址名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          province: [
            {required: true, message: '请输入地址名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '请输入地址名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          detailAddress: [
            {required: true, message: '请输入地址名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        },
      }
    },
    created() {
      if (this.isEdit) {
        getCompanyAddress(this.$route.query.id).then(response => {
          this.companyAddr = response.data;
        });
      } else {
        this.companyAddr = Object.assign({}, defaultCompanyAddr);
      }
    },
    methods: {
      getSelectProductCateList() {
        fetchList(0, {pageSize: 100, pageNum: 1}).then(response => {
          this.selectProductCateList = response.data.list;
          this.selectProductCateList.unshift({id: 0, name: '无上级分类'});
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateCompanyAddress(this.$route.query.id, this.companyAddr).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createCompanyAddress(this.companyAddr).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.companyAddr = Object.assign({}, defaultCompanyAddr);
      }
    },
  }
</script>

<style scoped>

</style>
