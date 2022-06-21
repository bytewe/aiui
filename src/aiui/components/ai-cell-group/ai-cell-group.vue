<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-13 22:38:15
 * @Description: 单元格分组
-->

<template>
    <view :class="_customClass" :style="_customStyle">
        <slot name="title">
            <text v-if="title" class="ai-cell-group__title" :style="_titleStyle">{{ title }}</text>
        </slot>
        <view :class="['ai-cell-group__content', border ? 'ai-border--top-bottom' : '']">
            <slot />
        </view>
        <slot name="description">
            <text v-if="description" class="ai-cell-group__description">{{ description }}</text>
        </slot>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiCellGroup',
    mixins: [mixins],
    props: {
        // 标题
        title: {
            type: String,
            default: '',
        },
        // 标题背景
        titleBackground: {
            type: String,
            default: '',
        },
        // 标题样式
        titleStyle: {
            type: [String, Object],
            default: '',
        },
        // 描述
        description: {
            type: String,
            default: '',
        },
        // 大小
        size: {
            type: String,
            default: '',
        },
        // 是否显示边框
        border: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        // 自定义属性
        _customClass() {
            return [uni.$util.bem('ai-cell-group', [this.size]), this.customClass];
        },
        // 自定义样式
        _customStyle() {
            let style = {};
            return [uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle))];
        },
        // 标题样式
        _titleStyle() {
            let style = {};
            if (this.titleBackground) {
                style.background = uni.$config[`background-${this.titleBackground}`] || this.titleBackground;
            }
            return [uni.$util.deepMerge(style, uni.$util.addStyle(this.titleStyle))];
        },
    },
};
</script>

<style lang="scss" scoped>
$cell-group-font-size: $font-size-normal !default;
$cell-group-font-size-small: $font-size-small !default;
$cell-group-line-height: $line-height-normal !default;
$cell-group-line-height-small: $line-height-mini !default;
$cell-group-title-padding: $space-small $space-normal $space-mini !default;
$cell-group-title-padding-small: $space-mini $space-normal !default;
$cell-group-title-background: $background-default !default;
$cell-group-title-color: $color-dark !default;
$cell-group-content-background: $background-white !default;
$cell-group-description-padding: $space-small $space-normal !default;
$cell-group-description-padding-small: $space-mini $space-normal !default;
$cell-group-description-color: $color-gray !default;

.ai-cell-group {
    &__title {
        padding: $cell-group-title-padding;
        line-height: $cell-group-line-height;
        background: $cell-group-title-background;
        font-size: $cell-group-font-size;
        color: $cell-group-title-color;

        .ai-cell-group--small & {
            padding: $cell-group-title-padding-small;
            font-size: $cell-group-font-size-small;
            line-height: $cell-group-line-height-small;
        }
    }

    &__content {
        background: $cell-group-content-background;
    }

    &__description {
        padding: $cell-group-description-padding;
        font-size: $cell-group-font-size;
        line-height: $cell-group-line-height;
        color: $cell-group-description-color;

        .ai-cell-group--small & {
            padding: $cell-group-description-padding-small;
            font-size: $cell-group-font-size-small;
            line-height: $cell-group-line-height-small;
        }
    }
}
</style>
