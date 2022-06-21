<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:46:53
 * @Description: 自定义导航栏
-->

<template>
    <view class="ai-navbar">
        <view
            v-if="fixed && placeholder"
            class="ai-navbar__placeholder"
            :style="{
                height: $util.addUnit($util.getPx(height) + $util.sys().statusBarHeight),
            }"
        />
        <view :class="[fixed && 'ai-navbar--fixed']">
            <ai-status-bar v-if="safeAreaInsetTop" :background="background" />
            <view
                class="ai-navbar__content"
                :class="[border && 'ai-border--bottom']"
                :style="{
                    height: $util.addUnit(height),
                    backgroundColor: background,
                }"
            >
                <view
                    class="ai-navbar__content__left"
                    hover-class="ai-navbar__content__left--hover"
                    hover-start-time="150"
                    @click="leftClick"
                >
                    <slot name="left">
                        <ai-icon v-if="leftIcon" :name="leftIcon" :size="leftIconSize" :color="leftIconColor" />
                        <text
                            v-if="leftText"
                            :style="{
                                color: leftIconColor,
                            }"
                            class="ai-navbar__content__left__text"
                            >{{ leftText }}</text
                        >
                    </slot>
                </view>
                <slot name="center">
                    <text
                        class="ai-line-1 ai-navbar__content__title"
                        :style="{
                            width: $util.addUnit(titleWidth),
                        }"
                        >{{ title }}</text
                    >
                </slot>
                <view
                    v-if="$slots.right || rightIcon || rightText"
                    class="ai-navbar__content__right"
                    @click="rightClick"
                >
                    <slot name="right">
                        <ai-icon v-if="rightIcon" :name="rightIcon" size="20" />
                        <text v-if="rightText" class="ai-navbar__content__right__text">{{ rightText }}</text>
                    </slot>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiNavbar',
    mixins: [mixins],
    props: {
        // 是否开启顶部安全区适配
        safeAreaInsetTop: {
            type: Boolean,
            default: true,
        },
        // 固定在顶部时，是否生成一个等高元素，以防止塌陷
        placeholder: {
            type: Boolean,
            default: false,
        },
        // 是否固定在顶部
        fixed: {
            type: Boolean,
            default: true,
        },
        // 是否显示下边框
        border: {
            type: Boolean,
            default: false,
        },
        // 左边的图标
        leftIcon: {
            type: String,
            default: 'arrow-left',
        },
        // 左边的提示文字
        leftText: {
            type: String,
            default: '',
        },
        // 左右的提示文字
        rightText: {
            type: String,
            default: '',
        },
        // 右边的图标
        rightIcon: {
            type: String,
            default: '',
        },
        // 标题
        title: {
            type: [String, Number],
            default: '',
        },
        // 背景颜色
        background: {
            type: String,
            default: '#ffffff',
        },
        // 标题的宽度
        titleWidth: {
            type: [String, Number],
            default: '400rpx',
        },
        // 导航栏高度
        height: {
            type: [String, Number],
            default: '88rpx',
        },
        // 左侧返回图标的大小
        leftIconSize: {
            type: [String, Number],
            default: 20,
        },
        // 左侧返回图标的颜色
        leftIconColor: {
            type: String,
            default: uni.$config['color-default'],
        },
        // 点击左侧区域(返回图标)，是否自动返回上一页
        autoBack: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {};
    },
    methods: {
        // 点击左侧区域
        leftClick() {
            // 如果配置了autoBack，自动返回上一页
            this.$emit('leftClick');
            if (this.autoBack) {
                uni.navigateBack();
            }
        },
        // 点击右侧区域
        rightClick() {
            this.$emit('rightClick');
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-navbar {
    &--fixed {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 11;
    }

    &__content {
        flex-direction: row;
        align-items: center;
        height: 88rpx;
        background-color: #9acafc;
        position: relative;
        justify-content: center;

        &__left,
        &__right {
            padding: 0 26rpx;
            position: absolute;
            top: 0;
            bottom: 0;
            flex-direction: row;
            align-items: center;
        }

        &__left {
            left: 0;

            &--hover {
                opacity: 0.7;
            }

            &__text {
                font-size: 30rpx;
                margin-left: 6rpx;
            }
        }

        &__title {
            text-align: center;
            font-size: 32rpx;
            color: $color-default;
        }

        &__right {
            right: 0;

            &__txet {
                font-size: 30rpx;
                margin-left: 6rpx;
            }
        }
    }
}
</style>
