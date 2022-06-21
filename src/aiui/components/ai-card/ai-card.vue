<!--
 * @Author: airobot
 * @Date: 2022-06-12 12:23:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-13 22:52:30
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

    &--mini {
        padding: $space-xs $space-mini;
    }

    &--small {
        padding: $space-mini $space-small;
    }

    &--normal {
        padding: $space-small $space-normal;
    }

    &--big {
        padding: $space-normal $space-big;
    }

    &--large {
        padding: $space-big $space-large;
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
