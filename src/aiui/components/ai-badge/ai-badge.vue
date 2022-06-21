<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:14:00
 * @Description: 徽标数
-->

<template>
    <text
        v-if="show && ((Number(value) === 0 ? showZero : true) || isDot)"
        :class="[
            isDot ? 'ai-badge--dot' : 'ai-badge--not-dot',
            inverted && 'ai-badge--inverted',
            shape === 'horn' && 'ai-badge--horn',
            `ai-badge--${type}${inverted ? '--inverted' : ''}`,
        ]"
        :style="[$util.addStyle(customStyle), badgeStyle]"
        class="ai-badge"
        >{{ isDot ? '' : showValue }}</text
    >
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiBadge',
    mixins: [mixins],
    props: {
        // 是否显示圆点
        isDot: {
            type: Boolean,
            default: false,
        },
        // 显示的内容
        value: {
            type: [Number, String],
            default: '',
        },
        // 是否显示
        show: {
            type: Boolean,
            default: true,
        },
        // 最大值，超过最大值会显示 '{max}+'
        max: {
            type: [Number, String],
            default: 999,
        },
        // 主题类型，error|warning|success|primary
        type: {
            type: String,
            default: 'danger',
        },
        // 当数值为 0 时，是否展示 Badge
        showZero: {
            type: Boolean,
            default: false,
        },
        // 背景颜色，优先级比type高，如设置，type参数会失效
        background: {
            type: [String, null],
            default: null,
        },
        // 字体颜色
        color: {
            type: [String, null],
            default: null,
        },
        // 徽标形状，circle-四角均为圆角，horn-左下角为直角
        shape: {
            type: String,
            default: 'circle',
        },
        // 设置数字的显示方式，overflow|ellipsis|limit
        // overflow会根据max字段判断，超出显示`${max}+`
        // ellipsis会根据max判断，超出显示`${max}...`
        // limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
        numberType: {
            type: String,
            default: 'overflow',
        },
        // 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
        offset: {
            type: Array,
            default: () => [],
        },
        // 是否反转背景和字体颜色
        inverted: {
            type: Boolean,
            default: false,
        },
        // 是否绝对定位
        absolute: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        // 是否将badge中心与父组件右上角重合
        boxStyle() {
            let style = {};
            return style;
        },
        // 整个组件的样式
        badgeStyle() {
            const style = {};
            if (this.color) {
                style.color = this.color;
            }
            if (this.background && !this.inverted) {
                style.backgroundColor = this.background;
            }
            if (this.absolute) {
                style.position = 'absolute';
                // 如果有设置offset参数
                if (this.offset.length) {
                    // top和right分为为offset的第一个和第二个值，如果没有第二个值，则right等于top
                    const top = this.offset[0];
                    const right = this.offset[1] || top;
                    style.top = uni.$util.addUnit(top);
                    style.right = uni.$util.addUnit(right);
                }
            }
            return style;
        },
        showValue() {
            switch (this.numberType) {
                case 'overflow':
                    return Number(this.value) > Number(this.max) ? this.max + '+' : this.value;
                case 'ellipsis':
                    return Number(this.value) > Number(this.max) ? '...' : this.value;
                case 'limit':
                    return Number(this.value) > 999
                        ? Number(this.value) >= 9999
                            ? Math.floor((this.value / 1e4) * 100) / 100 + 'w'
                            : Math.floor((this.value / 1e3) * 100) / 100 + 'k'
                        : this.value;
                default:
                    return Number(this.value);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-badge-primary: $color-primary !default;
$ai-badge-danger: $color-danger !default;
$ai-badge-success: $color-success !default;
$ai-badge-info: $color-info !default;
$ai-badge-warning: $color-warning !default;
$ai-badge-dot-radius: 200rpx !default;
$ai-badge-dot-size: 16rpx !default;
$ai-badge-dot-right: 8rpx !default;
$ai-badge-dot-top: 0 !default;
$ai-badge-text-font-size: 22rpx !default;
$ai-badge-text-right: 20rpx !default;
$ai-badge-text-padding: 4rpx 10rpx !default;
$ai-badge-text-align: center !default;
$ai-badge-text-color: #ffffff !default;

.ai-badge {
    border-top-right-radius: $ai-badge-dot-radius;
    border-top-left-radius: $ai-badge-dot-radius;
    border-bottom-left-radius: $ai-badge-dot-radius;
    border-bottom-right-radius: $ai-badge-dot-radius;
    display: flex;
    flex-direction: row;
    line-height: $ai-badge-text-font-size;
    text-align: $ai-badge-text-align;
    font-size: $ai-badge-text-font-size;
    color: $ai-badge-text-color;

    &--dot {
        height: $ai-badge-dot-size;
        width: $ai-badge-dot-size;
    }

    &--inverted {
        font-size: 26rpx;
    }

    &--not-dot {
        padding: $ai-badge-text-padding;
    }

    &--horn {
        border-bottom-left-radius: 0;
    }

    &--primary {
        background-color: $ai-badge-primary;
    }

    &--primary--inverted {
        color: $ai-badge-primary;
    }

    &--danger {
        background-color: $ai-badge-danger;
    }

    &--danger--inverted {
        color: $ai-badge-danger;
    }

    &--success {
        background-color: $ai-badge-success;
    }

    &--success--inverted {
        color: $ai-badge-success;
    }

    &--info {
        background-color: $ai-badge-info;
    }

    &--info--inverted {
        color: $ai-badge-info;
    }

    &--warning {
        background-color: $ai-badge-warning;
    }

    &--warning--inverted {
        color: $ai-badge-warning;
    }
}
</style>
