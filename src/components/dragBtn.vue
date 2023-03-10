<template>
  <div
    :id="'floatbtn' + objInfo.id"
    class="floatbtn"
    :class="[{ movebtn: longclick}, `${btntype}btn`]"
    :style="{background:objInfo.isshow?getChannel.bg:'transparent',color:objInfo.isshow?getChannel.color:getChannel.dialog_btn,right:'0',top:objInfo.top}"
    @touchstart="touchstart($event)"
    @touchmove="touchmove($event)"
    @touchend="touchend($event)"
  >{{objInfo.word}}</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  props: {
    objInfo: {
      type: Object,
      default: function () { return {} }
    },
  },
  data () {
    return {
      timeoutevent: 0,
      longclick: 0,
      // 手指原始位置
      oldmousepos: {},
      // 元素原始位置
      oldnodepos: {},
      btntype: 'right',
      // domPosition:{
      //   top:0,
      //   bottom:false
      // }
    };
  },
  methods: {
    touchstart (ev) {
      ev.preventDefault()
      const { pageX, pageY } = ev.touches[0]; // 手指位置
      const selectdom = document.getElementById(`floatbtn${this.objInfo.id}`)
      const { offsetLeft, offsetTop } = selectdom; // 元素位置
      // 手指原始位置
      this.oldmousepos = {
        x: pageX,
        y: pageY
      };
      // 元素原始位置
      this.oldnodepos = {
        x: offsetLeft,
        y: offsetTop
      };
      selectdom.style.left = `${offsetLeft}px`;
      selectdom.style.top = `${offsetTop}px`;
    },
    touchmove (ev) {
      ev.preventDefault()
      this.longclick = 1
        // const selectdom = document.getElementsByClassName("floatbtn")[0]

      const selectdom = document.getElementById(`floatbtn${this.objInfo.id}`)
        // x轴偏移量
        const lefts = this.oldmousepos.x - this.oldnodepos.x;
        // y轴偏移量
        const tops = this.oldmousepos.y - this.oldnodepos.y;
        const { pageX, pageY } = ev.touches[0]; // 手指位置
        selectdom.style.left = `${pageX - lefts}px`;
        selectdom.style.top = `${pageY - tops}px`;
    },
    touchend (ev) {
      ev.preventDefault()
      if(this.longclick == 1){
        this.longclick = 0
      }else{
        this.$emit('dragBtnClick')
        return
      }
      const selectdom = document.getElementById(`floatbtn${this.objInfo.id}`)
      const scrollWidth = document.body.scrollWidth;
      const scrollHeight = document.body.scrollHeight;
      const { offsetLeft, offsetTop } = selectdom;
      selectdom.style.top = offsetTop + 'px'
      // this.domPosition = {top: offsetTop, bottom: false}
      let isLeft = Math.sign((scrollWidth / 2) - offsetLeft) == -1 ? 'right' : 'left'
      if (isLeft == 'left') {
        selectdom.style.right = 'auto'
        selectdom.style.left = 0
      } else {
        selectdom.style.left = 'auto'
        selectdom.style.right = 0
      }
        console.log('this.$parent.positonInfo: ', this.$parent.positonInfo);
      if (offsetTop < 20) {
        selectdom.style.bottom = 'auto';
        selectdom.style.top = '20px';
        // this.domPosition = {top: 20, bottom: false}
      } else if ((offsetTop + 38) > scrollHeight) {
        selectdom.style.top = 'auto';
        selectdom.style.bottom = '20px';
        // this.domPosition = {top: false, bottom: 20}
      }

      // switch(this.objInfo.id){
      //   case 1:
      //     this.$parent.positonInfo = Object.assign(this.$parent.positonInfo,{drag1Top:this.domPosition.top,drag1Bottom:this.domPosition.bottom})
      //     break;
      //   case 2:
      //     this.$parent.positonInfo = Object.assign(this.$parent.positonInfo,{drag2Top:this.domPosition.top,drag2Bottom:this.domPosition.bottom})
      //     break;
      //   case 3:
      //     this.$parent.positonInfo = Object.assign(this.$parent.positonInfo,{drag3Top:this.domPosition.top,drag3Bottom:this.domPosition.bottom})
      //     break;
      //   default:
      //     break;
      // }
      this.btntype = isLeft
    },
    // encapsulationFunction(offsetTop,selectdom){
    //   let obj = this.$parent.positonInfo
    //   switch(this.objInfo.id){
    //     case 1:
    //       if (offsetTop < 20) {
    //         if(obj.drag2Top == 0){
    //           selectdom.style.bottom = 'auto';
    //           selectdom.style.top = '20px';
    //           this.domPosition = {top: 20, bottom: false}
    //         }else if(obj.drag2Top <= 50){
    //           selectdom.style.bottom = 'auto';
    //           selectdom.style.top = (obj.drag2Top + 30 + 5) + 'px';
    //           this.domPosition = {top: obj.drag2Top + 30 + 5, bottom: false}
    //         }else if(50 < obj.drag2Top < 80){

    //         }else if(obj.drag2Top > 50){
    //           selectdom.style.bottom = 'auto';
    //           selectdom.style.top = '20px';
    //           this.domPosition = {top: 20, bottom: false}
    //         }
    //       } else if ((offsetTop + 38) > scrollHeight) {
    //         selectdom.style.top = 'auto';
    //         selectdom.style.bottom = '20px';
    //         this.domPosition = {top: false, bottom: 20}
    //       }





    //       if(obj.drag2Top == 0){
    //         if (offsetTop < 20) {
    //           selectdom.style.bottom = 'auto';
    //           selectdom.style.top = '20px';
    //           this.domPosition = {top: 20, bottom: false}
    //         } else if ((offsetTop + 38) > scrollHeight) {
    //           selectdom.style.top = 'auto';
    //           selectdom.style.bottom = '20px';
    //           this.domPosition = {top: false, bottom: 20}
    //         }
    //       }

    //       else if(obj.drag2Bottom == 20){
    //         selectdom.style.top = 'auto';
    //         selectdom.style.bottom = (obj.drag2Bottom + 30 + 5) + 'px';
    //         this.domPosition = {top: false, bottom: obj.drag2Bottom + 30 + 5}
    //       }else if(){

    //       }





    //       break;
    //     case 2:
    //       break;
    //     case 3:
    //       break;
    //     default:
    //       break;
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
@mixin notselect {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*ie10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
@mixin not-touch {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.floatbtn {
  @include notselect;
  @include not-touch();
  position: fixed;
  z-index: 1;
  overflow: hidden;
  width: 80px;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  &.rightbtn {
    border-radius: 20px 0 0 20px;
    box-shadow: 2px 7px 6px #ccc;
  }
  &.leftbtn {
    border-radius: 0 20px 20px 0;
    box-shadow: 0 6px 6px #ccc;
  }
  &.movebtn {
    border-radius: 20px;box-shadow:none;
  }
}
</style>
