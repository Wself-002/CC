<template>
  <div class="page">
    <div
      class="floatbtn"
      :class="[{ movebtn: longclick }, `${btntype}btn`]"
      @touchstart="touchstart($event)"
      @touchmove="touchmove($event)"
      @touchend="touchend($event)"
    >
      <!-- <span>悬浮按钮</span> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      timeoutevent: 0,
      longclick: 0,
      // 手指原始位置
      oldmousepos: {},
      // 元素原始位置
      oldnodepos: {},
      btntype: 'right'
    };
  },
  methods: {

    touchstart (ev) {
      // console.log('ev: ', ev);
      // 定时器控制长按时间，超过500毫秒开始进行拖拽
      this.timeoutevent = setTimeout(() => {
        this.longclick = 1;
      }, 100);
      // const selectdom = ev.currenttarget;
      const { pageX, pageY } = ev.touches[0]; // 手指位置
      // console.log('pageX, pageY: ', pageX, pageY);
      const selectdom = document.getElementsByClassName("floatbtn")[0]
      const { offsetLeft, offsetTop } = selectdom; // 元素位置
      // console.log('11111-offsetTop: ', offsetTop);
      // console.log('222222222-offsetLeft: ', offsetLeft);
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
      // console.log('ev: ', ev);
      // 未达到500毫秒就移动则不触发长按，清空定时器

      clearTimeout(this.timeoutevent);
      if (this.longclick === 1) {
        // const selectdom = ev.currenttarget;
        // console.log('selectdom: ', selectdom);
        const selectdom = document.getElementsByClassName("floatbtn")[0]
        // x轴偏移量
        const lefts = this.oldmousepos.x - this.oldnodepos.x;
        // y轴偏移量
        const tops = this.oldmousepos.y - this.oldnodepos.y;
        const { pageX, pageY } = ev.touches[0]; // 手指位置
        // console.log('ev.touches[0]: ', ev.touches[0]);
        // console.log('pageX, pageY: ', pageX, pageY);
        selectdom.style.left = `${pageX - lefts}px`;
        selectdom.style.top = `${pageY - tops}px`;
      }
    },
    touchend (ev) {
      // 清空定时器
      clearTimeout(this.timeoutevent);
      if (this.longclick === 1) {
        this.longclick = 0;
        // const selectdom = ev.currenttarget;
        const selectdom = document.getElementsByClassName("floatbtn")[0]
        const scrollWidth = document.body.scrollWidth;
        const scrollHeight = document.body.scrollHeight;
        const { offsetLeft, offsetTop } = selectdom;
        console.log('offsetLeft, offsetTop: ', offsetLeft, offsetTop);
        console.log('scrollWidth, scrollHeight: ', scrollWidth, scrollHeight);


        selectdom.style.top = offsetTop + 'px'
        let isLeft = Math.sign((scrollWidth / 2) - offsetLeft) == -1 ? 'right' : 'left'
        if (isLeft == 'left') {
          selectdom.style.right = 'auto'
          selectdom.style.left = 0
        } else {
          selectdom.style.left = 'auto'
          selectdom.style.right = 0
        }

        if (offsetTop < 20) {
          selectdom.style.bottom = 'auto';
          selectdom.style.top = '20px';
        } else if ((offsetTop + 38) > scrollHeight) {
          selectdom.style.top = 'auto';
          selectdom.style.bottom = '20px';
        }
        this.btntype = isLeft
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  // background: red;
}
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
  width: 100px;
  left: calc(100vw - 100px);
  top: calc(100vw - 100px);
  color: #e0933a;
  background: #fcebd0;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  &.rightbtn {
    border-radius: 20px 0 0 20px;
  }
  &.leftbtn {
    border-radius: 0 20px 20px 0;
  }
  &.movebtn {
    border-radius: 20px;
  }
}
</style>
