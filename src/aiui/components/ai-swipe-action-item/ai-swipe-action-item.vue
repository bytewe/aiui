<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:40:29
 * @Description: 滑动单元格项
-->

<template>
    <view ref="ai-swipe-action-item" class="ai-swipe-action-item">
        <view class="ai-swipe-action-item__right">
            <slot name="button">
                <view
                    v-for="(item, index) in options"
                    :key="index"
                    :ref="`ai-swipe-action-item__right__button-${index}`"
                    class="ai-swipe-action-item__right__button"
                    :style="[
                        {
                            alignItems: item.style && item.style.borderRadius ? 'center' : 'stretch',
                        },
                    ]"
                    @click="buttonClickHandler(item, index)"
                >
                    <view
                        class="ai-swipe-action-item__right__button__wrapper"
                        :style="[
                            {
                                backgroundColor:
                                    item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',
                                borderRadius: item.style && item.style.borderRadius ? item.style.borderRadius : '0',
                                padding: item.style && item.style.borderRadius ? '0' : '0 30rpx',
                            },
                            item.style,
                        ]"
                    >
                        <ai-icon
                            v-if="item.icon"
                            :name="item.icon"
                            :color="item.style && item.style.color ? item.style.color : '#ffffff'"
                            :size="
                                item.iconSize
                                    ? $util.addUnit(item.iconSize)
                                    : item.style && item.style.fontSize
                                    ? $util.getPx(item.style.fontSize) * 1.2
                                    : 17
                            "
                            :custom-style="{
                                marginRight: item.text ? '4rpx' : 0,
                            }"
                        />
                        <text
                            v-if="item.text"
                            class="ai-swipe-action-item__right__button__wrapper__text ai-line-1"
                            :style="[
                                {
                                    color: item.style && item.style.color ? item.style.color : '#ffffff',
                                    fontSize: item.style && item.style.fontSize ? item.style.fontSize : '32rpx',
                                    lineHeight: item.style && item.style.fontSize ? item.style.fontSize : '32rpx',
                                },
                            ]"
                            >{{ item.text }}</text
                        >
                    </view>
                </view>
            </slot>
        </view>
        <!-- #ifdef APP-VUE || MP-WEIXIN || H5 || MP-QQ -->
        <view
            class="ai-swipe-action-item__content"
            :status="status"
            :change:status="wxs.statusChange"
            :size="size"
            :change:size="wxs.sizeChange"
            @touchstart="wxs.touchstart"
            @touchmove="wxs.touchmove"
            @touchend="wxs.touchend"
        >
            <!-- #endif -->
            <!-- #ifdef APP-NVUE -->
            <view
                ref="ai-swipe-action-item__content"
                class="ai-swipe-action-item__content"
                @panstart="onTouchstart"
                @click="onClick"
            >
                <!-- #endif -->
                <slot />
            </view>
        </view>
    </view>
</template>

<!-- #ifdef APP-VUE || MP-WEIXIN || H5 || MP-QQ -->
<script src="./index.wxs" module="wxs" lang="wxs"></script>
<!-- #endif -->

<script>
import mixins from '@/aiui/mixins/mixins';
import touch from '@/aiui/mixins/touch';
// #ifdef APP-NVUE
import nvue from './nvue.js';
// #endif
// #ifdef APP-VUE || MP-WEIXIN || H5 || MP-QQ
import wxs from './wxs.js';
// #endif

export default {
    name: 'AiSwipeActionItem',
    mixins: [mixins, touch],
    // #ifdef APP-NVUE
    mixins: [mixins, nvue, touch],
    // #endif
    // #ifdef APP-VUE || MP-WEIXIN || H5 || MP-QQ
    mixins: [mixins, touch, wxs],
    // #endif
    props: {
        // 控制打开或者关闭
        show: {
            type: Boolean,
            default: false,
        },
        // 标识符，如果是v-for，可用index索引值
        name: {
            type: [String, Number],
            default: '',
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否自动关闭其他swipe按钮组
        autoClose: {
            type: Boolean,
            default: true,
        },
        // 滑动距离阈值，只有大于此值，才被认为是要打开菜单
        threshold: {
            type: Number,
            default: 20,
        },
        // 右侧按钮内容
        options: {
            type: Array,
            default: () => [],
        },
        // 动画过渡时间，单位ms
        duration: {
            type: [String, Number],
            default: 300,
        },
    },
    data() {
        return {
            // 按钮的尺寸信息
            size: {},
            // 父组件ai-swipe-action的参数
            parentData: {
                autoClose: true,
            },
            // 当前状态，open-打开，close-关闭
            status: 'close',
        };
    },
    watch: {
        // 由于wxs无法直接读取外部的值，需要在外部值变化时，重新执行赋值逻辑
        wxsInit(newValue, oldValue) {
            this.queryRect();
        },
    },
    computed: {
        wxsInit() {
            return [this.disabled, this.autoClose, this.threshold, this.options, this.duration];
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 初始化父组件数据
            this.updateParentData();
            // #ifndef APP-NVUE
            uni.$util.sleep().then(() => {
                this.queryRect();
            });
            // #endif
        },
        updateParentData() {
            // 此方法在mixin中
            this.getParentData('AiSwipeAction');
        },
        // #ifndef APP-NVUE
        // 查询节点
        queryRect() {
            this.getRect('.ai-swipe-action-item__right__button', true).then((buttons) => {
                this.size = {
                    buttons,
                    show: this.show,
                    disabled: this.disabled,
                    threshold: this.threshold,
                    duration: this.duration,
                };
            });
        },
        // #endif
        // 按钮被点击
        buttonClickHandler(item, index) {
            this.$emit('click', {
                index,
                name: this.name,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-swipe-action-item {
    position: relative;
    overflow: hidden;
    /* #ifndef APP-NVUE || MP-WEIXIN */
    touch-action: none;
    /* #endif */

    &__content {
        background-color: #ffffff;
        z-index: 10;
    }

    &__right {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: row;

        &__button {
            display: flex;
            flex-direction: row;
            justify-content: center;
            overflow: hidden;
            align-items: center;

            &__wrapper {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding: 0 30rpx;

                &__text {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    color: #ffffff;
                    font-size: 30rpx;
                    text-align: center;
                    justify-content: center;
                }
            }
        }
    }
}
</style>
