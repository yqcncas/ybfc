<template>
	  <bm-overlay
	    ref="customOverlay"
		class="sample"
	    pane="labelPane"
	    @draw="draw">
		<view v-if="flag == 1" class="sample-item" @click="handleClick">
			<view>{{dictValue}}</view>
			<view>{{count}}</view>
		</view>
		<view v-if="flag == 2" class="sample-item" :class="{orange:dictValue == '下吕浦'}" @click="handleClick">
			<view>{{dictValue}}</view>
			<view>{{count}}</view>
		</view>
		<view v-if="flag == 3" class="sample-point"></view>
		<view v-if="flag == 4" class="sample-label" @click="handleClick">
			<view>{{areaName}}|{{count}}套</view>
		</view>
	  </bm-overlay>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: ['position','dictValue','count','flag','banTouch','areaName','areaId','labelIndex'],
		watch: {
		    position: {
		      handler () {
		        this.$refs.customOverlay.reload()
		      },
		      deep: true
		    }
		},
		methods:{
			    handleClick () {
					if(this.areaId){
						this.$emit('labelClick',this.areaId)
					}else{
						this.$emit('checkMore',this.labelIndex)
					}
			    },
			    draw ({el, BMap, map}) {
			      const {lng, lat} = this.position
			      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
			      el.style.left = pixel.x - 40 + 'px'
			      el.style.top = pixel.y - 20 + 'px'
			    }
		}
	}
</script>

<style lang="less">
	.sample {
	  // width: 50px;
	  // height: 50px;
	  // border-radius: 50%;
	  // background: rgba(135,74,152,0.8);
	  // overflow: hidden;
	  // box-shadow: 0 0 5px #000;
	  // color: #fff;
	  // font-size: 12px;
	  // display: flex;
	  // flex-direction: column;
	  // align-items: center;
	  // justify-content: center;
	  // padding: 10px;
	  position: absolute;
	  .sample-item{
		  width: 50px;
		  height: 50px;
		  border-radius: 50%;
		  background: rgba(135,74,152,0.8);
		  padding: 10px;
		  overflow: hidden;
		  color: #fff;
		  font-size: 12px;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		  & > view:first-child{
		  		  white-space: nowrap;
		  }
	  }
	  .orange{
		  background: rgba(254,158,46,0.8);
	  }
	  .sample-point{
		  width: 10px;
		  height: 10px;
		  border-radius: 50%;
		  background: rgba(135,74,152,0.8);
		  overflow: hidden;
	  }
	  .sample-label{
		  // height: 50px;
		  // width: 50px;
		  padding: 10px 10px;
		  border-radius: 20px;
		  color: #fff;
		  font-size: 12px;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  white-space: nowrap;
		  background: rgba(135,74,152,0.8);
	  }
	}
</style>
