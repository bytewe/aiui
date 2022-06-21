<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:14
 * @Description: 选择器列
-->

<template>
    <picker-view-column>
        <view class="ai-picker-column" />
    </picker-view-column>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
export default {
    name: 'AiPickerColumn',
    mixins: [mixins],
};
</script>

<style lang="scss" scoped></style>
