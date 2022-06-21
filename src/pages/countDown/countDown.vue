<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:24
 * @Description: 倒计时
-->

<template>
    <ai-page background="white">
        <ai-box title="基础用法">
            <ai-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss" auto-start millisecond @finish="finish" />
        </ai-box>

        <ai-box title="自定义格式">
            <ai-count-down :time="30 * 60 * 60 * 1000" format="DD:HH:mm:ss" auto-start millisecond @change="onChange">
                <view class="count-down__time">
                    <text class="count-down__time__text">{{ timeData.days }}&nbsp;天</text>
                    <text class="count-down__time__text"
                        >{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}&nbsp;时</text
                    >
                    <text class="count-down__time__text">{{ timeData.minutes }}&nbsp;分</text>
                    <text class="count-down__time__text">{{ timeData.seconds }}&nbsp;秒</text>
                </view>
            </ai-count-down>
        </ai-box>

        <ai-box title="毫秒级渲染">
            <ai-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss:SSS" auto-start millisecond />
        </ai-box>

        <ai-box title="自定义样式">
            <ai-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss" auto-start millisecond @change="onChange">
                <view class="count-down__custom">
                    <text class="count-down__custom__text">{{
                        timeData.hours > 10 ? timeData.hours : '0' + timeData.hours
                    }}</text>
                    <text class="count-down__custom__doc">:</text>
                    <text class="count-down__custom__text">{{ timeData.minutes }}</text>
                    <text class="count-down__custom__doc">:</text>
                    <text class="count-down__custom__text">{{ timeData.seconds }}</text>
                </view>
            </ai-count-down>
        </ai-box>

        <ai-box title="手动控制">
            <ai-count-down ref="countDown" :time="3 * 1000" format="ss:SSS" :auto-start="false" millisecond />
        </ai-box>

        <ai-box>
            <ai-grid border>
                <ai-grid-item @click="reset">
                    <view class="count-down__button">
                        <ai-icon name="replay" />
                        <text class="count-down__button__text">重置</text>
                    </view>
                </ai-grid-item>
                <ai-grid-item @click="start">
                    <view class="count-down__button">
                        <ai-icon name="play-circle--fill" color="primary" />
                        <text class="count-down__button__text">开始</text>
                    </view>
                </ai-grid-item>
                <ai-grid-item @click="pause">
                    <view class="count-down__button">
                        <ai-icon name="pause-circle" />
                        <text class="count-down__button__text">暂停</text>
                    </view>
                </ai-grid-item>
            </ai-grid>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            timeData: {},
        };
    },
    onLoad() {},
    methods: {
        //开始
        start() {
            this.$refs.countDown.start();
        },
        // 暂停
        pause() {
            this.$refs.countDown.pause();
        },
        // 重置
        reset() {
            this.$refs.countDown.reset();
        },
        onChange(e) {
            this.timeData = e;
        },
        finish() {
            console.log('finish');
        },
    },
};
</script>

<style lang="scss" scoped>
.count-down {
    &__time {
        display: flex;
        flex-direction: row;
        align-items: center;

        &__text {
            margin-right: 8rpx;
            color: #606266;
            font-size: 30rpx;
        }
    }

    &__custom {
        display: flex;
        flex-direction: row;
        align-items: center;

        &__doc {
            color: $color-primary;
            padding: 0rpx 8rpx;
        }

        &__text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 44rpx;
            height: 44rpx;
            margin-top: 8rpx;
            border-radius: 8rpx;
            background-color: $color-primary;
            font-size: 24rpx;
            color: #fff;
            text-align: center;
        }
    }

    &__button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 140rpx;
        height: 140rpx;

        &__text {
            margin-left: 12rpx;
            font-size: 28rpx;
            color: #909399;
        }
    }
}
</style>
