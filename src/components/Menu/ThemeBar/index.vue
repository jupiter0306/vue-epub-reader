<template>
  <div class="wrapper">
    <div class="theme" v-for="(theme,index) in themeList" :key="index" @click="setTheme(index)">
        <div class="content" :style="{background:theme.style.body.background}" :class="{'border':theme.style.body.background === '#fff'}"></div>
        <div class="text" :class="{'selected':currIndex===index}">{{theme.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'ThemeBar',
    props:{
        themeList:Array,
    },
    data(){
        return{
            currIndex:0
        }
    },
    methods:{
        setTheme(index){
            this.currIndex = index
            this.$bus.$emit('themeChange',index)
        }
    }

}
</script>

<style lang="less" scoped>
@import '@/assets/styles/global.less'; 
.wrapper{
    display: flex;
    height:100%;
    .theme{
        flex:1;
        display: flex;
        flex-direction: column;
        padding: ~`px2rem(8)`;
        // 元素宽高包括border和padding
        box-sizing: border-box;
        .content{
            flex:1;
            &.border{
                border:~`px2rem(1)` solid #000;
            }
        }
        .text{
            flex:0 0 ~`px2rem(20)`;
            font-size: ~`px2rem(14)`;
            color:#999;
            .center();
            &.selected{
                color:#333;
            }
        }
    }
}
</style>