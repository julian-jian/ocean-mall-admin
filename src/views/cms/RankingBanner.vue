<template>
   
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <el-card class="operate-container" shadow="never">
          <i class="el-icon-tickets"></i>
          <span>天梯榜Banner</span>
          <el-button
        size="mini"
        class="btn-add"
        @click="handleAdd(3)"
        style="margin-left: 20px"
        >添加</el-button
      >
        </el-card>
        <div class="table-container">
          <el-table
            ref="segmentTable"
            :data="list1"
            style="width: 100%"
            v-loading="listLoading"
            border
          >
            <el-table-column label="名称" width="200" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="Banner" align="center">
              <template slot-scope="scope">
                <img
                  style="width: 150px; height: 50px; border: none"
                  :src="scope.row.img"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-card class="operate-container" shadow="never">
          <i class="el-icon-tickets"></i>
          <span>积分榜Banner</span>
          <el-button
        size="mini"
        class="btn-add"
        @click="handleAdd(4)"
        style="margin-left: 20px"
        >添加</el-button
      >
        </el-card>
        <div class="table-container">
          <el-table
            ref="ref"
            :data="list2"
            style="width: 100%"
            v-loading="listLoading"
            border
          >
            <el-table-column label="名称" width="200" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="Banner" align="center">
              <template slot-scope="scope">
                <img
                  style="width: 150px; height: 50px; border: none"
                  :src="scope.row.img"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :title="type == 3 ? '天梯榜Banner' : '积分榜Banner'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="ranking" ref="ref" label-width="150px" size="small">
        <el-form-item label="名称">
          <el-input
            v-model="ranking.name"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Banner">
          <single-upload v-model="ranking.img"></single-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import SingleUpload from "@/components/Upload/singleImgUpload";
import { getRankingIcon, addRanking,deleteRanking } from "@/api/cms";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
};
const defaultsegment = {
  id: null,
  name: null,
  consumptionMax: null,
  consumptionMin: null,
  discount: null,
  icon: null,
  status: 1,
};
export default {
  name: "segmentList",
  components: { SingleUpload },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list1: null,
      list2: null,
      listLoading: false,
      dialogVisible: false,
      iconDialogVisible: false,
      segment: Object.assign({}, defaultsegment),
      isEdit: false,
      allocRoleIds: [],
      allRoleList: [],
      allocsegmentId: null,
      type: 1,
      ranking: {},
    };
  },
  created() {
    this.getList1();
    this.getList2();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return time;
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
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
    handleAdd(type) {
      this.dialogVisible = true;
      this.isEdit = false;
      this.segment = Object.assign({}, defaultsegment);
      this.type = type;
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteRanking(row.id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          if (row.type == 3) {
            this.getList1();
          } else if (row.type == 4) {
            this.getList2();
          }
        });
      });
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.info("==ranking==",this.ranking)
        this.ranking.type = this.type;
        addRanking(this.ranking).then((response) => {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.dialogVisible = false;
          if (this.ranking.type == 3) {
            this.getList1();
          } else if (this.ranking.type == 4) {
            this.getList2();
          }
          this.ranking = {};
        });
      });
    },
    getList1() {
      this.listLoading = true;
      getRankingIcon(3).then((response) => {
        this.listLoading = false;
        this.list1 = response.data;
      });
    },
    getList2() {
      this.listLoading = true;
      getRankingIcon(4).then((response) => {
        this.listLoading = false;
        this.list2 = response.data;
      });
    },
  },
};
</script>
<style></style>


