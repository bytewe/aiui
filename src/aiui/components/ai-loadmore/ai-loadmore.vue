<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:16:13
 * @Description: 加载更多
-->

<template>
    <view
        class="ai-loadmore"
        :style="[
            $util.addStyle(customStyle),
            {
                backgroundColor: background,
                marginBottom: $util.addUnit(marginBottom),
                marginTop: $util.addUnit(marginTop),
                height: $util.addUnit(height),
            },
        ]"
    >
        <ai-line v-if="line" length="140rpx" color="#E6E8EB" :hairline="false" />
        <!-- 加载中和没有更多的状态才显示两边的横线 -->
        <view :class="status == 'loadmore' || status == 'nomore' ? 'ai-more' : ''" class="ai-loadmore__content">
            <view v-if="status === 'loading' && icon" class="ai-loadmore__content__icon-wrap">
                <ai-loading-icon :color="iconColor" size="17" :mode="loadingIcon" />
            </view>
            <!-- 如果没有更多的状态下，显示内容为dot（粗点），加载特定样式 -->
            <text
                class="ai-line-1"
                :style="[loadTextStyle]"
                :class="[
                    status == 'nomore' && isDot == true
                        ? 'ai-loadmore__content__dot-text'
                        : 'ai-loadmore__content__text',
                ]"
                @click="loadMore"
                >{{ showText }}</text
            >
        </view>
        <ai-line v-if="line" length="140rpx" color="#E6E8EB" :hairline="false" />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiLoadmore',
    mixins: [mixins],
    props: {
        // 组件状态，loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
        status: {
            type: String,
            default: 'loadmore',
        },
        // 组件背景色
        background: {
            type: String,
            default: 'transparent',
        },
        // 是否显示加载中的图标
        icon: {
            type: Boolean,
            default: true,
        },
        // 字体大小
        fontSize: {
            type: [String, Number],
            default: 14,
        },
        // 字体颜色
        color: {
            type: String,
            default: '#606266',
        },

        // 加载中状态的图标，spinner-花朵状图标，circle-圆圈状，semicircle-半圆
        loadingIcon: {
            type: String,
            default: 'spinner',
        },
        // 加载前的提示语
        loadmoreText: {
            type: String,
            default: '加载更多',
        },
        // 加载中提示语
        loadingText: {
            type: String,
            default: '正在加载...',
        },
        // 没有更多的提示语
        nomoreText: {
            type: String,
            default: '没有更多了',
        },
        // 在“没有更多”状态下，是否显示粗点
        isDot: {
            type: Boolean,
            default: false,
        },
        // 加载中图标的颜色
        iconColor: {
            type: String,
            default: '#b7b7b7',
        },
        // 上边距
        marginTop: {
            type: [String, Number],
            default: 10,
        },
        // 下边距
        marginBottom: {
            type: [String, Number],
            default: 10,
        },
        // 高度，单位px
        height: {
            type: [String, Number],
            default: 'auto',
        },
        // 是否显示左边分割线
        line: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            // 粗点
            dotText: '●',
        };
    },
    computed: {
        // 加载的文字显示的样式
        loadTextStyle() {
            return {
                color: this.color,
                fontSize: uni.$util.addUnit(this.fontSize),
                lineHeight: uni.$util.addUnit(this.fontSize),
                backgroundColor: this.background,
            };
        },
        // 显示的提示文字
        showText() {
            let text = '';
            if (this.status == 'loadmore') text = this.loadmoreText;
            else if (this.status == 'loading') text = this.loadingText;
            else if (this.status == 'nomore' && this.isDot) text = this.dotText;
            else text = this.nomoreText;
            return text;
        },
    },
    methods: {
        loadMore() {
            // 只有在“加载更多”的状态下才发送点击事件，内容不满一屏时无法触发底部上拉事件，所以需要点击来触发
            if (this.status == 'loadmore') this.$emit('loadmore');
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-loadmore {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;

    &__content {
        margin: 0 30rpx;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &__icon-wrap {
            margin-right: 16rpx;
        }

        &__text {
            font-size: 28rpx;
            color: $color-dark;
        }

        &__dot-text {
            font-size: 30rpx;
            color: $color-gray;
        }
    }
}
</style>
