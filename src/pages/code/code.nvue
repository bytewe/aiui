<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:19
 * @Description: 验证码
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能" direction="row">
            <ai-code
                ref="uCode"
                seconds="20"
                change-text="XS获取"
                @change="codeChange"
                @start="disabled1 = true"
                @end="disabled1 = false"
            />
            <ai-button :text="tips" type="success" size="small" :disabled="disabled1" @tap="getCode" />
        </ai-box>

        <ai-box title="保持倒计时(开始后，左上角返退出此页面再进入，会发现倒计时还在继续)" direction="row">
            <ai-code
                ref="uCode1"
                keep-running
                change-text="倒计时XS"
                @change="codeChange1"
                @start="disabled2 = true"
                @end="disabled2 = false"
            />
            <ai-button type="primary" :text="tips1" size="small" :disabled="disabled2" @tap="getCode1" />
        </ai-box>

        <ai-box title="文本样式" direction="row">
            <ai-code ref="uCode2" keep-running start-text="点我获取验证码" @change="codeChange2" />
            <text :text="tips2" @tap="getCode2">{{ tips2 }}</text>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            tips: '',
            // 此为错误定义，见下方说明
            // refCode: null,
            tips1: '',
            tips2: '',
            disabled1: false,
            disabled2: false,
            disabled3: false,
        };
    },
    onReady() {
        // 注意这里不能将一个组件赋值给data的一个变量，否则在微信小程序会
        // 造成循环引用而报错，如果你想这样做，请在onReady或者onLoad生命周期中定义，如下
        // this.refCode = this.$refs.uCode;
    },
    methods: {
        codeChange(text) {
            this.tips = text;
        },
        codeChange1(text) {
            this.tips1 = text;
        },
        codeChange2(text) {
            this.tips2 = text;
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
        getCode1() {
            if (this.$refs.uCode1.canGetCode) {
                // 模拟向后端请求验证码
                uni.showLoading({
                    title: '正在获取验证码',
                });
                setTimeout(() => {
                    uni.hideLoading();
                    // 这里此提示会被this.start()方法中的提示覆盖
                    uni.$util.toast('验证码已发送');
                    // 通知验证码组件内部开始倒计时
                    this.$refs.uCode1.start();
                }, 2000);
            } else {
                uni.$util.toast('倒计时结束后再发送');
            }
        },
        getCode2() {
            if (this.$refs.uCode2.canGetCode) {
                // 模拟向后端请求验证码
                uni.showLoading({
                    title: '正在获取验证码',
                });
                setTimeout(() => {
                    uni.hideLoading();
                    // 这里此提示会被this.start()方法中的提示覆盖
                    uni.$util.toast('验证码已发送');
                    // 通知验证码组件内部开始倒计时
                    this.$refs.uCode2.start();
                }, 2000);
            } else {
                uni.$util.toast('倒计时结束后再发送');
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
