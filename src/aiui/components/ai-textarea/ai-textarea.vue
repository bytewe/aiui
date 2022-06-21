<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:26:40
 * @Description: 文本域
-->

<template>
    <view class="ai-textarea" :class="textareaClass" :style="[textareaStyle]">
        <textarea
            class="ai-textarea__field"
            :value="innerValue"
            :style="{ height: $util.addUnit(height) }"
            :placeholder="placeholder"
            :placeholder-style="$util.addStyle(placeholderStyle, 'string')"
            :placeholder-class="placeholderClass"
            :disabled="disabled"
            :focus="focus"
            :autoHeight="autoHeight"
            :fixed="fixed"
            :cursorSpacing="cursorSpacing"
            :cursor="cursor"
            :showConfirmBar="showConfirmBar"
            :selectionStart="selectionStart"
            :selectionEnd="selectionEnd"
            :adjustPosition="adjustPosition"
            :disableDefaultPadding="disableDefaultPadding"
            :holdKeyboard="holdKeyboard"
            :maxlength="maxlength"
            :confirmType="confirmType"
            @focus="onFocus"
            @blur="onBlur"
            @linechange="onLinechange"
            @input="onInput"
            @confirm="onConfirm"
            @keyboardheightchange="onKeyboardheightchange"
        />
        <text
            v-if="count"
            class="ai-textarea__count"
            :style="{
                'background-color': disabled ? 'transparent' : '#fff',
            }"
            >{{ innerValue.length }}/{{ maxlength }}</text
        >
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiTextarea',
    mixins: [mixins],
    props: {
        // 输入框的内容
        value: {
            type: [String, Number],
            default: '',
        },
        // 输入框为空时占位符
        placeholder: {
            type: [String, Number],
            default: '',
        },
        // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
        placeholderClass: {
            type: String,
            default: 'textarea-placeholder',
        },
        // 指定placeholder的样式
        placeholderStyle: {
            type: [String, Object],
            default: 'color: #c0c4cc',
        },
        // 输入框高度
        height: {
            type: [String, Number],
            default: 70,
        },
        // 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
        confirmType: {
            type: String,
            default: 'done',
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否显示统计字数
        count: {
            type: Boolean,
            default: false,
        },
        // 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
        focus: {
            type: Boolean,
            default: false,
        },
        // 是否自动增加高度
        autoHeight: {
            type: Boolean,
            default: false,
        },
        // 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
        fixed: {
            type: Boolean,
            default: false,
        },
        // 指定光标与键盘的距离
        cursorSpacing: {
            type: Number,
            default: 0,
        },
        // 指定focus时的光标位置
        cursor: {
            type: [String, Number],
            default: '',
        },
        // 是否显示键盘上方带有”完成“按钮那一栏，
        showConfirmBar: {
            type: Boolean,
            default: true,
        },
        // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
        selectionStart: {
            type: Number,
            default: -1,
        },
        // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
        selectionEnd: {
            type: Number,
            default: -1,
        },
        // 键盘弹起时，是否自动上推页面
        adjustPosition: {
            type: Boolean,
            default: true,
        },
        // 是否去掉 iOS 下的默认内边距，只微信小程序有效
        disableDefaultPadding: {
            type: Boolean,
            default: false,
        },
        // focus时，点击页面的时候不收起键盘，只微信小程序有效
        holdKeyboard: {
            type: Boolean,
            default: false,
        },
        // 最大输入长度，设置为 -1 的时候不限制最大长度
        maxlength: {
            type: [String, Number],
            default: 140,
        },
        // 边框类型，surround-四周边框，bottom-底部边框
        border: {
            type: String,
            default: 'surround',
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
        // 组件的类名
        textareaClass() {
            let classes = [],
                { border, disabled } = this;
            border === 'surround' && (classes = classes.concat(['ai-border', 'ai-textarea--radius']));
            border === 'bottom' && (classes = classes.concat(['ai-border--bottom', 'ai-textarea--no-radius']));
            disabled && classes.push('ai-textarea--disabled');
            return classes.join(' ');
        },
        // 组件的样式
        textareaStyle() {
            const style = {};
            // #ifdef APP-NVUE
            // 由于textarea在安卓nvue上的差异性，需要额外再调整其内边距
            if (uni.$util.os() === 'android') {
                style.paddingTop = '12rpx';
                style.paddingLeft = '18rpx';
                style.paddingBottom = '6rpx';
                style.paddingRight = '12rpx';
            }
            // #endif
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
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
        onFocus(e) {
            this.$emit('focus', e);
        },
        onBlur(e) {
            this.$emit('blur', e);
            // 尝试调用ai-form的验证方法
            uni.$util.formValidate(this, 'blur');
        },
        onLinechange(e) {
            this.$emit('linechange', e);
        },
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
        onConfirm(e) {
            this.$emit('confirm', e);
        },
        onKeyboardheightchange(e) {
            this.$emit('keyboardheightchange', e);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-textarea {
    border-radius: 8rpx;
    background-color: #fff;
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1;
    padding: 18rpx;

    &--radius {
        border-radius: 8rpx;
    }

    &--no-radius {
        border-radius: 0;
    }

    &--disabled {
        background-color: #f5f7fa;
    }

    &__field {
        flex: 1;
        font-size: 30rpx;
        color: $color-dark;
        width: 100%;
    }

    &__count {
        position: absolute;
        right: 10rpx;
        bottom: 4rpx;
        font-size: 24rpx;
        color: $color-gray;
        background-color: #ffffff;
        padding: 2rpx 8rpx;
    }
}
</style>
