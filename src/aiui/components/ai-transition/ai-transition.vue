<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-15 20:46:43
 * @Description: 动画
-->

<template>
    <view
        v-if="inited"
        ref="ai-transition"
        class="ai-transition"
        :class="classes"
        :style="[mergeStyle]"
        @click="onClick"
        @touchmove="preventEvent"
    >
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// 组件的methods方法，由于内容较长，写在外部文件中通过mixin引入
import transition from './transition.js';

export default {
    name: 'AiTransition',
    mixins: [mixins, transition],
    props: {
        // 是否展示组件
        show: {
            type: Boolean,
            default: false,
        },
        // 使用的动画模式
        mode: {
            type: String,
            default: 'fade',
        },
        // 动画的执行时间，单位ms
        duration: {
            type: [String, Number],
            default: '300',
        },
        // 使用的动画过渡函数
        timingFunction: {
            type: String,
            default: 'ease-out',
        },
    },
    data() {
        return {
            inited: false, // 是否显示/隐藏组件
            viewStyle: {}, // 组件内部的样式
            status: '', // 记录组件动画的状态
            transitionEnded: false, // 组件是否结束的标记
            display: false, // 组件是否展示
            classes: '', // 应用的类名
        };
    },
    computed: {
        mergeStyle() {
            const { viewStyle, customStyle } = this;
            return {
                // #ifndef APP-NVUE
                transitionDuration: `${this.duration}ms`,
                // display: `${this.display ? '' : 'none'}`,
                transitionTimingFunction: this.timingFunction,
                // #endif
                // 避免自定义样式影响到动画属性，所以写在viewStyle前面
                ...uni.$util.addStyle(customStyle),
                ...viewStyle,
            };
        },
    },
    watch: {
        show: {
            handler(newVal) {
                // vue和nvue分别执行不同的方法
                // #ifdef APP-NVUE
                newVal ? this.nvueEnter() : this.nvueLeave();
                // #endif
                // #ifndef APP-NVUE
                newVal ? this.vueEnter() : this.vueLeave();
                // #endif
            },
            // 表示同时监听初始化时的props的show的意思
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped>
/* #ifndef APP-NVUE */
// vue版本动画相关的样式抽离在外部文件
@import './vue.ani-style.scss';
/* #endif */
</style>
