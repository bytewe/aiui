<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:40
 * @Description: 进度条
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能">
            <ai-line-progress :percentage="percentage1" />
        </ai-box>

        <ai-box title="不显示百分比">
            <ai-line-progress :show-text="false" :percentage="percentage2" />
        </ai-box>

        <ai-box title="自定义高度">
            <ai-line-progress height="8" :show-text="false" :percentage="percentage3" />
        </ai-box>

        <ai-box title="自定义颜色">
            <ai-line-progress
                height="8"
                :show-text="false"
                :percentage="percentage4"
                active-color="#3c9cff"
                inactive-color="#f3f4f6"
            />
        </ai-box>

        <ai-box v-if="!androidNvue" title="自定义样式(不支持安卓环境的nvue)">
            <ai-line-progress
                height="8"
                :show-text="false"
                :percentage="percentage5"
                active-color="#3c9cff"
                inactive-color="#f3f4f6"
            >
                <text class="progress__slot">{{ percentage4 }}%</text>
            </ai-line-progress>
        </ai-box>

        <ai-box title="手动加减">
            <ai-line-progress
                height="8"
                :show-text="false"
                :percentage="percentage6"
                active-color="#3c9cff"
                inactive-color="#f3f4f6"
            />
        </ai-box>

        <ai-box>
            <view class="progress__footer">
                <view class="progress__button" hover-class="ai-hover-class" @click="computedWidth('minus')">
                    <text class="progress__button__text">减少</text>
                </view>
                <view class="progress__button" hover-class="ai-hover-class" @click="computedWidth('plus')">
                    <text class="progress__button__text">增加</text>
                </view>
            </view>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            androidNvue: false,
            percentage1: 30,
            percentage2: 40,
            percentage3: 50,
            percentage4: 60,
            percentage5: 70,
            percentage6: 50,
        };
    },
    onLoad() {
        // #ifdef APP-NVUE
        this.androidNvue = uni.$util.os() === 'android';
        // #endif
        uni.$util.sleep(2500).then(() => {
            this.percentage1 = 120;
        });
    },
    methods: {
        computedWidth(type) {
            if (type === 'plus') {
                this.percentage6 = uni.$util.range(0, 100, this.percentage6 + 10);
            } else {
                this.percentage6 = uni.$util.range(0, 100, this.percentage6 - 10);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.progress {
    &__slot {
        padding: 2rpx 10rpx;
        margin-right: -10rpx;
        border-radius: 200rpx;
        background-color: $color-warning;
        font-size: 20rpx;
        color: #fff;
    }

    &__footer {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    &__button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100rpx;
        height: 100rpx;
        margin: 60rpx 60rpx;
        border-radius: 200rpx;
        background-color: #dbfbdb;

        &__text {
            font-size: 26rpx;
            color: rgb(25, 190, 107);
        }
    }
}
</style>
