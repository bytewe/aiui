<!--
 * @Author: airobot
 * @Date: 2022-06-12 12:23:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-11 22:54:05
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
        // 对齐
        align: {
            type: String,
            default: '',
        },
    },
    computed: {
        // 样式
        style() {
            let style = {};
            if (this.background) {
                style.background = uni.$config[`background-${this.background}`] || this.background;
            }
            if (this.borderRadius) {
                style.borderRadius = uni.$config[`border-radius-${this.borderRadius}`] || this.borderRadius;
            } else if (this.padding && uni.$config[`border-radius-${this.padding}`]) {
                style.borderRadius = uni.$config[`border-radius-${this.padding}`];
            }
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
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
