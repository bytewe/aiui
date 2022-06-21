<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:46:34
 * @Description: 模态框
-->

<template>
    <ai-popup
        mode="center"
        :zoom="zoom"
        :show="show"
        :custom-style="{
            borderRadius: '12rpx',
            overflow: 'hidden',
            marginTop: `-${$util.addUnit(negativeTop)}`,
        }"
        :close-on-click-overlay="closeOnClickOverlay"
        :safe-area-inset-bottom="false"
        :duration="400"
        @click="onClick"
    >
        <view
            class="ai-modal"
            :style="{
                width: $util.addUnit(width),
            }"
        >
            <text v-if="title" class="ai-modal__title">{{ title }}</text>
            <view class="ai-modal__content">
                <slot>
                    <text class="ai-modal__content__text">{{ content }}</text>
                </slot>
            </view>
            <view v-if="$slots.footer" class="ai-modal__footer__slot">
                <slot name="footer" />
            </view>
            <template v-else>
                <ai-line />
                <view class="ai-modal__footer">
                    <view
                        v-if="showCancel"
                        class="ai-modal__footer__button ai-modal__footer__button--cancel"
                        :hover-stay-time="150"
                        hover-class="ai-modal__footer__button--hover"
                        :class="[showCancel && !showConfirm && 'ai-modal__footer__button--only-cancel']"
                        @click="onCancel"
                    >
                        <text
                            class="ai-modal__footer__button__text"
                            :style="{
                                color: cancelColor,
                            }"
                            >{{ cancelText }}</text
                        >
                    </view>
                    <ai-line v-if="showConfirm && showCancel" direction="column" />
                    <view
                        v-if="showConfirm"
                        class="ai-modal__footer__button ai-modal__footer__button--confirm"
                        :hover-stay-time="150"
                        hover-class="ai-modal__footer__button--hover"
                        :class="[!showCancel && showConfirm && 'ai-modal__footer__button--only-confirm']"
                        @click="onConfirm"
                    >
                        <ai-loading-icon v-if="loading" />
                        <text v-else class="ai-modal__footer__button__text" :style="{ color: confirmColor }">{{
                            confirmText
                        }}</text>
                    </view>
                </view>
            </template>
        </view>
    </ai-popup>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiModal',
    mixins: [mixins],
    props: {
        // 是否展示modal
        show: {
            type: Boolean,
            default: false,
        },
        // 标题
        title: {
            type: [String],
            default: '',
        },
        // 弹窗内容
        content: {
            type: String,
            default: '',
        },
        // 确认文案
        confirmText: {
            type: String,
            default: '确认',
        },
        // 取消文案
        cancelText: {
            type: String,
            default: '取消',
        },
        // 是否显示确认按钮
        showConfirm: {
            type: Boolean,
            default: true,
        },
        // 是否显示取消按钮
        showCancel: {
            type: Boolean,
            default: true,
        },
        // 确认按钮颜色
        confirmColor: {
            type: String,
            default: uni.$config['color-primary'],
        },
        // 取消文字颜色
        cancelColor: {
            type: String,
            default: uni.$config['color-default'],
        },
        // 是否开启缩放效果
        zoom: {
            type: Boolean,
            default: false,
        },
        // 是否异步关闭，只对确定按钮有效
        asyncClose: {
            type: Boolean,
            default: true,
        },
        // 是否允许点击遮罩关闭modal
        closeOnClickOverlay: {
            type: Boolean,
            default: false,
        },
        // 给一个负的margin-top，往上偏移，避免和键盘重合的情况
        negativeTop: {
            type: [String, Number],
            default: 0,
        },
        // modal宽度，不支持百分比，可以数值，px，rpx单位
        width: {
            type: [String, Number],
            default: '640rpx',
        },
        // 确认按钮的样式，circle-圆形，square-方形，如设置，将不会显示取消按钮
        confirmButtonShape: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    watch: {
        show(val) {
            // 为了避免第一次打开modal，又使用了异步关闭的loading
            // 第二次打开modal时，loading依然存在的情况
            if (val && this.loading) this.loading = false;
        },
    },
    methods: {
        // 点击确定按钮
        onConfirm() {
            // 如果配置了异步关闭，将按钮值为loading状态
            if (this.asyncClose) {
                this.loading = true;
            }
            this.$emit('confirm');
        },
        // 点击取消按钮
        onCancel() {
            this.$emit('cancel');
        },
        // 点击遮罩
        // 从原理上来说，modal的遮罩点击，并不是真的点击到了遮罩
        // 因为modal依赖于popup的中部弹窗类型，中部弹窗比较特殊，虽有然遮罩，但是为了让弹窗内容能flex居中
        // 多了一个透明的遮罩，此透明的遮罩会覆盖在灰色的遮罩上，所以实际上是点击不到灰色遮罩的，popup内部在
        // 透明遮罩的子元素做了.stop处理，所以点击内容区，也不会导致误触发
        onClick() {
            if (this.closeOnClickOverlay) {
                this.$emit('close');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-modal-width: 640rpx !default;
$ai-modal-padding: $space-large 0 0 !default;
$ai-modal-border-radius: 12rpx !default;
$ai-modal-title-padding: 0 $space-large $space-large !default;
$ai-modal-title-font-weight: $font-weight-bold !default;
$ai-modal-title-font-size: $font-size-normal !default;
$ai-modal-title-color: $color-default !default;
$ai-modal-content-min-height: 192rpx !default;
$ai-modal-content-padding: 0 $space-large $space-large !default;
$ai-modal-content-font-size: $font-size-normal !default;
$ai-modal-content-color: $color-dark !default;
$ai-modal-footer-slot-padding: 0 $space-large $space-large !default;
$ai-modal-footer-button-height: 96rpx !default;
$ai-modal-footer-button-font-size: $font-size-normal !default;
$ai-modal-footer-button-color: $color-default !default;

.ai-modal {
    width: $ai-modal-width;
    padding: $ai-modal-padding;
    border-radius: $ai-modal-border-radius;
    overflow: hidden;

    &__title {
        padding: $ai-modal-title-padding;
        font-size: $ai-modal-title-font-size;
        font-weight: $ai-modal-title-font-weight;
        color: $ai-modal-title-color;
        text-align: center;
    }

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: $ai-modal-content-min-height;
        padding: $ai-modal-content-padding;

        &__text {
            font-size: $ai-modal-content-font-size;
            color: $ai-modal-content-color;
            text-align: center;
        }
    }

    &__footer {
        display: flex;
        flex-direction: row;

        &__slot {
            display: flex;
            flex-direction: column;
            padding: $ai-modal-footer-slot-padding;
        }

        &__button {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex: 1;
            height: $ai-modal-footer-button-height;

            &--confirm,
            &--only-cancel {
                border-bottom-right-radius: $ai-modal-border-radius;
            }

            &--cancel,
            &--only-confirm {
                border-bottom-left-radius: $ai-modal-border-radius;
            }

            &--hover {
                background: $hover-background-default;
            }

            &__text {
                font-size: $ai-modal-footer-button-font-size;
                color: $ai-modal-footer-button-color;
                text-align: center;
            }
        }
    }
}
</style>
