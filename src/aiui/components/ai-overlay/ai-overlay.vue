<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-15 19:15:57
 * @Description: 遮罩
-->

<template>
    <ai-transition
        :show="show"
        custom-class="ai-overlay"
        :duration="duration"
        :custom-style="overlayStyle"
        @click="onClick"
    >
        <slot />
    </ai-transition>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiOverlay',
    mixins: [mixins],
    props: {
        // 是否显示遮罩
        show: {
            type: Boolean,
            default: false,
        },
        // 层级z-index
        zIndex: {
            type: [String, Number],
            default: 10070,
        },
        // 遮罩的过渡时间，单位为ms
        duration: {
            type: [String, Number],
            default: 300,
        },
        // 不透明度值，当做rgba的第四个参数
        opacity: {
            type: [String, Number],
            default: 0.5,
        },
    },
    computed: {
        overlayStyle() {
            const style = {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: this.zIndex,
                bottom: 0,
                'background-color': `rgba(0, 0, 0, ${this.opacity})`,
            };
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
    methods: {
        onClick() {
            this.$emit('click');
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-overlay-top: 0 !default;
$ai-overlay-left: 0 !default;
$ai-overlay-width: 100% !default;
$ai-overlay-height: 100% !default;
$ai-overlay-background-color: rgba(0, 0, 0, 0.7) !default;

.ai-overlay {
    position: fixed;
    top: $ai-overlay-top;
    left: $ai-overlay-left;
    width: $ai-overlay-width;
    height: $ai-overlay-height;
    background-color: $ai-overlay-background-color;
}
</style>
