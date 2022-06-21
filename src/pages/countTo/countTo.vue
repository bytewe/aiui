<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:24
 * @Description: 数字滚动
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能" direction="row">
            <ai-count-to :end-val="value" @end="end" />
        </ai-box>

        <ai-box title="倒计数" direction="row">
            <ai-count-to :start-val="startVal1" />
        </ai-box>

        <ai-box title="显示小数位" direction="row">
            <ai-count-to :start-val="startVal2" :end-val="endVal" :decimals="decimals" />
        </ai-box>

        <ai-box title="千分位分隔符" direction="row">
            <ai-count-to :start-val="startVal3" :end-val="endVal2" separator="," :decimals="decimals" />
        </ai-box>

        <ai-box title="自定义控制" direction="row">
            <ai-count-to ref="uCountTo" :end-val="endVal3" :autoplay="autoplay" />
        </ai-box>

        <ai-box>
            <ai-grid border>
                <ai-grid-item @click="start">
                    <view class="count-to">
                        <view class="count-to__circle">
                            <text class="count-to__circle__text">开始</text>
                        </view>
                    </view>
                </ai-grid-item>
                <ai-grid-item @click="paused">
                    <view class="count-to">
                        <view class="count-to__circle">
                            <text class="count-to__circle__text">暂停</text>
                        </view>
                    </view>
                </ai-grid-item>
                <ai-grid-item @click="resume">
                    <view class="count-to">
                        <view class="count-to__circle">
                            <text class="count-to__circle__text">继续</text>
                        </view>
                    </view>
                </ai-grid-item>
            </ai-grid>
        </ai-box>

        <ai-box title="自定义" direction="row">
            <ai-count-to :end-val="value" color="#909399" :font-size="fontSize" :bold="true" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            value: 3000,
            startVal1: 300,
            startVal2: 100.0,
            endVal: 10.55,
            decimals: 2,
            startVal3: 2000,
            endVal2: 1542,
            endVal3: 3000,
            autoplay: false,
            color: '#FF0000',
            fontSize: 40,
        };
    },
    methods: {
        start() {
            this.$refs.uCountTo.start();
        },
        paused() {
            this.$refs.uCountTo.stop();
        },
        resume() {
            this.$refs.uCountTo.resume();
        },
        end() {
            console.log('end');
        },
    },
};
</script>

<style lang="scss" scoped>
.count-to {
    display: flex;
    flex-direction: row;
    border-radius: 200rpx;
    border: 4rpx #dbfbdb solid;

    &__circle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100rpx;
        height: 100rpx;
        margin: 4rpx;
        border-radius: 200rpx;
        background-color: #dbfbdb;

        &__text {
            color: rgb(25, 190, 107);
            font-size: 26rpx;
        }
    }
}
</style>
