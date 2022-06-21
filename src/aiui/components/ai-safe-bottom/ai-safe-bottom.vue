<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:36
 * @Description: 底部安全区
-->

<template>
    <view class="ai-safe-bottom" :style="[style]" :class="[!isNvue && 'ai-safe-area-inset-bottom']" />
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
export default {
    name: 'AiSafeBottom',
    mixins: [mixins],
    data() {
        return {
            safeAreaBottomHeight: 0,
            isNvue: false,
        };
    },
    computed: {
        style() {
            const style = {};
            // #ifdef APP-NVUE
            // nvue下，高度使用js计算填充
            style.height = uni.$util.addUnit(uni.$util.sys().safeAreaInsets.bottom, 'px');
            // #endif
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
    mounted() {
        // #ifdef APP-NVUE
        // 标识为是否nvue
        this.isNvue = true;
        // #endif
    },
};
</script>

<style lang="scss" scoped>
.ai-safe-bottom {
    /* #ifndef APP-NVUE */
    width: 100%;
    /* #endif */
}
</style>
