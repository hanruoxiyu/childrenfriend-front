<template>
  <div class="contact">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="起始位置">
        <el-input placeholder="请输入起始位置" v-model="formInline.start" id="suggestId"></el-input>
      </el-form-item>
      <el-form-item label="终点位置">
        <el-input placeholder="请输入终点位置" v-model="formInline.end" id="suggestId2"></el-input>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="travelNow">查询路线</el-button>
        <el-button type="danger" @click="table = true">出行记录</el-button>
      </el-form-item>
    </el-form>
    <div id="l-map" />
    <div id="start" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;" />
    <div id="end" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;" />

    <el-drawer title="出行记录表" :visible.sync="table" direction="rtl" size="50%">
      <el-table :data="gridData">
        <el-table-column property="startlocation" label="始发地" width="200"></el-table-column>
        <el-table-column property="destination" label="目的地" width="300"></el-table-column>
        <el-table-column property="time" label="出发时间"></el-table-column>
      </el-table>
    </el-drawer>

  </div>
</template>

<script>

import {get_travel, travelLocation} from '../../api/api'

export default {
  name: 'CountToPage',
  data() {
    return {
      formInline: {
        start: '',
        end: ''
      },
      longitude: 0,
      latitude: 0,
      map: '',
      ac: '',
      start_location: "",
      start_name: "",
      table: false,

    }
  },
  mounted() {
    this.initMap()
  },

  created() {
    this.getloacation()
    this.loadtable()
  },
  methods: {
    travelNow() {
      var start = document.getElementById("start").getAttribute("value")
      var end = document.getElementById("end").getAttribute("value")
      var walking = new BMap.WalkingRoute(this.map, { renderOptions: { map: this.map, autoViewport: true } });
      walking.search(start, end);
    },

    selectLocation(me, idNmae) {

      function G(id) {
        return document.getElementById(id);
      }

      me.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
      })
      let myValue;


      me.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        this.start_name = myValue;
        G(idNmae).setAttribute("value", myValue)
      })
    },
    initMap() {
      this.map = new BMap.Map('l-map')
      this.map.centerAndZoom('长沙', 12)
      // eslint-disable-next-line no-mixed-spaces-and-tabs
      var ac = new BMap.Autocomplete( // 建立一个自动完成的对象
        {
          'input': 'suggestId',
          'location': this.map
        })

      this.selectLocation(ac, "start");
      var ac2 = new BMap.Autocomplete( // 建立一个自动完成的对象
        {
          'input': 'suggestId2',
          'location': this.map
        })
      this.selectLocation(ac2, "end");


    },
    getloacation() {
      travelLocation().then(res => {
        this.longitude = res.longitude
        this.latitude = res.latitude
        console.log(this.latitude)
        this.map.setCenter(new BMap.Point(this.longitude, this.latitude))
      })
    },
    loadtable() {
      //调用后端接口加载列表数据
      get_travel().then(res => {
        res.forEach(item => {
          // 使用正则表达式移除时间字符串中的字母
          if (item.time) {
            item.time = item.time.replace(/[A-Za-z]/g, ' ');
          }
        });
        this.gridData = res
      })
    },

  }
}
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "微软雅黑";
  font-size: 14px;
}

#l-map {
  height: 960px;
  width: 100%;
}

#r-result {
  width: 100%;
}
</style>
