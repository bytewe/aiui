<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:45:39
 * @Description: 输入框
-->

<template>
    <view class="ai-input" :class="inputClass" :style="[wrapperStyle]">
        <view class="ai-input__content">
            <view v-if="prefixIcon || $slots.prefix" class="ai-input__content__prefix-icon">
                <slot name="prefix">
                    <ai-icon :name="prefixIcon" size="18" :custom-style="prefixIconStyle" />
                </slot>
            </view>
            <view class="ai-input__content__field-wrapper" @click="onClick">
                <!-- 根据uni-app的input组件文档，H5和APP中只要声明了password参数(无论true还是false)，type均失效，
                此时为了防止type=number时，又存在password属性，type无效，此时需要设置password为undefined
                -->
                <input
                    class="ai-input__content__field-wrapper__field"
                    :style="[inputStyle]"
                    :type="type"
                    :focus="focus"
                    :cursor="cursor"
                    :value="innerValue"
                    :auto-blur="autoBlur"
                    :disabled="disabled || readonly"
                    :maxlength="maxlength"
                    :placeholder="placeholder"
                    :placeholder-style="placeholderStyle"
                    :placeholder-class="placeholderClass"
                    :confirm-type="confirmType"
                    :confirm-hold="confirmHold"
                    :hold-keyboard="holdKeyboard"
                    :cursor-spacing="cursorSpacing"
                    :adjust-position="adjustPosition"
                    :selection-end="selectionEnd"
                    :selection-start="selectionStart"
                    :password="password || type === 'password' || undefined"
                    @input="onInput"
                    @blur="onBlur"
                    @focus="onFocus"
                    @confirm="onConfirm"
                    @keyboardheightchange="onkeyboardheightchange"
                />
            </view>
            <view v-if="isShowClear" class="ai-input__content__clear" @click="onClear">
                <ai-icon name="close" size="11" color="#ffffff" custom-style="line-height: 24rpx" />
            </view>
            <view v-if="suffixIcon || $slots.suffix" class="ai-input__content__subfix-icon">
                <slot name="suffix">
                    <ai-icon :name="suffixIcon" size="18" :custom-style="suffixIconStyle" />
                </slot>
            </view>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiInput',
    mixins: [mixins],
    props: {
        // 输入的值
        value: {
            type: [String, Number],
            default: '',
        },
        // 输入框类型
        // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
        // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
        // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
        // text-文本输入键盘
        type: {
            type: String,
            default: 'text',
        },
        // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，
        // 兼容性：微信小程序、百度小程序、字节跳动小程序、QQ小程序
        fixed: {
            type: Boolean,
            default: false,
        },
        // 是否禁用输入框
        disabled: {
            type: Boolean,
            default: false,
        },
        // 禁用状态时的背景色
        disabledColor: {
            type: String,
            default: '#f5f7fa',
        },
        // 是否显示清除控件
        clearable: {
            type: Boolean,
            default: false,
        },
        // 是否密码类型
        password: {
            type: Boolean,
            default: false,
        },
        // 最大输入长度，设置为 -1 的时候不限制最大长度
        maxlength: {
            type: [String, Number],
            default: -1,
        },
        //   输入框为空时的占位符
        placeholder: {
            type: String,
            default: null,
        },
        // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
        placeholderClass: {
            type: String,
            default: 'ai-input__placeholder',
        },
        // 指定placeholder的样式
        placeholderStyle: {
            type: [String, Object],
            default: '',
        },
        // 是否显示输入字数统计，只在 type ="text"或type ="textarea"时有效
        showWordLimit: {
            type: Boolean,
            default: false,
        },
        // 设置右下角按钮的文字，有效值：send|search|next|go|done
        confirmType: {
            type: String,
            default: 'done',
        },
        // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
        confirmHold: {
            type: Boolean,
            default: false,
        },
        // focus时，点击页面的时候不收起键盘，微信小程序有效
        holdKeyboard: {
            type: Boolean,
            default: false,
        },
        // 自动获取焦点
        // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
        focus: {
            type: Boolean,
            default: false,
        },
        // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
        autoBlur: {
            type: Boolean,
            default: false,
        },
        // 是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效
        disableDefaultPadding: {
            type: Boolean,
            default: false,
        },
        // 指定focus时光标的位置
        cursor: {
            type: [String, Number],
            default: -1,
        },
        // 输入框聚焦时底部与键盘的距离
        cursorSpacing: {
            type: [String, Number],
            default: 30,
        },
        // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
        selectionStart: {
            type: [String, Number],
            default: -1,
        },
        // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
        selectionEnd: {
            type: [String, Number],
            default: -1,
        },
        // 键盘弹起时，是否自动上推页面
        adjustPosition: {
            type: Boolean,
            default: true,
        },
        // 输入框内容对齐方式，可选值为：left|center|right
        inputAlign: {
            type: String,
            default: 'left',
        },
        // 输入框字体的大小
        size: {
            type: [String, Number],
            default: '',
        },
        // 输入框字体颜色
        color: {
            type: String,
            default: '',
        },
        // 输入框前置图标
        prefixIcon: {
            type: String,
            default: '',
        },
        // 前置图标样式，对象或字符串
        prefixIconStyle: {
            type: [String, Object],
            default: '',
        },
        // 输入框后置图标
        suffixIcon: {
            type: String,
            default: '',
        },
        // 后置图标样式，对象或字符串
        suffixIconStyle: {
            type: [String, Object],
            default: '',
        },
        // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
        border: {
            type: String,
            default: 'surround',
        },
        // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
        readonly: {
            type: Boolean,
            default: false,
        },
        // 输入框形状，circle-圆形，square-方形
        shape: {
            type: String,
            default: 'square',
        },
        // 用于处理或者过滤输入框内容的方法
        formatter: {
            type: [Function, null],
            default: null,
        },
    },
    data() {
        return {
            // 输入框的值
            innerValue: '',
            // 是否处于获得焦点状态
            focused: false,
            // value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
            firstChange: true,
            // value绑定值的变化是由内部还是外部引起的
            changeFromInner: false,
            // 过滤处理方法
            innerFormatter: (value) => value,
        };
    },
    computed: {
        // 是否显示清除控件
        isShowClear() {
            const { clearable, readonly, focused, innerValue } = this;
            return !!clearable && !readonly && !!focused && innerValue !== '';
        },
        // 组件的类名
        inputClass() {
            let classes = [],
                { border, shape } = this;
            border === 'surround' && (classes = classes.concat(['ai-border', 'ai-input--radius']));
            classes.push(`ai-input--${shape}`);
            border === 'bottom' && (classes = classes.concat(['ai-border--bottom', 'ai-input--no-radius']));
            return classes.join(' ');
        },
        // 组件的样式
        wrapperStyle() {
            const style = {};
            // 禁用状态下，被背景色加上对应的样式
            if (this.disabled) {
                style.backgroundColor = this.disabledColor;
            }
            // 无边框时，去除内边距
            if (this.border === 'none') {
                style.padding = '0';
            } else {
                // 由于uni-app的iOS开发者能力有限，导致需要分开写才有效
                style.paddingTop = '12rpx';
                style.paddingBottom = '12rpx';
                style.paddingLeft = '18rpx';
                style.paddingRight = '18rpx';
            }
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
        // 输入框的样式
        inputStyle() {
            let style = {};
            if (this.inputAlign) {
                style.textAlign = this.inputAlign;
            }
            const color = uni.$config[`color-${this.color}`] || this.color;
            if (color) {
                style.color = color;
            }
            const size = uni.$config[`font-size-${this.size}`] || this.size;
            if (size) {
                style.fontSize = uni.$util.addUnit(size);
            }
            return style;
        },
    },
    watch: {
        value: {
            immediate: true,
            handler(newVal) {
                this.innerValue = newVal;
                /* #ifdef H5 */
                // 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
                if (this.firstChange === false && this.changeFromInner === false) {
                    this.valueChange();
                }
                /* #endif */
                this.firstChange = false;
                // 重置changeFromInner的值为false，标识下一次引起默认为外部引起的
                this.changeFromInner = false;
            },
        },
    },
    methods: {
        // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
        setFormatter(e) {
            this.innerFormatter = e;
        },
        // 当键盘输入时，触发input事件
        onInput(e) {
            let { value = '' } = e.detail || {};
            // 格式化过滤方法
            const formatter = this.formatter || this.innerFormatter;
            const formatValue = formatter(value);
            // 为了避免props的单向数据流特性，需要先将innerValue值设置为当前值，再在$nextTick中重新赋予设置后的值才有效
            this.innerValue = value;
            this.$nextTick(() => {
                this.innerValue = formatValue;
                this.valueChange();
            });
        },
        // 输入框失去焦点时触发
        onBlur(event) {
            this.$emit('blur', event.detail.value);
            // H5端的blur会先于点击清除控件的点击click事件触发，导致focused
            // 瞬间为false，从而隐藏了清除控件而无法被点击到
            uni.$util.sleep(50).then(() => {
                this.focused = false;
            });
            // 尝试调用ai-form的验证方法
            uni.$util.formValidate(this, 'blur');
        },
        // 输入框聚焦时触发
        onFocus() {
            this.focused = true;
            this.$emit('focus');
        },
        // 点击完成按钮时触发
        onConfirm() {
            this.$emit('confirm', this.innerValue);
        },
        // 键盘高度发生变化的时候触发此事件
        // 兼容性：微信小程序2.7.0+、App 3.1.0+
        onkeyboardheightchange() {
            this.$emit('keyboardheightchange');
        },
        // 内容发生变化，进行处理
        valueChange() {
            const value = this.innerValue;
            this.$nextTick(() => {
                this.$emit('input', value);
                // 标识value值的变化是由内部引起的
                this.changeFromInner = true;
                this.$emit('change', value);
                // 尝试调用ai-form的验证方法
                uni.$util.formValidate(this, 'change');
            });
        },
        // 点击清除控件
        onClear() {
            this.innerValue = '';
            this.$nextTick(() => {
                this.valueChange();
                this.$emit('clear');
            });
        },
        /**
         * 在安卓nvue上，事件无法冒泡
         * 在某些时间，我们希望监听ai-from-item的点击事件，此时会导致点击ai-form-item内的ai-input后
         * 无法触发ai-form-item的点击事件，这里通过手动调用ai-form-item的方法进行触发
         */
        onClick() {
            // #ifdef APP-NVUE
            if (uni.$util.os() === 'android') {
                const formItem = uni.$util.$parent.call(this, 'AiFormItem');
                if (formItem) {
                    formItem.onClick();
                }
            }
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-input-placeholder: $color-gray;

.ai-input {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    &__placeholder {
        color: $ai-input-placeholder;
    }

    &--radius,
    &--square {
        border-radius: 8rpx;
    }

    &--no-radius {
        border-radius: 0;
    }

    &--circle {
        border-radius: 200rpx;
    }

    &__content {
        flex: 1;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        &__field-wrapper {
            position: relative;
            flex-direction: row;
            margin: 0;
            flex: 1;

            &__field {
                line-height: 52rpx;
                text-align: left;
                color: $color-default;
                height: 48rpx;
                font-size: 30rpx;
                flex: 1;
            }
        }

        &__clear {
            width: 40rpx;
            height: 40rpx;
            border-radius: 200rpx;
            background-color: #c6c7cb;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            transform: scale(0.82);
            margin-left: 8rpx;
        }

        &__subfix-icon {
            margin-left: 8rpx;
        }

        &__prefix-icon {
            margin-right: 8rpx;
        }
    }
}
</style>
