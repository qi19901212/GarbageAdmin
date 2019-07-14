<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    style="width:50%;padding-top:50px"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="垃圾名称名称" prop="name" label-width="110px">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="垃圾类型" prop="sortId">
      <el-select v-model="ruleForm.sortId" placeholder="请选择垃圾类型">
        <el-option label="可回收物" :value="1"></el-option>
        <el-option label="有害垃圾" :value="2"></el-option>
        <el-option label="湿垃圾" :value="3"></el-option>
        <el-option label="干垃圾" :value="4"></el-option>
      </el-select>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">{{submitBtn}}</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
     
  </el-form>
</template>

<script>
import store from "@/store";

export default {
  data() {

    return {
      title: "添加垃圾",
      submitBtn: "立即添加",
      ruleForm: {
        name: "",
        id:"",
        sortId: "",
      },
      rules: {
        name: [{ required: true, message: "请输入垃圾名称", trigger: "blur" }],
        sortId: [
          { required: true, message: "请选择垃圾类型", trigger: "change" }
        ],
      }
    };
  },
  mounted() {
    var params = this.$route.params;
    console.log("AAAAAAAA" + JSON.stringify(params));
    if (params != null) {
      this.ruleForm.name = params.keyword;
      this.ruleForm.id=params._id
      this.submitBtn = "添加垃圾名称";
    }
     
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
            this.$store
              .dispatch("user/invokeCommitToInsertGabarge", this.ruleForm)
              .then(response => {
                if (response.errcode == 0) {
                   var obj = JSON.parse(response.resp_data);
                   console.log("obj====="+obj)
                  if (obj.data.errCode == 0) {
                    this.$message({
                      message: "添加成功",
                      type: "success"
                    });
                    this.$router.push({ path: '/commit/index'})
                  } else if(obj.data.errCode == 1){
                    this.$message.error(obj.data.errMsg);
                  }else{
                    this.$message.error('插入失败');
                  }
                }
              })
              .catch(error => {
                this.$message({
                  message: "操作失败",
                  type: "success"
                });
              });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
