<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:50:23
 * @Description: 消息提示
-->

<template>
    <view class="ai-toast">
        <ai-overlay :show="isShow" :custom-style="overlayStyle">
            <view
                class="ai-toast__content"
                :style="[contentStyle]"
                :class="[
                    'ai-type-' + tmpConfig.type,
                    tmpConfig.type === 'loading' || tmpConfig.loading ? 'ai-toast__content--loading' : '',
                ]"
            >
                <ai-loading-icon
                    v-if="tmpConfig.type === 'loading'"
                    mode="circle"
                    color="rgb(255, 255, 255)"
                    inactive-color="rgb(120, 120, 120)"
                    size="25"
                />
                <ai-icon
                    v-else-if="tmpConfig.type !== 'defalut' && iconName"
                    :name="iconName"
                    size="17"
                    :color="tmpConfig.type"
                    :custom-style="iconStyle"
                />
                <ai-gap v-if="tmpConfig.type === 'loading' || tmpConfig.loading" />
                <text
                    class="ai-toast__content__text"
                    :class="['ai-toast__content__text--' + tmpConfig.type]"
                    style="max-width: 400rpx"
                    >{{ tmpConfig.message }}</text
                >
            </view>
        </ai-overlay>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
export default {
    name: 'AiToast',
    mixins: [mixins],
    data() {
        return {
            isShow: false,
            timer: null, // 定时器
            config: {
                message: '', // 显示文本
                type: '', // 主题类型，primary，success，danger，warning，black
                duration: 2000, // 显示的时间，毫秒
                icon: true, // 显示的图标
                position: 'center', // toast出现的位置
                complete: null, // 执行完后的回调函数
                overlay: false, // 是否防止触摸穿透
                loading: false, // 是否加载中状态
            },
            tmpConfig: {}, // 将用户配置和内置配置合并后的临时配置变量
        };
    },
    computed: {
        iconName() {
            // 只有不为none，并且type为error|warning|succes|info时候，才显示图标
            if (!this.tmpConfig.icon || this.tmpConfig.icon == 'none') {
                return '';
            }
            if (['danger', 'warning', 'success', 'primary'].includes(this.tmpConfig.type)) {
                return uni.$util.type2icon(this.tmpConfig.type);
            } else {
                return '';
            }
        },
        overlayStyle() {
            const style = {
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            };
            // 将遮罩设置为100%透明度，避免出现灰色背景
            style.backgroundColor = 'rgba(0, 0, 0, 0)';
            return style;
        },
        iconStyle() {
            const style = {};
            // 图标需要一个右边距，以跟右边的文字有隔开的距离
            style.marginRight = '8rpx';
            // #ifdef APP-NVUE
            // iOSAPP下，图标有2rpx的向下偏移，这里进行修正
            if (uni.$util.os() === 'ios') {
                style.marginTop = '-2rpx';
            }
            // #endif
            return style;
        },
        loadingIconColor() {
            let color = 'rgb(255, 255, 255)';
            if (['danger', 'warning', 'success', 'primary'].includes(this.tmpConfig.type)) {
                // loading-icon组件内部会对color参数进行一个透明度处理，该方法要求传入的颜色值
                // 必须为rgb格式的，所以这里做一个处理
                color = uni.$util.hexToRgb(uni.$config[`color-${this.tmpConfig.type}`]);
            }
            return color;
        },
        // 内容盒子的样式
        contentStyle() {
            const windowHeight = uni.$util.sys().windowHeight,
                style = {};
            let value = 0;
            // 根据top和bottom，对Y轴进行窗体高度的百分比偏移
            if (this.tmpConfig.position === 'top') {
                value = -windowHeight * 0.25;
            } else if (this.tmpConfig.position === 'bottom') {
                value = windowHeight * 0.25;
            }
            style.transform = `translateY(${value}px)`;
            return style;
        },
    },
    created() {
        // 通过主题的形式调用toast，批量生成方法函数
        ['primary', 'success', 'danger', 'warning', 'default', 'loading'].map((item) => {
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
        // 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
        show(options) {
            // 不将结果合并到this.config变量，避免多次调用ai-toast，前后的配置造成混乱
            this.tmpConfig = uni.$util.deepMerge(this.config, options);
            // 清除定时器
            this.clearTimer();
            this.isShow = true;
            this.timer = setTimeout(() => {
                // 倒计时结束，清除定时器，隐藏toast组件
                this.clearTimer();
                // 判断是否存在callback方法，如果存在就执行
                typeof this.tmpConfig.complete === 'function' && this.tmpConfig.complete();
            }, this.tmpConfig.duration);
        },
        // 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
        hide() {
            this.clearTimer();
        },
        clearTimer() {
            this.isShow = false;
            // 清除定时器
            clearTimeout(this.timer);
            this.timer = null;
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-toast-color: #fff !default;
$ai-toast-border-radius: 8rpx !default;
$ai-toast-border-background-color: #585858 !default;
$ai-toast-border-font-size: 28rpx !default;
$ai-toast-border-padding: 24rpx 40rpx !default;
$ai-toast-loading-border-padding: 40rpx 40rpx !default;
$ai-toast-content-text-color: #fff !default;
$ai-toast-content-text-font-size: 30rpx !default;
$ai-toast-icon: 10rpx !default;
$ai-toast-type-primary-color: $color-primary !default;
$ai-toast-type-primary-background-color: #ecf5ff !default;
$ai-toast-type-primary-border-color: rgb(215, 234, 254) !default;
$ai-toast-type-primary-border-width: 2rpx !default;
$ai-toast-type-success-color: $color-success !default;
$ai-toast-type-success-background-color: #dbf1e1 !default;
$ai-toast-type-success-border-color: #bef5c8 !default;
$ai-toast-type-success-border-width: 2rpx !default;
$ai-toast-type-danger-color: $color-danger !default;
$ai-toast-type-danger-background-color: #fef0f0 !default;
$ai-toast-type-danger-border-color: #fde2e2 !default;
$ai-toast-type-danger-border-width: 2rpx !default;
$ai-toast-type-warning-color: $color-warning !default;
$ai-toast-type-warning-background-color: #fdf6ec !default;
$ai-toast-type-warning-border-color: #faecd8 !default;
$ai-toast-type-warning-border-width: 2rpx !default;
$ai-toast-type-default-color: #fff !default;
$ai-toast-type-default-background-color: #585858 !default;

.ai-toast {
    &__content {
        display: flex;
        flex-direction: row;
        padding: $ai-toast-border-padding;
        border-radius: $ai-toast-border-radius;
        background-color: $ai-toast-border-background-color;
        color: $ai-toast-color;
        align-items: center;
        /* #ifndef APP-NVUE */
        max-width: 600rpx;
        /* #endif */
        position: relative;

        &--loading {
            flex-direction: column;
            padding: $ai-toast-loading-border-padding;
        }

        &__text {
            color: $ai-toast-content-text-color;
            font-size: $ai-toast-content-text-font-size;
            line-height: $ai-toast-content-text-font-size;

            &--default {
                color: $ai-toast-content-text-color;
            }

            &--danger {
                color: $color-danger;
            }

            &--primary {
                color: $color-primary;
            }

            &--success {
                color: $color-success;
            }

            &--warning {
                color: $color-warning;
            }
        }
    }
}

.ai-type-primary {
    color: $ai-toast-type-primary-color;
    background-color: $ai-toast-type-primary-background-color;
    border-color: $ai-toast-type-primary-border-color;
    border-width: $ai-toast-type-primary-border-width;
}

.ai-type-success {
    color: $ai-toast-type-success-color;
    background-color: $ai-toast-type-success-background-color;
    border-color: $ai-toast-type-success-border-color;
    border-width: 2rpx;
}

.ai-type-danger {
    color: $ai-toast-type-danger-color;
    background-color: $ai-toast-type-danger-background-color;
    border-color: $ai-toast-type-danger-border-color;
    border-width: $ai-toast-type-danger-border-width;
}

.ai-type-warning {
    color: $ai-toast-type-warning-color;
    background-color: $ai-toast-type-warning-background-color;
    border-color: $ai-toast-type-warning-border-color;
    border-width: 2rpx;
}

.ai-type-default {
    color: $ai-toast-type-default-color;
    background-color: $ai-toast-type-default-background-color;
}
</style>
