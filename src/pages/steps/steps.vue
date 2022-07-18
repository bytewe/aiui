<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-14 07:49:04
 * @Description: 步骤条
-->

<template>
    <ai-page background="white">
        <ai-box title="基础演示">
            <ai-steps :current="current1">
                <ai-steps-item title="已下单" desc="10:30" />
                <ai-steps-item title="已出库" desc="10:35" />
                <ai-steps-item title="运输中" desc="11:40" />
            </ai-steps>
        </ai-box>

        <ai-box title="显示点类型">
            <ai-steps :current="1" dot>
                <ai-steps-item title="已下单" desc="10:30" />
                <ai-steps-item title="已出库" desc="10:35" />
                <ai-steps-item title="运输中" desc="11:40" />
            </ai-steps>
        </ai-box>

        <ai-box>
            <ai-steps :current="1" dot direction="column">
                <ai-steps-item title="已下单" desc="10:30" />
                <ai-steps-item title="已出库" desc="10:35" />
                <ai-steps-item title="运输中" desc="11:40" />
            </ai-steps>
        </ai-box>

        <ai-box title="错误状态">
            <ai-steps :current="1">
                <ai-steps-item title="已下单" desc="10:30" />
                <ai-steps-item error title="仓库着火" desc="10:35" />
                <ai-steps-item title="破产清算" desc="11:40" />
            </ai-steps>
        </ai-box>

        <ai-box title="自定义图标">
            <ai-steps :current="1" active-icon="check" inactive-icon="arrow">
                <ai-steps-item title="已下单" desc="10:30" />
                <ai-steps-item title="已出库" desc="10:35" />
                <ai-steps-item title="运输中" desc="11:40" />
            </ai-steps>
        </ai-box>

        <ai-box title="自定义插槽">
            <ai-steps :current="1">
                <ai-steps-item title="已下单" desc="10:30" />
                <ai-steps-item title="已出库" desc="10:35" />
                <ai-steps-item title="运输中" desc="11:40">
                    <ai-button slot="icon" type="warning" shape="circle" size="none" text="运" custom-style="width: 21px; height: 21px" />
                </ai-steps-item>
            </ai-steps>
        </ai-box>

        <ai-box title="自定义颜色">
            <ai-steps :current="1" active-color="#3c9cff">
                <ai-steps-item title="已下单" desc="10:30" />
                <ai-steps-item title="已出库" desc="10:35" />
                <ai-steps-item title="运输中" desc="11:40" />
            </ai-steps>
        </ai-box>

        <ai-box title="竖向展示">
            <ai-steps :current="1" direction="column">
                <ai-steps-item title="已下单" desc="10:30" />
                <ai-steps-item title="已出库" desc="10:35" />
                <ai-steps-item title="运输中" desc="11:40" />
            </ai-steps>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            current1: 1,
        };
    },
    onLoad() {},
};
</script>

<style lang="scss" scoped></style>
