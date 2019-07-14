<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出表格</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="_id" align="center" width="265">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="id" prop="_openid" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="时间" prop="ctime" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.ctime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" prop="name" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="分类" prop="sortId" align="center" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.sortId=='2'">有害垃圾</span>
          <span v-else-if="scope.row.sortId=='1'">可回收物</span>
          <span v-else-if="scope.row.sortId=='3'">湿垃圾</span>
          <span v-else-if="scope.row.sortId=='4'">干垃圾</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="onEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { parseTime } from '@/utils'

export default {
  name: "ComplexTable",
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 40,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      var page = this.listQuery.page - 1;
      this.$store
        .dispatch("user/queryGarbage", page)
        .then(response => {
          const { errcode, errmsg, pager, data } = response;
          this.total = pager.Total;
          var datas = [];
          for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            var obj = JSON.parse(data[i]);
            datas.push(obj);
          }
          this.list = datas;
          this.listLoading = false;
        })
        .catch(error => {
          this.listLoading = false;
          this.$message({
            message: "操作失败",
            type: "success"
          });
        });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["ID",  "时间", "名称", "分类"];
        const filterVal = [
          "_id",
          "ctime",
          "name",
          "sortId"
        ];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "垃圾名称"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "ctime") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    onEdit(params) {
      console.log("======" + JSON.stringify(params));
      this.$router.push({
        name: "garbageAdd",
        path: "/garbage/add",
        params: params
      });
      this.$nextTick(() => {
        this.show = false;
      });
    }
  }
};
</script>
