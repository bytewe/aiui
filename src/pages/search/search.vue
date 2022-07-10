<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-10 21:06:47
 * @Description: 搜索
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能">
            <ai-search v-model="value1" :show-action="false" @change="change" />
        </ai-box>

        <ai-box title="设置初始值">
            <ai-search v-model="value2" :show-action="false" />
        </ai-box>

        <ai-box title="搜索框形状">
            <ai-search v-model="value3" :show-action="false" shape="round" />
        </ai-box>

        <ai-box>
            <ai-search v-model="value4" :show-action="false" shape="square" />
        </ai-box>

        <ai-box title="右侧控件">
            <ai-search v-model="value5" />
        </ai-box>

        <ai-box title="禁用输入框">
            <ai-search placeholder="输入框被禁用,可以监听点击事件进行跳转" disabled :show-action="false" />
        </ai-box>

        <ai-box title="点击左侧图标">
            <ai-search v-model="value6" :show-action="false" @click-icon="clickIcon" />
        </ai-box>

        <ai-box title="搜索框内容水平对齐">
            <ai-search v-model="value7" :show-action="false" input-align="left" />
        </ai-box>

        <ai-box>
            <ai-search v-model="value8" :show-action="false" input-align="center" />
        </ai-box>

        <ai-box>
            <ai-search v-model="value9" :show-action="false" input-align="right" />
        </ai-box>

        <ai-box title="自定义">
            <ai-search v-model="value10" :show-action="false" border-color="rgb(230, 230, 230)" background="#fff" />
        </ai-box>

        <ai-box>
            <ai-search v-model="value11" :show-action="false" search-icon-color="#FF0000" />
        </ai-box>

        <ai-box>
            <ai-search v-model="value12" :show-action="false" placeholder-color="#FF0000" />
        </ai-box>

        <ai-box>
            <ai-search v-model="value13" :show-action="false" color="#FF0000" />
        </ai-box>

        <ai-box>
            <ai-search v-model="value14" label="手机" :show-action="false" />
        </ai-box>

        <ai-box>
            <ai-search v-model="value15" search-icon="scan" :show-action="false" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            value1: '',
            value2: '天山雪莲',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
            value7: '',
            value8: '',
            value9: '',
            value10: '',
            value11: '',
            value12: '',
            value13: '',
            value14: '',
            value15: '',
        };
    },
    methods: {
        change(e) {
            console.log(e);
        },
        clickIcon() {
            uni.$util.toast('点击了左侧图标');
        },
    },
};
</script>

<style lang="scss" scoped></style>
