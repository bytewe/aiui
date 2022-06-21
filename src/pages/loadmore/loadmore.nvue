<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:35
 * @Description: 加载更多
-->

<template>
    <ai-page background="white">
        <ai-box title="基础使用">
            <ai-loadmore status="loading" :is-dot="true" />
        </ai-box>

        <ai-box title="无更多数据">
            <ai-loadmore :line="true" status="nomore" />
        </ai-box>

        <ai-box title="加载更多(点击触发事件)">
            <ai-loadmore :line="true" status="loadmore" @loadmore="loadmore" />
        </ai-box>

        <ai-box title="自定义图标">
            <ai-loadmore status="loading" loading-icon="circle" />
        </ai-box>

        <ai-box title="显示点">
            <ai-loadmore status="nomore" :is-dot="true" :line="true" color="#909399" />
        </ai-box>

        <ai-box title="自定义提示语">
            <ai-loadmore status="loading" loading-text="努力加载中,先喝杯茶" color="#909399" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        loadmore() {
            console.log('loadmore');
            uni.$util.toast('加载更多');
        },
    },
};
</script>

<style lang="scss" scoped></style>
