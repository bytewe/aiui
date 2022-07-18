<!--
 * @Author: airobot
 * @Date: 2022-06-12 12:23:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-14 10:36:43
 * @Description: 卡片
-->

<template>
    <view :class="[$util.bem('ai-card', [size, align]), customClass]" :style="[style]">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiCard',
    mixins: [mixins],
    props: {
        // 大小
        size: {
            type: String,
            default: '',
        },
        // 背景色
        background: {
            type: String,
            default: '',
        },
        // 边框圆角
        borderRadius: {
            type: String,
            default: '',
        },
        // 内边距
        padding: {
            type: String,
            default: '',
        },
        // 垂直对齐
        align: {
            type: String,
            default: '',
        },
        // 水平对齐
        justify: {
            type: String,
            default: '',
        },
    },
    computed: {
        // 样式
        style() {
            const style = {
                alignItem: this.align,
                justifyContent: this.justify,
                background: this.background,
                borderRadius: this.borderRadius,
                padding: this.padding,
            };
            return uni.$util.getStyle(style, this.customStyle);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-card {
    padding: $space-small $space-normal;
    border-radius: $border-radius-normal;
    background: $background-white;

    &--none {
        padding: 0;
        border-radius: 0;
    }

    &--xs {
        padding: 0 $space-xs;
        border-radius: $border-radius-xs;
    }

    &--mini {
        padding: $space-xs $space-mini;
        border-radius: $border-radius-mini;
    }

    &--small {
        padding: $space-mini $space-small;
        border-radius: $border-radius-small;
    }

    &--normal {
        padding: $space-small $space-normal;
        border-radius: $border-radius-normal;
    }

    &--big {
        padding: $space-normal $space-big;
        border-radius: $border-radius-big;
    }

    &--large {
        padding: $space-big $space-large;
        border-radius: $border-radius-large;
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
