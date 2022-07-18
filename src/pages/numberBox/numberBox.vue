<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-14 10:21:02
 * @Description: 步进器
-->

<template>
    <ai-page>
        <ai-cell-group>
            <ai-cell title="基础用法">
                <ai-number-box slot="value" v-model="value1" step="1" @change="change" />
            </ai-cell>

            <ai-cell title="步长设置">
                <ai-number-box slot="value" v-model="value2" :step="step1" @change="change" />
            </ai-cell>

            <ai-cell title="限制输入范围">
                <ai-number-box slot="value" v-model="value3" step="1" :min="min1" :max="max1" @change="change" />
            </ai-cell>

            <ai-cell title="限制输入整数">
                <ai-number-box slot="value" v-model="value4" step="1" integer @change="change" />
            </ai-cell>

            <ai-cell title="禁用状态">
                <ai-number-box slot="value" v-model="value5" step="1" :disabled="true" @change="change" />
            </ai-cell>

            <ai-cell title="禁用输入框">
                <ai-number-box slot="value" v-model="value6" step="1" :disabled-input="true" @change="change" />
            </ai-cell>

            <ai-cell title="禁用长按">
                <ai-number-box slot="value" v-model="value7" step="1" :long-press="false" @change="change" />
            </ai-cell>

            <ai-cell title="固定小数位数">
                <ai-number-box slot="value" v-model="value8" step="0.2" decimal-length="1" @change="change" />
            </ai-cell>

            <ai-cell title="异步变更">
                <ai-number-box
                    slot="value"
                    v-model="value9"
                    step="1"
                    :async-change="asyncChange"
                    @change="myAsyncChange"
                />
            </ai-cell>

            <ai-cell title="自定义大小颜色样式">
                <ai-number-box
                    slot="value"
                    v-model="value10"
                    step="1"
                    :color="color"
                    :button-size="buttonSize"
                    :background="background"
                    icon-style="color: #fff"
                    @change="change"
                />
            </ai-cell>

            <ai-cell title="自定义(为0时减少按钮会消失)" :border="false">
                <ai-number-box slot="value" v-model="value11" step="1" :min="0" :show-minus="value11 > 0">
                    <ai-button
                        slot="minus"
                        icon="minus"
                        type="danger"
                        size="none"
                        shape="circle"
                        custom-style="width: 22px; height: 22px;"
                        plain
                    />
                    <ai-text slot="input" :text="value11" align="center" custom-style="width: 50px;" />
                    <ai-button
                        slot="plus"
                        icon="plus"
                        type="danger"
                        size="none"
                        shape="circle"
                        custom-style="width: 22px; height: 22px;"
                    />
                </ai-number-box>
            </ai-cell>
        </ai-cell-group>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            value1: 3,
            value2: 3,
            value3: 3,
            value4: 3,
            value5: 3,
            value6: 3,
            value7: 3,
            value8: 3.1,
            value9: 3,
            value10: 3,
            value11: 3,
            step1: 2,
            min1: 5,
            max1: 8,
            asyncChange: true,
            color: '#FFFFFF',
            buttonSize: 36,
            background: '#2979ff',
        };
    },
    methods: {
        change(e) {
            console.log('change', e);
        },
        myAsyncChange(e) {
            this.asyncChange = false;
            uni.showLoading({
                title: '正在加载',
            });
            setTimeout(() => {
                uni.hideLoading();
                this.value9 = e.value;
                this.asyncChange = true;
            }, 3000);
        },
    },
};
</script>

<style lang="scss" scoped></style>
