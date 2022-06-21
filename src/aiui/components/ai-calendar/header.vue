<template>
    <view class="ai-calendar-header ai-border--bottom">
        <text v-if="showTitle" class="ai-calendar-header__title">{{ title }}</text>
        <text v-if="showSubtitle" class="ai-calendar-header__subtitle">{{ subtitle }}</text>
        <view class="ai-calendar-header__weekdays">
            <text class="ai-calendar-header__weekdays__weekday">一</text>
            <text class="ai-calendar-header__weekdays__weekday">二</text>
            <text class="ai-calendar-header__weekdays__weekday">三</text>
            <text class="ai-calendar-header__weekdays__weekday">四</text>
            <text class="ai-calendar-header__weekdays__weekday">五</text>
            <text class="ai-calendar-header__weekdays__weekday">六</text>
            <text class="ai-calendar-header__weekdays__weekday">日</text>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
export default {
    name: 'AiCalendarHeader',
    mixins: [mixins],
    props: {
        // 标题
        title: {
            type: String,
            default: '',
        },
        // 副标题
        subtitle: {
            type: String,
            default: '',
        },
        // 是否显示标题
        showTitle: {
            type: Boolean,
            default: true,
        },
        // 是否显示副标题
        showSubtitle: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {};
    },
    methods: {
        name() {},
    },
};
</script>

<style lang="scss" scoped>
.ai-calendar-header {
    padding-bottom: 8rpx;

    &__title {
        font-size: 32rpx;
        color: $color-default;
        text-align: center;
        height: 84rpx;
        line-height: 84rpx;
        font-weight: bold;
    }

    &__subtitle {
        font-size: 28rpx;
        color: $color-default;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        font-weight: bold;
    }

    &__weekdays {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        &__weekday {
            font-size: 26rpx;
            color: $color-default;
            line-height: 60rpx;
            flex: 1;
            text-align: center;
        }
    }
}
</style>
