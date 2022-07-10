<!--
 * @Author: airobot
 * @Date: 2022-07-10 21:50:38
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-10 21:54:05
 * @Description: 内容
-->

<template>
    <view class="ai-content" :style="[$util.addStyle(customStyle)]">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiContent',
    mixins: [mixins],
};
</script>

<style lang="scss">
.ai-content {
    flex: 1;
    width: 0;
    margin-left: $space-small;
}
</style>
