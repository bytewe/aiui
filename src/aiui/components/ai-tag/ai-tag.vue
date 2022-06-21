<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:26:29
 * @Description: 标签
-->

<template>
    <ai-transition mode="fade" :show="show">
        <view class="ai-tag-wrapper">
            <view
                :class="[
                    $util.bem('ai-tag', [shape, size]),
                    !plain && `ai-tag--${type}`,
                    plain && `ai-tag--${type}--plain`,
                    plain && plainFill && `ai-tag--${type}--plain--fill`,
                ]"
                :style="style"
                @click.stop="onClick"
            >
                <slot name="icon">
                    <view v-if="icon" class="ai-tag__icon">
                        <image v-if="$util.test.image(icon)" :src="icon" :style="[imgStyle]" />
                        <ai-icon v-else :color="elIconColor" :name="icon" :size="iconSize" />
                    </view>
                </slot>
                <text
                    class="ai-tag__text"
                    :style="[textColor]"
                    :class="[`ai-tag__text--${type}`, plain && `ai-tag__text--${type}--plain`, `ai-tag__text--${size}`]"
                    >{{ text }}</text
                >
            </view>
            <view
                v-if="closable"
                class="ai-tag__close"
                :class="[`ai-tag__close--${size}`]"
                :style="{ backgroundColor: closeColor }"
                @click.stop="onClose"
            >
                <ai-icon name="close" :size="closeSize" color="#ffffff" />
            </view>
        </view>
    </ai-transition>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiTag',
    mixins: [mixins],
    props: {
        // 标签类型info、primary、success、warning、danger
        type: {
            type: String,
            default: 'primary',
        },
        // 不可用
        disabled: {
            type: [Boolean, String],
            default: false,
        },
        // 标签的大小，large，medium，mini
        size: {
            type: String,
            default: 'medium',
        },
        // tag的形状，circle（两边半圆形）, square（方形，带圆角）
        shape: {
            type: String,
            default: 'square',
        },
        // 标签文字
        text: {
            type: [String, Number],
            default: '',
        },
        // 背景颜色，默认为空字符串，即不处理
        background: {
            type: String,
            default: '',
        },
        // 标签字体颜色，默认为空字符串，即不处理
        color: {
            type: String,
            default: '',
        },
        // 标签的边框颜色
        borderColor: {
            type: String,
            default: '',
        },
        // 关闭按钮图标的颜色
        closeColor: {
            type: String,
            default: '#C6C7CB',
        },
        // 点击时返回的索引值，用于区分例遍的数组哪个元素被点击了
        name: {
            type: [String, Number],
            default: '',
        },
        // 镂空时是否填充背景色
        plainFill: {
            type: Boolean,
            default: false,
        },
        // 是否镂空
        plain: {
            type: Boolean,
            default: false,
        },
        // 是否可关闭
        closable: {
            type: Boolean,
            default: false,
        },
        // 是否显示
        show: {
            type: Boolean,
            default: true,
        },
        // 内置图标，或绝对路径的图片
        icon: {
            type: String,
            default: '',
        },
    },
    data() {
        return {};
    },
    computed: {
        style() {
            const style = {};
            if (this.background) {
                style.backgroundColor = this.background;
            }
            if (this.color) {
                style.color = this.color;
            }
            if (this.borderColor) {
                style.borderColor = this.borderColor;
            }
            if (this.closable) {
                style.marginRight = '20rpx';
                style.marginTop = '20rpx';
            }
            return style;
        },
        // nvue下，文本颜色无法继承父元素
        textColor() {
            const style = {};
            if (this.color) {
                style.color = this.color;
            }
            return style;
        },
        imgStyle() {
            const width = this.size === 'large' ? '34rpx' : this.size === 'medium' ? '30rpx' : '26rpx';
            return {
                width,
                height: width,
            };
        },
        // 文本的样式
        closeSize() {
            const size = this.size === 'large' ? 15 : this.size === 'medium' ? 13 : 12;
            return size;
        },
        // 图标大小
        iconSize() {
            const size = this.size === 'large' ? 21 : this.size === 'medium' ? 19 : 16;
            return size;
        },
        // 图标颜色
        elIconColor() {
            return this.iconColor ? this.iconColor : this.plain ? this.type : '#ffffff';
        },
    },
    methods: {
        // 点击关闭按钮
        onClose() {
            this.$emit('close', this.name);
        },
        // 点击标签
        onClick() {
            this.$emit('click', this.name);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-tag-wrapper {
    position: relative;
}

.ai-tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-style: solid;

    &--circle {
        border-radius: 200rpx;
    }

    &--square {
        border-radius: 6rpx;
    }

    &__icon {
        margin-right: 8rpx;
    }

    &__text {
        &--mini {
            font-size: 24rpx;
            line-height: 24rpx;
        }

        &--medium {
            font-size: 26rpx;
            line-height: 26rpx;
        }

        &--large {
            font-size: 30rpx;
            line-height: 30rpx;
        }
    }

    &--mini {
        height: 44rpx;
        line-height: 44rpx;
        padding: 0 10rpx;
    }

    &--medium {
        height: 52rpx;
        line-height: 44rpx;
        padding: 0 20rpx;
    }

    &--large {
        height: 64rpx;
        line-height: 64rpx;
        padding: 0 30rpx;
    }

    &--primary {
        background-color: $color-primary;
        border-width: 2rpx;
        border-color: $color-primary;
    }

    &--primary--plain {
        border-width: 2rpx;
        border-color: $color-primary;
    }

    &--primary--plain--fill {
        background-color: #ecf5ff;
    }

    &__text--primary {
        color: #ffffff;
    }

    &__text--primary--plain {
        color: $color-primary;
    }

    &--danger {
        background-color: $color-danger;
        border-width: 2rpx;
        border-color: $color-danger;
    }

    &--danger--plain {
        border-width: 2rpx;
        border-color: $color-danger;
    }

    &--danger--plain--fill {
        background-color: #fef0f0;
    }

    &__text--danger {
        color: #ffffff;
    }

    &__text--danger--plain {
        color: $color-danger;
    }

    &--warning {
        background-color: $color-warning;
        border-width: 2rpx;
        border-color: $color-warning;
    }

    &--warning--plain {
        border-width: 2rpx;
        border-color: $color-warning;
    }

    &--warning--plain--fill {
        background-color: #fdf6ec;
    }

    &__text--warning {
        color: #ffffff;
    }

    &__text--warning--plain {
        color: $color-warning;
    }

    &--success {
        background-color: $color-success;
        border-width: 2rpx;
        border-color: $color-success;
    }

    &--success--plain {
        border-width: 2rpx;
        border-color: $color-success;
    }

    &--success--plain--fill {
        background-color: #f5fff0;
    }

    &__text--success {
        color: #ffffff;
    }

    &__text--success--plain {
        color: $color-success;
    }

    &--info {
        background-color: $color-info;
        border-width: 2rpx;
        border-color: $color-info;
    }

    &--info--plain {
        border-width: 2rpx;
        border-color: $color-info;
    }

    &--info--plain--fill {
        background-color: #f4f4f5;
    }

    &__text--info {
        color: #ffffff;
    }

    &__text--info--plain {
        color: $color-info;
    }

    &__close {
        position: absolute;
        z-index: 999;
        top: 20rpx;
        right: 20rpx;
        border-radius: 200rpx;
        background-color: #c6c7cb;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        /* #ifndef APP-NVUE */
        transform: scale(0.6) translate(80%, -80%);
        /* #endif */
        /* #ifdef APP-NVUE */
        transform: scale(0.6) translate(50%, -50%);
        /* #endif */

        &--mini {
            width: 36rpx;
            height: 36rpx;
        }

        &--medium {
            width: 44rpx;
            height: 44rpx;
        }

        &--large {
            width: 50rpx;
            height: 50rpx;
        }
    }
}
</style>
