<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:26:46
 * @Description: 提示条
-->

<template>
    <view class="ai-tooltip" :style="[$util.addStyle(customStyle)]">
        <ai-overlay
            :show="showTooltip && tooltipTop !== -10000 && overlay"
            custom-style="backgroundColor: rgba(0, 0, 0, 0)"
            @click="overlayClickHandler"
        />
        <view class="ai-tooltip__wrapper">
            <text
                :id="textId"
                :ref="textId"
                class="ai-tooltip__wrapper__text"
                :user-select="false"
                :selectable="false"
                :style="{
                    backgroundColor: background && showTooltip && tooltipTop !== -10000 ? background : 'transparent',
                }"
                @longpress.stop="longpressHandler"
                >{{ text }}</text
            >
            <ai-transition
                mode="fade"
                :show="showTooltip"
                duration="300"
                :custom-style="{
                    position: 'absolute',
                    top: $util.addUnit(tooltipTop),
                    zIndex: zIndex,
                    ...tooltipStyle,
                }"
            >
                <view :id="tooltipId" :ref="tooltipId" class="ai-tooltip__wrapper__popup">
                    <view
                        v-if="showCopy || buttons.length"
                        class="ai-tooltip__wrapper__popup__indicator"
                        hover-class="ai-tooltip__wrapper__popup__indicator--hover"
                        :style="[
                            indicatorStyle,
                            {
                                width: $util.addUnit(indicatorWidth),
                                height: $util.addUnit(indicatorWidth),
                            },
                        ]"
                    >
                        <!-- 由于nvue不支持三角形绘制，这里就做一个四方形，再旋转45deg，得到露出的一个三角 -->
                    </view>
                    <view class="ai-tooltip__wrapper__popup__list">
                        <view
                            v-if="showCopy"
                            class="ai-tooltip__wrapper__popup__list__btn"
                            hover-class="ai-tooltip__wrapper__popup__list__btn--hover"
                            @click="setClipboardData"
                        >
                            <text class="ai-tooltip__wrapper__popup__list__btn__text">复制</text>
                        </view>
                        <ai-line v-if="showCopy && buttons.length > 0" direction="column" color="#8d8e90" length="18" />
                        <template v-for="(item, index) in buttons">
                            <view
                                :key="index"
                                class="ai-tooltip__wrapper__popup__list__btn"
                                hover-class="ai-tooltip__wrapper__popup__list__btn--hover"
                            >
                                <text
                                    class="ai-tooltip__wrapper__popup__list__btn__text"
                                    @click="btnClickHandler(index)"
                                    >{{ item }}</text
                                >
                            </view>
                            <!-- eslint-disable-next-line vue/valid-v-for -->
                            <ai-line v-if="index < buttons.length - 1" direction="column" color="#8d8e90" length="18" />
                        </template>
                    </view>
                </view>
            </ai-transition>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif
// #ifdef H5
import ClipboardJS from './clipboard.min.js';
// #endif

export default {
    name: 'AiTooltip',
    mixins: [mixins],
    props: {
        // 需要显示的提示文字
        text: {
            type: [String, Number],
            default: '',
        },
        // 点击复制按钮时，复制的文本，为空则使用text值
        copyText: {
            type: [String, Number],
            default: '',
        },
        // 文本大小
        size: {
            type: [String, Number],
            default: 14,
        },
        // 字体颜色
        color: {
            type: String,
            default: '#606266',
        },
        // 弹出提示框时，文本的背景色
        background: {
            type: String,
            default: 'transparent',
        },
        // 弹出提示的方向，top-上方，bottom-下方
        direction: {
            type: String,
            default: 'top',
        },
        // 弹出提示的z-index，nvue无效
        zIndex: {
            type: [String, Number],
            default: 10071,
        },
        // 是否显示复制按钮
        showCopy: {
            type: Boolean,
            default: true,
        },
        // 扩展的按钮组
        buttons: {
            type: Array,
            default: () => [],
        },
        // 是否显示透明遮罩以防止触摸穿透
        overlay: {
            type: Boolean,
            default: true,
        },
        // 是否显示复制成功或者失败的toast
        showToast: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            // 是否展示气泡
            showTooltip: true,
            // 生成唯一id，防止一个页面多个组件，造成干扰
            textId: uni.$util.guid(),
            tooltipId: uni.$util.guid(),
            // 初始时甚至为很大的值，让其移到屏幕外面，为了计算元素的尺寸
            tooltipTop: -10000,
            // 气泡的位置信息
            tooltipInfo: {
                width: 0,
                left: 0,
            },
            // 文本的位置信息
            textInfo: {
                width: 0,
                left: 0,
            },
            // 三角形指示器的样式
            indicatorStyle: {},
            // 气泡在可能超出屏幕边沿范围时，重新定位后，距离屏幕边沿的距离
            screenGap: 12,
            // 三角形指示器的宽高，由于对元素进行了角度旋转，精确计算指示器位置时，需要用到其尺寸信息
            indicatorWidth: 14,
        };
    },
    computed: {
        // 特别处理H5的复制，因为H5浏览器是自带系统复制功能的，在H5环境
        // 当一些依赖参数变化时，需要重新计算气泡和指示器的位置信息
        propsChange() {
            return [this.text, this.buttons];
        },
        // 计算气泡和指示器的位置信息
        tooltipStyle() {
            const style = {
                    transform: `translateY(${this.direction === 'top' ? '-100%' : '100%'})`,
                },
                sys = uni.$util.sys(),
                getPx = uni.$util.getPx,
                addUnit = uni.$util.addUnit;
            if (this.tooltipInfo.width / 2 > this.textInfo.left + this.textInfo.width / 2 - this.screenGap) {
                this.indicatorStyle = {};
                style.left = `-${addUnit(this.textInfo.left - this.screenGap)}`;
                this.indicatorStyle.left = addUnit(
                    this.textInfo.width / 2 - getPx(style.left) - this.indicatorWidth / 2
                );
            } else if (
                this.tooltipInfo.width / 2 >
                sys.windowWidth - this.textInfo.right + this.textInfo.width / 2 - this.screenGap
            ) {
                this.indicatorStyle = {};
                style.right = `-${addUnit(sys.windowWidth - this.textInfo.right - this.screenGap)}`;
                this.indicatorStyle.right = addUnit(
                    this.textInfo.width / 2 - getPx(style.right) - this.indicatorWidth / 2
                );
            } else {
                const left = Math.abs(this.textInfo.width / 2 - this.tooltipInfo.width / 2);
                style.left = this.textInfo.width > this.tooltipInfo.width ? addUnit(left) : -addUnit(left);
                this.indicatorStyle = {};
            }
            if (this.direction === 'top') {
                style.marginTop = '-20rpx';
                this.indicatorStyle.bottom = '-8rpx';
            } else {
                style.marginBottom = '-20rpx';
                this.indicatorStyle.top = '-8rpx';
            }
            return style;
        },
    },
    watch: {
        propsChange() {
            this.getElRect();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getElRect();
        },
        // 长按触发事件
        async longpressHandler() {
            this.tooltipTop = 0;
            this.showTooltip = true;
        },
        // 点击透明遮罩
        overlayClickHandler() {
            this.showTooltip = false;
        },
        // 点击弹出按钮
        btnClickHandler(index) {
            this.showTooltip = false;
            // 如果需要展示复制按钮，此处index需要加1，因为复制按钮在第一个位置
            this.$emit('click', this.showCopy ? index + 1 : index);
        },
        // 查询内容高度
        queryRect(ref) {
            // #ifndef APP-NVUE
            return new Promise((resolve) => {
                this.getRect(`#${ref}`).then((size) => {
                    resolve(size);
                });
            });
            // #endif

            // #ifdef APP-NVUE
            // nvue下，使用dom模块查询元素高度
            // 返回一个promise，让调用此方法的主体能使用then回调
            // eslint-disable-next-line no-unreachable
            return new Promise((resolve) => {
                dom.getComponentRect(this.$refs[ref], (res) => {
                    resolve(res.size);
                });
            });
            // #endif
        },
        // 元素尺寸
        getElRect() {
            // 调用之前，先将指示器调整到屏幕外，方便获取尺寸
            this.showTooltip = true;
            this.tooltipTop = -10000;
            uni.$util.sleep(500).then(() => {
                this.queryRect(this.tooltipId).then((size) => {
                    this.tooltipInfo = size;
                    // 获取气泡尺寸之后，将其隐藏，为了让下次切换气泡显示与隐藏时，有淡入淡出的效果
                    this.showTooltip = false;
                });
                this.queryRect(this.textId).then((size) => {
                    this.textInfo = size;
                });
            });
        },
        // 复制文本到粘贴板
        setClipboardData() {
            // 关闭组件
            this.showTooltip = false;
            this.$emit('click', 0);
            // #ifndef H5
            uni.setClipboardData({
                // 优先使用copyText字段，如果没有，则默认使用text字段当做复制的内容
                data: this.copyText || this.text,
                success: () => {
                    this.showToast && uni.$util.toast('复制成功');
                },
                fail: () => {
                    this.showToast && uni.$util.toast('复制失败');
                },
                complete: () => {
                    this.showTooltip = false;
                },
            });
            // #endif

            // #ifdef H5
            let event = window.event || {};
            let clipboard = new ClipboardJS('', {
                text: () => this.copyText || this.text,
            });
            clipboard.on('success', () => {
                this.showToast && uni.$util.toast('复制成功');
                clipboard.off('success');
                clipboard.off('error');
                // 在单页应用中，需要销毁DOM的监听
                clipboard.destroy();
            });
            clipboard.on('error', () => {
                this.showToast && uni.$util.toast('复制失败');
                clipboard.off('success');
                clipboard.off('error');
                // 在单页应用中，需要销毁DOM的监听
                clipboard.destroy();
            });
            clipboard.onClick(event);
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-tooltip {
    position: relative;
    display: flex;
    flex-direction: row;

    &__wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        /* #ifndef APP-NVUE */
        white-space: nowrap;
        /* #endif */

        &__text {
            color: $color-dark;
            font-size: 28rpx;
        }

        &__popup {
            display: flex;
            flex-direction: row;
            justify-content: center;

            &__list {
                background-color: #060607;
                position: relative;
                flex: 1;
                border-radius: 10rpx;
                padding: 0rpx 0;
                flex-direction: row;
                align-items: center;
                overflow: hidden;

                &__btn {
                    padding: 22rpx 26rpx;

                    &--hover {
                        background-color: #58595b;
                    }

                    &__text {
                        line-height: 24rpx;
                        font-size: 26rpx;
                        color: #ffffff;
                    }
                }
            }

            &__indicator {
                position: absolute;
                background-color: #060607;
                width: 28rpx;
                height: 28rpx;
                bottom: -8rpx;
                transform: rotate(45deg);
                border-radius: 4rpx;
                z-index: -1;

                &--hover {
                    background-color: #58595b;
                }
            }
        }
    }
}
</style>
