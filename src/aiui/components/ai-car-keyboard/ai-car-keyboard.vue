<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:14:24
 * @Description: 车牌键盘
-->

<template>
    <view class="ai-keyboard" @touchmove.stop.prevent="preventEvent">
        <view
            v-for="(group, i) in abc ? engKeyBoardList : areaList"
            :key="i"
            class="ai-keyboard__button"
            :index="i"
            :class="[i + 1 === 4 && 'ai-keyboard__button--center']"
        >
            <view v-if="i === 3" class="ai-keyboard__button__inner-wrapper">
                <view
                    class="ai-keyboard__button__inner-wrapper__left"
                    hover-class="ai-hover-class"
                    :hover-stay-time="200"
                    @click="changeCarInputMode"
                >
                    <text
                        class="ai-keyboard__button__inner-wrapper__left__lang"
                        :class="[!abc && 'ai-keyboard__button__inner-wrapper__left__lang--active']"
                        >中</text
                    >
                    <text class="ai-keyboard__button__inner-wrapper__left__line">/</text>
                    <text
                        class="ai-keyboard__button__inner-wrapper__left__lang"
                        :class="[abc && 'ai-keyboard__button__inner-wrapper__left__lang--active']"
                        >英</text
                    >
                </view>
            </view>
            <view v-for="(item, j) in group" :key="j" class="ai-keyboard__button__inner-wrapper">
                <view
                    class="ai-keyboard__button__inner-wrapper__inner"
                    :hover-stay-time="200"
                    hover-class="ai-hover-class"
                    @click="carInputClick(i, j)"
                >
                    <text class="ai-keyboard__button__inner-wrapper__inner__text">{{ item }}</text>
                </view>
            </view>
            <view
                v-if="i === 3"
                class="ai-keyboard__button__inner-wrapper"
                @touchstart="backspaceClick"
                @touchend="clearTimer"
            >
                <view
                    class="ai-keyboard__button__inner-wrapper__right"
                    hover-class="ai-hover-class"
                    :hover-stay-time="200"
                >
                    <ai-icon size="28" name="backspace" color="#303133" />
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
export default {
    name: 'AiKeyboard',
    mixins: [mixins],
    props: {
        // 是否打乱键盘按键的顺序
        random: {
            type: Boolean,
            default: false,
        },
        // 输入一个中文后，是否自动切换到英文
        autoChange: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            // 车牌输入时，abc=true为输入车牌号码，bac=false为输入省份中文简称
            abc: false,
        };
    },
    computed: {
        areaList() {
            let data = [
                '京',
                '沪',
                '粤',
                '津',
                '冀',
                '豫',
                '云',
                '辽',
                '黑',
                '湘',
                '皖',
                '鲁',
                '苏',
                '浙',
                '赣',
                '鄂',
                '桂',
                '甘',
                '晋',
                '陕',
                '蒙',
                '吉',
                '闽',
                '贵',
                '渝',
                '川',
                '青',
                '琼',
                '宁',
                '挂',
                '藏',
                '港',
                '澳',
                '新',
                '使',
                '学',
            ];
            let tmp = [];
            // 打乱顺序
            if (this.random) data = uni.$util.randomArray(data);
            // 切割成二维数组
            tmp[0] = data.slice(0, 10);
            tmp[1] = data.slice(10, 20);
            tmp[2] = data.slice(20, 30);
            tmp[3] = data.slice(30, 36);
            return tmp;
        },
        engKeyBoardList() {
            let data = [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                0,
                'Q',
                'W',
                'E',
                'R',
                'T',
                'Y',
                'U',
                'I',
                'O',
                'P',
                'A',
                'S',
                'D',
                'F',
                'G',
                'H',
                'J',
                'K',
                'L',
                'Z',
                'X',
                'C',
                'V',
                'B',
                'N',
                'M',
            ];
            let tmp = [];
            if (this.random) data = uni.$util.randomArray(data);
            tmp[0] = data.slice(0, 10);
            tmp[1] = data.slice(10, 20);
            tmp[2] = data.slice(20, 30);
            tmp[3] = data.slice(30, 36);
            return tmp;
        },
    },
    methods: {
        // 点击键盘按钮
        carInputClick(i, j) {
            let value = '';
            // 不同模式，获取不同数组的值
            if (this.abc) value = this.engKeyBoardList[i][j];
            else value = this.areaList[i][j];
            // 如果允许自动切换，则将中文状态切换为英文
            if (!this.abc && this.autoChange) uni.$util.sleep(200).then(() => (this.abc = true));
            this.$emit('change', value);
        },
        // 修改汽车牌键盘的输入模式，中文|英文
        changeCarInputMode() {
            this.abc = !this.abc;
        },
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
    },
};
</script>

<style lang="scss" scoped>
$ai-car-keyboard-background-color: rgb(224, 228, 230) !default;
$ai-car-keyboard-padding: 12rpx 0 12rpx !default;
$ai-car-keyboard-button-inner-width: 64rpx !default;
$ai-car-keyboard-button-inner-background-color: #ffffff !default;
$ai-car-keyboard-button-height: 80rpx !default;
$ai-car-keyboard-button-inner-box-shadow: 0 2rpx 0rpx #999992 !default;
$ai-car-keyboard-button-border-radius: 8rpx !default;
$ai-car-keyboard-button-inner-margin: 8rpx 5rpx !default;
$ai-car-keyboard-button-text-font-size: 32rpx !default;
$ai-car-keyboard-button-text-color: $color-default !default;
$ai-car-keyboard-center-inner-margin: 0 4rpx !default;
$ai-car-keyboard-special-button-width: 134rpx !default;
$ai-car-keyboard-lang-font-size: 32rpx !default;
$ai-car-keyboard-lang-color: $color-default !default;
$ai-car-keyboard-active-color: $color-primary !default;
$ai-car-keyboard-line-font-size: 30rpx !default;
$ai-car-keyboard-line-color: $color-default !default;
$ai-car-keyboard-line-margin: 0 2rpx !default;
$ai-car-keyboard-hover-class-background-color: #bbbcc6 !default;

.ai-keyboard {
    flex-direction: column;
    justify-content: space-around;
    background-color: $ai-car-keyboard-background-color;
    align-items: stretch;
    padding: $ai-car-keyboard-padding;

    &__button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex: 1;
        /* #ifndef APP-NVUE */
        /* #endif */

        &__inner-wrapper {
            box-shadow: $ai-car-keyboard-button-inner-box-shadow;
            margin: $ai-car-keyboard-button-inner-margin;
            border-radius: $ai-car-keyboard-button-border-radius;

            &__inner {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: $ai-car-keyboard-button-inner-width;
                background-color: $ai-car-keyboard-button-inner-background-color;
                height: $ai-car-keyboard-button-height;
                border-radius: $ai-car-keyboard-button-border-radius;

                &__text {
                    font-size: $ai-car-keyboard-button-text-font-size;
                    color: $ai-car-keyboard-button-text-color;
                }
            }

            &__left,
            &__right {
                border-radius: $ai-car-keyboard-button-border-radius;
                width: $ai-car-keyboard-special-button-width;
                height: $ai-car-keyboard-button-height;
                background-color: $ai-car-keyboard-hover-class-background-color;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                box-shadow: $ai-car-keyboard-button-inner-box-shadow;
            }

            &__left {
                &__line {
                    font-size: $ai-car-keyboard-line-font-size;
                    color: $ai-car-keyboard-line-color;
                    margin: $ai-car-keyboard-line-margin;
                }

                &__lang {
                    font-size: $ai-car-keyboard-lang-font-size;
                    color: $ai-car-keyboard-lang-color;

                    &--active {
                        color: $ai-car-keyboard-active-color;
                    }
                }
            }
        }
    }
}

.ai-hover-class {
    background-color: $ai-car-keyboard-hover-class-background-color;
}
</style>
