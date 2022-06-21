<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:38
 * @Description: 富文本解析器
-->

<template>
    <ai-page background="white" padding>
        <ai-parse
            :content="content"
            domain="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo"
            lazy-load
            scroll-table
            selectable
            use-anchor
            :tag-style="tagStyle"
            @load="load"
            @ready="ready"
            @imgTap="imgTap"
            @linkTap="linkTap"
        />
    </ai-page>
</template>

<script>
const content = require('./content');
export default {
    data() {
        return {
            content: '',
            tagStyle: {
                table: 'box-sizing: border-box; border-top: 2rpx solid #dfe2e5; border-left: 2rpx solid #dfe2e5;',
                th: 'border-right: 2rpx solid #dfe2e5; border-bottom: 2rpx solid #dfe2e5;',
                td: 'border-right: 2rpx solid #dfe2e5; border-bottom: 2rpx solid #dfe2e5;',
                li: 'margin: 10rpx 0;',
            },
        };
    },
    onLoad() {
        // 模拟网络请求
        setTimeout(() => {
            this.content = content;
        }, 200);
    },
    methods: {
        load() {
            // dom 结构加载完毕时触发
        },
        ready() {
            // 渲染完毕时触发
        },
        imgTap() {
            // 图片被点击时触发
        },
        linkTap() {
            // 链接被点击时触发
        },
    },
};
</script>

<style lang="scss" scoped></style>
