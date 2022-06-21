<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 19:25:51
 * @Description: 宫格布局
-->

<template>
    <view ref="ai-grid" :class="[$util.bem('ai-grid'), customClass]" :style="[gridStyle]">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiGrid',
    mixins: [mixins],
    props: {
        // 分成几列
        col: {
            type: [String, Number],
            default: 3,
        },
        // 是否显示边框
        border: {
            type: Boolean,
            default: false,
        },
        // 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右
        align: {
            type: String,
            default: 'left',
        },
        alignItems: {
            type: String,
            default: 'left',
        },
    },
    data() {
        return {
            index: 0,
            width: 0,
        };
    },
    computed: {
        // 计算父组件的值是否发生变化
        parentData() {
            return [this.hoverClass, this.col, this.size, this.border];
        },
        // 宫格对齐方式
        gridStyle() {
            let style = {};
            switch (this.align) {
                case 'left':
                    style.justifyContent = 'flex-start';
                    break;
                case 'center':
                    style.justifyContent = 'center';
                    break;
                case 'right':
                    style.justifyContent = 'flex-end';
                    break;
            }
            switch (this.alignItems) {
                case 'top':
                    style.alignItems = 'flex-start';
                    break;
                case 'middle':
                    style.alignItems = 'center';
                    break;
                case 'bottom':
                    style.alignItems = 'flex-end';
                    break;
            }
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
    watch: {
        // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
        parentData() {
            if (this.children.length) {
                this.children.map((child) => {
                    // 判断子组件(ai-radio)如果有updateParentData方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
                    typeof child.updateParentData == 'function' && child.updateParentData();
                });
            }
        },
    },
    created() {
        // 如果将children定义在data中，在微信小程序会造成循环引用而报错
        this.children = [];
    },
    methods: {
        // 此方法由ai-grid-item触发，用于在ai-grid发出事件
        childClick(name) {
            this.$emit('click', name);
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-grid-width: 100% !default;

.ai-grid {
    /* #ifdef MP */
    width: $ai-grid-width;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    display: block;
    /* #endif */
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}
</style>
