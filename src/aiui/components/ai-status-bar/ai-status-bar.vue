<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:50
 * @Description: 状态栏
-->

<template>
    <view :style="[style]" class="ai-status-bar">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiStatusBar',
    mixins: [mixins],
    props: {
        background: {
            type: String,
            default: 'transparent',
        },
    },
    data() {
        return {};
    },
    computed: {
        style() {
            const style = {};
            // 状态栏高度，由于某些安卓和微信开发工具无法识别css的顶部状态栏变量，所以使用js获取的方式
            style.height = uni.$util.addUnit(uni.$util.sys().statusBarHeight, 'px');
            style.backgroundColor = this.background;
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-status-bar {
    // nvue会默认100%，如果nvue下，显式写100%的话，会导致宽度不为100%而异常
    /* #ifndef APP-NVUE */
    width: 100%;
    /* #endif */
}
</style>
