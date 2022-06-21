<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:26:14
 * @Description: 轮播图指示器
-->

<template>
    <view class="ai-swiper-indicator">
        <view
            v-if="indicatorMode === 'line'"
            class="ai-swiper-indicator__wrapper"
            :class="[`ai-swiper-indicator__wrapper--${indicatorMode}`]"
            :style="{
                width: $util.addUnit(lineWidth * length),
                backgroundColor: indicatorInactiveColor,
            }"
        >
            <view class="ai-swiper-indicator__wrapper--line__bar" :style="[lineStyle]" />
        </view>
        <view v-if="indicatorMode === 'dot'" class="ai-swiper-indicator__wrapper">
            <view
                v-for="(item, index) in length"
                :key="index"
                class="ai-swiper-indicator__wrapper__dot"
                :class="[index === current && 'ai-swiper-indicator__wrapper__dot--active']"
                :style="[dotStyle(index)]"
            />
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiSwiperIndicator',
    mixins: [mixins],
    props: {
        // 轮播的长度
        length: {
            type: [String, Number],
            default: 0,
        },
        // 当前处于活动状态的轮播的索引
        current: {
            type: [String, Number],
            default: 0,
        },
        // 指示器非激活颜色
        indicatorActiveColor: {
            type: String,
            default: '',
        },
        // 指示器的激活颜色
        indicatorInactiveColor: {
            type: String,
            default: '',
        },
        // 指示器模式，line-线型，dot-点型
        indicatorMode: {
            type: String,
            default: 'line',
        },
    },
    data() {
        return {
            lineWidth: 22,
        };
    },
    computed: {
        // 指示器为线型的样式
        lineStyle() {
            let style = {};
            style.width = uni.$util.addUnit(this.lineWidth);
            style.transform = `translateX(${this.current * this.lineWidth}px)`;
            style.backgroundColor = this.indicatorActiveColor;
            return style;
        },
        // 指示器为点型的样式
        dotStyle() {
            return (index) => {
                let style = {};
                style.backgroundColor =
                    index === this.current ? this.indicatorActiveColor : this.indicatorInactiveColor;
                return style;
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-swiper-indicator {
    &__wrapper {
        display: flex;
        flex-direction: row;

        &--line {
            border-radius: 200rpx;
            height: 8rpx;

            &__bar {
                width: 44rpx;
                height: 8rpx;
                border-radius: 200rpx;
                background-color: #ffffff;
                transition: transform 0.3s;
            }
        }

        &__dot {
            width: 10rpx;
            height: 10rpx;
            border-radius: 200rpx;
            margin: 0 8rpx;

            &--active {
                width: 24rpx;
            }
        }
    }
}
</style>
