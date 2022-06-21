<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:14:55
 * @Description: 滚动通知中的垂直滚动
-->

<template>
    <view class="ai-notice" @click="onClick">
        <slot name="icon">
            <view v-if="icon" class="ai-notice__left-icon">
                <ai-icon :name="icon" :color="color" size="19" />
            </view>
        </slot>
        <swiper
            :disable-touch="disableTouch"
            :vertical="step ? false : true"
            circular
            :interval="duration"
            :autoplay="true"
            class="ai-notice__swiper"
            @change="noticeChange"
        >
            <swiper-item v-for="(item, key) in text" :key="key" class="ai-notice__swiper__item">
                <text class="ai-notice__swiper__item__text ai-line-1" :style="[textStyle]">{{ item }}</text>
            </swiper-item>
        </swiper>
        <view v-if="['link', 'closable'].includes(mode)" class="ai-notice__right-icon">
            <ai-icon v-if="mode === 'link'" name="arrow" :size="17" :color="color" />
            <ai-icon v-if="mode === 'closable'" name="close" :size="16" :color="color" @click="close" />
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    mixins: [mixins],
    props: {
        // 显示的内容，字符串
        text: {
            type: [Array],
            default: () => [],
        },
        // 是否显示左侧的音量图标
        icon: {
            type: String,
            default: 'volume',
        },
        // 通告模式，link-显示右箭头，closable-显示右侧关闭图标
        mode: {
            type: String,
            default: '',
        },
        // 文字颜色，各图标也会使用文字颜色
        color: {
            type: String,
            default: '#f9ae3d',
        },
        // 背景颜色
        background: {
            type: String,
            default: '#fdf6ec',
        },
        // 字体大小，单位px
        fontSize: {
            type: [String, Number],
            default: 14,
        },
        // 水平滚动时的滚动速度，即每秒滚动多少px(px)，这有利于控制文字无论多少时，都能有一个恒定的速度
        speed: {
            type: [String, Number],
            default: 80,
        },
        // direction = row时，是否使用步进形式滚动
        step: {
            type: Boolean,
            default: false,
        },
        // 滚动一个周期的时间长，单位ms
        duration: {
            type: [String, Number],
            default: 1500,
        },
        // 是否禁止用手滑动切换
        // 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序
        disableTouch: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            index: 0,
        };
    },
    computed: {
        // 文字内容的样式
        textStyle() {
            let style = {};
            style.color = this.color;
            style.fontSize = uni.$util.addUnit(this.fontSize);
            return style;
        },
        // 垂直或者水平滚动
        vertical() {
            if (this.mode == 'horizontal') return false;
            else return true;
        },
    },
    watch: {
        text: {
            immediate: true,
            handler(newValue) {
                if (!uni.$util.test.array(newValue)) {
                    uni.$util.error('noticebar组件direction为column时，要求text参数为数组形式');
                }
            },
        },
    },
    methods: {
        noticeChange(e) {
            this.index = e.detail.current;
        },
        // 点击通告栏
        onClick() {
            this.$emit('click', this.index);
        },
        // 点击关闭按钮
        close() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-notice {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &__left-icon {
        align-items: center;
        margin-right: 10rpx;
    }

    &__right-icon {
        margin-left: 10rpx;
        align-items: center;
    }

    &__swiper {
        height: 32rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1;

        &__item {
            display: flex;
            flex-direction: row;
            align-items: center;
            overflow: hidden;

            &__text {
                font-size: 28rpx;
                color: $color-warning;
            }
        }
    }
}
</style>
