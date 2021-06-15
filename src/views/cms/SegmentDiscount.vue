<template>
   
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="输入搜索：">
            <el-input
              v-model="listQuery.keyword"
              class="input-width"
              placeholder="段位名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        size="mini"
        class="btn-add"
        @click="handleAdd()"
        style="margin-left: 20px"
        >添加</el-button
      >
      <el-button
        size="mini"
        class="btn-add"
        @click="openIconDialogVisible"
        style="margin-left: 20px"
        >历史海王图标设置</el-button
      >
    </el-card>
    <div class="table-container">
      <el-table
        ref="segmentTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="段位名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="消费区间" align="center">
          <template slot-scope="scope"
            >{{ scope.row.consumptionMin }}-{{
              scope.row.consumptionMax
            }}</template
          >
        </el-table-column>
        <el-table-column label="段位折扣" align="center">
          <template slot-scope="scope">{{ scope.row.discount }}</template>
        </el-table-column>
        <el-table-column label="包邮额度" align="center">
          <template slot-scope="scope">{{ scope.row.freeShipping }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{
            scope.row.createTime | formatDateTime
          }}</template>
        </el-table-column>
        <!-- <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
            >
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)"
            >
              编辑
            </el-button>
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
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10, 15, 20]"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit ? '编辑段位' : '添加段位'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        :model="segment"
        ref="segmentForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="段位名称：">
          <el-input v-model="segment.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="消费区间：">
          <el-input
            v-model="segment.consumptionMin"
            style="width: 120px"
          ></el-input>
          -
          <el-input
            v-model="segment.consumptionMax"
            style="width: 120px"
          ></el-input>
        </el-form-item>
        <el-form-item label="折扣：">
          <el-input v-model="segment.discount" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="包邮额度">
          <el-input
            v-model="segment.freeShipping"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="段位图标：">
          <single-upload v-model="segment.icon"></single-upload>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="segment.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="历史海王次数图标设置" :visible.sync="iconDialogVisible" width="40%">
      <el-form
        :model="ranking"
        ref="rankingForm"
        label-width="150px"
        size="small"
      >
       <el-form-item label="历史海王次数图标">
          <single-upload v-model="ranking.img"></single-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="iconDialogVisible = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="handleIconDialogConfirm()"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import SingleUpload from "@/components/Upload/singleImgUpload";
import {
  fetchList,
  addSegment,
  updateSegment,
  updateStatus,
  deleteSegment,
  getRankingIcon,
  updateRanking,
} from "@/api/cms";
import { fetchAllRoleList } from "@/api/role";

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
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      iconDialogVisible: false,
      segment: Object.assign({}, defaultsegment),
      isEdit: false,
      allocRoleIds: [],
      allRoleList: [],
      allocsegmentId: null,
      ranking: {},
    };
  },
  created() {
    this.getList();
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
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.segment = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.isEdit) {
          console.info("=segment=", this.segment);
          updateSegment(this.segment.id, this.segment).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
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
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    openIconDialogVisible() {
      getRankingIcon(5).then((response) => {
        let data = response.data;
        console.info("data",data)
        this.ranking = data[0];
        this.ranking.type = type;
        console.info("rankingranking",this.ranking)
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
        });
      });
    },
  },
};
</script>
<style></style>


