<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:13:50
 * @Description: 警告提示
-->

<template>
    <ai-transition mode="fade" :show="show">
        <view
            class="ai-alert"
            :class="[`ai-alert--${type}--${effect}`]"
            :style="[$util.addStyle(customStyle)]"
            @click.stop="onClick"
        >
            <view v-if="showIcon" class="ai-alert__icon">
                <ai-icon :name="iconName" size="36rpx" :color="iconColor" />
            </view>
            <view
                class="ai-alert__content"
                :style="[
                    {
                        paddingRight: closable ? '40rpx' : 0,
                    },
                ]"
            >
                <text
                    v-if="title"
                    class="ai-alert__content__title"
                    :style="[
                        {
                            fontSize: $util.addUnit(fontSize),
                            textAlign: center ? 'center' : 'left',
                        },
                    ]"
                    :class="[effect === 'dark' ? 'ai-alert__text--dark' : `ai-alert__text--${type}--light`]"
                    >{{ title }}</text
                >
                <text
                    v-if="description"
                    class="ai-alert__content__desc"
                    :style="[
                        {
                            fontSize: $util.addUnit(fontSize),
                            textAlign: center ? 'center' : 'left',
                        },
                    ]"
                    :class="[effect === 'dark' ? 'ai-alert__text--dark' : `ai-alert__text--${type}--light`]"
                    >{{ description }}</text
                >
            </view>
            <view v-if="closable" class="ai-alert__close" @click.stop="onClose">
                <ai-icon name="close" :color="iconColor" size="30rpx" />
            </view>
        </view>
    </ai-transition>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
export default {
    name: 'AiAlert',
    mixins: [mixins],
    props: {
        // 文字
        title: {
            type: String,
            default: '',
        },
        // 主题
        type: {
            type: String,
            default: 'warning',
        },
        // 辅助性文字
        description: {
            type: String,
            default: '',
        },
        // 是否可关闭
        closable: {
            type: Boolean,
            default: false,
        },
        // 是否显示图标
        showIcon: {
            type: Boolean,
            default: false,
        },
        // 浅或深色调，light-浅色，dark-深色
        effect: {
            type: String,
            default: 'light',
        },
        // 文字是否居中
        center: {
            type: Boolean,
            default: false,
        },
        // 字体大小
        fontSize: {
            type: [String, Number],
            default: '28rpx',
        },
    },
    data() {
        return {
            show: true,
        };
    },
    computed: {
        iconColor() {
            return this.effect === 'light' ? this.type : '#fff';
        },
        // 不同主题对应不同的图标
        iconName() {
            switch (this.type) {
                case 'success':
                    return 'check-circle--fill';
                case 'danger':
                    return 'close-circle--fill';
                case 'warning':
                    return 'info-circle--fill';
                case 'info':
                    return 'info-circle--fill';
                case 'primary':
                    return 'more-circle--fill';
                default:
                    return 'info-circle--fill';
            }
        },
    },
    methods: {
        // 点击内容
        onClick() {
            this.$emit('click');
        },
        // 点击关闭按钮
        onClose() {
            this.show = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-alert {
    position: relative;
    background-color: $color-primary;
    padding: 16rpx 20rpx;
    flex-direction: row;
    align-items: center;
    border-top-left-radius: 8rpx;
    border-top-right-radius: 8rpx;
    border-bottom-left-radius: 8rpx;
    border-bottom-right-radius: 8rpx;

    &--primary--dark {
        background-color: $color-primary;
    }

    &--primary--light {
        background-color: #ecf5ff;
    }

    &--danger--dark {
        background-color: $color-danger;
    }

    &--danger--light {
        background-color: #fef0f0;
    }

    &--success--dark {
        background-color: $color-success;
    }

    &--success--light {
        background-color: #f5fff0;
    }

    &--warning--dark {
        background-color: $color-warning;
    }

    &--warning--light {
        background-color: #fdf6ec;
    }

    &--info--dark {
        background-color: $color-info;
    }

    &--info--light {
        background-color: #f4f4f5;
    }

    &__icon {
        margin-right: 10rpx;
    }

    &__content {
        flex-direction: column;
        flex: 1;

        &__title {
            color: $color-default;
            font-size: 28rpx;
            font-weight: bold;
            color: #fff;
            margin-bottom: 4rpx;
        }

        &__desc {
            color: $color-default;
            font-size: 28rpx;
            flex-wrap: wrap;
            color: #fff;
        }
    }

    &__title--dark,
    &__desc--dark {
        color: #ffffff;
    }

    &__text--primary--light,
    &__text--primary--light {
        color: $color-primary;
    }

    &__text--success--light,
    &__text--success--light {
        color: $color-success;
    }

    &__text--warning--light,
    &__text--warning--light {
        color: $color-warning;
    }

    &__text--danger--light,
    &__text--danger--light {
        color: $color-danger;
    }

    &__text--info--light,
    &__text--info--light {
        color: $color-info;
    }

    &__close {
        position: absolute;
        top: 22rpx;
        right: 20rpx;
    }
}
</style>
