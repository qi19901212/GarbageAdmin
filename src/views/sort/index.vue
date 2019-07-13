<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="_id"   align="center" width="265">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" prop="name" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="onEdit(scope.row)">编辑</el-button> -->
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
      var page=this.listQuery.page-1
      this.$store
        .dispatch("user/querySort", page)
        .then(response => {
          const { errcode, errmsg, pager, data } = response
          this.total = pager.Total;
          var datas=[]
          for(var i=0;i<data.length;i++){
             console.log(data[i])
             var obj=JSON.parse(data[i])
             datas.push(obj)
          }
          this.list=datas
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
   
    onEdit(params) {
      console.log("======" + JSON.stringify(params));
      this.$router.push({
        name: "commitAdd",
        path: "/commit/add",
        params: params
      });
      this.$nextTick(() => {
        this.show = false;
      });
    }
  }
};
</script>
