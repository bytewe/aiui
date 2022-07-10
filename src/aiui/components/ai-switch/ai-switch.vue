<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-10 21:37:28
 * @Description: 开关选择器
-->

<template>
    <view
        :class="[$util.bem('ai-switch', [{ disabled }]), customClass]"
        :style="[style, $util.addStyle(customStyle)]"
        @click="onClick"
    >
        <view class="ai-switch__background" :style="[backgroundStyle]" />
        <view
            ref="ai-switch__node"
            class="ai-switch__node"
            :class="[value && 'ai-switch__node--on']"
            :style="[nodeStyle]"
        >
            <ai-loading-icon
                :show="loading"
                mode="circle"
                timing-function="linear"
                :color="value ? activeColor : '#AAABAD'"
                :size="loadingIconSize"
            />
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiSwitch',
    mixins: [mixins],
    props: {
        // 是否为加载中状态
        loading: {
            type: Boolean,
            default: false,
        },
        // 是否为禁用装填
        disabled: {
            type: Boolean,
            default: false,
        },
        // 开关尺寸，单位px
        size: {
            type: [String, Number],
            default: '50rpx',
        },
        // 打开时的背景颜色
        activeColor: {
            type: String,
            default: uni.$config['background-primary'],
        },
        // 关闭时的背景颜色
        inactiveColor: {
            type: String,
            default: uni.$config['background-white'],
        },
        // 通过v-model双向绑定的值
        value: {
            type: [Boolean, String, Number],
            default: false,
        },
        // 打开选择器时的值
        activeValue: {
            type: [String, Number, Boolean],
            default: true,
        },
        // 关闭选择器时的值
        inactiveValue: {
            type: [String, Number, Boolean],
            default: false,
        },
        // 是否开启异步变更，开启后需要手动控制输入值
        asyncChange: {
            type: Boolean,
            default: false,
        },
        // 圆点与外边框的距离
        space: {
            type: [String, Number],
            default: 0,
        },
    },
    data() {
        return {
            background: '#ffffff',
        };
    },
    computed: {
        style() {
            let style = {};
            const size = uni.$util.deleteUnit(this.size);
            // 这里需要加2，是为了腾出边框的距离，否则圆点node会和外边框紧贴在一起
            style.width = uni.$util.addUnit(size * 2 + 2);
            style.height = uni.$util.addUnit(size + 2);
            // 如果自定义了“非激活”演示，name边框颜色设置为透明(跟非激活颜色一致)
            // 这里不能简单的设置为非激活的颜色，否则打开状态时，会有边框，所以需要透明
            if (this.customInactiveColor) {
                style.borderColor = 'rgba(0, 0, 0, 0)';
            }
            style.backgroundColor = this.value === this.activeValue ? this.activeColor : this.inactiveColor;
            return style;
        },
        nodeStyle() {
            let style = {};
            const size = uni.$util.deleteUnit(this.size);
            const space = uni.$util.deleteUnit(this.space);
            // 如果自定义非激活颜色，将node圆点的尺寸减少两个像素，让其与外边框距离更大一点
            style.width = uni.$util.addUnit(size - space);
            style.height = uni.$util.addUnit(size - space);
            style.transform = `translateX(${this.value === this.activeValue ? -space : -size}px)`;
            return style;
        },
        backgroundStyle() {
            let style = {};
            const size = uni.$util.deleteUnit(this.size);
            // 这里配置一个多余的元素在HTML中，是为了让switch切换时，有更良好的背景色扩充体验(见实际效果)
            style.width = uni.$util.addUnit(size * 2 - size / 2);
            style.height = uni.$util.addUnit(size);
            style.backgroundColor = this.inactiveColor;
            // 打开时，让此元素收缩，否则反之
            style.transform = `scale(${this.value === this.activeValue ? 0 : 1})`;
            return style;
        },
        customInactiveColor() {
            // 之所以需要判断是否自定义了“非激活”颜色，是为了让node圆点离外边框更宽一点的距离
            return this.inactiveColor !== '#fff' && this.inactiveColor !== '#ffffff';
        },
        loadingIconSize() {
            const size = uni.$util.deleteUnit(this.size);
            return uni.$util.addUnit(size * 0.6);
        },
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                if (value !== this.inactiveValue && value !== this.activeValue) {
                    uni.$util.error('v-mode绑定的值必须为inactiveValue、activeValue二者之一');
                }
            },
        },
    },
    methods: {
        onClick() {
            if (!this.disabled && !this.loading) {
                const oldValue = this.value === this.activeValue ? this.inactiveValue : this.activeValue;
                if (!this.asyncChange) {
                    this.$emit('input', oldValue);
                }
                // 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
                this.$nextTick(() => {
                    this.$emit('change', oldValue);
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-switch {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background-color: $background-light;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.12);
    border-radius: 200rpx;
    transition: background-color 0.4s;
    overflow: hidden;

    &__background {
        position: absolute;
        border-radius: 200rpx;
        background-color: $background-light;
        transition-property: transform;
        transition-duration: 0.4s;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        transition-timing-function: ease;
    }

    &__node {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 200rpx;
        background-color: $background-white;
        border-radius: 200rpx;
        box-shadow: 2rpx 2rpx 2rpx 0 rgba(0, 0, 0, 0.25);
        transition-property: transform;
        transition-duration: 0.4s;
        transition-timing-function: cubic-bezier(0.3, 1.05, 0.4, 1.05);
    }

    &--disabled {
        opacity: 0.6;
    }
}
</style>
