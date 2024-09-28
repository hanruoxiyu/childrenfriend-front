<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="child" label="用户名" width="180"></el-table-column>
      <el-table-column prop="subject" label="考试科目" width="180"></el-table-column>
      <el-table-column prop="score" label="总成绩" width="180"></el-table-column>
      <el-table-column prop="startdate" label="开考时间"></el-table-column>
      <el-table-column prop="enddate" label="结束时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="viewSingleExam(scope.row.score_id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="考试详情" :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="examData">
        <el-table-column property="question_text" label="考试题目" width="400"></el-table-column>
        <el-table-column property="useranswer" label="用户回答" width="300"></el-table-column>
        <el-table-column property="answer" label="正确答案" width="300"></el-table-column>
        <el-table-column property="iscorrect" label="是否正确"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import { score_get, exam_getById} from "../../api/api";
export default {
  data() {
    return {
      tableData: [],
      examData: [],
      dialogTableVisible: false,
    }
  },
  methods: {
    //加载数据的方法，请求后端进行加载趣事列表
    loaddata() {
      score_get().then(res => {
        res.forEach(item => {
          // 使用正则表达式移除时间字符串中的字母
          if (item.startdate) {
            item.startdate = item.startdate.replace(/[A-Za-z]/g, ' ');
          }
          if (item.enddate) {
            item.enddate = item.enddate.replace(/[A-Za-z]/g, ' ');
          }
        });
        this.tableData = res
      })
    },
    viewSingleExam(score_id) {
      exam_getById(score_id).then(res => {
        this.examData = res;
        console.log(this.examData)
        // 显示对话框
        this.dialogTableVisible = true;
      });
    },
  },
  //在这个页面打开之处请求后端加载数据
  created() {
    this.loaddata();
  },
}
</script>
