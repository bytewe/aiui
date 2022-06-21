<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-14 22:19:58
 * @Description: 单元格
-->

<template>
    <view
        :class="[
            $util.bem('ai-cell', { disabled }),
            border && borderLength === 'full' ? 'ai-border--bottom' : '',
            customClass,
        ]"
        :style="$util.addStyle(customStyle)"
        :hover-class="hover && !disabled ? 'ai-cell--hover' : ''"
        :hover-stay-time="250"
        @click="onClick"
    >
        <view :class="['ai-cell__container', border && borderLength === 'container' ? 'ai-border--bottom' : '']">
            <view v-if="icon || $slots.icon" class="ai-cell__icon">
                <slot name="icon">
                    <ai-icon :name="icon" :size="iconSize" :custom-style="iconStyle" />
                </slot>
            </view>
            <view
                :class="[
                    $util.bem('ai-cell__content', [size, { center }]),
                    border && borderLength === 'content' ? 'ai-border--bottom' : '',
                ]"
                :style="$util.addStyle(contentStyle)"
            >
                <view class="ai-cell__title">
                    <slot>
                        <text v-if="title" class="ai-cell__title__text" :style="$util.addStyle(titleStyle)">{{
                            title
                        }}</text>
                    </slot>
                    <slot name="description">
                        <text v-if="description" class="ai-cell__description">{{ description }}</text>
                    </slot>
                </view>
                <slot name="value">
                    <text
                        v-if="value"
                        :class="$util.bem('ai-cell__value', [valueAlign])"
                        :style="$util.addStyle(valueStyle)"
                        >{{ value }}</text
                    >
                </slot>
                <view v-if="arrow || $slots.arrow" class="ai-cell__arrow">
                    <slot name="arrow">
                        <ai-icon v-if="arrow" :name="arrowIcon" color="gray" :custom-style="arrowIconStyle" />
                    </slot>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiCell',
    mixins: [mixins],
    props: {
        // 图标或图片链接
        icon: {
            type: String,
            default: '',
        },
        // 图标大小
        iconSize: {
            type: String,
            default: uni.$config['font-size-normal'],
        },
        // 图标样式
        iconStyle: {
            type: [String, Object],
            default: '',
        },
        // 标题
        title: {
            type: [String, Number],
            default: '',
        },
        // 标题样式
        titleStyle: {
            type: [String, Object],
            default: '',
        },
        // 标题下方的描述信息
        description: {
            type: [String, Number],
            default: '',
        },
        // 内容
        value: {
            type: [String, Number],
            default: '',
        },
        // 内容对齐
        valueAlign: {
            type: String,
            default: '',
        },
        // 内容样式
        valueStyle: {
            type: [String, Object],
            default: '',
        },
        // 单元格大小
        size: {
            type: String,
            default: '',
        },
        // 点击后跳转的链接地址
        url: {
            type: String,
            default: '',
        },
        // 内容样式
        contentStyle: {
            type: [String, Object],
            default: '',
        },
        // 是否显示点击态
        hover: {
            type: Boolean,
            default: false,
        },
        // 是否显示箭头
        arrow: {
            type: Boolean,
            default: false,
        },
        // 箭头图标
        arrowIcon: {
            type: String,
            default: 'arrow',
        },
        // 图标样式
        arrowIconStyle: {
            type: [String, Object],
            default: '',
        },
        // 是否显示内边框
        border: {
            type: Boolean,
            default: true,
        },
        // 边框长度
        borderLength: {
            type: String,
            default: 'content',
        },
        // 是否显示表单必填星号
        required: {
            type: Boolean,
            default: false,
        },
        // 是否使内容垂直居中
        center: {
            type: Boolean,
            default: true,
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        // 点击
        onClick() {
            if (this.disabled) {
                return;
            }
            if (this.url) {
                uni.navigateTo({ url: this.url });
            }
            this.$emit('click');
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-cell-padding: $space-small $space-normal $space-small 0 !default;
$ai-cell-padding-small: $space-mini $space-normal $space-mini 0 !default;
$ai-cell-font-size: $font-size-normal !default;
$ai-cell-line-height: $line-height-normal !default;
$ai-cell-color: $color-default !default;
$ai-cell-container-margin-left: $space-normal !default;
$ai-cell-icon-margin: 0 $space-normal 0 0 !default;
$ai-cell-title-font-size: $font-size-normal !default;
$ai-cell-title-line-height: $line-height-normal !default;
$ai-cell-title-color: $color-default !default;
$ai-cell-description-margin-top: $space-xs !default;
$ai-cell-description-font-size: $font-size-mini !default;
$ai-cell-description-line-height: $line-height-mini !default;
$ai-cell-description-color: $color-light !default;
$ai-cell-value-font-size: $font-size-small !default;
$ai-cell-value-color: $color-dark !default;
$ai-cell-arrow-margin: 0 0-$space-xs 0 $space-xs !default;
$ai-cell-hover-background: $hover-background-default !default;

.ai-cell {
    &__container {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: $ai-cell-container-margin-left;
        line-height: $ai-cell-line-height;
    }

    &__icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: $ai-cell-icon-margin;
    }

    &__content {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        flex: 1;
        padding: $ai-cell-padding;

        &--small {
            padding: $ai-cell-padding-small;
        }

        &--center {
            align-items: center;
        }
    }

    &__title {
        flex: 1;

        &__text {
            font-size: $ai-cell-title-font-size;
            line-height: $ai-cell-title-line-height;
            color: $ai-cell-title-color;
        }
    }

    &__description {
        margin-top: $ai-cell-description-margin-top;
        font-size: $ai-cell-description-font-size;
        color: $ai-cell-description-color;
        line-height: $ai-cell-description-line-height;
    }

    &__value {
        text-align: right;
        font-size: $ai-cell-value-font-size;
        color: $ai-cell-value-color;

        &--left {
            text-align: left;
        }

        &--center {
            text-align: center;
        }
    }

    &__arrow {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: $ai-cell-arrow-margin;
        transition: transform 0.3s;
    }

    &--hover {
        background: $ai-cell-hover-background;
    }

    &--disabled {
        opacity: 0.5;
    }
}
</style>
