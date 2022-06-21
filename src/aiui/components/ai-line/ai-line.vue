<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:15:56
 * @Description: 线条
-->

<template>
    <view class="ai-line" :style="[lineStyle]" />
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiLine',
    mixins: [mixins],
    props: {
        color: {
            type: String,
            default: '#e5e5e5',
        },
        // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
        length: {
            type: [String, Number],
            default: '100%',
        },
        // 线条方向，col-竖向，row-横向
        direction: {
            type: String,
            default: 'row',
        },
        // 是否显示细边框
        hairline: {
            type: Boolean,
            default: true,
        },
        // 线条与上下左右元素的间距，字符串形式，如"60rpx"、"40rpx 60rpx"
        margin: {
            type: [String, Number],
            default: 0,
        },
        // 是否虚线，true-实线，false-虚线
        dashed: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        lineStyle() {
            const style = {};
            style.margin = this.margin;
            // 如果是水平线条，边框高度为1px，再通过transform缩小一半，就是0.5px了
            if (this.direction === 'row') {
                // 此处采用兼容分开写，兼容nvue的写法
                style.borderBottomWidth = '1px';
                style.borderBottomStyle = this.dashed ? 'dashed' : 'solid';
                style.width = uni.$util.addUnit(this.length);
                if (this.hairline) style.transform = 'scaleY(0.5)';
            } else {
                // 如果是竖向线条，边框宽度为1px，再通过transform缩小一半，就是0.5px了
                style.borderLeftWidth = '1px';
                style.borderLeftStyle = this.dashed ? 'dashed' : 'solid';
                style.height = uni.$util.addUnit(this.length);
                if (this.hairline) style.transform = 'scaleX(0.5)';
            }
            style.borderColor = this.color;
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-line {
    /* #ifndef APP-NVUE */
    vertical-align: middle;
    /* #endif */
}
</style>
