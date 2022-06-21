<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 22:28:11
 * @Description: 按钮
-->

<template>
    <block>
        <!-- #ifndef APP-NVUE -->
        <button
            :hover-start-time="Number(hoverStartTime)"
            :hover-stay-time="Number(hoverStayTime)"
            :form-type="formType"
            :open-type="openType"
            :app-parameter="appParameter"
            :hover-stop-propagation="hoverStopPropagation"
            :send-message-title="sendMessageTitle"
            :send-message-path="sendMessagePath"
            :lang="lang"
            :data-name="dataName"
            :session-from="sessionFrom"
            :send-message-img="sendMessageImg"
            :show-message-card="showMessageCard"
            :hover-class="!disabled && !loading ? 'ai-button--active' : ''"
            class="ai-button ai-button-reset"
            :style="[baseColor, $util.addStyle(customStyle)]"
            :class="bemClass"
            @getphonenumber="getphonenumber"
            @getuserinfo="getuserinfo"
            @error="error"
            @opensetting="opensetting"
            @launchapp="launchapp"
            @click="onClick"
        >
            <template v-if="loading">
                <ai-loading-icon :mode="loadingMode" :size="textSize" :color="loadingColor" />
                <text class="ai-button__loading-text" :style="{ fontSize: textSize }">{{ loadingText || text }}</text>
            </template>
            <template v-else>
                <ai-icon
                    v-if="icon"
                    :name="icon"
                    :color="iconColorCom"
                    :size="textSize"
                    :custom-style="{ marginRight: $config['space-xs'] }"
                />
                <slot>
                    <text class="ai-button__text" :style="{ fontSize: textSize }">{{ text }}</text>
                </slot>
            </template>
        </button>
        <!-- #endif -->

        <!-- #ifdef APP-NVUE -->
        <view
            :hover-start-time="Number(hoverStartTime)"
            :hover-stay-time="Number(hoverStayTime)"
            class="ai-button"
            :hover-class="
                !disabled && !loading && !color && (plain || type === 'info')
                    ? 'ai-button--active--plain'
                    : !disabled && !loading && !plain
                    ? 'ai-button--active'
                    : ''
            "
            :class="bemClass"
            :style="[baseColor, $util.addStyle(customStyle)]"
            @click="onClick"
        >
            <template v-if="loading">
                <ai-loading-icon :mode="loadingMode" :size="textSize" :color="loadingColor" />
                <text
                    class="ai-button__loading-text"
                    :style="[nvueTextStyle]"
                    :class="[plain && `ai-button__text--plain--${type}`]"
                    >{{ loadingText || text }}</text
                >
            </template>
            <template v-else>
                <ai-icon v-if="icon" :name="icon" :color="iconColorCom" :size="textSize" />
                <text
                    class="ai-button__text"
                    :style="[{ marginLeft: icon ? $config['space-mini'] : 0 }, nvueTextStyle]"
                    :class="[plain && `ai-button__text--plain--${type}`]"
                    >{{ text }}</text
                >
            </template>
        </view>
        <!-- #endif -->
    </block>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
import button from '@/aiui/mixins/button';
import openType from '@/aiui/mixins/openType';

export default {
    name: 'AiButton',
    // #ifdef MP
    mixins: [mixins, button, openType],
    // #endif
    // #ifndef MP
    // eslint-disable-next-line no-dupe-keys
    mixins: [mixins],
    // #endif
    props: {
        // 按钮的预置样式，info，primary，danger，warning，success
        type: {
            type: String,
            default: 'default',
        },
        // 按钮尺寸，large，big，normal，small，mini
        size: {
            type: String,
            default: 'normal',
        },
        // 按钮形状，circle（两边为半圆），round（圆角），square（方形）
        shape: {
            type: String,
            default: 'round',
        },
        // 按钮是否镂空
        plain: {
            type: Boolean,
            default: false,
        },
        // 按钮是否块级元素
        block: {
            type: Boolean,
            default: false,
        },
        // 是否禁止状态
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否加载中
        loading: {
            type: Boolean,
            default: false,
        },
        // 加载中提示文字
        loadingText: {
            type: [String, Number],
            default: '',
        },
        // 加载状态图标类型
        loadingMode: {
            type: String,
            default: 'spinner',
        },
        // 加载图标大小
        loadingSize: {
            type: [String, Number],
            default: 15,
        },
        // 开放能力，具体请看uniapp稳定关于button组件部分说明
        openType: {
            type: String,
            default: '',
        },
        // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
        // 取值为submit（提交表单），reset（重置表单）
        formType: {
            type: String,
            default: '',
        },
        // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
        // 只微信小程序、QQ小程序有效
        appParameter: {
            type: String,
            default: '',
        },
        // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
        hoverStopPropagation: {
            type: Boolean,
            default: true,
        },
        // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
        lang: {
            type: String,
            default: 'en',
        },
        // 会话来源，open-type="contact"时有效。只微信小程序有效
        sessionFrom: {
            type: String,
            default: '',
        },
        // 会话内消息卡片标题，open-type="contact"时有效
        // 默认当前标题，只微信小程序有效
        sendMessageTitle: {
            type: String,
            default: '',
        },
        // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
        // 默认当前分享路径，只微信小程序有效
        sendMessagePath: {
            type: String,
            default: '',
        },
        // 会话内消息卡片图片，open-type="contact"时有效
        // 默认当前页面截图，只微信小程序有效
        sendMessageImg: {
            type: String,
            default: '',
        },
        // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
        // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
        showMessageCard: {
            type: Boolean,
            default: false,
        },
        // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
        dataName: {
            type: String,
            default: '',
        },
        // 节流，一定时间内只能触发一次
        throttleTime: {
            type: [String, Number],
            default: 0,
        },
        // 按住后多久出现点击态，单位毫秒
        hoverStartTime: {
            type: [String, Number],
            default: 0,
        },
        // 手指松开后点击态保留时间，单位毫秒
        hoverStayTime: {
            type: [String, Number],
            default: 200,
        },
        // 按钮文字，之所以通过props传入，是因为slot传入的话
        // nvue中无法控制文字的样式
        text: {
            type: [String, Number],
            default: '',
        },
        // 按钮图标
        icon: {
            type: String,
            default: '',
        },
        // 按钮图标
        iconColor: {
            type: String,
            default: '',
        },
        // 按钮颜色，支持传入linear-gradient渐变色
        color: {
            type: String,
            default: '',
        },
    },
    data() {
        return {};
    },
    computed: {
        // 生成bem风格的类名
        bemClass() {
            const { type, shape, size, disabled, plain, block } = this;
            if (!this.color) {
                return uni.$util.bem('ai-button', [type, shape, size, { disabled, plain, block }]);
            } else {
                // 由于nvue的原因，在有color参数时，不需要传入type，否则会生成type相关的类型，影响最终的样式
                return uni.$util.bem('ai-button', [shape, size, { disabled, plain, block }]);
            }
        },
        loadingColor() {
            if (this.plain) {
                // 如果有设置color值，则用color值，否则使用type主题颜色
                return this.color ? this.color : uni.$config[`color-${this.type}`];
            }
            if (this.type === 'info') {
                return '#c9c9c9';
            }
            return 'rgb(200, 200, 200)';
        },
        iconColorCom() {
            // 如果是镂空状态，设置了color就用color值，否则使用主题颜色，
            // ai-icon的color能接受一个主题颜色的值
            if (this.iconColor) return this.iconColor;
            if (this.plain) {
                return this.color ? this.color : this.type;
            } else {
                return this.type === 'info' ? '#000000' : '#ffffff';
            }
        },
        baseColor() {
            let style = {};
            if (this.color) {
                // 针对自定义了color颜色的情况，镂空状态下，就是用自定义的颜色
                style.color = this.plain ? this.color : 'white';
                if (!this.plain) {
                    // 非镂空，背景色使用自定义的颜色
                    style.background = this.color;
                }
                if (this.color.indexOf('gradient') !== -1) {
                    // 如果自定义的颜色为渐变色，不显示边框，以及通过backgroundImage设置渐变色
                    // weex文档说明可以写borderWidth的形式，为什么这里需要分开写？
                    // 因为weex是阿里巴巴为了部门业绩考核而做的你懂的东西，所以需要这么写才有效
                    style.borderTopWidth = 0;
                    style.borderRightWidth = 0;
                    style.borderBottomWidth = 0;
                    style.borderLeftWidth = 0;
                    if (!this.plain) {
                        style.backgroundImage = this.color;
                    }
                } else {
                    // 非渐变色，则设置边框相关的属性
                    style.borderColor = this.color;
                    style.borderWidth = '2rpx';
                    style.borderStyle = 'solid';
                }
            }
            return style;
        },
        // nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
        nvueTextStyle() {
            let style = {
                fontSize: this.textSize,
            };
            // 针对自定义了color颜色的情况，镂空状态下，就是用自定义的颜色
            if (this.type === 'info') {
                style.color = '#323233';
            }
            if (this.color) {
                style.color = this.plain ? this.color : 'white';
            }
            return style;
        },
        // 字体大小
        textSize() {
            return uni.$config[`font-size-${this.size}`] || this.size;
        },
    },
    methods: {
        onClick() {
            // 非禁止并且非加载中，才能点击
            if (!this.disabled && !this.loading) {
                // 进行节流控制，每this.throttle毫秒内，只在开始处执行
                uni.$util.throttle(() => {
                    this.$emit('click');
                }, this.throttleTime);
            }
        },
        // 下面为对接uniapp官方按钮开放能力事件回调的对接
        getphonenumber(res) {
            this.$emit('getphonenumber', res);
        },
        getuserinfo(res) {
            this.$emit('getuserinfo', res);
        },
        error(res) {
            this.$emit('error', res);
        },
        opensetting(res) {
            this.$emit('opensetting', res);
        },
        launchapp(res) {
            this.$emit('launchapp', res);
        },
    },
};
</script>

<style lang="scss" scoped>
/* #ifndef APP-NVUE */
$ai-button-before-top: 50% !default;
$ai-button-before-left: 50% !default;
$ai-button-before-width: 100% !default;
$ai-button-before-height: 100% !default;
$ai-button-before-transform: translate(-50%, -50%) !default;
$ai-button-before-opacity: 0 !default;
$ai-button-before-background: #000 !default;
$ai-button-before-border-color: #000 !default;
$ai-button-active-before-opacity: 0.15 !default;
$ai-button-icon-margin-left: 8rpx !default;
$ai-button-plain-info-color: $color-info;
$ai-button-plain-success-color: $color-success;
$ai-button-plain-danger-color: $color-danger;
$ai-button-plain-warning-color: $color-danger;
/* #endif */

/* #ifdef APP-NVUE */
$ai-button-active-opacity: 0.75 !default;
$ai-button-loading-text-margin-left: 8rpx !default;
$ai-button-text-color: #ffffff !default;
$ai-button-text-plain-danger-color: $color-danger !default;
$ai-button-text-plain-warning-color: $color-warning !default;
$ai-button-text-plain-success-color: $color-success !default;
$ai-button-text-plain-info-color: $color-info !default;
$ai-button-text-plain-primary-color: $color-primary !default;
/* #endif */

$ai-button-loading-text-margin-left: 8rpx !default;

$ai-button-height: 80rpx !default;
$ai-button-padding: 0 $space-normal !default;

$ai-button-large-height: 100rpx !default;
$ai-button-large-padding: 0 $space-large !default;

$ai-button-big-height: 90rpx !default;
$ai-button-big-padding: 0 $space-big !default;

$ai-button-small-height: 60rpx !default;
$ai-button-small-padding: 0 $space-small !default;

$ai-button-mini-height: 48rpx !default;
$ai-button-mini-padding: 0 $space-mini !default;

$ai-button-disabled-opacity: 0.5 !default;

$ai-button-primary-color: $color-white !default;
$ai-button-primary-background: $color-primary !default;
$ai-button-primary-border-color: $ai-button-primary-background !default;
$ai-button-primary-border-width: 0.5px !default;
$ai-button-primary-border-style: solid !default;

$ai-button-success-color: $color-white !default;
$ai-button-success-background: $color-success !default;
$ai-button-success-border-color: $ai-button-success-background !default;
$ai-button-success-border-width: 0.5px !default;
$ai-button-success-border-style: solid !default;

$ai-button-warning-color: $color-white !default;
$ai-button-warning-background: $color-warning !default;
$ai-button-warning-border-color: $ai-button-warning-background !default;
$ai-button-warning-border-width: 0.5px !default;
$ai-button-warning-border-style: solid !default;

$ai-button-danger-color: $color-white !default;
$ai-button-danger-background: $color-danger !default;
$ai-button-danger-border-color: $ai-button-danger-background !default;
$ai-button-danger-border-width: 0.5px !default;
$ai-button-danger-border-style: solid !default;

$ai-button-info-color: $color-white !default;
$ai-button-info-background: $color-info !default;
$ai-button-info-border-color: $ai-button-info-background !default;
$ai-button-info-border-width: 0.5px !default;
$ai-button-info-border-style: solid !default;

$ai-button-block-width: 100% !default;

$ai-button-circle-border-radius: 200rpx !default;
$ai-button-round-border-radius: 12rpx !default;
$ai-button-square-border-radius: 4rpx !default;

$ai-button-icon-min-width: 1em !default;
$ai-button-plain-background: #fff !default;

.ai-button {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: $ai-button-height;
    padding: $ai-button-padding;

    &__loading-text {
        margin-left: $ai-button-loading-text-margin-left;
    }

    &--large {
        min-height: $ai-button-large-height;
        padding: $ai-button-large-padding;
    }

    &--big {
        min-height: $ai-button-big-height;
        padding: $ai-button-big-padding;
    }

    &--small {
        min-height: $ai-button-small-height;
        padding: $ai-button-small-padding;
    }

    &--mini {
        min-height: $ai-button-mini-height;
        padding: $ai-button-mini-padding;
    }

    &--disabled {
        opacity: $ai-button-disabled-opacity;
    }

    &--primary {
        color: $ai-button-primary-color;
        background: $ai-button-primary-background;
        border-color: $ai-button-primary-border-color;
        border-width: $ai-button-primary-border-width;
        border-style: $ai-button-primary-border-style;
    }

    &--success {
        color: $ai-button-success-color;
        background: $ai-button-success-background;
        border-color: $ai-button-success-border-color;
        border-width: $ai-button-success-border-width;
        border-style: $ai-button-success-border-style;
    }

    &--warning {
        color: $ai-button-warning-color;
        background: $ai-button-warning-background;
        border-color: $ai-button-warning-border-color;
        border-width: $ai-button-warning-border-width;
        border-style: $ai-button-warning-border-style;
    }

    &--danger {
        color: $ai-button-danger-color;
        background: $ai-button-danger-background;
        border-color: $ai-button-danger-border-color;
        border-width: $ai-button-danger-border-width;
        border-style: $ai-button-danger-border-style;
    }

    &--info {
        color: $ai-button-info-color;
        background: $ai-button-info-background;
        border-color: $ai-button-info-border-color;
        border-width: $ai-button-info-border-width;
        border-style: $ai-button-info-border-style;
    }

    &--circle {
        border-radius: $ai-button-circle-border-radius;
    }

    &--round {
        border-radius: $ai-button-round-border-radius;
    }

    &--square {
        border-radius: $ai-button-square-border-radius;
    }

    &__icon {
        /* #ifndef APP-NVUE */
        min-width: $ai-button-icon-min-width;
        line-height: inherit !important;
        vertical-align: top;
        /* #endif */
    }

    &--plain {
        background: $ai-button-plain-background;
    }

    &--block {
        flex: 1;
    }
}

/* #ifdef APP-NVUE */
.ai-button {
    &--active {
        opacity: $ai-button-active-opacity;
    }

    &--active--plain {
        background: rgb(217, 217, 217);
    }

    &__loading-text {
        margin-left: $ai-button-loading-text-margin-left;
    }

    &__text,
    &__loading-text {
        color: $ai-button-text-color;
    }

    &__text--plain--danger {
        color: $ai-button-text-plain-danger-color;
    }

    &__text--plain--warning {
        color: $ai-button-text-plain-warning-color;
    }

    &__text--plain--success {
        color: $ai-button-text-plain-success-color;
    }

    &__text--plain--info {
        color: $ai-button-text-plain-info-color;
    }

    &__text--plain--primary {
        color: $ai-button-text-plain-primary-color;
    }
}
/* #endif */

/* #ifndef APP-NVUE */
.ai-button {
    &__text {
        white-space: nowrap;
        line-height: 1;
    }

    &:before {
        position: absolute;
        top: $ai-button-before-top;
        left: $ai-button-before-left;
        width: $ai-button-before-width;
        height: $ai-button-before-height;
        border: inherit;
        border-radius: inherit;
        transform: $ai-button-before-transform;
        opacity: $ai-button-before-opacity;
        content: ' ';
        background: $ai-button-before-background;
        border-color: $ai-button-before-border-color;
    }

    &--active {
        &:before {
            opacity: 0.15;
        }
    }

    &__icon + &__text:not(:empty),
    &__loading-text {
        margin-left: $ai-button-icon-margin-left;
    }

    &--plain {
        &.ai-button--primary {
            color: $color-primary;
        }
    }

    &--plain {
        &.ai-button--info {
            color: $ai-button-plain-info-color;
        }
    }

    &--plain {
        &.ai-button--success {
            color: $ai-button-plain-success-color;
        }
    }

    &--plain {
        &.ai-button--danger {
            color: $ai-button-plain-danger-color;
        }
    }

    &--plain {
        &.ai-button--warning {
            color: $ai-button-plain-warning-color;
        }
    }
}
/* #endif */
</style>
