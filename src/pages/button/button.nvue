<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 22:29:24
 * @Description: 按钮
-->

<template>
    <ai-page background="white">
        <ai-box title="按钮类型">
            <ai-row gutter="normal">
                <ai-col span="4">
                    <ai-button text="默认按钮" size="normal" type="info" @click="onClick" />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="成功按钮" size="normal" type="success" />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="危险按钮" size="normal" type="danger" />
                </ai-col>
            </ai-row>
            <ai-row gutter="normal" custom-class="ai-padding--top">
                <ai-col span="4">
                    <ai-button text="主要按钮" size="normal" type="primary" />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="警告按钮" size="normal" type="warning" />
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="镂空按钮">
            <ai-row gutter="normal">
                <ai-col span="4">
                    <ai-button text="默认按钮" size="normal" type="info" plain />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="成功按钮" size="normal" type="success" plain />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="危险按钮" size="normal" type="danger" plain />
                </ai-col>
            </ai-row>
            <ai-row gutter="normal" custom-class="ai-padding--top">
                <ai-col span="4">
                    <ai-button text="主要按钮" size="normal" type="primary" plain />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="警告按钮" size="normal" type="warning" plain />
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="禁用按钮">
            <ai-row gutter="normal">
                <ai-col span="4">
                    <ai-button text="默认按钮" size="normal" type="info" disabled />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="成功按钮" size="normal" type="success" disabled />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="危险按钮" size="normal" type="danger" disabled />
                </ai-col>
            </ai-row>
            <ai-row gutter="normal" custom-class="ai-padding--top">
                <ai-col span="4">
                    <ai-button text="主要按钮" size="normal" type="primary" disabled />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="警告按钮" size="normal" type="warning" disabled />
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="加载中">
            <ai-row gutter="normal">
                <ai-col span="4">
                    <ai-button loading-text="加载中" size="normal" loading loading-mode="circle" type="success" />
                </ai-col>
                <ai-col span="4">
                    <ai-button loading-text="加载中" size="normal" loading type="danger" />
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="按钮图标&按钮形状">
            <ai-row gutter="normal">
                <ai-col span="4">
                    <ai-button text="按钮图标" size="normal" icon="location" type="warning" plain />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="按钮形状" size="normal" shape="circle" type="success" plain />
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="自定义颜色">
            <ai-row gutter="normal">
                <ai-col span="4">
                    <ai-button
                        text="渐变色按钮"
                        size="normal"
                        color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
                    />
                </ai-col>
                <ai-col span="4">
                    <ai-button
                        text="渐变色按钮"
                        size="normal"
                        color="linear-gradient(to right, rgb(220, 194, 11), rgb(4, 151, 99))"
                    />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="青绿色按钮" size="normal" color="rgb(10, 185, 156)" />
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="自定义大小">
            <ai-row gutter="normal">
                <ai-col span="6">
                    <ai-button text="超大尺寸" size="large" type="success" />
                </ai-col>
                <ai-col span="6">
                    <ai-button text="大尺寸" size="big" type="success" />
                </ai-col>
            </ai-row>
            <ai-row gutter="normal" custom-class="ai-padding--top">
                <ai-col span="4">
                    <ai-button text="普通尺寸" size="normal" type="danger" />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="小型尺寸" size="small" type="primary" />
                </ai-col>
                <ai-col span="4">
                    <ai-button text="超小尺寸" size="mini" type="warning" />
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="块级元素">
            <ai-button text="块级元素" size="normal" type="primary" block />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            // type: 'default',
            // disabled: false
        };
    },
    onLoad() {
        setTimeout(() => {
            this.type = 'primary';
            this.disabled = true;
        }, 2000);
    },
    methods: {
        onClick() {
            console.log('onClick');
        },
    },
};
</script>

<style lang="scss" scoped>
.button {
    &__list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex: 1;
        margin: -$space-mini;
    }

    &__item {
        display: flex;
        flex-direction: column;
        padding: $space-mini;
    }
}
</style>
