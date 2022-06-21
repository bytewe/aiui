<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:26:44
 * @Description: 工具条
-->

<template>
    <view v-if="show" class="ai-toolbar" @touchmove.stop.prevent="preventEvent">
        <view class="ai-toolbar__cancel__wrapper" hover-class="ai-hover-class">
            <text
                class="ai-toolbar__wrapper__cancel"
                :style="{
                    color: cancelColor,
                }"
                @click="cancel"
                >{{ cancelText }}</text
            >
        </view>
        <text v-if="title" class="ai-toolbar__title ai-line-1">{{ title }}</text>
        <view class="ai-toolbar__confirm__wrapper" hover-class="ai-hover-class">
            <text
                class="ai-toolbar__wrapper__confirm"
                :style="{
                    color: confirmColor,
                }"
                @click="confirm"
                >{{ confirmText }}</text
            >
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiToolbar',
    mixins: [mixins],
    props: {
        // 是否展示工具条
        show: {
            type: Boolean,
            default: true,
        },
        // 取消按钮的文字
        cancelText: {
            type: String,
            default: '取消',
        },
        // 确认按钮的文字
        confirmText: {
            type: String,
            default: '确认',
        },
        // 取消按钮的颜色
        cancelColor: {
            type: String,
            default: '#909193',
        },
        // 确认按钮的颜色
        confirmColor: {
            type: String,
            default: '#3c9cff',
        },
        // 标题文字
        title: {
            type: String,
            default: '',
        },
    },
    methods: {
        // 点击取消按钮
        cancel() {
            this.$emit('cancel');
        },
        // 点击确定按钮
        confirm() {
            this.$emit('confirm');
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-toolbar {
    height: 84rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &__wrapper {
        &__cancel {
            color: $color-gray;
            font-size: 30rpx;
            padding: 0 30rpx;
        }
    }

    &__title {
        color: $color-default;
        padding: 0 60rpx;
        font-size: 32rpx;
        flex: 1;
        text-align: center;
    }

    &__wrapper {
        &__confirm {
            color: $color-primary;
            font-size: 30rpx;
            padding: 0 30rpx;
        }
    }
}
</style>
