<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:24:59
 * @Description: 数字键盘
-->

<template>
    <view class="ai-keyboard" @touchmove.stop.prevent="preventEvent">
        <view v-for="(item, index) in numList" :key="index" class="ai-keyboard__button-wrapper">
            <view
                class="ai-keyboard__button-wrapper__button"
                :style="[itemStyle(index)]"
                hover-class="ai-hover-class"
                :hover-stay-time="200"
                @click="keyboardClick(item)"
            >
                <text class="ai-keyboard__button-wrapper__button__text">{{ item }}</text>
            </view>
        </view>
        <view class="ai-keyboard__button-wrapper">
            <view
                class="ai-keyboard__button-wrapper__button ai-keyboard__button-wrapper__button--gray"
                hover-class="ai-hover-class"
                :hover-stay-time="200"
                @touchstart.stop="backspaceClick"
                @touchend="clearTimer"
            >
                <ai-icon name="backspace" color="#303133" size="28" />
            </view>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    mixins: [mixins],
    props: {
        // 键盘的类型，number-数字键盘，card-身份证键盘
        mode: {
            type: String,
            default: 'number',
        },
        // 是否显示键盘的"."符号
        dotDisabled: {
            type: Boolean,
            default: false,
        },
        // 是否打乱键盘按键的顺序
        random: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            backspace: 'backspace', // 退格键内容
            dot: '.', // 点
            timer: null, // 长按多次删除的事件监听
            cardX: 'X', // 身份证的X符号
        };
    },
    computed: {
        // 键盘需要显示的内容
        numList() {
            if (this.dotDisabled && this.mode == 'number') {
                if (!this.random) {
                    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
                } else {
                    return uni.$util.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
                }
            } else if (!this.dotDisabled && this.mode == 'number') {
                if (!this.random) {
                    return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0];
                } else {
                    return uni.$util.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0]);
                }
            } else {
                if (!this.random) {
                    return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0];
                } else {
                    return uni.$util.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0]);
                }
            }
        },
        // 按键的样式，在非乱序&&数字键盘&&不显示点按钮时，index为9时，按键占位两个空间
        itemStyle() {
            return (index) => {
                let style = {};
                if (this.mode == 'number' && this.dotDisabled && index == 9) style.width = '464rpx';
                return style;
            };
        },
        // 是否让按键显示灰色，只在非乱序&&数字键盘&&且允许点按键的时候
        btnBgGray() {
            return (index) => {
                if (
                    !this.random &&
                    index == 9 &&
                    (this.mode != 'number' || (this.mode == 'number' && !this.dotDisabled))
                )
                    return true;
                else return false;
            };
        },
    },
    created() {},
    methods: {
        // 点击退格键
        backspaceClick() {
            this.$emit('backspace');
            clearInterval(this.timer); //再次清空定时器，防止重复注册定时器
            this.timer = null;
            this.timer = setInterval(() => {
                this.$emit('backspace');
            }, 250);
        },
        clearTimer() {
            clearInterval(this.timer);
            this.timer = null;
        },
        // 获取键盘显示的内容
        keyboardClick(val) {
            // 允许键盘显示点模式和触发非点按键时，将内容转为数字类型
            if (!this.dotDisabled && val != this.dot && val != this.cardX) val = Number(val);
            this.$emit('change', val);
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-number-keyboard-background-color: rgb(224, 228, 230) !default;
$ai-number-keyboard-padding: 16rpx 10rpx 16rpx 10rpx !default;
$ai-number-keyboard-button-width: 222rpx !default;
$ai-number-keyboard-button-margin: 8rpx 6rpx !default;
$ai-number-keyboard-button-border-top-left-radius: 8rpx !default;
$ai-number-keyboard-button-border-top-right-radius: 8rpx !default;
$ai-number-keyboard-button-border-bottom-left-radius: 8rpx !default;
$ai-number-keyboard-button-border-bottom-right-radius: 8rpx !default;
$ai-number-keyboard-button-height: 90rpx !default;
$ai-number-keyboard-button-background-color: #ffffff !default;
$ai-number-keyboard-button-box-shadow: 0 4rpx 0rpx #bbbcbe !default;
$ai-number-keyboard-text-font-size: 40rpx !default;
$ai-number-keyboard-text-font-weight: 500 !default;
$ai-number-keyboard-text-color: $color-default !default;
$ai-number-keyboard-gray-background-color: rgb(200, 202, 210) !default;
$ai-number-keyboard-hover-class-background-color: #bbbcc6 !default;

.ai-keyboard {
    display: flex;
    flex-direction: row;
    flex-direction: row;
    justify-content: space-around;
    background-color: $ai-number-keyboard-background-color;
    flex-wrap: wrap;
    padding: $ai-number-keyboard-padding;

    &__button-wrapper {
        box-shadow: $ai-number-keyboard-button-box-shadow;
        margin: $ai-number-keyboard-button-margin;
        border-top-left-radius: $ai-number-keyboard-button-border-top-left-radius;
        border-top-right-radius: $ai-number-keyboard-button-border-top-right-radius;
        border-bottom-left-radius: $ai-number-keyboard-button-border-bottom-left-radius;
        border-bottom-right-radius: $ai-number-keyboard-button-border-bottom-right-radius;

        &__button {
            width: $ai-number-keyboard-button-width;
            height: $ai-number-keyboard-button-height;
            background-color: $ai-number-keyboard-button-background-color;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border-top-left-radius: $ai-number-keyboard-button-border-top-left-radius;
            border-top-right-radius: $ai-number-keyboard-button-border-top-right-radius;
            border-bottom-left-radius: $ai-number-keyboard-button-border-bottom-left-radius;
            border-bottom-right-radius: $ai-number-keyboard-button-border-bottom-right-radius;

            &__text {
                font-size: $ai-number-keyboard-text-font-size;
                font-weight: $ai-number-keyboard-text-font-weight;
                color: $ai-number-keyboard-text-color;
            }

            &--gray {
                background-color: $ai-number-keyboard-gray-background-color;
            }
        }
    }
}

.ai-hover-class {
    background-color: $ai-number-keyboard-hover-class-background-color;
}
</style>
