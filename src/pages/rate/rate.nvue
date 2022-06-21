<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:41
 * @Description: 评分
-->

<template>
    <ai-page background="white">
        <ai-box title="基本案例" direction="row">
            <ai-rate size="20" />
        </ai-box>

        <ai-box title="自定义选中星星数量" direction="row">
            <ai-rate v-model="value" size="20" @change="change" />
        </ai-box>

        <ai-box title="自定义星星大小" direction="row">
            <ai-rate size="30" count="5" />
        </ai-box>

        <ai-box title="是否禁用评分" direction="row">
            <ai-rate size="20" :disabled="true" />
        </ai-box>

        <ai-box title="自定义选中星星颜色" direction="row">
            <ai-rate v-model="activeColorValue" size="20" active-color="#2979ff" />
        </ai-box>

        <ai-box title="自定义未选中星星颜色" direction="row">
            <ai-rate v-model="value1" size="20" inactive-color="#2979ff" />
        </ai-box>

        <ai-box title="禁止触摸选择" direction="row">
            <ai-rate size="20" :touchable="false" />
        </ai-box>

        <ai-box title="允许触摸选择" direction="row">
            <ai-rate size="20" :touchable="true" />
        </ai-box>

        <ai-box title="是否允许半星" direction="row">
            <ai-rate v-model="HalfValue" size="20" :allow-half="true" @change="change" />
        </ai-box>

        <ai-box title="自定义选中的图标" direction="row">
            <ai-rate v-model="activeIconValue" size="20" inactive-icon="like" active-icon="like--fill" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            //自定义星星的个数
            value: 3,
            value1: 2,
            // 自定义选择星星颜色个数
            activeColorValue: 3,
            // 是否允许半星的个数
            HalfValue: 3.5,
            // 自定义图标星星个数
            activeIconValue: 3,
        };
    },
    methods: {
        change() {
            // console.log('change', e);
        },
    },
};
</script>

<style lang="scss" scoped></style>
