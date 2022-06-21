<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:15:07
 * @Description: 分割线
-->

<template>
    <view class="ai-divider" :style="[$util.addStyle(customStyle)]" @click="click">
        <ai-line :color="lineColor" :custom-style="leftLineStyle" :hairline="hairline" :dashed="dashed" />
        <text v-if="dot" class="ai-divider__dot">●</text>
        <text v-else-if="text" class="ai-divider__text" :style="[textStyle]">{{ text }}</text>
        <ai-line :color="lineColor" :custom-style="rightLineStyle" :hairline="hairline" :dashed="dashed" />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiDivider',
    mixins: [mixins],
    props: {
        // 是否虚线
        dashed: {
            type: Boolean,
            default: false,
        },
        // 是否细线
        hairline: {
            type: Boolean,
            default: true,
        },
        // 是否以点替代文字，优先于text字段起作用
        dot: {
            type: Boolean,
            default: false,
        },
        // 内容文本的位置，left-左边，center-中间，right-右边
        textPosition: {
            type: String,
            default: 'center',
        },
        // 文本内容
        text: {
            type: [String, Number],
            default: '',
        },
        // 文本大小
        textSize: {
            type: [String, Number],
            default: 14,
        },
        // 文本颜色
        textColor: {
            type: String,
            default: '#909399',
        },
        // 线条颜色
        lineColor: {
            type: String,
            default: '#dcdfe6',
        },
    },
    computed: {
        textStyle() {
            const style = {};
            style.fontSize = uni.$util.addUnit(this.textSize);
            style.color = this.textColor;
            return style;
        },
        // 左边线条的的样式
        leftLineStyle() {
            const style = {};
            // 如果是在左边，设置左边的宽度为固定值
            if (this.textPosition === 'left') {
                style.width = '80rpx';
            } else {
                style.flex = 1;
            }
            return style;
        },
        // 右边线条的的样式
        rightLineStyle() {
            const style = {};
            // 如果是在右边，设置右边的宽度为固定值
            if (this.textPosition === 'right') {
                style.width = '80rpx';
            } else {
                style.flex = 1;
            }
            return style;
        },
    },
    methods: {
        // divider组件被点击时触发
        click() {
            this.$emit('click');
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-divider-margin: 30rpx 0 !default;
$ai-divider-text-margin: 0 30rpx !default;
$ai-divider-dot-font-size: 24rpx !default;
$ai-divider-dot-margin: 0 24rpx !default;
$ai-divider-dot-color: #c0c4cc !default;

.ai-divider {
    display: flex;
    flex-direction: row;
    flex-direction: row;
    align-items: center;
    margin: $ai-divider-margin;

    &__text {
        margin: $ai-divider-text-margin;
    }

    &__dot {
        font-size: $ai-divider-dot-font-size;
        margin: $ai-divider-dot-margin;
        color: $ai-divider-dot-color;
    }
}
</style>
