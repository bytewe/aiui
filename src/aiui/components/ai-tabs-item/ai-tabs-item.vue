<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:26:27
 * @Description: 标签项
-->

<template>
    <swiper-item>
        <slot />
    </swiper-item>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
export default {
    name: 'AiTabsItem',
    mixins: [mixins],
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped></style>
