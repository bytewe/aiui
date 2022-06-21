<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-14 22:39:57
 * @Description: 栅格系统中的行
-->

<template>
    <view ref="ai-row" :class="['ai-row', customClass]" :style="[rowStyle]" @click="onClick">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif

export default {
    name: 'AiRow',
    mixins: [mixins],
    props: {
        // 给col添加间距，左右边距各占一半
        gutter: {
            type: [String, Number],
            default: 0,
        },
        // 水平排列方式，可选值为start、end、center、around、between
        justify: {
            type: String,
            default: 'start',
        },
        // 垂直对齐方式，可选值为top、center、bottom
        align: {
            type: String,
            default: 'center',
        },
    },
    data() {
        return {};
    },
    computed: {
        uJustify() {
            if (this.justify == 'end' || this.justify == 'start') return 'flex-' + this.justify;
            else if (this.justify == 'around' || this.justify == 'between') return 'space-' + this.justify;
            else return this.justify;
        },
        uAlignItem() {
            if (this.align == 'top') return 'flex-start';
            if (this.align == 'bottom') return 'flex-end';
            else return this.align;
        },
        rowStyle() {
            const style = {
                alignItems: this.uAlignItem,
                justifyContent: this.uJustify,
            };
            // 通过给ai-row左右两边的负外边距，消除ai-col在有gutter时，第一个和最后一个元素的左内边距和右内边距造成的影响
            if (this.gutter) {
                const gutter = uni.$util.deleteUnit(uni.$config[`space-${this.gutter}`] || this.gutter);
                style.marginLeft = uni.$util.addUnit(-gutter / 2);
                style.marginRight = uni.$util.addUnit(-gutter / 2);
            }
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
    methods: {
        onClick() {
            this.$emit('click');
        },
        async getComponentWidth() {
            // 延时一定时间，以确保节点渲染完成
            await uni.$util.sleep();
            return new Promise((resolve) => {
                // ai封装的获取节点的方法，详见文档
                // #ifndef APP-NVUE
                this.getRect('.ai-row').then((res) => {
                    resolve(res.width);
                });
                // #endif
                // #ifdef APP-NVUE
                // nvue的dom模块用于获取节点
                dom.getComponentRect(this.$refs['ai-row'], (res) => {
                    resolve(res.size.width);
                });
                // #endif
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-row {
    display: flex;
    flex-direction: row;
    flex: 1;
}
</style>
