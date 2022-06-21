<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:45
 * @Description: 分段器
-->

<template>
    <ai-page background="white">
        <ai-box title="基础使用">
            <ai-subsection :list="list" mode="subsection" :current="current1" @change="change1" />
        </ai-box>

        <ai-box title="按钮模式">
            <ai-subsection :list="list" mode="button" :current="current2" @change="change2" />
        </ai-box>

        <ai-box title="更换主题">
            <ai-subsection
                :list="list"
                mode="subsection"
                :current="current3"
                active-color="#f56c6c"
                @change="change3"
            />
        </ai-box>

        <ai-box title="默认位置">
            <ai-subsection :list="list" mode="button" :current="current4" active-color="#f9ae3d" @change="change4" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            current1: 0,
            current2: 0,
            current3: 0,
            current4: 1,
            list: ['未付款', '待评价', '已付款'],
            current: 1,
        };
    },
    methods: {
        change1(index) {
            this.current1 = index;
        },
        change2(index) {
            this.current2 = index;
        },
        change3(index) {
            this.current3 = index;
        },
        change4(index) {
            this.current4 = index;
        },
    },
};
</script>

<style lang="scss" scoped></style>
