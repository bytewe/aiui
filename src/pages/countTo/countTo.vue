<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-11 22:47:05
 * @Description: 数字滚动
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能">
            <ai-count-to :end-val="value" @end="end" />
        </ai-box>

        <ai-box title="倒计数">
            <ai-count-to :start-val="startVal1" />
        </ai-box>

        <ai-box title="显示小数位">
            <ai-count-to :start-val="startVal2" :end-val="endVal" :decimals="decimals" />
        </ai-box>

        <ai-box title="千分位分隔符">
            <ai-count-to :start-val="startVal3" :end-val="endVal2" separator="," :decimals="decimals" />
        </ai-box>

        <ai-box title="自定义控制">
            <ai-count-to ref="uCountTo" :end-val="endVal3" :autoplay="autoplay" />
        </ai-box>

        <ai-box>
            <ai-grid border>
                <ai-grid-item icon="play-circle--fill" text="开始" @click="start" />
                <ai-grid-item icon="pause-circle" text="暂停" @click="paused" />
                <ai-grid-item icon="replay" text="继续" @click="resume" />
            </ai-grid>
        </ai-box>

        <ai-box title="自定义">
            <ai-count-to :end-val="value" color="#909399" font-size="40px" bold />
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

<style lang="scss" scoped></style>
