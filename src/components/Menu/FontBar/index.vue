<template>
    <div class="font-bar">
        <div class="font-small" :style="{fontSize:fontSizeList[0].fontSize+'px'}">A</div>
        <div class="select-item" v-for="(item,index) in fontSizeList" :key="index" @click="changeFontSize(item.fontSize,index)">
            <div class="line"></div>
            <div class="point-wrapper" >
                <div class="point" v-show="currIndex === index">
                    <div class="small-point"></div>
                </div>
            </div>
            <div class="line"></div>
        </div>
        <div class="font-big" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize+'px'}">A</div>
    </div>

</template>

<script>
export default {
    name:'FontBar',
    props:{
        fontSizeList:Array,
    },
    data(){
        return{
            currIndex:0
        }
    },
    methods:{
        changeFontSize(fontSize,index){
            this.currIndex = index
            this.$bus.$emit('fontSizeChange',fontSize)
        }
    }

}
</script>

<style lang="less" scoped>
@import '@/assets/styles/global.less'; 
.font-bar{
    display: flex;
    height:100%;
    // 两端的预览字体
    .font-small,.font-big{
        flex:0 0 ~`px2rem(40)`;
        display: flex;
        align-items: center;
    }
    .font-small{
        justify-content: flex-end;
    }
    .font-big{
        justify-content: flex-start;
    }
    // 中间的选择项
    .select-item{
        flex:1;
        .center();
        &:nth-child(2){
            .line:first-child{
                border-top:none;
            }
        }
        &:nth-last-child(2){
            .line:last-child{
                border-top:none;
            }
        }
    .line{
        border-top:~`px2rem(2)` solid #ccc;
        width: 100%;
        }
    .point-wrapper{
        position: relative;
        border-right:~`px2rem(2)` solid #ccc;
        height: 8px;
        // 外层圆球
        .point{
            position: absolute;
            left:~`px2rem(-10)`;
            top:~`px2rem(-8)`;
            width:~`px2rem(20)`;
            height:~`px2rem(20)`;
            border-radius:50%;
            background:#fff;
            border: ~`px2rem(1)` solid #ccc;
            box-shadow: 0 ~`px2rem(4)` ~`px2rem(4)` rgba(0,0,0,.15);
            .center();
            // 内层小点
            .small-point{
                width:~`px2rem(5)`;
                height:~`px2rem(5)`;
                border-radius: 50%;
                background: #000;
                }
            }
        }
    }
}


</style>