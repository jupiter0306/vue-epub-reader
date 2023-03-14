<template>
<div class="menu">
    <div class="set-wrapper" v-show="currShow != -1">
        <ProgressBar v-show="currShow === 0" :bookAvailable="bookAvailable"/> 
        <ThemeBar v-show="currShow === 1" :themeList="themeList"/>
        <FontBar v-show="currShow === 2" :fontSizeList="fontSizeList"/>
    </div>
    <div class="menu-wrapper">
        <!-- 目录 -->
        <div class="icon-wrapper"><span class="icon-menu icon" @click="$bus.$emit('showContent')"></span></div>
        <!-- 进度条 -->
        <div class="icon-wrapper"><span class="icon-progress icon" @click="currShow === 0 ? currShow = -1: currShow = 0"></span></div>
        <!-- 主题 -->
        <div class="icon-wrapper"><span class="icon-bright icon" @click="currShow === 1 ? currShow = -1: currShow = 1"></span></div>
        <!-- 字体 -->
        <div class="icon-wrapper"><span class="icon" @click="currShow === 2 ? currShow = -1: currShow = 2">A</span></div>
    </div>
</div>
</template>

<script>
import FontBar from './FontBar'
import ThemeBar from './ThemeBar'
import ProgressBar from './ProgressBar'


export default {
    name:'Menu',
    components:{
        FontBar,
        ThemeBar,
        ProgressBar,
    },
    props:{
        fontSizeList:Array,
        themeList:Array,
        bookAvailable:Boolean,
        isTMShow:Boolean
    },
    data(){
        return{
            currShow:-1
        }
    },
    methods:{
        setFont(){
            this.isShow = !this.isShow
        }
    },
    watch:{
        isTMShow(){
            // 如果不显示菜单栏 currShow清-1
            if(!this.isTMShow) this.currShow=-1
        }
    }

}
</script>

<style lang="less" scoped>
@import '@/assets/styles/global.less'; 
.menu{
    position: absolute;
    display: flex;
    flex-direction: column;
    left:0;
    bottom: 0;
    width: 100%;
    z-index: 101;
    background: #fff;
    box-shadow: 0  ~`px2rem(-8)` ~`px2rem(8)` rgba(0,0,0,.15);
    .set-wrapper{
        height: ~`px2rem(60)`;
    }
    .menu-wrapper{
        display: flex;
        height: ~`px2rem(48)`;
        .setting-wrapper{
            height: ~`px2rem(48)`;
            flex:1;
        }
        .icon-wrapper{
            flex:1;
            .center();
        }
    }
    // 控制动画
    &.slide-up-enter,&.slide-up-leave-to{
        transform: translate3d(0,100%,0);
        opacity: 0;
    }
    &.slide-up-enter-to,&.slide-up-leave{
        opacity: 1;
    }
    &.slide-up-enter-active,&.slide-up-leave-active{
        transition: all .3s ;    
    }
}

</style>