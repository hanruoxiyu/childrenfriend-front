<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="child" label="用户名" width="80"></el-table-column>
    <el-table-column prop="askTime" label="提问时间" width="180"></el-table-column>
    <el-table-column prop="question" label="问题记录" width="180"></el-table-column>
    <el-table-column prop="answer" label="回答记录" width="550"></el-table-column>
  </el-table>
</template>

<script>

import { qa } from "../../api/api";

export default {
  data() {
    return {
      tableData: [], // 初始化空数组存放表格数据
    };
  },
  methods:{
       //加载数据
      loaddata() {
        //调用后端接口加载列表数据
        qa().then(res => {
          res.forEach(item => {
            // 使用正则表达式移除时间字符串中的字母
            if (item.askTime) {
              item.askTime = item.askTime.replace(/[A-Za-z]/g, ' ');
            }
          });
          console.log(res)
          this.tableData = res
        })
      },
  },
      created() {
      this.loaddata()
    }
  }
</script>
<style lang="less">
body {
    font-family: 'Roboto Mono';
}

.clickable {
    cursor: pointer;
}

.hidden {
    visibility: hidden;
}

.shadowed {
    -webkit-box-shadow: 3px 3px 23px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 3px 3px 23px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 3px 3px 23px 0px rgba(50, 50, 50, 0.75);
}

.chat-box {
    display: inline-block;
    border-radius: 8px;
    padding: 20px;
    top: 50%;
    width: 800px;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
    position: absolute;
    background-color: #FBFBFB;
}

.chat-window-header {
    font-size: 20px;
    line-height: 1.6em;

    background: rgb(255, 255, 255);
    /* The Fallback */
    background: rgba(122, 122, 122, 0.8);

}
.chat-screen {
    width: 760px;
    height: 400px;
    background: rgba(255, 255, 255, .5);
    border: 1px solid #999;
    padding: 10px;
    overflow: auto;
    margin: 20px 0;
}


.sender {
    color: red;
    margin-right: 10px;
    display: none;
}

.Robot {
    background: url('http://192.168.43.138:8000/static/img/rot.png');
    background-repeat: no-repeat;
    height: 40px;
    width: 40px;
    margin-left: 20px;
    float: left;
    line-height: 0;
    font-size: 0;
    overflow: hidden;
}


.Me {
    background: url('http://192.168.43.138:8000/static/img/my.png');
    background-repeat: no-repeat;
    height: 40px;
    width: 40px;
    float: right;
    margin-right: 20px;
    line-height: 0;
    font-size: 0;
    overflow: hidden;
}


.chat-screen .sender.boto {
    color: blue;
}


.rotWord,
.mWord {
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
    text-align: center;
}

.rotWord_p {
    word-break: break-all;
    top: 4px;
    float: left;
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
    padding: 10px;
    line-height: 24px;
    background: rgba(0, 0, 255, .5);
    border-radius: 6px;
    max-width: 220px;
    display: inline-block;
    text-align: left;
}

.mWord_p {
    word-break: break-all;
    top: 2px;
    float: right;
    color: #fff;
    font-size: 14px;
    margin-right: 10px;
    padding: 10px;
    line-height: 24px;
    background: #19b955;
    border-radius: 6px;
    max-width: 220px;
    display: inline-block;
    text-align: left;
}


.chat-input {
    width: 620px;
    height: 30px;
    font-size: 18px;
    margin-top: 5px;
    outline: none;
    overflow: hidden;
    background: rgba(4, 4, 4, .1);
    border: none;
    border-radius: 5px;
}

.chat-send {
    padding: 5px 30px;
    display: inline-block;
    background: rgba(50, 50, 50, .75);
    vertical-align: bottom;
    width: 100px;
    height: 35px;
    float: right;
    cursor: pointer;
    text-align: center;
    font-size: 18px;
    color: #fff;
    user-select: none;
    border-radius: 10px;
}

.chat-send.loading {
    color: #B0C4DE;
}

.orb-holder {
    text-align: center;
    height: 100px;
    position: relative;
}

.orb {
    position: absolute;
    top: 0px;
    width: 200px;
    left: 50%;
    transform: translateX(-50%);
}

#emoji {
    position: absolute;
    top: 0px;
    width: 130px;
    left: 51%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}

#mute-btn {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    float: right;
    margin-top: 6px;
    //background-image: url('../img/mute_off.png');
    background-repeat: no-repeat;
    background-size: contain;
}

#mute-btn.on,
#mute-btn:hover {
    //background-image: url('../img/mute_on.png');
}

#online {
    margin-top: 6%;
    height: 500px;
    width: 15%;
    display: inline-block;
    margin-left: 20px;
    padding: 1%;
}

#users {
    top: 120px;
    background-color: white;
    width: 14.5%;
    height: 485px;

    position: absolute;
}

#onlinenow {
    background-color: lightblue;
    color: red;
    font-weight: bold;
    font-family: arial;
    font-size: 1.9em;
    text-align: center;
    display: block;
}

.copyright {
    position: fixed;
    bottom: 0px;
    left: 0px;
    margin: 5px;
}
</style>

