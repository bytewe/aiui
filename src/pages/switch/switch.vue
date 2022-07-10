<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-10 21:36:40
 * @Description: 开关
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能">
            <ai-row justify="between" custom-style="padding-right:50vw">
                <ai-switch v-model="value1" @change="change" />
                <ai-switch v-model="value2" />
            </ai-row>
        </ai-box>

        <ai-box title="加载中">
            <ai-row justify="between" custom-style="padding-right:50vw">
                <ai-switch v-model="value3" loading />
                <ai-switch v-model="value4" loading />
            </ai-row>
        </ai-box>

        <ai-box title="禁用状态">
            <ai-row justify="between" custom-style="padding-right:50vw">
                <ai-switch v-model="value5" disabled />
                <ai-switch v-model="value6" disabled />
            </ai-row>
        </ai-box>

        <ai-box title="自定义尺寸">
            <ai-row justify="between" custom-style="padding-right:50vw">
                <ai-switch v-model="value7" size="28" />
                <ai-switch v-model="value8" size="20" />
            </ai-row>
        </ai-box>

        <ai-box title="自定义颜色">
            <ai-row justify="between" custom-style="padding-right:50vw">
                <ai-switch v-model="value9" active-color="#f56c6c" loading />
                <ai-switch v-model="value10" active-color="#5ac725" loading />
            </ai-row>
        </ai-box>

        <ai-box title="自定义样式">
            <ai-row justify="between" custom-style="padding-right:50vw">
                <ai-switch v-model="value11" :space="2" active-color="#f56c6c" inactive-color="rgb(230, 230, 230)" />
                <ai-switch v-model="value12" :space="2" active-color="#f9ae3d" inactive-color="rgb(230, 230, 230)" />
            </ai-row>
        </ai-box>

        <ai-box title="异步控制">
            <ai-row justify="between" custom-style="padding-right:50vw">
                <ai-switch v-model="value13" async-change @change="asyncChange" />
            </ai-row>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            value1: false,
            value2: true,
            value3: false,
            value4: true,
            value5: false,
            value6: true,
            value7: false,
            value8: true,
            value9: true,
            value10: true,
            value11: false,
            value12: true,
            value13: true,
        };
    },
    watch: {
        value1(newValue) {
            console.log('v-model', newValue);
        },
    },
    methods: {
        change(e) {
            console.log('change', e);
        },
        asyncChange(e) {
            uni.showModal({
                content: e ? '确定要打开吗' : '确定要关闭吗',
                success: (res) => {
                    if (res.confirm) {
                        this.value13 = e;
                    }
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
