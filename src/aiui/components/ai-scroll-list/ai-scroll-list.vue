<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:38
 * @Description: 横向滚动列表
-->

<template>
    <view ref="ai-scroll-list" class="ai-scroll-list">
        <!-- #ifdef APP-NVUE -->
        <!-- nvue使用bindingX实现，以得到更好的性能 -->
        <scroller
            ref="ai-scroll-list__scroll-view"
            class="ai-scroll-list__scroll-view"
            scroll-direction="horizontal"
            :show-scrollbar="false"
            :offset-accuracy="1"
            @scroll="nvueScrollHandler"
        >
            <view class="ai-scroll-list__scroll-view__content">
                <slot />
            </view>
        </scroller>
        <!-- #endif -->
        <!-- #ifndef APP-NVUE -->
        <!-- #ifdef MP-WEIXIN || APP-VUE || H5 || MP-QQ -->
        <!-- 以上平台，支持wxs -->
        <scroll-view
            class="ai-scroll-list__scroll-view"
            scroll-x
            :data-scrollWidth="scrollWidth"
            :data-barWidth="$util.getPx(indicatorBarWidth)"
            :data-indicatorWidth="$util.getPx(indicatorWidth)"
            :show-scrollbar="false"
            :upper-threshold="0"
            :lower-threshold="0"
            @scroll="wxs.scroll"
            @scrolltoupper="wxs.scrolltoupper"
            @scrolltolower="wxs.scrolltolower"
        >
            <!-- #endif -->
            <!-- #ifndef APP-NVUE || MP-WEIXIN || H5 || APP-VUE || MP-QQ -->
            <!-- 非以上平台，只能使用普通js实现 -->
            <scroll-view
                class="ai-scroll-list__scroll-view"
                scroll-x
                :show-scrollbar="false"
                :upper-threshold="0"
                :lower-threshold="0"
                @scroll="scrollHandler"
                @scrolltoupper="scrolltoupperHandler"
                @scrolltolower="scrolltolowerHandler"
            >
                <!-- #endif -->
                <view class="ai-scroll-list__scroll-view__content">
                    <slot />
                </view>
            </scroll-view>
            <!-- #endif -->
            <view v-if="indicator" class="ai-scroll-list__indicator" :style="[$util.addStyle(indicatorStyle)]">
                <view class="ai-scroll-list__indicator__line" :style="[lineStyle]">
                    <view
                        ref="ai-scroll-list__indicator__line__bar"
                        class="ai-scroll-list__indicator__line__bar"
                        :style="[barStyle]"
                    />
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<!-- #ifndef APP-NVUE || MP-WEIXIN || H5 || APP-VUE || MP-QQ -->
<script src="./scrollWxs.wxs" module="wxs" lang="wxs"></script>
<!-- #endif -->

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
import nvueMixin from './nvue.js';
// #endif

export default {
    name: 'ai-scroll-list',
    mixins: [mixins],
    // #ifdef APP-NVUE
    mixins: [mixins, nvueMixin],
    // #endif
    props: {
        // 指示器的整体宽度
        indicatorWidth: {
            type: [String, Number],
            default: 50,
        },
        // 滑块的宽度
        indicatorBarWidth: {
            type: [String, Number],
            default: 20,
        },
        // 是否显示面板指示器
        indicator: {
            type: Boolean,
            default: true,
        },
        // 指示器非激活颜色
        indicatorColor: {
            type: String,
            default: '#f2f2f2',
        },
        // 指示器的激活颜色
        indicatorActiveColor: {
            type: String,
            default: '#3c9cff',
        },
        // 指示器样式，可通过bottom，left，right进行定位
        indicatorStyle: {
            type: [String, Object],
            default: '',
        },
    },
    data() {
        return {
            scrollInfo: {
                scrollLeft: 0,
                scrollWidth: 0,
            },
            scrollWidth: 0,
        };
    },
    computed: {
        // 指示器为线型的样式
        barStyle() {
            const style = {};
            // #ifndef APP-NVUE || MP-WEIXIN || H5 || APP-VUE || MP-QQ
            // 此为普通js方案，只有在非nvue和不支持wxs方案的端才使用、
            // 此处的计算理由为：scroll-view的滚动距离与目标滚动距离(scroll-view的实际宽度减去包裹元素的宽度)之比，等于滑块当前移动距离与总需
            // 滑动距离(指示器的总宽度减去滑块宽度)的比值
            const scrollLeft = this.scrollInfo.scrollLeft,
                scrollWidth = this.scrollInfo.scrollWidth,
                barAllMoveWidth = this.indicatorWidth - this.indicatorBarWidth;
            const x = (scrollLeft / (scrollWidth - this.scrollWidth)) * barAllMoveWidth;
            style.transform = `translateX(${x}px)`;
            // #endif
            // 设置滑块的宽度和背景色，是每个平台都需要的
            style.width = uni.$util.addUnit(this.indicatorBarWidth);
            style.backgroundColor = this.indicatorActiveColor;
            return style;
        },
        lineStyle() {
            const style = {};
            // 指示器整体的样式，需要设置其宽度和背景色
            style.width = uni.$util.addUnit(this.indicatorWidth);
            style.backgroundColor = this.indicatorColor;
            return style;
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getComponentWidth();
        },
        // #ifndef APP-NVUE || MP-WEIXIN || H5 || APP-VUE || MP-QQ
        // scroll-view触发滚动事件
        scrollHandler(e) {
            this.scrollInfo = e.detail;
        },
        scrolltoupperHandler() {
            this.scrollEvent('left');
            this.scrollInfo.scrollLeft = 0;
        },
        scrolltolowerHandler() {
            this.scrollEvent('right');
            // 在普通js方案中，滚动到右边时，通过设置this.scrollInfo，模拟出滚动到右边的情况
            // 因为上方是用过computed计算的，设置后，会自动调整滑块的位置
            this.scrollInfo.scrollLeft = uni.$util.getPx(this.indicatorWidth) - uni.$util.getPx(this.indicatorBarWidth);
        },
        // #endif
        //
        scrollEvent(status) {
            this.$emit(status);
        },
        // 获取组件的宽度
        async getComponentWidth() {
            // 延时一定时间，以获取dom尺寸
            await uni.$util.sleep(30);
            // #ifndef APP-NVUE
            this.getRect('.ai-scroll-list').then((size) => {
                this.scrollWidth = size.width;
            });
            // #endif

            // #ifdef APP-NVUE
            const ref = this.$refs['ai-scroll-list'];
            ref &&
                dom.getComponentRect(ref, (res) => {
                    this.scrollWidth = res.size.width;
                });
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-scroll-list {
    padding-bottom: 20rpx;

    &__scroll-view {
        display: flex;
        flex-direction: row;

        &__content {
            display: flex;
            flex-direction: row;
        }
    }

    &__indicator {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 30rpx;

        &__line {
            width: 120rpx;
            height: 8rpx;
            border-radius: 200rpx;
            overflow: hidden;

            &__bar {
                width: 40rpx;
                height: 8rpx;
                border-radius: 200rpx;
            }
        }
    }
}
</style>
