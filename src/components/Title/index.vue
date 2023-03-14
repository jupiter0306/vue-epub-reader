<template>
    <div class="title-wrapper">
        <div class="left"><span class="icon-back icon"></span></div>
        <div class="right">
        <div class="icon-wrapper"><span class="icon-cart icon"></span></div>
        <div class="icon-wrapper"><span class="icon-person icon"></span></div>
        <div class="icon-wrapper"><span class="icon-more icon"></span></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Title',

}
</script>

<style lang="less" scoped>
@import '@/assets/styles/global.less'; 
.title-wrapper{
    position: absolute;
    display:flex;
    left:0;
    top:0;
    width: 100%;
    height: ~`px2rem(48)`;
    z-index: 101;
    background: #fff;
    box-shadow: 0  ~`px2rem(8)` ~`px2rem(8)` rgba(0,0,0,.15);

    .left{
        flex:0 0 ~`px2rem(60)`;
        .center();
    }
    .right{
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .icon-wrapper{
            flex:0 0 ~`px2rem(60)`;
            .center();
        }
    }
    // 动画效果控制
  &.slide-down-enter,&.slide-down-leave-to{
    transform: translate3d(0,-100%,0);
    opacity: 0;
  }
  &.slide-down-enter-to,&.slide-down-leave{
    opacity: 1;    
  }
  &.slide-down-enter-active,&.slide-down-leave-active{
    transition: all .3s ;    
  }
}

</style>