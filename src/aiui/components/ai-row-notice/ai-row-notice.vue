<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:33
 * @Description: 水平滚动通知
-->

<template>
    <view class="ai-notice" @click="onClick">
        <slot name="icon">
            <view v-if="icon" class="ai-notice__left-icon">
                <ai-icon :name="icon" :color="color" size="19" />
            </view>
        </slot>
        <view ref="ai-notice__content" class="ai-notice__content">
            <text ref="ai-notice__content__text" class="ai-notice__content__text" :style="[textStyle]">{{ text }}</text>
        </view>
        <view v-if="['link', 'closable'].includes(mode)" class="ai-notice__right-icon">
            <ai-icon v-if="mode === 'link'" name="arrow" :size="17" :color="color" />
            <ai-icon v-if="mode === 'closable'" name="close" :size="16" :color="color" @click="close" />
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation');
const dom = uni.requireNativePlugin('dom');
// #endif

export default {
    name: 'AiRowNotice',
    mixins: [mixins],
    props: {
        // 显示的内容，字符串
        text: {
            type: String,
            default: '',
        },
        // 是否显示左侧的音量图标
        icon: {
            type: String,
            default: 'volume',
        },
        // 通告模式，link-显示右箭头，closable-显示右侧关闭图标
        mode: {
            type: String,
            default: '',
        },
        // 文字颜色，各图标也会使用文字颜色
        color: {
            type: String,
            default: '#f9ae3d',
        },
        // 背景颜色
        background: {
            type: String,
            default: '#fdf6ec',
        },
        // 字体大小，单位px
        fontSize: {
            type: [String, Number],
            default: 14,
        },
        // 水平滚动时的滚动速度，即每秒滚动多少px(rpx)，这有利于控制文字无论多少时，都能有一个恒定的速度
        speed: {
            type: [String, Number],
            default: 80,
        },
    },
    data() {
        return {
            animationDuration: '0', // 动画执行时间
            animationPlayState: 'paused', // 动画的开始和结束执行
            // nvue下，内容发生变化，导致滚动宽度也变化，需要标志为是否需要重新计算宽度
            // 不能在内容变化时直接重新计算，因为nvue的animation模块上一次的滚动不是刚好结束，会有影响
            nvueInit: true,
            show: true,
        };
    },
    computed: {
        // 文字内容的样式
        textStyle() {
            let style = {};
            style.color = this.color;
            style.animationDuration = this.animationDuration;
            style.animationPlayState = this.animationPlayState;
            style.fontSize = uni.$util.addUnit(this.fontSize);
            return style;
        },
    },
    watch: {
        text: {
            immediate: true,
            handler(newValue) {
                // #ifdef APP-NVUE
                this.nvueInit = true;
                // #endif
                // #ifndef APP-NVUE
                this.vue();
                // #endif

                if (!uni.$util.test.string(newValue)) {
                    uni.$util.error('noticebar组件direction为row时，要求text参数为字符串形式');
                }
            },
        },
        fontSize() {
            // #ifdef APP-NVUE
            this.nvueInit = true;
            // #endif
            // #ifndef APP-NVUE
            this.vue();
            // #endif
        },
        speed() {
            // #ifdef APP-NVUE
            this.nvueInit = true;
            // #endif
            // #ifndef APP-NVUE
            this.vue();
            // #endif
        },
    },
    mounted() {
        // #ifdef APP-PLUS
        // 在APP上(含nvue)，监听当前webview是否处于隐藏状态(进入下一页时即为hide状态)
        // 如果webivew隐藏了，为了节省性能的损耗，应停止动画的执行，同时也是为了保持进入下一页返回后，滚动位置保持不变
        // eslint-disable-next-line no-undef
        var pages = getCurrentPages();
        var page = pages[pages.length - 1];
        var currentWebview = page.$getAppWebview();
        currentWebview.addEventListener('hide', () => {
            this.webviewHide = true;
        });
        currentWebview.addEventListener('show', () => {
            this.webviewHide = false;
        });
        // #endif

        this.init();
    },
    // #ifdef APP-NVUE
    beforeDestroy() {
        this.stopAnimation = true;
    },
    // #endif
    methods: {
        init() {
            // #ifdef APP-NVUE
            this.nvue();
            // #endif

            // #ifndef APP-NVUE
            this.vue();
            // #endif

            if (!uni.$util.test.string(this.text)) {
                uni.$util.error('noticebar组件direction为row时，要求text参数为字符串形式');
            }
        },
        // vue版处理
        async vue() {
            // #ifndef APP-NVUE
            let textWidth = 0;
            // 进行一定的延时
            await uni.$util.sleep();
            // 查询盒子和文字的宽度
            textWidth = (await this.getRect('.ai-notice__content__text')).width;
            // 根据t=s/v(时间=路程/速度)，这里为何不需要加上#ai-notice-box的宽度，因为中设置了.ai-notice-content样式中设置了padding-left: 100%
            // 恰巧计算出来的结果中已经包含了#ai-notice-box的宽度
            this.animationDuration = `${textWidth / uni.$util.getPx(this.speed)}s`;
            // 这里必须这样开始动画，否则在APP上动画速度不会改变
            this.animationPlayState = 'paused';
            setTimeout(() => {
                this.animationPlayState = 'running';
            }, 10);
            // #endif
        },
        // nvue版处理
        async nvue() {
            // #ifdef APP-NVUE
            this.nvueInit = false;
            let boxWidth = 0,
                textWidth = 0;
            // 进行一定的延时
            await uni.$util.sleep();
            // 查询盒子和文字的宽度
            textWidth = (await this.getNvueRect('ai-notice__content__text')).width;
            boxWidth = (await this.getNvueRect('ai-notice__content')).width;
            // 将文字移动到盒子的右边沿，之所以需要这么做，是因为nvue不支持100%单位，否则可以通过css设置
            animation.transition(
                this.$refs['ai-notice__content__text'],
                {
                    styles: {
                        transform: `translateX(${boxWidth}px)`,
                    },
                },
                () => {
                    // 如果非禁止动画，则开始滚动
                    !this.stopAnimation && this.loopAnimation(textWidth, boxWidth);
                }
            );
            // #endif
        },
        loopAnimation(textWidth, boxWidth) {
            // #ifdef APP-NVUE
            animation.transition(
                this.$refs['ai-notice__content__text'],
                {
                    styles: {
                        // 目标移动终点为-textWidth，也即当文字的最右边贴到盒子的左边框的位置
                        transform: `translateX(-${textWidth}px)`,
                    },
                    // 滚动时间的计算为，时间 = 路程(boxWidth + textWidth) / 速度，最后转为毫秒
                    duration: ((boxWidth + textWidth) / uni.$util.getPx(this.speed)) * 1000,
                    delay: 10,
                },
                () => {
                    animation.transition(
                        this.$refs['ai-notice__content__text'],
                        {
                            styles: {
                                // 重新将文字移动到盒子的右边沿
                                transform: `translateX(${this.stopAnimation ? 0 : boxWidth}px)`,
                            },
                        },
                        () => {
                            // 如果非禁止动画，则继续下一轮滚动
                            if (!this.stopAnimation) {
                                // 判断是否需要初始化计算尺寸
                                if (this.nvueInit) {
                                    this.nvue();
                                } else {
                                    this.loopAnimation(textWidth, boxWidth);
                                }
                            }
                        }
                    );
                }
            );
            // #endif
        },
        getNvueRect(el) {
            // #ifdef APP-NVUE
            // 返回一个promise
            return new Promise((resolve) => {
                dom.getComponentRect(this.$refs[el], (res) => {
                    resolve(res.size);
                });
            });
            // #endif
        },
        // 点击通告栏
        onClick() {
            this.$emit('click');
        },
        // 点击右侧按钮，需要判断点击的是关闭图标还是箭头图标
        close() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-notice {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &__left-icon {
        align-items: center;
        margin-right: 10rpx;
    }

    &__right-icon {
        margin-left: 10rpx;
        align-items: center;
    }

    &__content {
        text-align: right;
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow: hidden;

        &__text {
            font-size: 28rpx;
            color: $color-warning;
            /* #ifndef APP-NVUE */
            // 这一句很重要，为了能让滚动左右连接起来
            padding-left: 100%;
            word-break: keep-all;
            white-space: nowrap;
            animation: ai-loop-animation 10s linear infinite both;
            /* #endif */
        }
    }
}

@keyframes ai-loop-animation {
    0% {
        transform: translate3d(0, 0, 0);
    }

    100% {
        transform: translate3d(-100%, 0, 0);
    }
}
</style>
