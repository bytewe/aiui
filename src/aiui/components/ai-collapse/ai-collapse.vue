<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:14:50
 * @Description: 折叠面板
-->

<template>
    <view class="ai-collapse">
        <ai-line v-if="border" />
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiCollapse',
    mixins: [mixins],
    props: {
        // 当前展开面板的name，非手风琴模式：[<string | number>]，手风琴模式：string | number
        value: {
            type: [String, Number, Array, null],
            default: null,
        },
        // 是否手风琴模式
        accordion: {
            type: Boolean,
            default: false,
        },
        // 是否显示外边框
        border: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        needInit() {
            // 通过computed，同时监听accordion和value值的变化
            // 再通过watch去执行init()方法，进行再一次的初始化
            return [this.accordion, this.value];
        },
    },
    watch: {
        needInit() {
            this.init();
        },
        // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
        parentData() {
            if (this.children.length) {
                this.children.map((child) => {
                    // 判断子组件(ai-checkbox)如果有updateParentData方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
                    typeof child.updateParentData === 'function' && child.updateParentData();
                });
            }
        },
    },
    created() {
        this.children = [];
    },
    methods: {
        // 重新初始化一次内部的所有子元素
        init() {
            this.children.map((child) => {
                child.init();
            });
        },
        /**
         * collapse-item被点击时触发，由collapse统一处理各子组件的状态
         * @param {Object} target 被操作的面板的实例
         */
        onChange(target) {
            let changeArr = [];
            this.children.map((child, index) => {
                // 如果是手风琴模式，将其他的折叠面板收起来
                if (this.accordion) {
                    child.expanded = child === target ? !target.expanded : false;
                    child.setContentAnimate();
                } else {
                    if (child === target) {
                        child.expanded = !child.expanded;
                        child.setContentAnimate();
                    }
                }
                // 拼接change事件中，数组元素的状态
                changeArr.push({
                    // 如果没有定义name属性，则默认返回组件的index索引
                    name: child.name || index,
                    status: child.expanded ? 'open' : 'close',
                });
            });

            this.$emit('change', changeArr);
            this.$emit(target.expanded ? 'open' : 'close', target.name);
        },
    },
};
</script>

<style lang="scss" scoped></style>
