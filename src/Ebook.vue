<template>
<div class="ebook-wrapper">
  <transition name="slide-down">
    <Title v-show="isTMShow"/>
  </transition>
  <transition name="slide-up">
    <Menu 
      v-show="isTMShow" 
      :fontSizeList="fontSizeList"
      :themeList="themeList"
      :bookAvailable="bookAvailable"
      :isTMShow="isTMShow"
    />
  </transition>
  <transition name="slide-right">
    <ContentBar v-show="isContentShow" :bookAvailable="bookAvailable" :navigation="navigation"/> 
  </transition>
  <!-- 图书渲染部分 -->
  <div id="area"></div>
  <!-- 图书上层控制面板部分 -->
  <div class="mask">
    <div class="left" @click="prev"></div>
    <div class="mid" @click="toggleTitleMenu"></div>
    <div class="right" @click="next"></div>
  </div>
  <!-- 目录显示时的遮罩 -->
  <div class="content-mask" v-show="isContentShow" @click="hideContent"></div>
</div>

</template>

<script>
import Epub from 'epubjs'
import Title from '@/components/Title/index.vue'
import Menu from '@/components/Menu'
import ContentBar from '@/components/ContentBar'
const DOWNLOAD_URL = '/static/2018_Book_AgileProcessesInSoftwareEngine.epub'
global.ePub = Epub
export default {
  name:'Ebook',
  components: { 
    Title,
    Menu,
    ContentBar 
  },
  data(){
    return{
      // 本书是否可用(针对navigation和location初始化设置 即进度条功能和目录功能使用)
      bookAvailable:false,
      // 菜单栏是否显示
      isTMShow:false,
      // 控制目录显示
      isContentShow:false,
      // 字体选择列表
      fontSizeList: [
				{fontSize:12},
				{fontSize:14},
				{fontSize:16},
				{fontSize:18},
				{fontSize:20},
				{fontSize:22},
				{fontSize:24}
			],
      // 当前字体
      currFontSize:12,
      // 主题列表
      themeList: [
				{
					name:'default',
					style:{
						body:{
							'color':'#000',background:'#fff'
						}
					}
				},
				{
					name:'eye',
					style:{
						body:{
							'color':'#000',background:'#ceeaba'
						}
					}
				},
				{
					name:'night',
					style:{
						body:{
							'color':'#fff',background:'#000'
						}
					}
				},
				{
					name:'gold',
					style:{
						body:{
							'color':'#000',background:'rgb(241,236,226)'
						}
					}
				},
			],
      // 当前主题
      currTheme:0,
      // navigation
      navigation:null,
    }
  },
  methods:{
    async showEpub(){
      // 生成book
      // this.set(this.book,new Epub(DOWNLOAD_URL))
      this.book = new Epub(DOWNLOAD_URL)

      // 通过Book.renderTo生成redition渲染对象
      this.rendition = this.book.renderTo("area",{
        width:window.innerWidth,
        height:window.innerHeight
      })
      // 渲染电子书
      await this.rendition.display()
      //获取Theme对象
			this.themes = this.rendition.themes;
			//设置默认字体
			this.fontSizeChange(this.currFontSize);
			/*thems的两个方法:
				主题注册:this.themes.register(name,styles)
				主题切换:this.themes.select(name)
			*/
			this.registerTheme();
			this.themeChange(this.currTheme)
			//获取Locations对象
			//通过epubjs钩子函数来实现电子书定位
			this.book.ready.then(async () => {
				//生成目录
				this.navigation = this.book.navigation
        // 调用locations generate方法生成全部locations
        await this.book.locations.generate()
        this.locations = this.book.locations
        // locations对象渲染完毕后本书才能使用
        this.bookAvailable = true
			})
    },
    // 切换上一页
    prev(){
      if(this.rendition){
        console.log(this.redition);
        this.rendition.prev()
      } 
    },
    // 切换下一页
    next(){
      if(this.rendition) this.rendition.next()
    },

    // 切换标题菜单的显示和隐藏
    toggleTitleMenu(){
      this.isTMShow = !this.isTMShow
    },
    // 隐藏目录
    hideContent(){
      if(this.isContentShow) this.isContentShow = false
    },
    // 显示目录
    showContent(){
      if(!this.isContentShow) this.isContentShow = true
    },
    // 注册主题
    registerTheme(){
      this.themeList.forEach(theme=>{
        this.themes.register(theme.name,theme.style)
      })
    },
    // 切换字体
    fontSizeChange(fontSize){
      this.currFontSize = fontSize
      this.themes.fontSize(fontSize+'px')
    },
    // 切换主题
    themeChange(index){
      this.currTheme = index
      this.themes.select(this.themeList[index].name)
    },
    // 切换进度条
    progressChange(progress){
      let percentage = progress/100
      const location = this.locations.cfiFromPercentage(percentage)
      this.rendition.display(location)     
    },
    // 切换目录进度
    contentChange(href){
      this.rendition.display(href)
    }
  },
  mounted() {
    this.showEpub()
    // 绑定全局事件总线事件:切换字体颜色
    this.$bus.$on('fontSizeChange',this.fontSizeChange)
    // 切换主题
    this.$bus.$on('themeChange',this.themeChange)
    // 进度条跳转进度
    this.$bus.$on('progressChange',this.progressChange)
    // 目录切换书进度
    this.$bus.$on('contentChange',this.contentChange)
    // 目录的显示
    this.$bus.$on('showContent',this.showContent)
  },
  beforeDestroy(){
    // 解绑全局事件总线
    this.$bus.$off('fontSizeChange')
    this.$bus.$off('themeChange')
    this.$bus.$off('progressChange')
    this.$bus.$off('contentChange')

  },
}
</script>
<style lang="less" scoped>
@import '@/assets/styles/global.less'; 
.ebook-wrapper{
  position: relative; 
  
  // 控制面板
  .mask{
    position: absolute;
    display: flex;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    z-index: 100;
    .left{
      flex:0 0 30%;
    }
    .mid{
      flex: 1;
    }
    .right{
      flex: 0 0 30%;
    }
  }
  .content-mask{
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    z-index:101;
    background: rgba(51, 51, 51, .8);
  }
}
</style>
