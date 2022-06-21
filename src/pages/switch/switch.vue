<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:47
 * @Description: 开关
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能" direction="row">
            <view class="ai-margin-right">
                <ai-switch v-model="value1" @change="change" />
            </view>
            <view class="ai-margin-right">
                <ai-switch v-model="value2" />
            </view>
        </ai-box>

        <ai-box title="加载中" direction="row">
            <view class="ai-margin-right">
                <ai-switch v-model="value3" loading />
            </view>
            <view class="ai-margin-right">
                <ai-switch v-model="value4" loading />
            </view>
        </ai-box>

        <ai-box title="禁用状态" direction="row">
            <view class="ai-margin-right">
                <ai-switch v-model="value5" disabled />
            </view>
            <view class="ai-margin-right">
                <ai-switch v-model="value6" disabled />
            </view>
        </ai-box>

        <ai-box title="自定义尺寸" direction="row">
            <view class="ai-margin-right">
                <ai-switch v-model="value7" size="28" />
            </view>
            <view class="ai-margin-right">
                <ai-switch v-model="value8" size="20" />
            </view>
        </ai-box>

        <ai-box title="自定义颜色" direction="row">
            <view class="ai-margin-right">
                <ai-switch v-model="value9" active-color="#f56c6c" loading />
            </view>
            <view class="ai-margin-right">
                <ai-switch v-model="value10" active-color="#5ac725" loading />
            </view>
        </ai-box>

        <ai-box title="自定义样式" direction="row">
            <view class="ai-margin-right">
                <ai-switch v-model="value11" :space="2" active-color="#f56c6c" inactive-color="rgb(230, 230, 230)" />
            </view>
            <view class="ai-margin-right">
                <ai-switch v-model="value12" space="2" active-color="#f9ae3d" inactive-color="rgb(230, 230, 230)" />
            </view>
        </ai-box>

        <ai-box title="异步控制" direction="row">
            <view class="ai-margin-right">
                <ai-switch v-model="value13" async-change @change="asyncChange" />
            </view>
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
