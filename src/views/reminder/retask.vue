<template>
  <div>
    <el-button type="primary" @click="add">新增提醒</el-button>
    <el-button type="danger" @click="table = true">提醒记录</el-button>

    <el-dialog title="修改循环模式" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form>
        <el-form-item label="循环模式：" :label-width="formLabelWidth">
          <el-select v-model="form.circle" placeholder="请选择循环方式">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTask">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增提醒任务" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="任务内容：" :label-width="formLabelWidth">
          <el-input v-model="form.task" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提醒时间：" :label-width="formLabelWidth">
          <el-time-picker v-model="form.time" format = 'HH:mm:ss' value-format = 'HH:mm:ss' :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"></el-time-picker>
        </el-form-item>
        <el-form-item label="循环模式：" :label-width="formLabelWidth">
          <el-select v-model="form.circle" placeholder="请选择循环方式">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTask">确 定</el-button>
      </div>
    </el-dialog>

    <el-drawer title="学习提醒记录表" :visible.sync="table" direction="rtl" size="50%">
      <el-table :data="gridData">
        <el-table-column property="task" label="提醒任务" width="200"></el-table-column>
        <el-table-column property="time" label="提醒时间" width="300"></el-table-column>
        <el-table-column property="status" label="提醒状态"></el-table-column>
      </el-table>
    </el-drawer>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="child" label="用户名" width="180"></el-table-column>
      <el-table-column prop="task" label="提醒任务" width="180"></el-table-column>
      <el-table-column prop="time" label="提醒时间" width="180"></el-table-column>
      <el-table-column prop="circle" label="循环模式"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="warning" @click="gettask(scope.row.task_id)">编辑</el-button>
          <el-button type="danger" @click="deletetask(scope.row.task_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<script>
import {retask_get,reminder_get, task_getbyid, task_delete, task_update, task_create} from "../../api/api";
import {task} from "@vue/cli-plugin-eslint/ui/taskDescriptor";

export default {
  data() {
    return {
      tableData: [],
      centerDialogVisible: false,
      dialogFormVisible: false,
      table: false,
      gridData: [],
      form: {
        task_id: '',
        task: '',
        time: '',
        circle: '',
      },
      formLabelWidth: '120px',
      selectedValue: '',
      options: [{
        value: '1',
        label: '单次提醒'
      }, {
        value: '2',
        label: '每天提醒'
      }],
      value: ''
    };
  },
  methods: {
    //加载数据
    loaddata() {
      //调用后端接口加载列表数据
      retask_get().then(res => {
        res.forEach(item => {
          // 使用正则表达式移除时间字符串中的字母
          if (item.time) {
            item.time = item.time.replace(/[A-Za-z]/g, ' ');
          }
          if (item.circle == 1) {
            item.circle = '单次提醒'
          }else {
            if(item.circle == 2) {
              item.circle = '每天提醒'
            }
          }
        });
        this.tableData = res
      })
    },
    loadtable() {
      //调用后端接口加载列表数据
      reminder_get().then(res => {
        res.forEach(item => {
          // 使用正则表达式移除时间字符串中的字母
          if (item.time) {
            item.time = item.time.replace(/[A-Za-z]/g, ' ');
          }
        });
        this.gridData = res
      })
    },
    gettask(task_id) {
      task_getbyid(task_id).then(res =>{
        this.form = res;
        if (this.form.circle == 1) {
          this.form.circle = '单次提醒'
        }else {
          this.form.circle = '每天提醒'
          }
        this.centerDialogVisible = true;
      });
    },
    add() {
      this.form={};
      this.dialogFormVisible = true
    },
    addTask() {
      //提交表单数据
      task_create(this.form).then(res => {
        this.dialogFormVisible = false; // 关闭对话框
        this.loaddata(); // 刷新表格数据
      }).catch(error => {
        this.$message.error('添加任务失败，请检查输入或联系管理员。');
      });
    },
    deletetask(task_id) {
      this.$confirm('此操作将删除该提醒, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        task_delete(task_id)
          .then(() => { // 确保在删除成功后才执行
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.loaddata(); // 刷新表格数据
          })
          .catch(error => {
            console.error('删除提醒失败:', error);
            this.$message.error('删除提醒失败，请重试。');
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updateTask() {
      task_update(this.form.task_id, this.form) // 确认参数顺序与API要求一致
        .then(() => {
          // 更新成功后的处理
          this.$message({
            type: 'success',
            message: '提醒更新成功！',
          });
          this.centerDialogVisible = false; // 关闭对话框
          this.loaddata(); // 刷新表格数据以显示更新结果
        })
        .catch((error) => {
          // 处理更新失败的情况
          console.error('更新提醒失败:', error);
          this.$message.error('更新提醒失败，请重试。');
        });
    },
  },
  created() {
    this.loaddata()
    this.loadtable()
  }
}
</script>
