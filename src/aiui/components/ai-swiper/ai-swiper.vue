<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:26:11
 * @Description: 轮播图
-->

<template>
    <view
        class="ai-swiper"
        :style="{
            backgroundColor: background,
            height: $util.addUnit(height),
            borderRadius: $util.addUnit(radius),
        }"
    >
        <view v-if="loading" class="ai-swiper__loading">
            <ai-loading-icon mode="circle" />
        </view>
        <swiper
            v-else
            class="ai-swiper__wrapper"
            :style="{
                height: $util.addUnit(height),
            }"
            :circular="circular"
            :interval="interval"
            :duration="duration"
            :autoplay="autoplay"
            :current="current"
            :current-item-id="currentItemId"
            :previous-margin="$util.addUnit(previousMargin)"
            :next-margin="$util.addUnit(nextMargin)"
            :acceleration="acceleration"
            :display-multiple-items="displayMultipleItems"
            :easing-function="easingFunction"
            @change="change"
        >
            <swiper-item v-for="(item, index) in list" :key="index" class="ai-swiper__wrapper__item">
                <view class="ai-swiper__wrapper__item__wrapper" :style="[itemStyle(index)]">
                    <!-- 在nvue中，image图片的宽度默认为屏幕宽度，需要通过flex:1撑开，另外必须设置高度才能显示图片 -->
                    <image
                        v-if="$util.test.image(getSource(item))"
                        class="ai-swiper__wrapper__item__wrapper__image"
                        :src="getSource(item)"
                        :mode="imageMode"
                        :style="{
                            height: $util.addUnit(height),
                            borderRadius: $util.addUnit(radius),
                        }"
                        @click="onClick(index)"
                    />
                    <video
                        v-if="$util.test.video(getSource(item))"
                        :id="`video-${index}`"
                        class="ai-swiper__wrapper__item__wrapper__video"
                        :enable-progress-gesture="false"
                        :src="getSource(item)"
                        :poster="getPoster(item)"
                        :title="showTitle && $util.test.object(item) && item.title ? item.title : ''"
                        :style="{
                            height: $util.addUnit(height),
                        }"
                        controls
                        @click="onClick(index)"
                    />
                    <text
                        v-if="showTitle && $util.test.object(item) && item.title && $util.test.image(getSource(item))"
                        class="ai-swiper__wrapper__item__wrapper__title ai-line-1"
                        >{{ item.title }}</text
                    >
                </view>
            </swiper-item>
        </swiper>
        <view class="ai-swiper__indicator" :style="[$util.addStyle(indicatorStyle)]">
            <slot name="indicator">
                <ai-swiper-indicator
                    v-if="!loading && indicator && !showTitle"
                    :indicator-active-color="indicatorActiveColor"
                    :indicator-inactive-color="indicatorInactiveColor"
                    :length="list.length"
                    :current="currentIndex"
                    :indicator-mode="indicatorMode"
                />
            </slot>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiSwiper',
    mixins: [mixins],
    props: {
        // 列表数组，元素可为字符串，如为对象可通过keyName指定目标属性名
        list: {
            type: Array,
            default: () => [],
        },
        // 是否显示面板指示器
        indicator: {
            type: Boolean,
            default: false,
        },
        // 指示器非激活颜色
        indicatorActiveColor: {
            type: String,
            default: '#FFFFFF',
        },
        // 指示器的激活颜色
        indicatorInactiveColor: {
            type: String,
            default: 'rgba(255, 255, 255, 0.35)',
        },
        // 指示器样式，可通过bottom，left，right进行定位
        indicatorStyle: {
            type: [String, Object],
            default: '',
        },
        // 指示器模式，line-线型，dot-点型
        indicatorMode: {
            type: String,
            default: 'line',
        },
        // 是否自动切换
        autoplay: {
            type: Boolean,
            default: true,
        },
        // 当前所在滑块的 index
        current: {
            type: [String, Number],
            default: 0,
        },
        // 当前所在滑块的 item-id ，不能与 current 被同时指定
        currentItemId: {
            type: String,
            default: '',
        },
        // 滑块自动切换时间间隔
        interval: {
            type: [String, Number],
            default: 3000,
        },
        // 滑块切换过程所需时间
        duration: {
            type: [String, Number],
            default: 300,
        },
        // 播放到末尾后是否重新回到开头
        circular: {
            type: Boolean,
            default: false,
        },
        // 前边距，可用于露出前一项的一小部分，nvue和支付宝不支持
        previousMargin: {
            type: [String, Number],
            default: 0,
        },
        // 后边距，可用于露出后一项的一小部分，nvue和支付宝不支持
        nextMargin: {
            type: [String, Number],
            default: 0,
        },
        // 当开启时，会根据滑动速度，连续滑动多屏，支付宝不支持
        acceleration: {
            type: Boolean,
            default: false,
        },
        // 同时显示的滑块数量，nvue、支付宝小程序不支持
        displayMultipleItems: {
            type: Number,
            default: 1,
        },
        // 指定swiper切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
        // 只对微信小程序有效
        easingFunction: {
            type: String,
            default: 'default',
        },
        // list数组中指定对象的目标属性名
        keyName: {
            type: String,
            default: 'url',
        },
        // 图片的裁剪模式
        imageMode: {
            type: String,
            default: 'aspectFill',
        },
        // 组件高度
        height: {
            type: [String, Number],
            default: 130,
        },
        // 背景颜色
        background: {
            type: String,
            default: '#f3f4f6',
        },
        // 组件圆角，数值或带单位的字符串
        radius: {
            type: [String, Number],
            default: 4,
        },
        // 是否加载中
        loading: {
            type: Boolean,
            default: false,
        },
        // 是否显示标题，要求数组对象中有title属性
        showTitle: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentIndex: 0,
        };
    },
    computed: {
        itemStyle() {
            return (index) => {
                const style = {};
                // #ifndef APP-NVUE || MP-TOUTIAO
                // 左右流出空间的写法不支持nvue和头条
                // 只有配置了此二值，才加上对应的圆角，以及缩放
                if (this.nextMargin && this.previousMargin) {
                    style.borderRadius = uni.$util.addUnit(this.radius);
                    if (index !== this.currentIndex) style.transform = 'scale(0.92)';
                }
                // #endif
                return style;
            };
        },
    },
    watch: {
        current(val, preVal) {
            if (val === preVal) return;
            this.currentIndex = val; // 和上游数据关联上
        },
    },
    methods: {
        // 获取目标路径，可能数组中为字符串，对象的形式，额外可指定对象的目标属性名keyName
        getSource(item) {
            if (typeof item === 'string') return item;
            if (typeof item === 'object' && this.keyName) return item[this.keyName];
            else uni.$util.error('请按格式传递列表参数');
            return '';
        },
        // 轮播切换事件
        change(e) {
            // 当前的激活索引
            const { current } = e.detail;
            this.pauseVideo(this.currentIndex);
            this.currentIndex = current;
            this.$emit('change', e.detail);
        },
        // 切换轮播时，暂停视频播放
        pauseVideo(index) {
            const lastItem = this.getSource(this.list[index]);
            if (uni.$util.test.video(lastItem)) {
                // 当视频隐藏时，暂停播放
                const video = uni.createVideoContext(`video-${index}`, this);
                video.pause();
            }
        },
        // 当一个轮播item为视频时，获取它的视频海报
        getPoster(item) {
            return typeof item === 'object' && item.poster ? item.poster : '';
        },
        // 点击某个item
        onClick(index) {
            this.$emit('click', index);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-swiper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    &__wrapper {
        flex: 1;

        &__item {
            flex: 1;

            &__wrapper {
                display: flex;
                flex-direction: row;
                position: relative;
                overflow: hidden;
                transition: transform 0.3s;
                flex: 1;

                &__image {
                    flex: 1;
                }

                &__video {
                    flex: 1;
                }

                &__title {
                    position: absolute;
                    background-color: rgba(0, 0, 0, 0.3);
                    bottom: 0;
                    left: 0;
                    right: 0;
                    font-size: 28rpx;
                    padding: 12rpx 24rpx;
                    color: #ffffff;
                    flex: 1;
                }
            }
        }
    }

    &__indicator {
        position: absolute;
        bottom: 20rpx;
    }
}
</style>
