<template>
  <div class="map__wrapper">
    <div class="map__content" ref="mapContent"></div>
    <div class="cont__wrapper">
      <el-button type="primary" @click="drawBH">添加标绘</el-button>
      <div v-for="item in BoomCaseValue" :key="item.property">
        {{item.text}}:
        <el-input-number v-model="item.value" :min="item.min" :step="item.step" :max="item.max" label="描述文字" @change="(value) => changeBoomCaseValue(item.property,value)"></el-input-number>
      </div>
    </div>
  </div>
</template>

<script>
import "../map/css/reset.css"
import "../map/css/page.css"

import * as maptalks from '~/maptalks.js';
import MapboxglLayer from "../map/lib/maptalks.mapboxgl.js"
import JscLayer from "../map/js/jsc.three"
// sx 工具
import JscEx from "../map/js/jsc.extend"
// xr 工具
import DrawLayer from '../map/js/jsc.draw'

// 版本号
let Version = `jsc_3dmap @0.1.0`
console.info(Version)

let fireValue = JscEx.BoomCase.getProperties().properties.map(item => { item.value = item.default; return JSON.parse(JSON.stringify(item)) })

export default {
  name: 'mapComponent',
  props: {
    day: {
      type: String,
      default: 'mapbox://styles/caesasriv87/cjfc4iaya8fzp2rlhggo8972y'
    },
    night: {
      type: String,
      default: 'mapbox://styles/caesasriv87/cjfc86jo57n0s2snuyafjhwm6'
    },
    center: {
      type: Array,
      default: function () {
        return [116.3528, 39.8986]
      }
    },
    zoom: {
      type: Number,
      default: 17
    },
    pitch: {
      type: Number,
      default: 45
    },
    maxPitch: {
      type: Number,
      default: 70
    },
    dragRotate: {
      type: Boolean,
      default: true
    },
    dragRotatePitch: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      baseLayer_day: null,
      baseLayer_night: null,
      map: null,
      jscLayer: null,
      bhLayer: null,
      BoomCaseValue: fireValue,
      effectComs: {},
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const baseLayer_day = this.baseLayer_day = new MapboxglLayer('tile', {
        glOptions: {
          'style': this.day
        }
      })
      const baseLayer_night = this.baseLayer_night = new MapboxglLayer('tile', {
        glOptions: {
          'style': this.night
        }
      })
      const map = this.map = new maptalks.Map(this.$refs.mapContent, {
        center: this.center,
        zoom: this.zoom,
        pitch: this.pitch,
        maxPitch: this.maxPitch,
        dragRotate: this.dragRotate,
        dragRotatePitch: this.dragRotatePitch,
        layers: [this.baseLayer_day]
      })

      const jscLayer = this.jscLayer = new JscLayer(map, {
        domid: this.$refs.mapContent,
        baseLayer: baseLayer_day,
        switchLayer: baseLayer_night,
        osmbuilding: false,
        routes: true
      })

      let fire_1 = new JscEx.BoomCase({
        x: 0,
        y: 0,
        z: 0,
      }, {
          firecontroller: {
            magnitude: 1.0,
            scale: 1.0
          }
        })

      this.$set(this.effectComs, 'fire', [])
      this.effectComs.fire.push(fire_1)

      jscLayer.addCase(fire_1)

      this.bhLayer = new DrawLayer(map)
    },
    drawBH() {
      if (this.bhLayer) {
        this.bhLayer.addShape('LineString')
      }
    },
    changeBoomCaseValue(name, value) {
      let op = { [name]: value }
      this.effectComs.fire[0].setOptions(op)
    }
  },
}
</script>

<style scoped>
.map__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.map__content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.cont__wrapper {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  height: 600px;
  background: #ccc;
  border: 3px solid #394ec2;
  border-radius: 15px;
  padding: 15px;
}
</style>
