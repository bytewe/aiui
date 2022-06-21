<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:44:12
 * @Description: 间隔槽
-->

<template>
    <view class="ai-gap" :style="[myStyle, $util.addStyle(customStyle)]" />
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiGap',
    mixins: [mixins],
    props: {
        // 大小
        size: {
            type: [String, Number],
            default: '12rpx',
        },
        // 背景
        background: {
            type: String,
            default: 'transparent',
        },
    },
    computed: {
        myStyle() {
            const style = {};
            const background = uni.$config[`background-${this.background}`] || this.background;
            if (background) {
                style.background = background;
            }
            const size = uni.$config[`space-${this.size}`] || this.size;
            if (size === 'auto') {
                style.flex = '1';
            } else if (size) {
                style.height = uni.$util.addUnit(size);
            }
            return style;
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-gap-height: 16rpx;
$ai-gap-background: transparent;

.ai-gap {
    height: $ai-gap-height;
    background: $ai-gap-background;
}
</style>
