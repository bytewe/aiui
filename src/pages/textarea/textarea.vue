<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-10 21:27:24
 * @Description: 文本域
-->

<template>
    <ai-page background="white">
        <ai-box title="基础使用">
            <ai-textarea v-model="value1" placeholder="请输入内容" />
        </ai-box>

        <ai-box title="字数统计">
            <ai-textarea v-model="value2" placeholder="请输入内容" count />
        </ai-box>

        <ai-box title="自动增高">
            <ai-textarea v-model="value3" placeholder="请输入内容" auto-height />
        </ai-box>

        <ai-box title="禁用状态">
            <ai-textarea v-model="value4" placeholder="文本域已被禁用" disabled count />
        </ai-box>

        <ai-box title="下划线模式">
            <ai-textarea v-model="value5" placeholder="请输入内容" border="bottom" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            value1: '',
            value2: '统计字数',
            value3: '',
            value4: '',
            value5: '',
        };
    },
    methods: {
        formatter(value) {
            return value.replace(/[^0-9]/gi, '');
        },
    },
};
</script>

<style lang="scss" scoped></style>
