<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-26 18:13:45
 * @Description: 轮播
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能">
            <ai-swiper :list="list1" @change="change" @click="click" />
        </ai-box>

        <ai-box title="带标题">
            <ai-swiper :list="list2" key-name="image" show-title :autoplay="false" circular />
        </ai-box>

        <ai-box title="带指示器">
            <ai-swiper :list="list3" indicator indicator-mode="line" circular />
        </ai-box>

        <ai-box title="加载中">
            <ai-swiper :list="list3" loading />
        </ai-box>

        <ai-box title="嵌入视频">
            <ai-swiper :list="list4" key-name="url" :autoplay="false" />
        </ai-box>

        <ai-box title="自定义指示器">
            <ai-swiper :list="list5" :autoplay="false" @change="(e) => (current = e.current)">
                <view slot="indicator" class="swiper__indicator">
                    <view
                        v-for="(item, index) in list5"
                        :key="index"
                        class="swiper__indicator__dot"
                        :class="[index === current && 'swiper__indicator__dot--active']"
                    />
                </view>
            </ai-swiper>
        </ai-box>

        <ai-box>
            <ai-swiper
                :list="list6"
                :autoplay="false"
                indicator-style="right: 40rpx"
                @change="(e) => (currentNum = e.current)"
            >
                <view slot="indicator" class="swiper__indicator-num">
                    <text class="swiper__indicator-num__text">{{ currentNum + 1 }}/{{ list6.length }}</text>
                </view>
            </ai-swiper>
        </ai-box>

        <!-- #ifndef APP-NVUE || MP-TOUTIAO -->
        <ai-box title="卡片式">
            <ai-swiper
                :list="list3"
                previous-margin="30"
                next-margin="30"
                circular
                :autoplay="false"
                radius="5"
                background="#ffffff"
            />
        </ai-box>
        <!-- #endif -->
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            current: 0,
            currentNum: 0,
            list: [
                {
                    image: `${uni.$config.static}swiper/swiper1.png`,
                    title: '昨夜星辰昨夜风，画楼西畔桂堂东',
                    poster: `${uni.$config.static}swiper/swiper1.png`,
                },
                {
                    image: `${uni.$config.static}swiper/swiper2.png`,
                    title: '身无彩凤双飞翼，心有灵犀一点通',
                },
                {
                    image: `${uni.$config.static}swiper/swiper3.png`,
                    title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
                },
            ],
            list1: [
                `${uni.$config.static}swiper/swiper1.png`,
                `${uni.$config.static}swiper/swiper2.png`,
                `${uni.$config.static}swiper/swiper3.png`,
            ],
            list2: [
                {
                    image: `${uni.$config.static}swiper/swiper2.png`,
                    title: '昨夜星辰昨夜风，画楼西畔桂堂东',
                },
                {
                    image: `${uni.$config.static}swiper/swiper1.png`,
                    title: '身无彩凤双飞翼，心有灵犀一点通',
                },
                {
                    image: `${uni.$config.static}swiper/swiper3.png`,
                    title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
                },
            ],
            list3: [
                `${uni.$config.static}swiper/swiper3.png`,
                `${uni.$config.static}swiper/swiper2.png`,
                `${uni.$config.static}swiper/swiper1.png`,
            ],
            list4: [
                {
                    url: `${uni.$config.static}resources/video.mp4`,
                    title: '昨夜星辰昨夜风，画楼西畔桂堂东',
                    poster: `${uni.$config.static}swiper/swiper1.png`,
                },
                {
                    url: `${uni.$config.static}swiper/swiper2.png`,
                    title: '身无彩凤双飞翼，心有灵犀一点通',
                },
                {
                    url: `${uni.$config.static}swiper/swiper3.png`,
                    title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
                },
            ],
            list5: [
                `${uni.$config.static}swiper/swiper3.png`,
                `${uni.$config.static}swiper/swiper2.png`,
                `${uni.$config.static}swiper/swiper1.png`,
            ],
            list6: [
                `${uni.$config.static}swiper/swiper2.png`,
                `${uni.$config.static}swiper/swiper3.png`,
                `${uni.$config.static}swiper/swiper1.png`,
            ],
        };
    },
    methods: {
        change(e) {
            console.log('change', e);
        },
        click(e) {
            console.log('click', e);
        },
    },
};
</script>

<style lang="scss" scoped>
.swiper {
    &__indicator {
        flex-direction: row;
        justify-content: center;

        &__dot {
            height: 12rpx;
            width: 12rpx;
            border-radius: 200rpx;
            background-color: rgba(255, 255, 255, 0.35);
            margin: 0 10rpx;
            transition: background-color 0.3s;

            &--active {
                background-color: #ffffff;
            }
        }
    }

    &__indicator-num {
        padding: 4rpx 0;
        background-color: rgba(0, 0, 0, 0.35);
        border-radius: 200rpx;
        width: 70rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;

        &__text {
            color: #ffffff;
            font-size: 24rpx;
        }
    }
}
</style>
