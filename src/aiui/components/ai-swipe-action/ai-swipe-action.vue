<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:26:06
 * @Description: 滑动单元格
-->

<template>
    <view class="ai-swipe-action">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiSwipeAction',
    mixins: [mixins],
    provide() {
        return {
            swipeAction: this,
        };
    },
    props: {
        // 是否自动关闭其他swipe按钮组
        autoClose: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        // 这里computed的变量，都是子组件ai-swipe-action-item需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
        // 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(ai-swipe-action-item)
        // 拉取父组件新的变化后的参数
        parentData() {
            return [this.autoClose];
        },
    },
    watch: {
        // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
        parentData() {
            if (this.children.length) {
                this.children.map((child) => {
                    // 判断子组件(ai-swipe-action-item)如果有updateParentData方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
                    typeof child.updateParentData === 'function' && child.updateParentData();
                });
            }
        },
    },
    created() {
        this.children = [];
    },
    methods: {
        closeOther(child) {
            if (this.autoClose) {
                // 历遍所有的单元格，找出非当前操作中的单元格，进行关闭
                this.children.map((item) => {
                    if (child !== item) {
                        item.onClose();
                    }
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
