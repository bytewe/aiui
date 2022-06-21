<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:30:16
 * @Description: 折叠面板
-->

<template>
    <ai-page>
        <ai-cell-group title="基础功能" :border="false">
            <ai-collapse @change="change" @close="close" @open="open">
                <ai-collapse-item title="文档指南" name="Docs guide">
                    <ai-text
                        size="small"
                        color="gray"
                        text="涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川"
                    />
                </ai-collapse-item>
                <ai-collapse-item title="组件全面" name="Variety components">
                    <ai-text
                        size="small"
                        color="gray"
                        text="众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用"
                    />
                </ai-collapse-item>
                <ai-collapse-item title="众多利器" name="Numerous tools">
                    <ai-text
                        size="small"
                        color="gray"
                        text="众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨"
                    />
                </ai-collapse-item>
            </ai-collapse>
        </ai-cell-group>

        <ai-cell-group title="展开和禁用" :border="false">
            <ai-collapse :value="['2']">
                <ai-collapse-item title="文档指南">
                    <ai-text
                        size="small"
                        color="gray"
                        text="涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川"
                    />
                </ai-collapse-item>
                <ai-collapse-item disabled title="禁用展开">
                    <ai-text
                        size="small"
                        color="gray"
                        text="众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用"
                    />
                </ai-collapse-item>
                <ai-collapse-item name="2" title="众多利器">
                    <ai-text
                        size="small"
                        color="gray"
                        text="众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨"
                    />
                </ai-collapse-item>
            </ai-collapse>
        </ai-cell-group>

        <ai-cell-group title="手风琴模式" :border="false">
            <ai-collapse accordion>
                <ai-collapse-item title="文档指南">
                    <ai-text
                        size="small"
                        color="gray"
                        text="涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川"
                    />
                </ai-collapse-item>
                <ai-collapse-item title="组件全面">
                    <ai-text
                        size="small"
                        color="gray"
                        text="众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用"
                    />
                </ai-collapse-item>
                <ai-collapse-item title="众多利器">
                    <ai-text
                        size="small"
                        color="gray"
                        text="众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨"
                    />
                </ai-collapse-item>
            </ai-collapse>
        </ai-cell-group>

        <ai-cell-group title="移除下划线" :border="false">
            <ai-collapse accordion :border="false">
                <ai-collapse-item title="文档指南">
                    <ai-text
                        size="small"
                        color="gray"
                        text="涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川"
                    />
                </ai-collapse-item>
                <ai-collapse-item title="组件全面">
                    <ai-text
                        size="small"
                        color="gray"
                        text="众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用"
                    />
                </ai-collapse-item>
                <ai-collapse-item title="众多利器">
                    <ai-text
                        size="small"
                        color="gray"
                        text="众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨"
                    />
                </ai-collapse-item>
            </ai-collapse>
        </ai-cell-group>

        <!-- #ifndef MP-WEIXIN -->
        <ai-cell-group title="自定义标题和内容" :border="false">
            <ai-collapse accordion>
                <ai-collapse-item>
                    <ai-text slot="title" text="文档指南" color="primary" />
                    <ai-text
                        size="small"
                        color="gray"
                        text="涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川"
                    />
                </ai-collapse-item>
                <ai-collapse-item title="组件全面">
                    <ai-icon slot="icon" name="label--fill" size="20" />
                    <ai-text
                        size="small"
                        color="gray"
                        text="众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用"
                    />
                </ai-collapse-item>
                <ai-collapse-item title="众多利器">
                    <ai-text slot="value" text="自定义内容" color="primary" />
                    <ai-text
                        size="small"
                        color="gray"
                        text="众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨"
                    />
                </ai-collapse-item>
            </ai-collapse>
        </ai-cell-group>
        <!-- #endif -->
    </ai-page>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        open() {
            // console.log('open', e)
        },
        close() {
            // console.log('close', e)
        },
        change() {
            // console.log('change', e)
        },
    },
};
</script>

<style lang="scss" scoped></style>
