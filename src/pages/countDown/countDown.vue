<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-11 22:36:44
 * @Description: 倒计时
-->

<template>
    <ai-page background="white">
        <ai-box title="基础用法">
            <ai-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss" auto-start millisecond @finish="finish" />
        </ai-box>

        <ai-box title="自定义格式">
            <ai-count-down :time="30 * 60 * 60 * 1000" format="DD:HH:mm:ss" auto-start millisecond @change="onChange">
                <ai-row>
                    <ai-text :text="`${timeData.days}天`" />
                    <ai-text :text="`${timeData.hours > 9 ? timeData.hours : '0' + timeData.hours}时`" />
                    <ai-text :text="`${timeData.minutes > 9 ? timeData.minutes : '0' + timeData.minutes}分`" />
                    <ai-text :text="`${timeData.seconds > 9 ? timeData.seconds : '0' + timeData.seconds}秒`" />
                </ai-row>
            </ai-count-down>
        </ai-box>

        <ai-box title="毫秒级渲染">
            <ai-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss:SSS" auto-start millisecond />
        </ai-box>

        <ai-box title="自定义样式">
            <ai-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss" auto-start millisecond @change="onChange">
                <ai-row>
                    <ai-card background="primary" size="xs">
                        <ai-text
                            :text="`${timeData.hours > 9 ? timeData.hours : '0' + timeData.hours}`"
                            color="white"
                        />
                    </ai-card>
                    <ai-card size="xs">
                        <ai-text text=":" />
                    </ai-card>
                    <ai-card background="primary" size="xs">
                        <ai-text
                            :text="`${timeData.minutes > 9 ? timeData.minutes : '0' + timeData.minutes}`"
                            color="white"
                        />
                    </ai-card>
                    <ai-card size="xs">
                        <ai-text text=":" />
                    </ai-card>
                    <ai-card background="primary" size="xs">
                        <ai-text
                            :text="`${timeData.seconds > 9 ? timeData.seconds : '0' + timeData.seconds}`"
                            color="white"
                        />
                    </ai-card>
                </ai-row>
            </ai-count-down>
        </ai-box>

        <ai-box title="手动控制">
            <ai-count-down ref="countDown" :time="3 * 1000" format="ss:SSS" :auto-start="false" millisecond />
        </ai-box>

        <ai-box>
            <ai-grid border>
                <ai-grid-item icon="replay" text="重置" @click="reset" />
                <ai-grid-item icon="play-circle--fill" text="开始" @click="start" />
                <ai-grid-item icon="pause-circle" text="暂停" @click="pause" />
            </ai-grid>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            timeData: {},
        };
    },
    onLoad() {},
    methods: {
        //开始
        start() {
            this.$refs.countDown.start();
        },
        // 暂停
        pause() {
            this.$refs.countDown.pause();
        },
        // 重置
        reset() {
            this.$refs.countDown.reset();
        },
        onChange(e) {
            this.timeData = e;
        },
        finish() {
            console.log('finish');
        },
    },
};
</script>

<style lang="scss" scoped></style>
