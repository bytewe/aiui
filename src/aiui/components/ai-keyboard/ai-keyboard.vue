<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:15:51
 * @Description: 键盘
-->

<template>
    <ai-popup
        :overlay="overlay"
        :close-on-click-overlay="closeOnClickOverlay"
        mode="bottom"
        :popup="false"
        :show="show"
        :safe-area-inset-bottom="safeAreaInsetBottom"
        :z-index="zIndex"
        :custom-style="{
            backgroundColor: 'rgb(214, 218, 220)',
        }"
        @close="popupClose"
    >
        <view class="ai-keyboard">
            <slot />
            <view v-if="tooltip" class="ai-keyboard__tooltip">
                <view hover-class="ai-hover-class" :hover-stay-time="100">
                    <text
                        v-if="showCancel"
                        class="ai-keyboard__tooltip__item ai-keyboard__tooltip__cancel"
                        @click="onCancel"
                        >{{ showCancel && cancelText }}</text
                    >
                </view>
                <view>
                    <text v-if="showTips" class="ai-keyboard__tooltip__item ai-keyboard__tooltip__tips">{{
                        tips ? tips : mode == 'number' ? '数字键盘' : mode == 'card' ? '身份证键盘' : '车牌号键盘'
                    }}</text>
                </view>
                <view hover-class="ai-hover-class" :hover-stay-time="100">
                    <text
                        v-if="showConfirm"
                        class="ai-keyboard__tooltip__item ai-keyboard__tooltip__submit"
                        hover-class="ai-hover-class"
                        @click="onConfirm"
                        >{{ showConfirm && confirmText }}</text
                    >
                </view>
            </view>
            <template v-if="mode == 'number' || mode == 'card'">
                <ai-number-keyboard
                    :random="random"
                    :mode="mode"
                    :dot-disabled="dotDisabled"
                    @backspace="backspace"
                    @change="change"
                />
            </template>
            <template v-else>
                <ai-car-keyboard :random="random" :auto-change="autoChange" @backspace="backspace" @change="change" />
            </template>
        </view>
    </ai-popup>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiKeyboard',
    mixins: [mixins],
    props: {
        // 键盘的类型，number-数字键盘，card-身份证键盘，car-车牌号键盘
        mode: {
            type: String,
            default: 'number',
        },
        // 是否显示键盘的"."符号
        dotDisabled: {
            type: Boolean,
            default: false,
        },
        // 是否显示顶部工具条
        tooltip: {
            type: Boolean,
            default: true,
        },
        // 是否显示工具条中间的提示
        showTips: {
            type: Boolean,
            default: true,
        },
        // 工具条中间的提示文字
        tips: {
            type: String,
            default: '',
        },
        // 是否显示工具条左边的"取消"按钮
        showCancel: {
            type: Boolean,
            default: true,
        },
        // 是否显示工具条右边的"完成"按钮
        showConfirm: {
            type: Boolean,
            default: true,
        },
        // 是否打乱键盘按键的顺序
        random: {
            type: Boolean,
            default: false,
        },
        // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
        safeAreaInsetBottom: {
            type: Boolean,
            default: true,
        },
        // 是否允许通过点击遮罩关闭键盘
        closeOnClickOverlay: {
            type: Boolean,
            default: true,
        },
        // 控制键盘的弹出与收起
        show: {
            type: Boolean,
            default: false,
        },
        // 是否显示遮罩，某些时候数字键盘时，用户希望看到自己的数值，所以可能不想要遮罩
        overlay: {
            type: Boolean,
            default: true,
        },
        // z-index值
        zIndex: {
            type: [String, Number],
            default: 10075,
        },
        // 取消按钮的文字
        cancelText: {
            type: String,
            default: '取消',
        },
        // 确认按钮的文字
        confirmText: {
            type: String,
            default: '确定',
        },
        // 输入一个中文后，是否自动切换到英文
        autoChange: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    methods: {
        change(e) {
            this.$emit('change', e);
        },
        // 键盘关闭
        popupClose() {
            this.$emit('close');
        },
        // 输入完成
        onConfirm() {
            this.$emit('confirm');
        },
        // 取消输入
        onCancel() {
            this.$emit('cancel');
        },
        // 退格键
        backspace() {
            this.$emit('backspace');
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-keyboard {
    &__tooltip {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #ffffff;
        padding: 28rpx 24rpx;

        &__item {
            color: #333333;
            flex: 1;
            text-align: center;
            font-size: 30rpx;
        }

        &__submit {
            text-align: right;
            color: $color-primary;
        }

        &__cancel {
            text-align: left;
            color: #888888;
        }

        &__tips {
            color: $color-gray;
        }
    }
}
</style>
