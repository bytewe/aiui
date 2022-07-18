<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-14 10:21:46
 * @Description: 文本
-->

<template>
    <text :class="['ai-text', line && `ai-line-${line}`, customClass]" :style="[_style]" @click="onClick"
        ><slot>{{ text }}</slot></text
    >
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiText',
    mixins: [mixins],
    props: {
        // 显示的值
        text: {
            type: [String, Number],
            default: '',
        },
        // 文本显示的行数，如果设置，超出此行数，将会显示省略号
        line: {
            type: [String, Number],
            default: '',
        },
        // 是否粗体
        bold: {
            type: Boolean,
            default: false,
        },
        // 文本颜色
        color: {
            type: String,
            default: '',
        },
        // 背景
        background: {
            type: String,
            default: '',
        },
        // 字体大小
        size: {
            type: [String, Number],
            default: '',
        },
        // 文字装饰，下划线，中划线等，可选值 none|underline|line-through
        decoration: {
            type: String,
            default: '',
        },
        // 文本行高
        lineHeight: {
            type: [String, Number],
            default: '',
        },
        // 外边距
        margin: {
            type: String,
            default: '',
        },
        // 文本对齐方式，可选值left|center|right
        align: {
            type: String,
            default: '',
        },
        // 文字换行，可选值break-word|normal|anywhere
        wrap: {
            type: String,
            default: '',
        },
    },
    computed: {
        // 样式
        _style() {
            const style = {
                margin: this.margin,
                fontWeight: this.bold ? 'bold' : '',
                fontSize: this.size,
                lineHeight: this.lineHeight || uni.$config[`line-height-${this.size}`] || '',
                color: this.color,
                background: this.background,
                textDecoration: this.decoration,
                textAlign: this.align,
                line: this.line,
                wordWrap: this.wrap,
            };
            return uni.$util.getStyle(style, this.customStyle);
        },
    },
    methods: {
        // 点击
        onClick() {
            this.$emit('click');
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-text-font-size: $font-size-normal;
$ai-text-line-heigth: $line-height-normal;
$ai-text-color: $color-default;

.ai-text {
    font-size: $ai-text-font-size;
    line-height: $ai-text-line-heigth;
    color: $ai-text-color;
}
</style>
