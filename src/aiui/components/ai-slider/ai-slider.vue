<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:47
 * @Description: 滑块
-->

<template>
    <view class="ai-slider" :style="[$util.addStyle(customStyle)]">
        <slider
            :min="min"
            :max="max"
            :step="step"
            :value="value"
            :active-color="activeColor"
            :inactive-color="inactiveColor"
            :block-size="$util.getPx(blockSize)"
            :block-color="blockColor"
            :show-value="showValue"
            :disabled="disabled"
            @changing="changingHandler"
            @change="onChange"
        />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiSlider',
    mixins: [mixins],
    props: {
        // 最小可选值
        min: {
            type: [Number, String],
            default: 0,
        },
        // 最大可选值
        max: {
            type: [Number, String],
            default: 100,
        },
        // 步长，取值必须大于 0，并且可被(max - min)整除
        step: {
            type: [Number, String],
            default: 1,
        },
        // 当前取值
        value: {
            type: [Number, String],
            default: 0,
        },
        // 滑块右侧已选择部分的背景色
        activeColor: {
            type: String,
            default: '#2979ff',
        },
        // 滑块左侧未选择部分的背景色
        inactiveColor: {
            type: String,
            default: '#c0c4cc',
        },
        // 滑块的大小，取值范围为 12 - 28
        blockSize: {
            type: [Number, String],
            default: 18,
        },
        // 滑块的颜色
        blockColor: {
            type: String,
            default: '#ffffff',
        },
        // 禁用状态
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否显示当前的选择值
        showValue: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        // 拖动过程中触发
        changingHandler(e) {
            const { value } = e.detail;
            // 更新v-model的值
            this.$emit('input', value);
            // 触发事件
            this.$emit('changing', value);
        },
        // 滑动结束时触发
        onChange(e) {
            const { value } = e.detail;
            // 更新v-model的值
            this.$emit('input', value);
            // 触发事件
            this.$emit('change', value);
        },
    },
};
</script>

<style lang="scss" scoped></style>
