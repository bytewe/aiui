<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:43:39
 * @Description: 缺省页
-->

<template>
    <view class="ai-empty" :style="$util.addStyle(customStyle)">
        <ai-icon v-if="icon" :name="icon" :size="iconSize" :color="iconColor" />
        <text v-if="title" class="ai-empty__title" :style="$util.addStyle(titleStyle)">{{ title }}</text>
        <text v-if="description" class="ai-empty__description" :style="$util.addStyle(descriptionStyle)">{{
            description
        }}</text>
        <view v-if="$slots.default" class="ai-empty__slot">
            <slot />
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiEmpty',
    mixins: [mixins],
    props: {
        // 图标
        icon: {
            type: String,
            default: '',
        },
        // 图标颜色
        iconColor: {
            type: String,
            default: uni.$config['color-light'],
        },
        // 图标大小
        iconSize: {
            type: [String, Number],
            default: '300rpx',
        },
        // 标题
        title: {
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
        // 标题样式
        descriptionStyle: {
            type: [String, Object],
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-empty-title-margin-top: $space-big !default;
$ai-empty-title-font-size: $font-size-normal !default;
$ai-empty-title-line-height: $line-height-normal !default;
$ai-empty-title-color: $color-default !default;
$ai-empty-description-margin-top: $space-normal !default;
$ai-empty-description-font-size: $font-size-small !default;
$ai-empty-description-line-height: $line-height-small !default;
$ai-empty-description-color: $color-gray !default;
$ai-empty-slot-margin-top: $space-small !default;

.ai-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 0 $space-normal $space-xl;
    text-align: center;

    &__title {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: $ai-empty-title-margin-top;
        font-size: $ai-empty-title-font-size;
        line-height: $ai-empty-title-line-height;
        color: $ai-empty-title-color;
    }

    &__description {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: $ai-empty-description-margin-top;
        font-size: $ai-empty-description-font-size;
        line-height: $ai-empty-description-line-height;
        color: $ai-empty-description-color;
    }

    &__slot {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: $ai-empty-slot-margin-top;
    }
}
</style>
