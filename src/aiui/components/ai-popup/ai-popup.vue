<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:17
 * @Description: 弹窗
-->

<template>
    <view :hidden="!show" class="ai-popup">
        <ai-overlay
            v-if="overlay"
            :show="show"
            :duration="overlayDuration"
            :custom-style="overlayStyle"
            :opacity="overlayOpacity"
            @click="overlayClick"
        />
        <ai-transition
            :show="show"
            :custom-style="transitionStyle"
            :mode="position"
            :duration="duration"
            @after-enter="afterEnter"
            @click="onClick"
        >
            <view class="ai-popup__content" :style="[contentStyle]" @click.stop="preventEvent">
                <ai-status-bar v-if="safeAreaInsetTop" />
                <slot />
                <view
                    v-if="closeable"
                    class="ai-popup__content__close"
                    :class="['ai-popup__content__close--' + closeIconPos]"
                    hover-class="ai-popup__content__close--hover"
                    hover-stay-time="150"
                    @click.stop="close"
                >
                    <ai-icon name="close" color="#909399" size="18" bold />
                </view>
                <ai-safe-bottom v-if="safeAreaInsetBottom" />
            </view>
        </ai-transition>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiPopup',
    mixins: [mixins],
    props: {
        // 是否展示弹窗
        show: {
            type: Boolean,
            default: false,
        },
        // 是否显示遮罩
        overlay: {
            type: Boolean,
            default: true,
        },
        // 弹出的方向，可选值为 top bottom right left center
        mode: {
            type: String,
            default: 'bottom',
        },
        // 动画时长，单位ms
        duration: {
            type: [String, Number],
            default: 300,
        },
        // 是否显示关闭图标
        closeable: {
            type: Boolean,
            default: false,
        },
        // 自定义遮罩的样式
        overlayStyle: {
            type: [String, Object],
            default: () => {},
        },
        // 点击遮罩是否关闭弹窗
        closeOnClickOverlay: {
            type: Boolean,
            default: true,
        },
        // 层级
        zIndex: {
            type: [String, Number],
            default: 10075,
        },
        // 是否为iPhoneX留出底部安全距离
        safeAreaInsetBottom: {
            type: Boolean,
            default: true,
        },
        // 是否留出顶部安全距离（状态栏高度）
        safeAreaInsetTop: {
            type: Boolean,
            default: false,
        },
        // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
        closeIconPos: {
            type: String,
            default: 'top-right',
        },
        // 是否显示圆角
        round: {
            type: [Boolean, String, Number],
            default: 0,
        },
        // mode=center，也即中部弹出时，是否使用缩放模式
        zoom: {
            type: Boolean,
            default: true,
        },
        // 弹窗背景色，设置为transparent可去除白色背景
        background: {
            type: String,
            default: '',
        },
        // 遮罩的透明度，0-1之间
        overlayOpacity: {
            type: [Number, String],
            default: 0.5,
        },
    },
    data() {
        return {
            overlayDuration: this.duration + 50,
        };
    },
    computed: {
        transitionStyle() {
            const style = {
                zIndex: this.zIndex,
                position: 'fixed',
                display: 'flex',
            };
            style[this.mode] = 0;
            if (this.mode === 'left') {
                return uni.$util.deepMerge(style, {
                    bottom: 0,
                    top: 0,
                });
            } else if (this.mode === 'right') {
                return uni.$util.deepMerge(style, {
                    bottom: 0,
                    top: 0,
                });
            } else if (this.mode === 'top') {
                return uni.$util.deepMerge(style, {
                    left: 0,
                    right: 0,
                });
            } else if (this.mode === 'bottom') {
                return uni.$util.deepMerge(style, {
                    left: 0,
                    right: 0,
                });
            } else if (this.mode === 'center') {
                return uni.$util.deepMerge(style, {
                    alignItems: 'center',
                    'justify-content': 'center',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                });
            } else {
                return style;
            }
        },
        contentStyle() {
            const style = {};
            if (this.mode !== 'center') {
                style.flex = 1;
            }
            // 背景色，一般用于设置为transparent，去除默认的白色背景
            if (this.background) {
                style.backgroundColor = this.background;
            }
            if (this.round) {
                const value = uni.$util.addUnit(this.round);
                if (this.mode === 'top') {
                    style.borderBottomLeftRadius = value;
                    style.borderBottomRightRadius = value;
                } else if (this.mode === 'bottom') {
                    style.borderTopLeftRadius = value;
                    style.borderTopRightRadius = value;
                } else if (this.mode === 'center') {
                    style.borderRadius = value;
                }
            }
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
        position() {
            if (this.mode === 'center') {
                return this.zoom ? 'fade-zoom' : 'fade';
            }
            if (this.mode === 'left') {
                return 'slide-left';
            }
            if (this.mode === 'right') {
                return 'slide-right';
            }
            if (this.mode === 'bottom') {
                return 'slide-up';
            }
            if (this.mode === 'top') {
                return 'slide-down';
            } else {
                return '';
            }
        },
    },
    watch: {
        show(newValue) {
            if (newValue === true) {
                // #ifdef MP-WEIXIN
                const children = this.$children;
                this.retryComputedComponentRect(children);
                // #endif
            }
        },
    },
    methods: {
        // 点击遮罩
        overlayClick() {
            if (this.closeOnClickOverlay) {
                this.$emit('close');
            }
        },
        close() {
            this.$emit('close');
        },
        afterEnter() {
            this.$emit('open');
        },
        onClick() {
            // 由于中部弹出时，其ai-transition占据了整个页面相当于遮罩，此时需要发出遮罩点击事件，是否无法通过点击遮罩关闭弹窗
            if (this.mode === 'center') {
                this.overlayClick();
            }
            this.$emit('click');
        },
        // #ifdef MP-WEIXIN
        retryComputedComponentRect(children) {
            // 组件内部需要计算节点的组件
            const names = [
                'AiCalendarMonth',
                'AiAlbum',
                'AiCollapseItem',
                'AiDropdown',
                'AiIndexItem',
                'AiIndexList',
                'AiLineProgress',
                'AiListItem',
                'AiRate',
                'AiReadMore',
                'AiRow',
                'AiRowNotice',
                'AiScrollList',
                'AiSkeleton',
                'AiSlider',
                'AiStepsItem',
                'AiSticky',
                'AiSubsection',
                'AiSwipeActionItem',
                'AiTabbar',
                'AiTabs',
                'AiTooltip',
            ];
            // 历遍所有的子组件节点
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                // 拿到子组件的子组件
                const grandChild = child.$children;
                // 判断如果在需要重新初始化的组件数组中名中，并且存在init方法的话，则执行
                if (names.includes(child.$options.name) && typeof child?.init === 'function') {
                    // 需要进行一定的延时，因为初始化页面需要时间
                    uni.$util.sleep(50).then(() => {
                        child.init();
                    });
                }
                // 如果子组件还有孙组件，进行递归历遍
                if (grandChild.length) {
                    this.retryComputedComponentRect(grandChild);
                }
            }
        },
        // #endif
    },
};
</script>

<style lang="scss" scoped>
$ai-popup-flex: 1 !default;
$ai-popup-content-background-color: #fff !default;

.ai-popup {
    flex: $ai-popup-flex;

    &__content {
        background-color: $ai-popup-content-background-color;
        position: relative;

        &--round-top {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-left-radius: 20rpx;
            border-bottom-right-radius: 20rpx;
        }

        &--round-left {
            border-top-left-radius: 0;
            border-top-right-radius: 20rpx;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 20rpx;
        }

        &--round-right {
            border-top-left-radius: 20rpx;
            border-top-right-radius: 0;
            border-bottom-left-radius: 20rpx;
            border-bottom-right-radius: 0;
        }

        &--round-bottom {
            border-top-left-radius: 20rpx;
            border-top-right-radius: 20rpx;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        &--round-center {
            border-top-left-radius: 20rpx;
            border-top-right-radius: 20rpx;
            border-bottom-left-radius: 20rpx;
            border-bottom-right-radius: 20rpx;
        }

        &__close {
            position: absolute;

            &--hover {
                opacity: 0.4;
            }
        }

        &__close--top-left {
            top: 30rpx;
            left: 30rpx;
        }

        &__close--top-right {
            top: 30rpx;
            right: 30rpx;
        }

        &__close--bottom-left {
            bottom: 30rpx;
            left: 30rpx;
        }

        &__close--bottom-right {
            right: 30rpx;
            bottom: 30rpx;
        }
    }
}
</style>
