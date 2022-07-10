<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-10 21:22:26
 * @Description: 输入框
-->

<template>
    <ai-page background="white">
        <ai-box title="基础使用">
            <ai-input v-model="value" placeholder="请输入内容" border="surround" @change="change" />
        </ai-box>

        <ai-box title="可清空内容">
            <ai-input placeholder="请输入内容" border="surround" clearable />
        </ai-box>

        <ai-box title="数字键盘">
            <ai-input placeholder="请输入内容" border="surround" type="number" clearable />
        </ai-box>

        <ai-box title="密码类型">
            <ai-input placeholder="请输入内容" border="surround" password clearable />
        </ai-box>

        <ai-box title="显示下划线">
            <ai-input placeholder="请输入内容" border="bottom" clearable />
        </ai-box>

        <ai-box title="禁用状态">
            <ai-input placeholder="禁用状态" border="surround" disabled />
        </ai-box>

        <ai-box title="圆形">
            <ai-input placeholder="请输入内容" border="surround" shape="circle" />
        </ai-box>

        <ai-box title="前后图标">
            <ai-input placeholder="前置图标" prefix-icon="search" prefix-icon-style="font-size: 44rpx;color: #909399" />
        </ai-box>

        <ai-box>
            <ai-input placeholder="后置图标" suffix-icon="location--fill" suffix-icon-style="color: #909399" />
        </ai-box>

        <ai-box title="前后插槽">
            <ai-input placeholder="前置插槽">
                <ai-text slot="prefix" text="http://" margin="0 6rpx 0 0" type="tips" />
            </ai-input>
        </ai-box>

        <ai-box>
            <ai-input placeholder="后置插槽">
                <template slot="suffix">
                    <ai-code ref="uCode" seconds="20" change-text="X秒重新获取哈哈哈" @change="codeChange" />
                    <ai-button :text="tips" type="success" size="mini" @tap="getCode" />
                </template>
            </ai-input>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            tips: '',
            value: '',
        };
    },
    watch: {
        value(newValue) {
            console.log('v-model', newValue);
        },
    },
    methods: {
        codeChange(text) {
            this.tips = text;
        },
        getCode() {
            if (this.$refs.uCode.canGetCode) {
                // 模拟向后端请求验证码
                uni.showLoading({
                    title: '正在获取验证码',
                });
                setTimeout(() => {
                    uni.hideLoading();
                    // 这里此提示会被this.start()方法中的提示覆盖
                    uni.$util.toast('验证码已发送');
                    // 通知验证码组件内部开始倒计时
                    this.$refs.uCode.start();
                }, 2000);
            } else {
                uni.$util.toast('倒计时结束后再发送');
            }
        },
        change(e) {
            console.log('change', e);
        },
    },
};
</script>

<style lang="scss" scoped></style>
