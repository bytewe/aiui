<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:59
 * @Description: 分段器
-->

<template>
    <view
        ref="ai-subsection"
        class="ai-subsection"
        :class="[`ai-subsection--${mode}`]"
        :style="[$util.addStyle(customStyle), wrapperStyle]"
    >
        <view
            ref="ai-subsection__bar"
            class="ai-subsection__bar"
            :style="[barStyle]"
            :class="[
                mode === 'button' && 'ai-subsection--button__bar',
                current === 0 && mode === 'subsection' && 'ai-subsection__bar--first',
                current > 0 && current < list.length - 1 && mode === 'subsection' && 'ai-subsection__bar--center',
                current === list.length - 1 && mode === 'subsection' && 'ai-subsection__bar--last',
            ]"
        />
        <view
            v-for="(item, index) in list"
            :ref="`ai-subsection__item--${index}`"
            :key="index"
            class="ai-subsection__item"
            :class="[
                `ai-subsection__item--${index}`,
                index < list.length - 1 && 'ai-subsection__item--no-border-right',
                index === 0 && 'ai-subsection__item--first',
                index === list.length - 1 && 'ai-subsection__item--last',
            ]"
            :style="[itemStyle]"
            @click="onClick(index)"
        >
            <text class="ai-subsection__item__text" :style="[textStyle(index)]">{{ getText(item) }}</text>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
const animation = uni.requireNativePlugin('animation');
// #endif

export default {
    name: 'AiSubsection',
    mixins: [mixins],
    props: {
        // tab的数据
        list: {
            type: Array,
            default: () => [],
        },
        // 当前活动的tab的index
        current: {
            type: [String, Number],
            default: 0,
        },
        // 激活的颜色
        activeColor: {
            type: String,
            default: '#3c9cff',
        },
        // 未激活的颜色
        inactiveColor: {
            type: String,
            default: '#303133',
        },
        // 模式选择，mode=button为按钮形式，mode=subsection时为分段模式
        mode: {
            type: String,
            default: 'button',
        },
        // 字体大小
        fontSize: {
            type: [String, Number],
            default: 12,
        },
        // 激活tab的字体是否加粗
        bold: {
            type: Boolean,
            default: true,
        },
        // mode = button时，组件背景颜色
        background: {
            type: String,
            default: '#eeeeef',
        },
        // 从list元素对象中读取的键名
        keyName: {
            type: String,
            default: 'name',
        },
    },
    data() {
        return {
            // 组件尺寸
            itemRect: {
                width: 0,
                height: 0,
            },
        };
    },
    computed: {
        wrapperStyle() {
            const style = {};
            // button模式时，设置背景色
            if (this.mode === 'button') {
                style.backgroundColor = this.background;
            }
            return style;
        },
        // 滑块的样式
        barStyle() {
            const style = {};
            style.width = `${this.itemRect.width}px`;
            style.height = `${this.itemRect.height}px`;
            // 通过translateX移动滑块，其移动的距离为索引*item的宽度
            // #ifndef APP-NVUE
            style.transform = `translateX(${this.current * this.itemRect.width}px)`;
            // #endif
            if (this.mode === 'subsection') {
                // 在subsection模式下，需要动态设置滑块的圆角，因为移动滑块使用的是translateX，无法通过父元素设置overflow: hidden隐藏滑块的直角
                style.backgroundColor = this.activeColor;
            }
            return style;
        },
        // 分段器item的样式
        itemStyle() {
            const style = {};
            if (this.mode === 'subsection') {
                // 设置border的样式
                style.borderColor = this.activeColor;
                style.borderWidth = '2rpx';
                style.borderStyle = 'solid';
            }
            return style;
        },
        // 分段器文字颜色
        textStyle() {
            return (index) => {
                const style = {};
                style.fontWeight = this.bold && this.current === index ? 'bold' : 'normal';
                style.fontSize = uni.$util.addUnit(this.fontSize);
                // subsection模式下，激活时默认为白色的文字
                if (this.mode === 'subsection') {
                    style.color = this.current === index ? '#fff' : this.inactiveColor;
                } else {
                    // button模式下，激活时文字颜色默认为activeColor
                    style.color = this.current === index ? this.activeColor : this.inactiveColor;
                }
                return style;
            };
        },
    },
    watch: {
        list() {
            this.init();
        },
        current: {
            immediate: true,
            handler(n) {
                // #ifdef APP-NVUE
                // 在安卓nvue上，如果通过translateX进行位移，到最后一个时，会导致右侧无法绘制圆角
                // 故用animation模块进行位移
                const ref = this.$refs?.['ai-subsection__bar']?.ref;
                // 不存在ref的时候(理解为第一次初始化时，需要渲染dom，进行一定延时再获取ref)，这里的100ms是经过测试得出的结果(某些安卓需要延时久一点)，勿随意修改
                uni.$util.sleep(ref ? 0 : 100).then(() => {
                    animation.transition(this.$refs['ai-subsection__bar'].ref, {
                        styles: {
                            transform: `translateX(${n * this.itemRect.width}px)`,
                            transformOrigin: 'center center',
                        },
                        duration: 300,
                    });
                });
                // #endif
            },
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            uni.$util.sleep().then(() => {
                // #ifndef APP-NVUE
                this.getRect('.ai-subsection__item--0').then((size) => {
                    this.itemRect = size;
                });
                // #endif

                // #ifdef APP-NVUE
                const ref = this.$refs['ai-subsection__item--0'][0];
                ref &&
                    dom.getComponentRect(ref, (res) => {
                        this.itemRect = res.size;
                    });
                // #endif
            });
        },
        // 判断展示文本
        getText(item) {
            return typeof item === 'object' ? item[this.keyName] : item;
        },
        onClick(index) {
            this.$emit('change', index);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-subsection {
    display: flex;
    flex-direction: row;
    position: relative;
    overflow: hidden;
    /* #ifndef APP-NVUE */
    width: 100%;
    box-sizing: border-box;
    /* #endif */

    &--button {
        height: 64rpx;
        background-color: rgb(238, 238, 239);
        padding: 6rpx;
        border-radius: 6rpx;
        align-items: stretch;

        &__bar {
            background-color: #ffffff;
            border-radius: 6rpx !important;
        }
    }

    &--subsection {
        height: 60rpx;
    }

    &__bar {
        position: absolute;
        /* #ifndef APP-NVUE */
        transition-property: transform, color;
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
        /* #endif */

        &--first {
            border-top-left-radius: 6rpx;
            border-bottom-left-radius: 6rpx;
            border-top-right-radius: 0rpx;
            border-bottom-right-radius: 0rpx;
        }

        &--center {
            border-top-left-radius: 0rpx;
            border-bottom-left-radius: 0rpx;
            border-top-right-radius: 0rpx;
            border-bottom-right-radius: 0rpx;
        }

        &--last {
            border-top-left-radius: 0rpx;
            border-bottom-left-radius: 0rpx;
            border-top-right-radius: 6rpx;
            border-bottom-right-radius: 6rpx;
        }
    }

    &__item {
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: center;
        align-items: center;
        // vue环境下，需要设置相对定位，因为滑块为绝对定位，item需要在滑块的上面
        position: relative;

        &--no-border-right {
            border-right-width: 0 !important;
        }

        &--first {
            border-top-left-radius: 6rpx;
            border-bottom-left-radius: 6rpx;
        }

        &--last {
            border-top-right-radius: 6rpx;
            border-bottom-right-radius: 6rpx;
        }

        &__text {
            font-size: 24rpx;
            line-height: 24rpx;
            display: flex;
            flex-direction: row;
            align-items: center;
            transition-property: color;
            transition-duration: 0.3s;
        }
    }
}
</style>
