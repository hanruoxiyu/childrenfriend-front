<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="child" label="用户名" width="80"></el-table-column>
      <el-table-column prop="costime" label="检测时间" ></el-table-column>
      <el-table-column prop="status" label="检测结果" ></el-table-column>
      <el-table-column prop="remind" label="提醒结果" ></el-table-column>
    </el-table>
  </div>
</template>
<script>

import { zuozi_get } from "../../api/api";
import { Image as ElImage } from "element-ui";
export default {
  components: {
    ElImage,
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    loaddata() {
      //调用后端接口加载列表数据
      zuozi_get().then(res => {
        res.forEach(item => {
          // 使用正则表达式移除时间字符串中的字母
          if (item.costime) {
            item.costime = item.costime.replace(/[A-Za-z]/g, ' ');
          }
          if (item.status == 1) {
            item.status = '坐姿端正'
            item.remind = '无需提醒'
          } else {
            item.status = '坐姿不端正'
            item.remind = '已提醒'
          }
        });
        this.tableData = res
      })
    },
    getImageUrl(path) {
      // 根据实际情况调整图片路径
      // 拼接完整的图片URL
      return process.env.VUE_APP_IMAGE_BASE_URL + path;
    },
  },
  created() {
    this.loaddata()
  }
}
</script>
