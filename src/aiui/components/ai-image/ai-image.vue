<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:15:38
 * @Description: 图片
-->

<template>
    <ai-transition mode="fade" :show="show" :duration="fade ? 1000 : 0">
        <view class="ai-image" :style="[wrapStyle, backgroundStyle]" @click="onClick">
            <image
                v-if="!isError"
                :src="src"
                :mode="mode"
                :show-menu-by-longpress="showMenuByLongpress"
                :lazy-load="lazyLoad"
                class="ai-image__image"
                :style="{
                    borderRadius: shape == 'circle' ? '20000rpx' : $util.addUnit(radius),
                    width: $util.addUnit(width),
                    height: $util.addUnit(height),
                }"
                @error="onErrorHandler"
                @load="onLoadHandler"
            />
            <view
                v-if="showLoading && loading"
                class="ai-image__loading"
                :style="{
                    borderRadius: shape == 'circle' ? '50%' : $util.addUnit(radius),
                    backgroundColor: background,
                    width: $util.addUnit(width),
                    height: $util.addUnit(height),
                }"
            >
                <slot name="loading">
                    <ai-icon :name="loadingIcon" :width="width" :height="height" />
                </slot>
            </view>
            <view
                v-if="showError && isError && !loading"
                class="ai-image__error"
                :style="{
                    borderRadius: shape == 'circle' ? '50%' : $util.addUnit(radius),
                    width: $util.addUnit(width),
                    height: $util.addUnit(height),
                }"
            >
                <slot name="error">
                    <ai-icon :name="errorIcon" :width="width" :height="height" />
                </slot>
            </view>
        </view>
    </ai-transition>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiImage',
    mixins: [mixins],
    props: {
        // 图片地址
        src: {
            type: String,
            default: '',
        },
        // 裁剪模式
        mode: {
            type: String,
            default: 'aspectFill',
        },
        // 宽度，单位任意
        width: {
            type: [String, Number],
            default: '300',
        },
        // 高度，单位任意
        height: {
            type: [String, Number],
            default: '225',
        },
        // 图片形状，circle-圆形，square-方形
        shape: {
            type: String,
            default: 'square',
        },
        // 圆角，单位任意
        radius: {
            type: [String, Number],
            default: 0,
        },
        // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
        lazyLoad: {
            type: Boolean,
            default: true,
        },
        // 图片形状，circle-圆形，square-方形
        align: {
            type: String,
            default: '',
        },
        // 开启长按图片显示识别微信小程序码菜单
        showMenuByLongpress: {
            type: Boolean,
            default: true,
        },
        // 加载中的图标，或者小图片
        loadingIcon: {
            type: String,
            default: 'photo',
        },
        // 加载失败的图标，或者小图片
        errorIcon: {
            type: String,
            default: 'info-circle',
        },
        // 是否显示加载中的图标或者自定义的slot
        showLoading: {
            type: Boolean,
            default: true,
        },
        // 是否显示加载错误的图标或者自定义的slot
        showError: {
            type: Boolean,
            default: true,
        },
        // 是否需要淡入效果
        fade: {
            type: Boolean,
            default: true,
        },
        // 只支持网络资源，只对微信小程序有效
        webp: {
            type: Boolean,
            default: false,
        },
        // 过渡时间，单位ms
        duration: {
            type: [String, Number],
            default: 500,
        },
        // 背景颜色，用于深色页面加载图片时，为了和背景色融合
        background: {
            type: String,
            default: '#f3f4f6',
        },
    },
    data() {
        return {
            // 图片是否加载错误，如果是，则显示错误占位图
            isError: false,
            // 初始化组件时，默认为加载中状态
            loading: true,
            // 不透明度，为了实现淡入淡出的效果
            opacity: 1,
            // 过渡时间，因为props的值无法修改，故需要一个中间值
            durationTime: this.duration,
            // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
            backgroundStyle: {},
            // 用于fade模式的控制组件显示与否
            show: false,
        };
    },
    computed: {
        wrapStyle() {
            let style = {};
            // 通过调用addUnit()方法，如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上rpx单位
            style.width = this.$util.addUnit(this.width);
            style.height = this.$util.addUnit(this.height);
            // 如果是显示圆形，设置一个很多的半径值即可
            style.borderRadius = this.shape == 'circle' ? '20000rpx' : uni.$util.addUnit(this.radius);
            // 如果设置圆角，必须要有hidden，否则可能圆角无效
            style.overflow = this.borderRadius > 0 ? 'hidden' : 'visible';
            switch (this.align) {
                case 'left':
                    style.alignSelf = 'flex-start';
                    break;
                case 'center':
                    style.alignSelf = 'center';
                    break;
                case 'right':
                    style.alignSelft = 'flex-end';
                    break;
            }
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
    watch: {
        src: {
            immediate: true,
            handler(n) {
                if (!n) {
                    // 如果传入null或者''，或者false，或者undefined，标记为错误状态
                    this.isError = true;
                } else {
                    this.isError = false;
                    this.loading = false;
                }
            },
        },
    },
    mounted() {
        this.show = true;
    },
    methods: {
        // 点击图片
        onClick() {
            this.$emit('click');
        },
        // 图片加载失败
        onErrorHandler(err) {
            this.loading = false;
            this.isError = true;
            this.$emit('error', err);
        },
        // 图片加载完成，标记loading结束
        onLoadHandler() {
            this.loading = false;
            this.isError = false;
            this.$emit('load');
            this.removeBackground();
        },
        // 移除图片的背景色
        removeBackground() {
            // 淡入动画过渡完成后，将背景设置为透明色，否则png图片会看到灰色的背景
            this.backgroundStyle = {
                backgroundColor: 'transparent',
            };
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-image-error-top: 0rpx !default;
$ai-image-error-left: 0rpx !default;
$ai-image-error-width: 100% !default;
$ai-image-error-hight: 100% !default;
$ai-image-error-background-color: $background-default !default;
$ai-image-error-color: $color-gray !default;
$ai-image-error-font-size: 46rpx !default;

.ai-image {
    position: relative;
    transition: opacity 0.5s ease-in-out;
    align-self: flex-start;

    &__image {
        width: 100%;
        height: 100%;
    }

    &__loading,
    &__error {
        position: absolute;
        top: $ai-image-error-top;
        left: $ai-image-error-left;
        width: $ai-image-error-width;
        height: $ai-image-error-hight;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: $ai-image-error-background-color;
        color: $ai-image-error-color;
        font-size: $ai-image-error-font-size;
    }
}
</style>
