<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:42
 * @Description: 搜索框
-->

<template>
    <view class="ai-search" :style="[{ margin: margin }, $util.addStyle(customStyle)]" @click="onClick">
        <view
            class="ai-search__content"
            :style="{
                backgroundColor: background,
                borderRadius: shape == 'round' ? '200rpx' : '8rpx',
                borderColor: borderColor,
                height: $util.addUnit(height),
            }"
        >
            <template v-if="$slots.label || label !== null">
                <slot name="label">
                    <text class="ai-search__content__label">{{ label }}</text>
                </slot>
            </template>
            <view class="ai-search__content__icon">
                <ai-icon
                    :size="22"
                    :name="searchIcon"
                    :color="searchIconColor ? searchIconColor : color"
                    @click="clickIcon"
                />
            </view>
            <input
                confirm-type="search"
                :value="value"
                :disabled="disabled"
                :focus="focus"
                :maxlength="maxlength"
                placeholder-class="ai-search__content__input--placeholder"
                :placeholder="placeholder"
                :placeholder-style="`color: ${placeholderColor}`"
                class="ai-search__content__input"
                type="text"
                :style="[
                    {
                        textAlign: inputAlign,
                        color: color,
                        backgroundColor: background,
                    },
                    inputStyle,
                ]"
                @blur="blur"
                @confirm="search"
                @input="inputChange"
                @focus="getFocus"
            />
            <view
                v-if="keyword && clearabled && focused"
                class="ai-search__content__icon ai-search__content__close"
                @click="clear"
            >
                <ai-icon name="close" size="11" color="#ffffff" custom-style="line-height: 24rpx" />
            </view>
        </view>
        <text
            :style="[actionStyle]"
            class="ai-search__action"
            :class="[(showActionBtn || show) && 'ai-search__action--active']"
            @click.stop.prevent="custom"
            >{{ actionText }}</text
        >
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiSearch',
    mixins: [mixins],
    props: {
        // 搜索框形状，round-圆形，square-方形
        shape: {
            type: String,
            default: 'round',
        },
        // 搜索框背景色，默认值#f2f2f2
        background: {
            type: String,
            default: '#f2f2f2',
        },
        // 占位提示文字
        placeholder: {
            type: String,
            default: '请输入关键字',
        },
        // 是否启用清除控件
        clearabled: {
            type: Boolean,
            default: true,
        },
        // 是否自动聚焦
        focus: {
            type: Boolean,
            default: false,
        },
        // 是否在搜索框右侧显示取消按钮
        showAction: {
            type: Boolean,
            default: true,
        },
        // 右边控件的样式
        actionStyle: {
            type: Object,
            default: () => ({}),
        },
        // 取消按钮文字
        actionText: {
            type: String,
            default: '搜索',
        },
        // 输入框内容对齐方式，可选值为 left|center|right
        inputAlign: {
            type: String,
            default: 'left',
        },
        // input输入框的样式，可以定义文字颜色，大小等，对象形式
        inputStyle: {
            type: Object,
            default: () => ({}),
        },
        // 是否启用输入框
        disabled: {
            type: Boolean,
            default: false,
        },
        // 边框颜色
        borderColor: {
            type: String,
            default: 'transparent',
        },
        // 搜索图标的颜色，默认同输入框字体颜色
        searchIconColor: {
            type: String,
            default: '#909399',
        },
        // 输入框字体颜色
        color: {
            type: String,
            default: '#606266',
        },
        // placeholder的颜色
        placeholderColor: {
            type: String,
            default: '#909399',
        },
        // 左边输入框的图标，可以为ai图标名称或图片路径
        searchIcon: {
            type: String,
            default: 'search',
        },
        // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"60rpx"、"60rpx 40rpx"等写法
        margin: {
            type: String,
            default: '0',
        },
        // 开启showAction时，是否在input获取焦点时才显示
        animation: {
            type: Boolean,
            default: false,
        },
        // 输入框的初始化内容
        value: {
            type: String,
            default: '',
        },
        // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
        maxlength: {
            type: [String, Number],
            default: '-1',
        },
        // 搜索框高度，单位px
        height: {
            type: [String, Number],
            default: '64rpx',
        },
        // 搜索框左侧文本
        label: {
            type: [String, Number, null],
            default: null,
        },
    },
    data() {
        return {
            keyword: '',
            showClear: false, // 是否显示右边的清除图标
            show: false,
            // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
            focused: this.focus,
            // 绑定输入框的值
            // inputValue: this.value
        };
    },
    computed: {
        showActionBtn() {
            return !this.animation && this.showAction;
        },
    },
    watch: {
        keyword(nVal) {
            // 双向绑定值，让v-model绑定的值双向变化
            this.$emit('input', nVal);
            // 触发change事件，事件效果和v-model双向绑定的效果一样，让用户多一个选择
            this.$emit('change', nVal);
        },
        value: {
            immediate: true,
            handler(nVal) {
                this.keyword = nVal;
            },
        },
    },
    methods: {
        // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
        inputChange(e) {
            this.keyword = e.detail.value;
        },
        // 清空输入
        // 也可以作为用户通过this.$refs形式调用清空输入框内容
        clear() {
            this.keyword = '';
            // 延后发出事件，避免在父组件监听clear事件时，value为更新前的值(不为空)
            this.$nextTick(() => {
                this.$emit('clear');
            });
        },
        // 确定搜索
        search(e) {
            this.$emit('search', e.detail.value);
            try {
                // 收起键盘
                uni.hideKeyboard();
            } catch (e) {
                //
            }
        },
        // 点击右边自定义按钮的事件
        custom() {
            this.$emit('custom', this.keyword);
            try {
                // 收起键盘
                uni.hideKeyboard();
            } catch (e) {
                //
            }
        },
        // 获取焦点
        getFocus() {
            this.focused = true;
            // 开启右侧搜索按钮展开的动画效果
            if (this.animation && this.showAction) this.show = true;
            this.$emit('focus', this.keyword);
        },
        // 失去焦点
        blur() {
            // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
            // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
            setTimeout(() => {
                this.focused = false;
            }, 100);
            this.show = false;
            this.$emit('blur', this.keyword);
        },
        // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
        onClick() {
            if (this.disabled) this.$emit('click');
        },
        // 点击左边图标
        clickIcon() {
            this.$emit('clickIcon');
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-search-content-padding: 0 20rpx !default;
$ai-search-label-color: $color-default !default;
$ai-search-label-font-size: 28rpx !default;
$ai-search-label-margin: 0 8rpx !default;
$ai-search-close-size: 40rpx !default;
$ai-search-close-radius: 200rpx !default;
$ai-search-close-background: #c6c7cb !default;
$ai-search-close-transform: scale(0.82) !default;
$ai-search-input-font-size: 28rpx !default;
$ai-search-input-margin: 0 10rpx !default;
$ai-search-input-color: $color-default !default;
$ai-search-input-placeholder-color: $color-gray !default;
$ai-search-action-font-size: 28rpx !default;
$ai-search-action-color: $color-default !default;
$ai-search-action-width: 0 !default;
$ai-search-action-active-width: 80rpx !default;
$ai-search-action-margin-left: 10rpx !default;

/* #ifdef H5 */
// iOS15在H5下，hx的某些版本，input type=search时，会多了一个搜索图标，进行移除
[type='search']::-webkit-search-decoration {
    display: none;
}
/* #endif */

.ai-search {
    flex-direction: row;
    align-items: center;
    flex: 1;

    &__content {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: $ai-search-content-padding;
        flex: 1;
        justify-content: space-between;
        border-width: 2rpx;
        border-color: transparent;
        border-style: solid;

        &__icon {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        &__label {
            color: $ai-search-label-color;
            font-size: $ai-search-label-font-size;
            margin: $ai-search-label-margin;
        }

        &__close {
            width: $ai-search-close-size;
            height: $ai-search-close-size;
            border-top-left-radius: $ai-search-close-radius;
            border-top-right-radius: $ai-search-close-radius;
            border-bottom-left-radius: $ai-search-close-radius;
            border-bottom-right-radius: $ai-search-close-radius;
            background-color: $ai-search-close-background;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            transform: $ai-search-close-transform;
        }

        &__input {
            flex: 1;
            font-size: $ai-search-input-font-size;
            line-height: 1;
            margin: $ai-search-input-margin;
            color: $ai-search-input-color;

            &--placeholder {
                color: $ai-search-input-placeholder-color;
            }
        }
    }

    &__action {
        font-size: $ai-search-action-font-size;
        color: $ai-search-action-color;
        width: $ai-search-action-width;
        overflow: hidden;
        transition-property: width;
        transition-duration: 0.3s;
        /* #ifndef APP-NVUE */
        white-space: nowrap;
        /* #endif */
        text-align: center;

        &--active {
            width: $ai-search-action-active-width;
            margin-left: $ai-search-action-margin-left;
        }
    }
}
</style>
