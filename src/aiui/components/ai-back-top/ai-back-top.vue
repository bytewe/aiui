<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:13:58
 * @Description: 返回顶部
-->

<template>
    <ai-transition mode="fade" :custom-style="backTopStyle" :show="show">
        <view v-if="!$slots.default && !$slots.$default" class="ai-back-top" :style="[contentStyle]" @click="backToTop">
            <ai-icon :name="icon" :custom-style="iconStyle" />
            <text v-if="text" class="ai-back-top__text">{{ text }}</text>
        </view>
        <slot v-else />
    </ai-transition>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif

export default {
    name: 'AiBackTop',
    mixins: [mixins],
    props: {
        // 返回顶部的形状，circle-圆形，square-方形
        mode: {
            type: String,
            default: 'circle',
        },
        // 自定义图标
        icon: {
            type: String,
            default: 'backtop',
        },
        // 提示文字
        text: {
            type: String,
            default: '',
        },
        // 返回顶部滚动时间
        duration: {
            type: [String, Number],
            default: 100,
        },
        // 滚动距离
        scrollTop: {
            type: [String, Number],
            default: 0,
        },
        // 距离顶部多少距离显示，单位px
        top: {
            type: [String, Number],
            default: 400,
        },
        // 返回顶部按钮到底部的距离，单位px
        bottom: {
            type: [String, Number],
            default: 100,
        },
        // 返回顶部按钮到右边的距离，单位px
        right: {
            type: [String, Number],
            default: 20,
        },
        // 层级
        zIndex: {
            type: [String, Number],
            default: 9,
        },
        // 图标的样式，对象形式
        iconStyle: {
            type: Object,
            default: () => ({
                color: '#909399',
                fontSize: '38rpx',
            }),
        },
    },
    computed: {
        backTopStyle() {
            // 动画组件样式
            const style = {
                bottom: uni.$util.addUnit(this.bottom),
                right: uni.$util.addUnit(this.right),
                width: '80rpx',
                height: '80rpx',
                position: 'fixed',
                zIndex: 10,
            };
            return style;
        },
        show() {
            return uni.$util.getPx(this.scrollTop) > uni.$util.getPx(this.top);
        },
        contentStyle() {
            const style = {};
            let radius = 0;
            // 是否圆形
            if (this.mode === 'circle') {
                radius = '200rpx';
            } else {
                radius = '8rpx';
            }
            // 为了兼容安卓nvue，只能这么分开写
            style.borderTopLeftRadius = radius;
            style.borderTopRightRadius = radius;
            style.borderBottomLeftRadius = radius;
            style.borderBottomRightRadius = radius;
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
    methods: {
        backToTop() {
            // #ifdef APP-NVUE
            if (!this.$parent.$refs['ai-back-top']) {
                uni.$util.error(`nvue页面需要给页面最外层元素设置"ref='ai-back-top'`);
            }
            dom.scrollToElement(this.$parent.$refs['ai-back-top'], {
                offset: 0,
            });
            // #endif

            // #ifndef APP-NVUE
            uni.pageScrollTo({
                scrollTop: 0,
                duration: this.duration,
            });
            // #endif
            this.$emit('click');
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-back-top-flex: 1 !default;
$ai-back-top-height: 100% !default;
$ai-back-top-background-color: #e1e1e1 !default;
$ai-back-top-tips-font-size: 24rpx !default;

.ai-back-top {
    display: flex;
    flex-direction: row;
    flex-direction: column;
    align-items: center;
    flex: $ai-back-top-flex;
    height: $ai-back-top-height;
    justify-content: center;
    background-color: $ai-back-top-background-color;

    &__tips {
        font-size: $ai-back-top-tips-font-size;
        transform: scale(0.8);
    }
}
</style>
