<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 00:03:27
 * @Description: 下拉菜单
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能">
            <ai-dropdown>
                <ai-dropdown-item title="标题1">
                    <ai-box title="123" />
                </ai-dropdown-item>
                <ai-dropdown-item title="标题2">
                    <ai-box title="456" />
                </ai-dropdown-item>
                <ai-dropdown-item title="标题3">
                    <ai-box title="789" />
                </ai-dropdown-item>
                <ai-dropdown-item title="标题4">
                    <ai-box title="abc" />
                </ai-dropdown-item>
            </ai-dropdown>
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
