<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:16:25
 * @Description: 顶部提示
-->

<template>
    <ai-transition mode="slide-down" :custom-style="containerStyle" :show="open">
        <view
            class="ai-notify"
            :class="[`ai-notify--${tmpConfig.type}`]"
            :style="[backgroundColor, $util.addStyle(customStyle)]"
        >
            <ai-status-bar v-if="tmpConfig.safeAreaInsetTop" />
            <view class="ai-notify__warpper">
                <slot name="icon">
                    <ai-icon
                        v-if="['success', 'warning', 'danger'].includes(tmpConfig.type)"
                        :name="tmpConfig.icon"
                        :color="tmpConfig.color"
                        :size="1.3 * tmpConfig.fontSize"
                        :custom-style="{ marginRight: '8rpx' }"
                    />
                </slot>
                <text
                    class="ai-notify__warpper__text"
                    :style="{
                        fontSize: $util.addUnit(tmpConfig.fontSize),
                        color: tmpConfig.color,
                    }"
                    >{{ tmpConfig.message }}</text
                >
            </view>
        </view>
    </ai-transition>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiNotify',
    mixins: [mixins],
    props: {
        // 到顶部的距离
        top: {
            type: [String, Number],
            default: 0,
        },
        // type主题，primary，success，warning，error
        type: {
            type: String,
            default: 'primary',
        },
        // 字体颜色
        color: {
            type: String,
            default: '#ffffff',
        },
        // 背景颜色
        background: {
            type: String,
            default: '',
        },
        // 展示的文字内容
        message: {
            type: String,
            default: '',
        },
        // 展示时长，为0时不消失，单位ms
        duration: {
            type: [String, Number],
            default: 3000,
        },
        // 字体大小
        fontSize: {
            type: [String, Number],
            default: 15,
        },
        // 是否留出顶部安全距离（状态栏高度）
        safeAreaInsetTop: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            // 是否展示组件
            open: false,
            timer: null,
            config: {
                // 到顶部的距离
                top: this.top,
                // type主题，primary，success，warning，error
                type: this.type,
                // 字体颜色
                color: this.color,
                // 背景颜色
                background: this.background,
                // 展示的文字内容
                message: this.message,
                // 展示时长，为0时不消失，单位ms
                duration: this.duration,
                // 字体大小
                fontSize: this.fontSize,
                // 是否留出顶部安全距离（状态栏高度）
                safeAreaInsetTop: this.safeAreaInsetTop,
            },
            // 合并后的配置，避免多次调用组件后，可能会复用之前使用的配置参数
            tmpConfig: {},
        };
    },
    computed: {
        containerStyle() {
            let top = 0;
            if (this.tmpConfig.top === 0) {
                // #ifdef H5
                // H5端，导航栏为普通元素，需要将组件移动到导航栏的下边沿
                // H5的导航栏高度为88rpx
                top = 44;
                // #endif
            }
            const style = {
                top: uni.$util.addUnit(this.tmpConfig.top === 0 ? top : this.tmpConfig.top),
                // 因为组件底层为ai-transition组件，必须将其设置为fixed定位
                // 让其出现在导航栏底部
                position: 'fixed',
                left: 0,
                right: 0,
                zIndex: 10076,
            };
            return style;
        },
        // 组件背景颜色
        backgroundColor() {
            const style = {};
            if (this.tmpConfig.background) {
                style.backgroundColor = this.tmpConfig.background;
            }
            return style;
        },
        // 默认主题下的图标
        icon() {
            let icon;
            if (this.tmpConfig.type === 'success') {
                icon = 'check-circle';
            } else if (this.tmpConfig.type === 'danger') {
                icon = 'close-circle';
            } else if (this.tmpConfig.type === 'warning') {
                icon = 'info-circle';
            }
            return icon;
        },
    },
    created() {
        // 通过主题的形式调用toast，批量生成方法函数
        ['primary', 'success', 'danger', 'warning'].map((item) => {
            this[item] = (message) =>
                this.show({
                    type: item,
                    message,
                });
        });
    },
    beforeDestroy() {
        this.clearTimer();
    },
    methods: {
        show(options) {
            // 不将结果合并到this.config变量，避免多次调用ai-toast，前后的配置造成混乱
            this.tmpConfig = uni.$util.deepMerge(this.config, options);
            // 任何定时器初始化之前，都要执行清除操作，否则可能会造成混乱
            this.clearTimer();
            this.open = true;
            if (this.tmpConfig.duration > 0) {
                this.timer = setTimeout(() => {
                    this.open = false;
                    // 倒计时结束，清除定时器，隐藏toast组件
                    this.clearTimer();
                    // 判断是否存在callback方法，如果存在就执行
                    typeof this.tmpConfig.complete === 'function' && this.tmpConfig.complete();
                }, this.tmpConfig.duration);
            }
        },
        // 关闭notify
        close() {
            this.clearTimer();
        },
        clearTimer() {
            this.open = false;
            // 清除定时器
            clearTimeout(this.timer);
            this.timer = null;
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-notify-padding: 16rpx 20rpx !default;
$ai-notify-text-font-size: 30rpx !default;
$ai-notify-primary-background: $color-primary !default;
$ai-notify-success-background: $color-success !default;
$ai-notify-danger-background: $color-danger !default;
$ai-notify-warning-background: $color-warning !default;

.ai-notify {
    padding: $ai-notify-padding;

    &__warpper {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: center;
        justify-content: center;

        &__text {
            font-size: $ai-notify-text-font-size;
            text-align: center;
        }
    }

    &--primary {
        background-color: $ai-notify-primary-background;
    }

    &--success {
        background-color: $ai-notify-success-background;
    }

    &--danger {
        background-color: $ai-notify-danger-background;
    }

    &--warning {
        background-color: $ai-notify-warning-background;
    }
}
</style>
