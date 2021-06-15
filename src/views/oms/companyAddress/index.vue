<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAdd()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="地址名称" align="center" width="100">
          <template slot-scope="scope">{{scope.row.addressName}}</template>
        </el-table-column>
        <el-table-column label="收货姓名" width="100" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="收货人电话" width="100" align="center">
          <template slot-scope="scope">{{scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="省" width="100" align="center">
          <template slot-scope="scope">{{scope.row.province }}</template>
        </el-table-column>
        <el-table-column label="市" width="100" align="center">
          <template slot-scope="scope">{{scope.row.city }}</template>
        </el-table-column>
        <el-table-column label="区" width="100" align="center">
          <template slot-scope="scope">{{scope.row.region }}</template>
        </el-table-column>
        <el-table-column label="详细地址" align="center">
          <template slot-scope="scope">{{scope.row.detailAddress }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {fetchList,deleteCompanyAddress,createCompanyAddr,updateCompanyAddr} from '@/api/companyAddress'

  export default {
    name: "companyAddressList",
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        }
      }
    },
    created() {
      this.getList();
    },
    watch: {
      $route(route) {
        this.getList();
      }
    },
    methods: {
      handleAdd() {
        this.$router.push('/oms/addCompanyAddr');
      },
      getList() {
        this.listLoading = true;
        fetchList().then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.total;
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleUpdate(index, row) {
        this.$router.push({path:'/oms/updateCompanyAddr',query:{id:row.id}});
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCompanyAddress(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
