<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:14:32
 * @Description: 复选框
-->

<template>
    <view
        class="ai-checkbox"
        :style="[checkboxStyle]"
        :class="[
            `ai-checkbox-label--${parentData.iconPlacement}`,
            parentData.borderBottom && parentData.direction === 'column' && 'ai-border--bottom',
        ]"
        @click.stop="wrapperClickHandler"
    >
        <view class="ai-checkbox__icon-wrap" :class="iconClasses" :style="[iconWrapStyle]" @click.stop="iconClick">
            <slot name="icon">
                <ai-icon class="ai-checkbox__icon-wrap__icon" name="check" :size="elIconSize" :color="elIconColor" />
            </slot>
        </view>
        <text
            :style="{
                color: elDisabled ? elInactiveColor : elLabelColor,
                fontSize: elLabelSize,
                lineHeight: elLabelSize,
            }"
            @click.stop="labelClick"
            >{{ label }}</text
        >
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiCheckbox',
    mixins: [mixins],
    props: {
        // checkbox的名称
        name: {
            type: [String, Number, Boolean],
            default: '',
        },
        // 形状，square为方形，circle为圆型
        shape: {
            type: String,
            default: 'square',
        },
        // 整体的大小
        size: {
            type: [String, Number],
            default: '',
        },
        // 是否默认选中
        checked: {
            type: Boolean,
            default: false,
        },
        // 是否禁用
        disabled: {
            type: [String, Boolean],
            default: '',
        },
        // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
        activeColor: {
            type: String,
            default: '',
        },
        // 未选中的颜色
        inactiveColor: {
            type: String,
            default: '',
        },
        // 图标的大小，单位px
        iconSize: {
            type: [String, Number],
            default: '',
        },
        // 图标颜色
        iconColor: {
            type: String,
            default: '',
        },
        // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
        label: {
            type: [String, Number],
            default: '',
        },
        // label的字体大小，px单位
        labelSize: {
            type: [String, Number],
            default: '',
        },
        // label的颜色
        labelColor: {
            type: String,
            default: '',
        },
        // 是否禁止点击提示语选中复选框
        labelDisabled: {
            type: [String, Boolean],
            default: '',
        },
    },
    data() {
        return {
            isChecked: false,
            // 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.shape的形式
            // 故只能使用如此方法
            parentData: {
                iconSize: 12,
                labelDisabled: null,
                disabled: null,
                shape: 'square',
                activeColor: null,
                inactiveColor: null,
                size: 18,
                value: null,
                iconColor: null,
                direction: 'row',
                borderBottom: false,
                iconPlacement: 'left',
            },
        };
    },
    computed: {
        // 是否禁用，如果父组件ai-raios-group禁用的话，将会忽略子组件的配置
        elDisabled() {
            return this.disabled !== ''
                ? this.disabled
                : this.parentData.disabled !== null
                ? this.parentData.disabled
                : false;
        },
        // 是否禁用label点击
        elLabelDisabled() {
            return this.labelDisabled !== ''
                ? this.labelDisabled
                : this.parentData.labelDisabled !== null
                ? this.parentData.labelDisabled
                : false;
        },
        // 组件尺寸，对应size的值，默认值为42rpx
        elSize() {
            return this.size ? this.size : this.parentData.size ? this.parentData.size : 21;
        },
        // 组件的勾选图标的尺寸，默认24rpx
        elIconSize() {
            return this.iconSize ? this.iconSize : this.parentData.iconSize ? this.parentData.iconSize : '';
        },
        // 组件选中激活时的颜色
        elActiveColor() {
            return this.activeColor
                ? this.activeColor
                : this.parentData.activeColor
                ? this.parentData.activeColor
                : '#2979ff';
        },
        // 组件选未中激活时的颜色
        elInactiveColor() {
            return this.inactiveColor
                ? this.inactiveColor
                : this.parentData.inactiveColor
                ? this.parentData.inactiveColor
                : '#c8c9cc';
        },
        // label的颜色
        elLabelColor() {
            return this.labelColor
                ? this.labelColor
                : this.parentData.labelColor
                ? this.parentData.labelColor
                : '#606266';
        },
        // 组件的形状
        elShape() {
            return this.shape ? this.shape : this.parentData.shape ? this.parentData.shape : 'circle';
        },
        // label大小
        elLabelSize() {
            return uni.$util.addUnit(
                this.labelSize ? this.labelSize : this.parentData.labelSize ? this.parentData.labelSize : '15'
            );
        },
        elIconColor() {
            const iconColor = this.iconColor
                ? this.iconColor
                : this.parentData.iconColor
                ? this.parentData.iconColor
                : '#ffffff';
            // 图标的颜色
            if (this.elDisabled) {
                // disabled状态下，已勾选的checkbox图标改为elInactiveColor
                return this.isChecked ? this.elInactiveColor : 'transparent';
            } else {
                return this.isChecked ? iconColor : 'transparent';
            }
        },
        iconClasses() {
            let classes = [];
            // 组件的形状
            classes.push('ai-checkbox__icon-wrap--' + this.elShape);
            if (this.elDisabled) {
                classes.push('ai-checkbox__icon-wrap--disabled');
            }
            if (this.isChecked && this.elDisabled) {
                classes.push('ai-checkbox__icon-wrap--disabled--checked');
            }
            // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
            // #ifdef MP-ALIPAY || MP-TOUTIAO
            classes = classes.join(' ');
            // #endif
            return classes;
        },
        iconWrapStyle() {
            // checkbox的整体样式
            const style = {};
            style.backgroundColor = this.isChecked && !this.elDisabled ? this.elActiveColor : '#ffffff';
            style.borderColor = this.isChecked && !this.elDisabled ? this.elActiveColor : this.elInactiveColor;
            style.width = uni.$util.addUnit(this.elSize);
            style.height = uni.$util.addUnit(this.elSize);
            // 如果是图标在右边的话，移除它的右边距
            if (this.parentData.iconPlacement === 'right') {
                style.marginRight = 0;
            }
            return style;
        },
        checkboxStyle() {
            const style = {};
            if (this.parentData.borderBottom && this.parentData.direction === 'row') {
                uni.$util.error(
                    '检测到您将borderBottom设置为true，需要同时将ai-checkbox-group的placement设置为column才有效'
                );
            }
            // 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
            if (this.parentData.borderBottom && this.parentData.direction === 'column') {
                style.paddingBottom = '16rpx';
            }
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
    watch: {
        checked() {
            this.isChecked = this.checked;
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
            this.updateParentData();
            if (!this.parent) {
                uni.$util.error('ai-checkbox必须搭配ai-checkbox-group组件使用');
            }
            // 设置初始化时，是否默认选中的状态，父组件ai-checkbox-group的value可能是array，所以额外判断
            if (this.checked) {
                this.isChecked = true;
            } else if (uni.$util.test.array(this.parentData.value)) {
                // 查找数组是是否存在this.name元素值
                this.isChecked = this.parentData.value.some((item) => {
                    return item === this.name;
                });
            }
        },
        updateParentData() {
            this.getParentData('AiCheckboxGroup');
        },
        // 横向两端排列时，点击组件即可触发选中事件
        wrapperClickHandler(e) {
            this.parentData.iconPlacement === 'right' && this.iconClick(e);
        },
        // 点击图标
        iconClick(e) {
            this.preventEvent(e);
            // 如果整体被禁用，不允许被点击
            if (!this.elDisabled) {
                this.setRadioCheckedStatus();
            }
        },
        // 点击label
        labelClick(e) {
            this.preventEvent(e);
            // 如果按钮整体被禁用或者label被禁用，则不允许点击文字修改状态
            if (!this.elLabelDisabled && !this.elDisabled) {
                this.setRadioCheckedStatus();
            }
        },
        emitEvent() {
            this.$emit('change', this.isChecked);
            // 尝试调用ai-form的验证方法，进行一定延迟，否则微信小程序更新可能会不及时
            this.$nextTick(() => {
                uni.$util.formValidate(this, 'change');
            });
        },
        // 改变组件选中状态
        // 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有ai-checkbox实例
        // 将本组件外的其他ai-checkbox的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
        setRadioCheckedStatus() {
            // 将本组件标记为与原来相反的状态
            this.isChecked = !this.isChecked;
            this.emitEvent();
            typeof this.parent.unCheckedOther === 'function' && this.parent.unCheckedOther(this);
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-checkbox-icon-wrap-margin-right: 12rpx !default;
$ai-checkbox-icon-wrap-font-size: 12rpx !default;
$ai-checkbox-icon-wrap-border-width: 2rpx !default;
$ai-checkbox-icon-wrap-border-color: #c8c9cc !default;
$ai-checkbox-icon-wrap-icon-line-height: 0 !default;
$ai-checkbox-icon-wrap-circle-border-radius: 100% !default;
$ai-checkbox-icon-wrap-square-border-radius: 6rpx !default;
$ai-checkbox-icon-wrap-checked-color: #fff !default;
$ai-checkbox-icon-wrap-checked-background-color: red !default;
$ai-checkbox-icon-wrap-checked-border-color: #2979ff !default;
$ai-checkbox-icon-wrap-disabled-background-color: #ebedf0 !default;
$ai-checkbox-icon-wrap-disabled-checked-color: #c8c9cc !default;
$ai-checkbox-label-margin-left: 10rpx !default;
$ai-checkbox-label-margin-right: 24rpx !default;
$ai-checkbox-label-color: $color-dark !default;
$ai-checkbox-label-font-size: 30rpx !default;
$ai-checkbox-label-disabled-color: #c8c9cc !default;

.ai-checkbox {
    /* #ifndef APP-NVUE */
    flex-direction: row;
    /* #endif */
    overflow: hidden;
    flex-direction: row;
    align-items: center;

    &-label--left {
        flex-direction: row;
    }

    &-label--right {
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    &__icon-wrap {
        /* #ifndef APP-NVUE */
        box-sizing: border-box;
        // nvue下，border-color过渡有问题
        transition-property: border-color, background-color, color;
        transition-duration: 0.2s;
        /* #endif */
        color: $color-dark;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: transparent;
        text-align: center;
        margin-right: $ai-checkbox-icon-wrap-margin-right;

        font-size: $ai-checkbox-icon-wrap-font-size;
        border-width: $ai-checkbox-icon-wrap-border-width;
        border-color: $ai-checkbox-icon-wrap-border-color;
        border-style: solid;

        /* #ifdef MP-TOUTIAO */
        // 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
        &__icon {
            line-height: $ai-checkbox-icon-wrap-icon-line-height;
        }

        /* #endif */

        &--circle {
            border-radius: $ai-checkbox-icon-wrap-circle-border-radius;
        }

        &--square {
            border-radius: $ai-checkbox-icon-wrap-square-border-radius;
        }

        &--checked {
            color: $ai-checkbox-icon-wrap-checked-color;
            background-color: $ai-checkbox-icon-wrap-checked-background-color;
            border-color: $ai-checkbox-icon-wrap-checked-border-color;
        }

        &--disabled {
            background-color: $ai-checkbox-icon-wrap-disabled-background-color !important;
        }

        &--disabled--checked {
            color: $ai-checkbox-icon-wrap-disabled-checked-color !important;
        }
    }

    &__label {
        /* #ifndef APP-NVUE */
        word-wrap: break-word;
        /* #endif */
        margin-left: $ai-checkbox-label-margin-left;
        margin-right: $ai-checkbox-label-margin-right;
        color: $ai-checkbox-label-color;
        font-size: $ai-checkbox-label-font-size;

        &--disabled {
            color: $ai-checkbox-label-disabled-color;
        }
    }
}
</style>
