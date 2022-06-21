<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:14:38
 * @Description: 圆形进度条
-->

<template>
    <view class="ai-circle-progress">
        <view class="ai-circle-progress__left">
            <view ref="left-circle" class="ai-circle-progress__left__circle" :style="[leftSyle]" />
        </view>
        <view class="ai-circle-progress__right">
            <view ref="right-circle" class="ai-circle-progress__right__circle" :style="[rightSyle]" />
        </view>
        <view class="ai-circle-progress__circle" />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation');
// #endif

export default {
    name: 'AiCircleProgress',
    mixins: [mixins],
    props: {
        percentage: {
            type: [String, Number],
            default: 30,
        },
    },
    data() {
        return {
            leftBorderColor: 'rgb(200, 200, 200)',
            rightBorderColor: 'rgb(200, 200, 200)',
        };
    },
    computed: {
        leftSyle() {
            const style = {};
            style.borderTopColor = this.leftBorderColor;
            style.borderRightColor = this.leftBorderColor;
            return style;
        },
        rightSyle() {
            const style = {};
            style.borderLeftColor = this.rightBorderColor;
            style.borderBottomColor = this.rightBorderColor;
            return style;
        },
    },
    mounted() {
        uni.$util.sleep().then(() => {
            this.rightBorderColor = 'rgb(66, 185, 131)';
            // this.init()
        });
    },
    methods: {
        init() {
            animation.transition(
                this.$refs['right-circle'].ref,
                {
                    styles: {
                        transform: 'rotate(45deg)',
                        transformOrigin: 'center center',
                    },
                },
                () => {
                    this.rightBorderColor = 'rgb(66, 185, 131)';
                    // animation.transition(this.$refs['right-circle'].ref, {
                    //   styles: {
                    //     transform: 'rotate(225deg)',
                    //     transformOrigin: 'center center'
                    //   },
                    //   duration: 3000,
                    // }, () => {
                    //   animation.transition(this.$refs['left-circle'].ref, {
                    //     styles: {
                    //       transform: 'rotate(45deg)',
                    //       transformOrigin: 'center center'
                    //     },
                    //   }, () => {
                    //     this.leftBorderColor = 'rgb(66, 185, 131)'
                    //     animation.transition(this.$refs['left-circle'].ref, {
                    //       styles: {
                    //         transform: 'rotate(225deg)',
                    //         transformOrigin: 'center center'
                    //       },
                    //       duration: 1500,
                    //     }, () => {

                    //     })
                    //   })
                    // })
                }
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-circle-progress {
    flex-direction: row;
    position: relative;
    border-radius: 200rpx;
    height: 200rpx;
    width: 200rpx;
    // transform: rotate(0deg);
    // background-color: rgb(66, 185, 131);
    background-color: rgb(200, 200, 200);
    overflow: hidden;
    justify-content: space-between;

    &__circle {
        border-radius: 200rpx;
        height: 180rpx;
        width: 180rpx;
        transform: translate(-50%, -50%);
        background-color: rgb(255, 255, 255);
        left: 100rpx;
        top: 100rpx;
        position: absolute;
    }

    &__left {
        position: absolute;
        left: 0;
        width: 100rpx;
        height: 200rpx;
        overflow: hidden;
        box-sizing: border-box;
        // background-color: rgb(66, 185, 131);
        // background-color: rgb(200, 200, 200);
        // transform-origin: left center;

        &__circle {
            box-sizing: border-box;
            // background-color: red;
            border-left-color: transparent;
            border-bottom-color: transparent;
            border-top-left-radius: 100rpx;
            border-top-right-radius: 100rpx;
            border-bottom-right-radius: 100rpx;
            // border-left-color: rgb(66, 185, 131);
            // border-bottom-color: rgb(66, 185, 131);
            border-top-color: rgb(66, 185, 131);
            border-right-color: rgb(66, 185, 131);
            border-width: 10rpx;
            width: 200rpx;
            height: 200rpx;
            transform: rotate(225deg);
            // border-radius: 200rpx;
        }
    }

    &__right {
        position: absolute;
        right: 0;
        width: 100rpx;
        height: 200rpx;
        overflow: hidden;

        &__circle {
            position: absolute;
            right: 0;
            box-sizing: border-box;
            // background-color: red;
            border-top-color: transparent;
            border-right-color: transparent;
            border-top-left-radius: 100rpx;
            border-bottom-left-radius: 100rpx;
            border-bottom-right-radius: 100rpx;
            // border-left-color: rgb(66, 185, 131);
            // border-bottom-color: rgb(66, 185, 131);
            border-left-color: rgb(200, 200, 200);
            border-bottom-color: rgb(200, 200, 200);
            border-width: 10rpx;
            width: 200rpx;
            height: 200rpx;
            transform: rotate(45deg);
            transform-origin: center center;
            // border-radius: 200rpx;
        }
    }
}
</style>
