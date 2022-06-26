<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-26 18:13:01
 * @Description: 单元格
-->

<template>
    <ai-page>
        <ai-cell-group title="基础功能">
            <ai-cell title="AIUI" value="内容" arrow />
            <ai-cell title="利剑出鞘,一统江湖" value="内容" description="挣脱束缚,向往自由" :border="false" />
        </ai-cell-group>

        <ai-cell-group title="自定义图标/图片">
            <ai-cell title="单元格" icon="setting" />
            <ai-cell title="单元格" :icon="`${$config.static}example/tag.png`" :border="false" />
        </ai-cell-group>

        <ai-cell-group title="自定义大小">
            <ai-cell size="small" title="小单元格" value="内容" arrow />
            <ai-cell size="small" title="单元格" value="内容" description="描述信息" :border="false" />
        </ai-cell-group>

        <ai-cell-group title="显示右箭头">
            <ai-cell title="单元格" value="组件" arrow hover />
            <ai-cell title="单元格" value="工具" arrow-icon="arrow-up" arrow hover />
            <ai-cell title="单元格" value="模板" arrow-icon="arrow-down" arrow :border="false" />
        </ai-cell-group>

        <ai-cell-group title="跳转页面">
            <ai-cell title="打开标签页" url="/pages/tag/tag" arrow hover />
            <ai-cell title="打开徽标页" url="/pages/badge/badge" arrow hover :border="false" />
        </ai-cell-group>

        <ai-cell-group title="右侧内容垂直居中">
            <ai-cell title="单元格" value="内容" description="描述信息" :center="true" :border="false" />
        </ai-cell-group>

        <ai-cell-group title="自定义插槽">
            <ai-cell value="内容">
                <ai-row>
                    <ai-text text="单元格" custom-style="margin-right: 12rpx;" />
                    <ai-tag text="标签" plain size="mini" type="warning" />
                </ai-row>
            </ai-cell>
            <ai-cell title="单元格" :border="false">
                <ai-badge slot="value" :value="99" />
            </ai-cell>
        </ai-cell-group>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        $config() {
            return uni.$config;
        },
    },
    methods: {
        click() {
            console.log('Cell is clicked.');
        },
    },
};
</script>

<style lang="scss" scoped></style>
