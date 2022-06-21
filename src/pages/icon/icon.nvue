<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 22:03:54
 * @Description: 图标
-->

<template>
    <ai-page background="white">
        <ai-grid custom-class="ai-border" custom-style="margin:12px;" col="2" border>
            <ai-grid-item
                v-for="(item, index) in icons"
                :key="index"
                :icon="index.replace('ai-icon-', '')"
                :text="index.replace('ai-icon-', '')"
            />
        </ai-grid>
    </ai-page>
</template>

<script>
import { icons } from '@/aiui/components/ai-icon/ai-icon.js';
export default {
    data() {
        return {
            icons: icons,
        };
    },
};
</script>

<style lang="scss" scoped></style>
