<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-15 19:10:01
 * @Description: 滚动通知
-->

<template>
    <view
        v-if="show"
        class="ai-notice-bar"
        :style="[
            {
                backgroundColor: background,
            },
            $util.addStyle(customStyle),
        ]"
    >
        <template v-if="direction === 'column' || (direction === 'row' && step)">
            <ai-column-notice
                :color="color"
                :background="background"
                :text="text"
                :mode="mode"
                :step="step"
                :icon="icon"
                :disable-touch="disableTouch"
                :font-size="fontSize"
                :duration="duration"
                @close="close"
                @click="click"
            />
        </template>
        <template v-else>
            <ai-row-notice
                :color="color"
                :background="background"
                :text="text"
                :mode="mode"
                :font-size="fontSize"
                :speed="speed"
                :url="url"
                :link-type="linkType"
                :icon="icon"
                @close="close"
                @click="click"
            />
        </template>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiNoticeBar',
    mixins: [mixins],
    props: {
        // 显示的内容，数组
        text: {
            type: [Array, String],
            default: () => [],
        },
        // 通告滚动模式，row-横向滚动，column-竖向滚动
        direction: {
            type: String,
            default: 'row',
        },
        // direction = row时，是否使用步进形式滚动
        step: {
            type: Boolean,
            default: false,
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
        // 水平滚动时的滚动速度，即每秒滚动多少px(px)，这有利于控制文字无论多少时，都能有一个恒定的速度
        speed: {
            type: [String, Number],
            default: 80,
        },
        // 字体大小
        fontSize: {
            type: [String, Number],
            default: 14,
        },
        // 滚动一个周期的时间长，单位ms
        duration: {
            type: [String, Number],
            default: 2000,
        },
        // 是否禁止用手滑动切换
        // 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序
        disableTouch: {
            type: Boolean,
            default: true,
        },
        // 跳转的页面路径
        url: {
            type: String,
            default: '',
        },
        // 页面跳转的类型
        linkType: {
            type: String,
            default: 'navigateTo',
        },
    },
    data() {
        return {
            show: true,
        };
    },
    methods: {
        // 点击通告栏
        click(index) {
            this.$emit('click', index);
            if (this.url && this.linkType) {
                // 此方法写在mixin中，另外跳转的url和linkType参数也在mixin的props中
                this.openPage();
            }
        },
        // 点击关闭按钮
        close() {
            this.show = false;
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-notice-bar {
    overflow: hidden;
    padding: 18rpx 24rpx;
    flex: 1;
}
</style>
