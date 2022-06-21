<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:30:13
 * @Description: 验证码输入
-->

<template>
    <ai-page background="white">
        <ai-box title="基础使用">
            <ai-code-input v-model="value1" :maxlength="4" @change="change" @finish="finish" />
        </ai-box>

        <ai-box title="横线模式">
            <ai-code-input v-model="value2" mode="line" :maxlength="4" :bold="true" />
        </ai-box>

        <ai-box title="设置长度">
            <ai-code-input v-model="value3" :maxlength="6" />
        </ai-box>

        <ai-box title="设置间距">
            <ai-code-input v-model="value4" mode="box" :space="0" :maxlength="4" />
        </ai-box>

        <ai-box title="细边框">
            <ai-code-input v-model="value5" mode="box" :space="0" :maxlength="4" hairline />
        </ai-box>

        <ai-box>
            <ai-code-input v-model="value6" mode="line" :space="10" :maxlength="4" hairline />
        </ai-box>

        <ai-box title="调整颜色">
            <ai-code-input
                v-model="value7"
                mode="box"
                :space="0"
                :maxlength="4"
                hairline
                color="#f56c6c"
                border-color="#f56c6c"
            />
        </ai-box>

        <ai-box>
            <ai-code-input
                v-model="value10"
                mode="line"
                size="30"
                :maxlength="4"
                hairline
                color="#3c9cff"
                border-color="#3c9cff"
            />
        </ai-box>

        <ai-box title="点模式">
            <ai-code-input v-model="value8" mode="box" dot :space="0" :maxlength="4" hairline />
        </ai-box>

        <ai-box title="预置内容">
            <ai-code-input v-model="value9" mode="box" :space="0" :maxlength="4" hairline font-size="17" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
            value7: '',
            value8: '',
            value9: '123',
            value10: '34',
        };
    },
    methods: {
        change(e) {
            console.log('change', e);
        },
        finish(e) {
            console.log('finish', e);
        },
    },
};
</script>

<style lang="scss" scoped></style>
