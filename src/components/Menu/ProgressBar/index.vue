<template>
  <div class="progress-bar">
    <div class="progress-wrapper">
        <input class="progress" 
            type="range"
            max="100"
            min="0"
            step="1"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value="currProgress"
            :disabled="!bookAvailable"
            ref="progress"
        />
    </div>
    <div class="text-wrapper">
        {{bookAvailable ? currProgress +'%': 'loading...'}}
    </div>
  </div>
</template>

<script>
export default {
    name:'ProgressBar',
    props:{
        bookAvailable:Boolean
    },
    data(){
        return {
            currProgress:0
        }
    },
    methods:{
        // 拖动进度条时触发事件
        onProgressInput(value){
            this.currProgress = value
            // 调整进度条左边选中部分的背景色范围
            this.$refs.progress.style.backgroundSize = `${this.currProgress}% 100%` 
        },
        // 进度条松开后触发事件，根据进度条数值跳转到指定位置
        onProgressChange(value){
            this.currProgress = value
            this.$bus.$emit('progressChange',value)
        }
    },

}
</script>

<style lang="less" scoped>
@import '@/assets/styles/global.less'; 
.progress-bar{
    height: 100%;
    flex-direction: column;
    .center();
    .progress-wrapper{
        flex: 1;
        width: 100%;
        padding:0 ~`px2rem(30)`;
        box-sizing: border-box;
        .center();
        .progress{
            width: 100%;
            /* cover default CSS */
            -webkit-appearance:none;
            height:~`px2rem(2)`;
            border-radius: ~`px2rem(20)`;
            // 两种背景用 background-size 进行切换
            background: -webkit-linear-gradient(#999,#999) no-repeat,#ddd;
            background-size:0 100%;
            &:focus {
                outline:none;
            }
            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: ~`px2rem(20)`;
                width: ~`px2rem(20)`;
                border-radius: 50%;
                background: #fff;
                border: ~`px2rem(1)` solid #ddd;
                box-shadow: 0 ~`px2rem(4)` ~`px2rem(4)` 0 rgba(0, 0, 0, .15);
            }
        }
    }
    .text-wrapper{
        flex:0 0 ~`px2rem(20)`;
        font-size: ~`px2rem(14)`;
        color:#333;
        .center();
    }
}
</style>