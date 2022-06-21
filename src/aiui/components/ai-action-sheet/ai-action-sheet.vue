<!--
 * @Author: airobot
 * @Date: 2022-01-30 00:40:55
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:13:18
 * @Description: 上拉菜单
-->

<template>
    <ai-popup
        :show="show"
        mode="bottom"
        :close-on-click-overlay="closeOnClickOverlay"
        :safe-area-inset-bottom="safeAreaInsetBottom"
        :round="round"
        @close="onClose"
    >
        <view class="ai-action-sheet">
            <view v-if="title" class="ai-action-sheet__header">
                <text class="ai-action-sheet__header__title ai-line-1">{{ title }}</text>
                <view class="ai-action-sheet__header__icon-wrap" @click.stop="onClose">
                    <ai-icon name="close" size="34rpx" color="#c8c9cc" bold />
                </view>
            </view>
            <text
                v-if="description"
                class="ai-action-sheet__description"
                :style="[{ marginTop: `${title && description ? 0 : '36rpx'}` }]"
                >{{ description }}</text
            >
            <slot>
                <ai-line v-if="description" />
                <view class="ai-action-sheet__item-wrap">
                    <template v-for="(item, index) in actions">
                        <!-- #ifdef MP -->
                        <button
                            :key="index"
                            class="ai-action-sheet__button ai-button-reset"
                            :openType="item.openType"
                            :lang="lang"
                            :session-from="sessionFrom"
                            :send-message-title="sendMessageTitle"
                            :send-message-path="sendMessagePath"
                            :send-message-img="sendMessageImg"
                            :show-message-card="showMessageCard"
                            :app-parameter="appParameter"
                            :hover-class="item.disabled || item.loading ? '' : 'ai-action-sheet--hover'"
                            @getuserinfo="onGetUserInfo"
                            @contact="onContact"
                            @getphonenumber="onGetPhoneNumber"
                            @error="onError"
                            @launchapp="onLaunchApp"
                            @opensetting="onOpenSetting"
                            @click="onClick(index)"
                        >
                            <!-- #endif -->
                            <view
                                class="ai-action-sheet__item"
                                :hover-class="!item.disabled && !item.loading ? 'ai-action-sheet--hover' : ''"
                                :hover-stay-time="150"
                                @click.stop="onClick(index)"
                            >
                                <template v-if="!item.loading">
                                    <text class="ai-action-sheet__item__name" :style="[itemStyle(index)]">{{
                                        item.name
                                    }}</text>
                                    <text v-if="item.subname" class="ai-action-sheet__item__subname">{{
                                        item.subname
                                    }}</text>
                                </template>
                                <ai-loading-icon
                                    v-else
                                    custom-class="ai-action-sheet__loading"
                                    size="36rpx"
                                    mode="circle"
                                />
                            </view>
                            <!-- #ifdef MP -->
                        </button>
                        <!-- #endif -->
                        <!-- eslint-disable-next-line vue/valid-v-for -->
                        <ai-line v-if="index !== actions.length - 1" />
                    </template>
                </view>
            </slot>
            <ai-gap v-if="cancelText" background="default" />
            <view v-if="cancelText" class="ai-action-sheet__cancel" hover-class="ai-action-sheet--hover">
                <text
                    :hover-stay-time="150"
                    class="ai-action-sheet__cancel__text"
                    @touchmove.stop.prevent
                    @click="onClose"
                    >{{ cancelText }}</text
                >
            </view>
        </view>
    </ai-popup>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
import button from '@/aiui/mixins/button';
import openType from '@/aiui/mixins/openType';

export default {
    name: 'AiActionSheet',
    mixins: [mixins, button, openType],
    props: {
        // 操作菜单是否展示
        show: {
            type: Boolean,
            default: false,
        },
        // 标题
        title: {
            type: String,
            default: '',
        },
        // 选项上方的描述信息
        description: {
            type: String,
            default: '',
        },
        // 数据
        actions: {
            type: Array,
            default: () => [],
        },
        // 取消按钮的文字，不为空时显示按钮
        cancelText: {
            type: String,
            default: '',
        },
        // 点击某个菜单项时是否关闭弹窗
        closeOnClickAction: {
            type: Boolean,
            default: true,
        },
        // 处理底部安全区
        safeAreaInsetBottom: {
            type: Boolean,
            default: true,
        },
        // 小程序的打开方式
        openType: {
            type: String,
            default: '',
        },
        // 点击遮罩是否允许关闭
        closeOnClickOverlay: {
            type: Boolean,
            default: true,
        },
        // 圆角值
        round: {
            type: [Boolean, String, Number],
            default: 0,
        },
    },
    data() {
        return {};
    },
    computed: {
        // 操作项目的样式
        itemStyle() {
            return (index) => {
                let style = {};
                if (this.actions[index].color) style.color = this.actions[index].color;
                if (this.actions[index].fontSize) style.fontSize = uni.$util.addUnit(this.actions[index].fontSize);
                if (this.actions[index].disabled) style.color = '#c0c4cc'; // 选项被禁用的样式
                return style;
            };
        },
    },
    methods: {
        // 关闭
        onClose() {
            // 允许点击遮罩关闭时，才发出close事件
            if (this.closeOnClickOverlay) {
                this.$emit('close');
            }
        },
        // 点击
        onClick(index) {
            const item = this.actions[index];
            if (item && !item.disabled && !item.loading) {
                this.$emit('select', item);
                if (this.closeOnClickAction) {
                    this.$emit('close');
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-action-sheet-header-padding: 24rpx 60rpx !default;
$ai-action-sheet-header-title-font-size: 32rpx !default;
$ai-action-sheet-header-title-color: $color-default !default;
$ai-action-sheet-header-icon-wrap-right: 30rpx !default;
$ai-action-sheet-header-icon-wrap-top: 30rpx !default;
$ai-action-sheet-description-font-size: 26rpx !default;
$ai-action-sheet-description-color: 28rpx !default;
$ai-action-sheet-description-margin: 36rpx 30rpx !default;
$ai-action-sheet-button-width: 100% !default;
$ai-action-sheet-item-padding: 30rpx !default;
$ai-action-sheet-item-name-font-size: 32rpx !default;
$ai-action-sheet-item-subname-font-size: 26rpx !default;
$ai-action-sheet-item-subname-color: #c0c4cc !default;
$ai-action-sheet-item-subname-margin-top: 20rpx !default;
$ai-action-sheet-cancel-padding: 30rpx !default;
$ai-action-sheet-cancel-text-font-size: 32rpx !default;
$ai-action-sheet-cancel-text-color: $color-dark !default;
$ai-action-sheet-hover-background: rgb(242, 243, 245) !default;

.ai-action-sheet {
    text-align: center;
    &__header {
        position: relative;
        padding: $ai-action-sheet-header-padding;
        &__title {
            font-size: $ai-action-sheet-header-title-font-size;
            color: $ai-action-sheet-header-title-color;
            font-weight: bold;
            text-align: center;
        }

        &__icon-wrap {
            position: absolute;
            right: $ai-action-sheet-header-icon-wrap-right;
            top: $ai-action-sheet-header-icon-wrap-top;
        }
    }

    &__description {
        font-size: $ai-action-sheet-description-font-size;
        color: $color-gray;
        margin: $ai-action-sheet-description-margin;
        text-align: center;
    }

    &__button {
        width: $ai-action-sheet-button-width;
    }

    &__item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: $ai-action-sheet-item-padding;

        &__name {
            font-size: $ai-action-sheet-item-name-font-size;
            color: $color-default;
            text-align: center;
        }

        &__subname {
            margin-top: $ai-action-sheet-item-subname-margin-top;
            font-size: $ai-action-sheet-item-subname-font-size;
            color: $ai-action-sheet-item-subname-color;
            text-align: center;
        }
    }

    &__cancel {
        padding: $ai-action-sheet-cancel-padding;

        &__text {
            font-size: $ai-action-sheet-cancel-text-font-size;
            color: $ai-action-sheet-cancel-text-color;
            text-align: center;
        }
    }

    &--hover {
        background: $ai-action-sheet-hover-background;
    }
}
</style>
