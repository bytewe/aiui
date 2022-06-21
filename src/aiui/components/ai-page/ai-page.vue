<!--
 * @Author: airobot
 * @Date: 2022-01-25 20:21:05
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 19:17:15
 * @Description: 页面
-->

<template>
    <view :class="[$util.bem('ai-page', [align, padding]), customClass]" :style="[style]">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiPage',
    mixins: [mixins],
    props: {
        // 间距
        padding: {
            type: String,
            default: '',
        },
        // 背景色
        background: {
            type: String,
            default: '',
        },
        // 对齐
        align: {
            type: String,
            default: '',
        },
    },
    computed: {
        // 样式
        style() {
            const style = {};
            if (this.background) {
                style.background = uni.$config[`background-${this.background}`] || this.background;
            }
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
};
</script>

<style lang="scss" scoped>
$page-background: $background-default !default;

.ai-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    line-height: $line-height-normal;
    background: $page-background;
    font-size: $font-size-normal;
    color: $color-default;

    &--mini {
        padding: $space-xs $space-mini;
    }

    &--small {
        padding: $space-mini $space-small;
    }

    &--normal {
        padding: $space-small $space-normal;
    }

    &--left {
        text-align: left;
    }

    &--center {
        text-align: center;
    }

    &--right {
        text-align: right;
    }
}
</style>
