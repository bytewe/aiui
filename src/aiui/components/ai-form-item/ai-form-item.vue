<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:43:51
 * @Description: 表单项
-->

<template>
    <view class="ai-form-item">
        <view
            class="ai-form-item__body"
            :style="[
                $util.addStyle(customStyle),
                {
                    flexDirection: parentData.labelPosition === 'left' ? 'row' : 'column',
                },
            ]"
            @click="onClick"
        >
            <!-- 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" -->
            <slot name="label">
                <!-- {{required}} -->
                <view
                    v-if="required || leftIcon || label"
                    class="ai-form-item__body__left"
                    :style="{
                        width: $util.addUnit(labelWidth || parentData.labelWidth),
                        marginBottom: parentData.labelPosition === 'left' ? 0 : '10rpx',
                    }"
                >
                    <!-- 为了块对齐 -->
                    <view class="ai-form-item__body__left__content">
                        <!-- nvue不支持伪元素before -->
                        <text v-if="required" class="ai-form-item__body__left__content__required">*</text>
                        <view v-if="leftIcon" class="ai-form-item__body__left__content__icon">
                            <ai-icon :name="leftIcon" :custom-style="leftIconStyle" />
                        </view>
                        <text
                            class="ai-form-item__body__left__content__label"
                            :style="[
                                { justifyContent: $util.alignToJustify(parentData.labelAlign) },
                                $util.addStyle(parentData.labelStyle),
                                $util.addStyle(labelStyle),
                            ]"
                            >{{ label }}</text
                        >
                    </view>
                </view>
            </slot>
            <view class="ai-form-item__body__right">
                <view class="ai-form-item__body__right__content">
                    <view class="ai-form-item__body__right__content__slot">
                        <slot />
                    </view>
                    <view v-if="$slots.right" class="item__body__right__content__icon">
                        <slot name="right" />
                    </view>
                </view>
            </view>
        </view>
        <slot name="error">
            <text
                v-if="!!message && parentData.errorType === 'message'"
                class="ai-form-item__body__right__message"
                :style="{
                    marginLeft: $util.addUnit(
                        parentData.labelPosition === 'top' ? 0 : labelWidth || parentData.labelWidth
                    ),
                }"
                >{{ message }}</text
            >
        </slot>
        <ai-line
            v-if="borderBottom"
            :color="message && parentData.errorType === 'border-bottom' ? $config['color-danger'] : '#e5e5e5'"
            :custom-style="`margin-top: ${message ? '10rpx' : 0}`"
        />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiFormItem',
    mixins: [mixins],
    props: {
        // input的label提示语
        label: {
            type: String,
            default: '',
        },
        // 绑定的值
        prop: {
            type: String,
            default: '',
        },
        // 是否显示表单域的下划线边框
        borderBottom: {
            type: [String, Boolean],
            default: '',
        },
        // label的宽度，单位px
        labelWidth: {
            type: [String, Number],
            default: '',
        },
        // label样式
        labelStyle: {
            type: [String, Object],
            default: '',
        },
        // 右侧图标
        rightIcon: {
            type: String,
            default: '',
        },
        // 左侧图标
        leftIcon: {
            type: String,
            default: '',
        },
        // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
        required: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            // 错误提示语
            message: '',
            parentData: {
                // 提示文本的位置
                labelPosition: 'left',
                // 提示文本对齐方式
                labelAlign: 'left',
                // 提示文本的样式
                labelStyle: {},
                // 提示文本的宽度
                labelWidth: '90rpx',
                // 错误提示方式
                errorType: 'message',
            },
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 父组件的实例
            this.updateParentData();
            if (!this.parent) {
                uni.$util.error('ai-form-item需要结合ai-form组件使用');
            }
        },
        // 获取父组件的参数
        updateParentData() {
            // 此方法写在mixin中
            this.getParentData('AiForm');
        },
        // 移除ai-form-item的校验结果
        clearValidate() {
            this.message = null;
        },
        // 清空当前的组件的校验结果，并重置为初始值
        resetField() {
            // 找到原始值
            const value = uni.$util.getProperty(this.parent.originalModel, this.prop);
            // 将ai-form的model的prop属性链还原原始值
            uni.$util.setProperty(this.parent.model, this.prop, value);
            // 移除校验结果
            this.message = null;
        },
        // 点击组件
        onClick() {
            this.$emit('click');
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-form-item {
    flex-direction: column;
    font-size: 28rpx;
    color: $color-default;

    &__body {
        display: flex;
        flex-direction: row;
        padding: 20rpx 0;

        &__left {
            display: flex;
            flex-direction: row;
            align-items: center;

            &__content {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding-right: 10rpx;
                flex: 1;

                &__icon {
                    margin-right: 8rpx;
                }

                &__required {
                    position: absolute;
                    left: -18rpx;
                    color: $color-danger;
                    line-height: 40rpx;
                    font-size: 40rpx;
                    top: 6rpx;
                }

                &__label {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    flex: 1;
                    color: $color-default;
                    font-size: 30rpx;
                }
            }
        }

        &__right {
            flex: 1;

            &__content {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex: 1;

                &__slot {
                    flex: 1;
                    /* #ifndef MP */
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    /* #endif */
                }

                &__icon {
                    margin-left: 10rpx;
                    color: $color-light;
                    font-size: 30rpx;
                }
            }

            &__message {
                font-size: 24rpx;
                line-height: 24rpx;
                color: $color-danger;
            }
        }
    }
}
</style>
