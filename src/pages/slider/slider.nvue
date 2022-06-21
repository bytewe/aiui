<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:43
 * @Description: 滑动选择器
-->

<template>
    <ai-page background="white">
        <ai-box title="基本案例">
            <ai-slider v-model="value1" />
        </ai-box>

        <ai-box title="自定义范围(0—50)">
            <ai-slider v-model="value2" show-value min="0" max="50" />
        </ai-box>

        <ai-box title="指定步长(每次步进5)">
            <ai-slider v-model="value4" :step="5" />
        </ai-box>

        <ai-box title="自定义样式">
            <ai-slider v-model="value5" active-color="#deab8a" block-color="#f47920" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            value1: 30,
            value2: 30,
            value3: 30,
            value4: 30,
            value5: 30,
        };
    },
    watch: {
        value1(n) {
            console.log(n);
        },
    },
    methods: {
        moving(value) {
            console.log('moving', value);
        },
        click(value) {
            console.log('click', value);
        },
        end(value) {
            console.log('end', value);
        },
        start(value) {
            console.log('start', value);
        },
    },
};
</script>

<style lang="scss" scoped></style>
