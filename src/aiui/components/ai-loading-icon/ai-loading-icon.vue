<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:46:14
 * @Description: 加载动画图标
-->

<template>
    <view
        v-if="show"
        class="ai-loading-icon"
        :style="[$util.addStyle(customStyle)]"
        :class="[vertical && 'ai-loading-icon--vertical']"
    >
        <view
            v-if="!webviewHide"
            ref="ani"
            class="ai-loading-icon__spinner"
            :class="[`ai-loading-icon__spinner--${mode}`]"
            :style="{
                color: color,
                width: $util.addUnit(size),
                height: $util.addUnit(size),
                borderTopColor: color,
                borderBottomColor: otherBorderColor,
                borderLeftColor: otherBorderColor,
                borderRightColor: otherBorderColor,
                'animation-duration': `${duration}ms`,
                'animation-timing-function': mode === 'semicircle' || mode === 'circle' ? timingFunction : '',
            }"
        >
            <block v-if="mode === 'spinner'">
                <!-- #ifndef APP-NVUE -->
                <view v-for="(item, index) in array12" :key="index" class="ai-loading-icon__dot" />
                <!-- #endif -->
                <!-- #ifdef APP-NVUE -->
                <!-- 此组件内部图标部分无法设置宽高，即使通过width和height配置了也无效 -->
                <loading-indicator
                    v-if="!webviewHide"
                    class="ai-loading-indicator"
                    :animating="true"
                    :style="{
                        color: color,
                        width: $util.addUnit(size),
                        height: $util.addUnit(size),
                    }"
                />
                <!-- #endif -->
            </block>
        </view>
        <text
            v-if="text"
            class="ai-loading-icon__text"
            :style="{
                fontSize: $util.addUnit(textSize),
                color: textColor,
            }"
            >{{ text }}</text
        >
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
// #endif

export default {
    name: 'AiLoadingIcon',
    mixins: [mixins],
    props: {
        // 是否显示组件
        show: {
            type: Boolean,
            default: true,
        },
        // 颜色
        color: {
            type: String,
            default: uni.$config['color-gray'],
        },
        // 提示文字颜色
        textColor: {
            type: String,
            default: uni.$config['color-gray'],
        },
        // 文字和图标是否垂直排列
        vertical: {
            type: Boolean,
            default: false,
        },
        // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
        mode: {
            type: String,
            default: 'spinner',
        },
        // 图标大小，单位默认px
        size: {
            type: [String, Number],
            default: 24,
        },
        // 文字大小
        textSize: {
            type: [String, Number],
            default: 15,
        },
        // 文字内容
        text: {
            type: [String, Number],
            default: '',
        },
        // 动画模式
        timingFunction: {
            type: String,
            default: 'ease-in-out',
        },
        // 动画执行周期时间
        duration: {
            type: [String, Number],
            default: 1200,
        },
        // mode=circle时的暗边颜色
        inactiveColor: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            // Array.form可以通过一个伪数组对象创建指定长度的数组
            array12: Array.from({
                length: 12,
            }),
            // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
            // 在iOS nvue上，则会一开始默认执行两个周期的动画
            aniAngel: 360, // 动画旋转角度
            webviewHide: false, // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
            loading: false, // 是否运行中，针对nvue使用
        };
    },
    computed: {
        // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
        // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
        // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
        otherBorderColor() {
            const lightColor = uni.$util.colorGradient(this.color, '#ffffff', 100)[80];
            if (this.mode === 'circle') {
                return this.inactiveColor ? this.inactiveColor : lightColor;
            } else {
                return 'transparent';
            }
        },
    },
    watch: {
        show(n) {
            // nvue中，show为true，且为非loading状态，就重新执行动画模块
            // #ifdef APP-NVUE
            if (n && !this.loading) {
                setTimeout(() => {
                    this.startAnimate();
                }, 30);
            }
            // #endif
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            setTimeout(() => {
                // #ifdef APP-NVUE
                this.show && this.nvueAnimate();
                // #endif
                // #ifdef APP-PLUS
                this.show && this.addEventListenerToWebview();
                // #endif
            }, 20);
        },
        // 监听webview的显示与隐藏
        addEventListenerToWebview() {
            // webview的堆栈
            // eslint-disable-next-line no-undef
            const pages = getCurrentPages();
            // 当前页面
            const page = pages[pages.length - 1];
            // 当前页面的webview实例
            const currentWebview = page.$getAppWebview();
            // 监听webview的显示与隐藏，从而停止或者开始动画(为了性能)
            currentWebview.addEventListener('hide', () => {
                this.webviewHide = true;
            });
            currentWebview.addEventListener('show', () => {
                this.webviewHide = false;
            });
        },
        // #ifdef APP-NVUE
        nvueAnimate() {
            // nvue下，非spinner类型时才需要旋转，因为nvue的spinner类型，使用了weex的
            // loading-indicator组件，自带旋转功能
            this.mode !== 'spinner' && this.startAnimate();
        },
        // 执行nvue的animate模块动画
        startAnimate() {
            this.loading = true;
            const ani = this.$refs.ani;
            if (!ani) return;
            animation.transition(
                ani,
                {
                    // 进行角度旋转
                    styles: {
                        transform: `rotate(${this.aniAngel}deg)`,
                        transformOrigin: 'center center',
                    },
                    duration: this.duration,
                    timingFunction: this.timingFunction,
                    // delay: 10
                },
                () => {
                    // 每次增加360deg，为了让其重新旋转一周
                    this.aniAngel += 360;
                    // 动画结束后，继续循环执行动画，需要同时判断webviewHide变量
                    // nvue安卓，页面隐藏后依然会继续执行startAnimate方法
                    this.show && !this.webviewHide ? this.startAnimate() : (this.loading = false);
                }
            );
        },
        // #endif
    },
};
</script>

<style lang="scss" scoped>
$ai-loading-icon-color: #c8c9cc !default;
$ai-loading-icon-text-margin-left: 8rpx !default;
$ai-loading-icon-text-color: $color-dark !default;
$ai-loading-icon-text-font-size: 28rpx !default;
$ai-loading-icon-text-line-height: 40rpx !default;
$ai-loading-width: 60rpx !default;
$ai-loading-height: 60rpx !default;
$ai-loading-max-width: 100% !default;
$ai-loading-max-height: 100% !default;
$ai-loading-semicircle-border-width: 4rpx !default;
$ai-loading-semicircle-border-color: transparent !default;
$ai-loading-semicircle-border-top-right-radius: 200rpx !default;
$ai-loading-semicircle-border-top-left-radius: 200rpx !default;
$ai-loading-semicircle-border-bottom-left-radius: 200rpx !default;
$ai-loading-semicircle-border-bottom-right-radiu: 200rpx !default;
$ai-loading-semicircle-border-style: solid !default;
$ai-loading-circle-border-top-right-radius: 200rpx !default;
$ai-loading-circle-border-top-left-radius: 200rpx !default;
$ai-loading-circle-border-bottom-left-radius: 200rpx !default;
$ai-loading-circle-border-bottom-right-radiu: 200rpx !default;
$ai-loading-circle-border-width: 4rpx !default;
$ai-loading-circle-border-top-color: #e5e5e5 !default;
$ai-loading-circle-border-right-color: $ai-loading-circle-border-top-color !default;
$ai-loading-circle-border-bottom-color: $ai-loading-circle-border-top-color !default;
$ai-loading-circle-border-left-color: $ai-loading-circle-border-top-color !default;
$ai-loading-circle-border-style: solid !default;
$ai-loading-icon-host-font-size: 0rpx !default;
$ai-loading-icon-host-line-height: 1 !default;
$ai-loading-icon-vertical-margin: 12rpx 0 0 !default;
$ai-loading-icon-dot-top: 0 !default;
$ai-loading-icon-dot-left: 0 !default;
$ai-loading-icon-dot-width: 100% !default;
$ai-loading-icon-dot-height: 100% !default;
$ai-loading-icon-dot-before-width: 4rpx !default;
$ai-loading-icon-dot-before-height: 25% !default;
$ai-loading-icon-dot-before-margin: 0 auto !default;
$ai-loading-icon-dot-before-background-color: currentColor !default;
$ai-loading-icon-dot-before-border-radius: 40% !default;

.ai-loading-icon {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: $ai-loading-icon-color;

    &__text {
        margin-left: $ai-loading-icon-text-margin-left;
        color: $ai-loading-icon-text-color;
        font-size: $ai-loading-icon-text-font-size;
        line-height: $ai-loading-icon-text-line-height;
    }

    &__spinner {
        width: $ai-loading-width;
        height: $ai-loading-height;
        position: relative;
        /* #ifndef APP-NVUE */
        box-sizing: border-box;
        max-width: $ai-loading-max-width;
        max-height: $ai-loading-max-height;
        animation: ai-rotate 1s linear infinite;
        /* #endif */
    }

    &__spinner--semicircle {
        border-width: $ai-loading-semicircle-border-width;
        border-color: $ai-loading-semicircle-border-color;
        border-top-right-radius: $ai-loading-semicircle-border-top-right-radius;
        border-top-left-radius: $ai-loading-semicircle-border-top-left-radius;
        border-bottom-left-radius: $ai-loading-semicircle-border-bottom-left-radius;
        border-bottom-right-radius: $ai-loading-semicircle-border-bottom-right-radiu;
        border-style: $ai-loading-semicircle-border-style;
    }

    &__spinner--circle {
        border-top-right-radius: $ai-loading-circle-border-top-right-radius;
        border-top-left-radius: $ai-loading-circle-border-top-left-radius;
        border-bottom-left-radius: $ai-loading-circle-border-bottom-left-radius;
        border-bottom-right-radius: $ai-loading-circle-border-bottom-right-radiu;
        border-width: $ai-loading-circle-border-width;
        border-top-color: $ai-loading-circle-border-top-color;
        border-right-color: $ai-loading-circle-border-right-color;
        border-bottom-color: $ai-loading-circle-border-bottom-color;
        border-left-color: $ai-loading-circle-border-left-color;
        border-style: $ai-loading-circle-border-style;
    }

    &--vertical {
        flex-direction: column;
    }
}

/* #ifndef APP-NVUE */
:host {
    font-size: $ai-loading-icon-host-font-size;
    line-height: $ai-loading-icon-host-line-height;
}

.ai-loading-icon {
    &__spinner--spinner {
        animation-timing-function: steps(12);
    }

    &__text:empty {
        display: none;
    }

    &--vertical &__text {
        margin: $ai-loading-icon-vertical-margin;
        color: $color-dark;
    }

    &__dot {
        position: absolute;
        top: $ai-loading-icon-dot-top;
        left: $ai-loading-icon-dot-left;
        width: $ai-loading-icon-dot-width;
        height: $ai-loading-icon-dot-height;

        &:before {
            display: block;
            width: $ai-loading-icon-dot-before-width;
            height: $ai-loading-icon-dot-before-height;
            margin: $ai-loading-icon-dot-before-margin;
            background-color: $ai-loading-icon-dot-before-background-color;
            border-radius: $ai-loading-icon-dot-before-border-radius;
            content: ' ';
        }
    }
}

@for $i from 1 through 12 {
    .ai-loading-icon__dot:nth-of-type(#{$i}) {
        transform: rotate($i * 30deg);
        opacity: 1 - 0.0625 * ($i - 1);
    }
}

@keyframes ai-rotate {
    0% {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(1turn);
    }
}

/* #endif */
</style>
