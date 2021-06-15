<template>
   
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <el-card class="operate-container" shadow="never">
          <i class="el-icon-tickets"></i>
          <span>天梯榜相关设置</span>
        </el-card>
        <div class="table-container">
          <el-table
            ref="segmentTable"
            :data="list1"
            style="width: 100%"
            v-loading="listLoading"
            border
          >
            <el-table-column label="名次" width="100" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="图标" align="center">
              <template slot-scope="scope">
                <img
                  style="width: 80px; height: 50px; border: none"
                  :src="scope.row.img"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleUpdate(scope.$index, scope.row, 2)"
                >
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-card class="operate-container" shadow="never">
          <i class="el-icon-tickets"></i>
          <span>积分榜相关设置</span>
        </el-card>
        <div class="table-container">
          <el-table
            ref="ref"
            :data="list2"
            style="width: 100%"
            v-loading="listLoading"
            border
          >
            <el-table-column label="名次" width="100" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="图标" align="center">
              <template slot-scope="scope">
                <img
                  style="width: 80px; height: 50px; border: none"
                  :src="scope.row.img"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleUpdate(scope.$index, scope.row, 2)"
                >
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :title="type == 1 ? '天梯榜图标' : '积分榜图标'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="ranking" ref="ref" label-width="150px" size="small">
        <el-form-item label="名次：">
          <el-input
            v-model="ranking.name"
            :disabled="true"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="段位图标：">
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
import { getRankingIcon, updateRanking } from "@/api/cms";

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
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.segment = Object.assign({}, defaultsegment);
    },
    handleStatusChange(index, row) {
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateStatus(row.id, { status: row.status }).then((response) => {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
          this.getList();
        });
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteSegment(row.id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row, type) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.ranking = Object.assign({}, row);
      this.type = type;
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.isEdit) {
          updateRanking(this.ranking).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            if (this.ranking.type == 1) {
              this.getList1();
            } else if (this.ranking.type == 2) {
              this.getList2();
            }
          });
        } else {
          addSegment(this.segment).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        }
      });
    },
    getList1() {
      this.listLoading = true;
      getRankingIcon(1).then((response) => {
        this.listLoading = false;
        this.list1 = response.data;
      });
    },
    getList2() {
      this.listLoading = true;
      getRankingIcon(2).then((response) => {
        this.listLoading = false;
        this.list2 = response.data;
      });
    },
    openIconDialogVisible() {
      getRankingIcon().then((response) => {
        this.ranking = response.data;
      });
      this.iconDialogVisible = true;
    },
    handleIconDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.info("=ranking=", this.ranking);
        updateRanking(this.ranking).then((response) => {
          this.$message({
            message: "保存成功！",
            type: "success",
          });
          this.iconDialogVisible = false;
          this.getList();
        });
      });
    },
  },
};
</script>
<style></style>


