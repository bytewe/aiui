<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-14 22:36:41
 * @Description: 徽标数
-->

<template>
    <ai-page background="white">
        <ai-box title="直角边形状" direction="row">
            <ai-row>
                <ai-badge :value="1500" shape="horn" />
            </ai-row>
        </ai-box>

        <ai-box title="徽标数显示方式" direction="row">
            <ai-row justify="between" custom-style="padding-right:20vw">
                <ai-badge :value="5132" number-type="ellipsis" />
                <ai-badge :value="1011" number-type="overflow" />
                <ai-badge :value="1500" number-type="limit" />
                <ai-badge :value="45187" number-type="limit" />
            </ai-row>
        </ai-box>

        <ai-box title="显示圆点" direction="row">
            <ai-badge :value="1011" number-type="overflow" is-dot />
        </ai-box>

        <ai-box title="自定义主题" direction="row">
            <ai-row justify="between" custom-style="padding-right:20vw">
                <ai-badge :value="9" type="primary" />
                <ai-badge :value="9" type="success" />
                <ai-badge :value="9" type="warning" />
                <ai-badge :value="9" type="danger" />
                <ai-badge :value="9" type="info" />
            </ai-row>
        </ai-box>

        <ai-box title="反转色" direction="row">
            <ai-row justify="between" custom-style="padding-right:20vw">
                <ai-badge :value="9" type="primary" inverted />
                <ai-badge :value="9" type="success" inverted />
                <ai-badge :value="9" type="warning" inverted />
                <ai-badge :value="9" type="danger" inverted />
                <ai-badge :value="9" type="info" inverted />
            </ai-row>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped></style>
