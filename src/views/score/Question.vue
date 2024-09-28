<template>
  <div>
    <el-button type="primary" @click="add">新增考题</el-button>

    <el-dialog title="考题信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="科目：" :label-width="formLabelWidth">
          <el-input v-model="form.subject" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="题目：" :label-width="formLabelWidth">
          <el-input v-model="form.question_text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="答案：" :label-width="formLabelWidth">
          <el-input v-model="form.answer" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="apquestion()">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="subject" label="科目" width="180"></el-table-column>
      <el-table-column prop="question_text" label="题目" width="600"></el-table-column>
      <el-table-column prop="answer" label="答案"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="warning" @click="getquesiton(scope.row.question_id)">编辑</el-button>
          <el-button type="danger" @click="deleteQuestion(scope.row.question_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>

import {question_get, question_create, question_delete, question_getbyid, question_update} from "../../api/api";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        question_id: '',
        subject: '',
        question_text: '',
        answer: ''
      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    loaddata() {
      //调用后端接口加载列表数据
      question_get().then(res => {
        this.tableData = res
      })
    },
    add() {
      this.form={};
      this.dialogFormVisible = true;
    },
    apquestion(){
      if(this.form.question_id == null){
        this.addQuestion();
      }else {
        this.updateQuestion(this.form.question_id,this.form)
      }
    },
    getquesiton(question_id) {
      question_getbyid(question_id).then(res =>{
        this.form = res;
        console.log(this.form);
        this.dialogFormVisible = true;
      });
    },
    deleteQuestion(question_id) {
      this.$confirm('此操作将永久删除该题目, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 执行删除操作
        question_delete(question_id)
          .then(() => {
            // 删除成功后，显示消息并刷新数据
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.loaddata(); // 调用刷新方法
          })
          .catch(error => {
            // 删除失败处理
            console.error('删除题目失败:', error);
            this.$message.error('删除题目失败，请重试。');
          });
      }).catch(() => {
        // 取消删除的提示
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addQuestion() {
      //提交表单数据
      question_create(this.form).then(res => {
        this.dialogFormVisible = false; // 关闭对话框
        this.loaddata(); // 刷新表格数据
      }).catch(error => {
        this.$message.error('添加考题失败，请检查输入或联系管理员。');
      });
    },
    updateQuestion() {
      question_update(this.form.question_id, this.form) // 确认参数顺序与API要求一致
        .then(() => {
          // 更新成功后的处理
          this.$message({
            type: 'success',
            message: '考题更新成功！',
          });
          this.dialogFormVisible = false; // 关闭对话框
          this.loaddata(); // 刷新表格数据以显示更新结果
        })
        .catch((error) => {
          // 处理更新失败的情况
          console.error('更新考题失败:', error);
          this.$message.error('更新考题失败，请重试。');
        });
    }
  },

  created() {
    this.loaddata()
  }
}
</script>
