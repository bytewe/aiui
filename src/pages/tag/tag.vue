<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-26 20:51:31
 * @Description: 标签
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能">
            <ai-row>
                <ai-tag text="标签" plain size="mini" type="warning" />
            </ai-row>
        </ai-box>

        <ai-box title="自定义主题">
            <ai-row justify="between" custom-style="padding-right:20vw">
                <ai-tag text="标签" />
                <ai-tag text="标签" type="warning" />
                <ai-tag text="标签" type="success" />
                <ai-tag text="标签" type="danger" />
            </ai-row>
        </ai-box>

        <ai-box title="圆形标签">
            <ai-row justify="between" custom-style="padding-right:59vw">
                <ai-tag text="标签" plain shape="circle" />
                <ai-tag text="标签" type="warning" shape="circle" />
            </ai-row>
        </ai-box>

        <ai-box title="镂空标签">
            <ai-row justify="between" custom-style="padding-right:20vw">
                <ai-tag text="标签" plain />
                <ai-tag text="标签" type="warning" plain />
                <ai-tag text="标签" type="success" plain />
                <ai-tag text="标签" type="danger" plain />
            </ai-row>
        </ai-box>

        <ai-box title="镂空带背景色">
            <ai-row justify="between" custom-style="padding-right:20vw">
                <ai-tag text="标签" plain plain-fill />
                <ai-tag text="标签" type="warning" plain plain-fill />
                <ai-tag text="标签" type="success" plain plain-fill />
                <ai-tag text="标签" type="danger" plain plain-fill />
            </ai-row>
        </ai-box>

        <ai-box title="自定义尺寸">
            <ai-row justify="between" custom-style="padding-right:20vw">
                <ai-tag text="标签" plain size="mini" />
                <ai-tag text="标签" type="warning" />
                <ai-tag text="标签" type="success" plain size="large" />
            </ai-row>
        </ai-box>

        <ai-box title="可关闭标签">
            <ai-row justify="between" custom-style="padding-right:20vw">
                <ai-tag text="标签" size="mini" closable :show="close1" @close="close1 = false" />
                <ai-tag text="标签" type="warning" closable :show="close2" @close="close2 = false" />
                <ai-tag text="标签" type="success" plain size="large" closable :show="close3" @close="close3 = false" />
            </ai-row>
        </ai-box>

        <ai-box title="带图片和图标">
            <ai-row justify="between" custom-style="padding-right:20vw">
                <ai-tag text="标签" size="mini" icon="location" plain />
                <ai-tag text="标签" type="warning" icon="location--fill" />
                <ai-tag text="标签" type="success" plain size="large" :icon="`${$config.static}example/tag.png`" />
            </ai-row>
        </ai-box>
        <ai-box title="单选标签">
            <ai-row justify="between" custom-style="padding-right:20vw">
                <ai-tag
                    v-for="(item, index) in radios"
                    :key="index"
                    :text="`选项${index + 1}`"
                    :plain="!item.checked"
                    type="warning"
                    :name="index"
                    @click="radioClick"
                />
            </ai-row>
        </ai-box>
        <ai-box title="多选标签">
            <ai-row justify="between" custom-style="padding-right:20vw">
                <ai-tag
                    v-for="(item, index) in checkboxs"
                    :key="index"
                    :text="`选项${index + 1}`"
                    :plain="!item.checked"
                    type="warning"
                    :name="index"
                    @click="checkboxClick"
                />
            </ai-row>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            close1: true,
            close2: true,
            close3: true,
            radios: [{ checked: true }, { checked: false }, { checked: false }],
            checkboxs: [{ checked: true }, { checked: false }, { checked: false }],
        };
    },
    computed: {
        $config() {
            return uni.$config;
        },
    },
    methods: {
        radioClick(name) {
            this.radios.map((item, index) => {
                item.checked = index === name ? true : false;
            });
        },
        checkboxClick(name) {
            this.checkboxs[name].checked = !this.checkboxs[name].checked;
        },
    },
};
</script>

<style lang="scss" scoped></style>
