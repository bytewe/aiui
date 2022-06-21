<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:36
 * @Description: 无网络提示
-->

<template>
    <ai-page background="white">
        <ai-no-network @disconnected="disconnected" @connected="connected" @retry="retry" />

        <ai-empty
            icon="check-circle--fill"
            icon-color="success"
            icon-size="140rpx"
            title="网络正常"
            description="请您断开设备的WiFi和数据连接(或开启\n飞行模式)，即可看到效果"
        />
    </ai-page>
</template>

<script>
export default {
    methods: {
        disconnected() {
            console.log('disconnected');
        },
        connected() {
            console.log('connected');
        },
        retry() {
            console.log('retry');
        },
    },
};
</script>

<style lang="scss" scoped></style>
