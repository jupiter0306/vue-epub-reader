<template>
  <div class="content-bar" >
    <!-- 书可用时才开始进行渲染 -->
    <div class="content-wrapper" v-if="bookAvailable">
        <div class="content-item" v-for="(item,index) in navigation.toc" :key="index" @click="jumpTo(item.href)">
            <span class="text">{{item.label}}</span>
        </div>
    </div>
    <div class="loading-wrapper" v-else>loading...</div>
  </div>
</template>

<script>
export default {
    name:'ContentBar',
    props:{
        bookAvailable:Boolean,
        navigation:Object
    },
    methods:{
        jumpTo(href){
            this.$bus.$emit('contentChange',href)
        }
    }

}
</script>

<style lang="less" scoped>
@import '@/assets/styles/global.less'; 
.content-bar{
    position: absolute;
    left:0;
    top:0;
    height:100%;
    width: 80%;
    z-index:102;
    background: #fff;
    // 控制动画
    &.slide-right-enter,&.slide-right-leave-to{
        transform: translate3d(-100%,0,0);
        opacity:0;
    }
    &.slide-right-enter-active,&.slide-right-leave-active{
        transition:all .3s ease;
    }
    &.slide-right-enter-to,&.slide-right-leave{
        opacity:1
    }
    .content-wrapper{
        width: 100%;
        height: 100%;
        overflow: auto;
        .content-item {
            padding: ~`px2rem(20)` ~`px2rem(15)`;
            border-bottom: ~`px2rem(1)` solid #ccc;
            .text {
                font-size: ~`px2rem(14)`;
                color: #333;
            }
        }
    }
    .loading-wrapper{
        width: 100%;
        height: 100%;
        font-size: ~`px2rem(16)`;
        color: #333;
        .center();

    }
}
</style>>