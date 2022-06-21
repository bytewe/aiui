<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:26:24
 * @Description: 标签
-->

<template>
    <view class="ai-tabs">
        <view class="ai-tabs__wrapper">
            <slot name="left" />
            <view class="ai-tabs__wrapper__scroll-view-wrapper">
                <scroll-view
                    ref="ai-tabs__wrapper__scroll-view"
                    :scroll-x="scrollable"
                    :scroll-left="scrollLeft"
                    scroll-with-animation
                    class="ai-tabs__wrapper__scroll-view"
                    :show-scrollbar="false"
                >
                    <view
                        ref="ai-tabs__wrapper__nav"
                        class="ai-tabs__wrapper__nav"
                        :style="[
                            {
                                flex: scrollable ? 0 : 1,
                            },
                        ]"
                    >
                        <view
                            v-for="(item, index) in list"
                            :key="index"
                            :ref="`ai-tabs__wrapper__nav__item-${index}`"
                            class="ai-tabs__wrapper__nav__item"
                            :style="[$util.addStyle(itemStyle)]"
                            :class="[
                                `ai-tabs__wrapper__nav__item-${index}`,
                                item.disabled && 'ai-tabs__wrapper__nav__item--disabled',
                            ]"
                            @click="onClick(item, index)"
                        >
                            <text
                                :class="[
                                    'ellipsis' && 'ai-line-1',
                                    item.disabled && 'ai-tabs__wrapper__nav__item__text--disabled',
                                ]"
                                class="ai-tabs__wrapper__nav__item__text"
                                :style="[textStyle(index)]"
                                >{{ item[keyName] }}</text
                            >
                            <ai-badge
                                :show="!!(item.badge && (item.badge.show || item.badge.isDot || item.badge.value))"
                                :is-dot="(item.badge && item.badge.isDot) || propsBadge.isDot"
                                :value="(item.badge && item.badge.value) || propsBadge.value"
                                :max="(item.badge && item.badge.max) || propsBadge.max"
                                :type="(item.badge && item.badge.type) || propsBadge.type"
                                :show-zero="(item.badge && item.badge.showZero) || propsBadge.showZero"
                                :background="(item.badge && item.badge.background) || propsBadge.background"
                                :color="(item.badge && item.badge.color) || propsBadge.color"
                                :shape="(item.badge && item.badge.shape) || propsBadge.shape"
                                :number-type="(item.badge && item.badge.numberType) || propsBadge.numberType"
                                :inverted="(item.badge && item.badge.inverted) || propsBadge.inverted"
                                custom-style="margin-left: 8rpx;"
                            />
                        </view>
                        <!-- #ifdef APP-NVUE -->
                        <view
                            ref="ai-tabs__wrapper__nav__line"
                            class="ai-tabs__wrapper__nav__line"
                            :style="[
                                {
                                    width: $util.addUnit(lineWidth),
                                    height: $util.addUnit(lineHeight),
                                    backgroundColor: lineColor,
                                },
                            ]"
                        />
                        <!-- #endif -->
                        <!-- #ifndef APP-NVUE -->
                        <view
                            ref="ai-tabs__wrapper__nav__line"
                            class="ai-tabs__wrapper__nav__line"
                            :style="[
                                {
                                    width: $util.addUnit(lineWidth),
                                    transform: `translate(${lineOffsetLeft}px)`,
                                    transitionDuration: `${firstTime ? 0 : duration}ms`,
                                    height: $util.addUnit(lineHeight),
                                    backgroundColor: lineColor,
                                },
                            ]"
                        />
                        <!-- #endif -->
                    </view>
                </scroll-view>
            </view>
            <slot name="right" />
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
import configBadge from '@/aiui/components/ai-badge/ai-badge';
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation');
const dom = uni.requireNativePlugin('dom');
// #endif

export default {
    name: 'AiTabs',
    mixins: [mixins],
    props: {
        // 滑块的移动过渡时间，单位ms
        duration: {
            type: Number,
            default: 300,
        },
        // tabs标签数组
        list: {
            type: Array,
            default: () => [],
        },
        // 滑块颜色
        lineColor: {
            type: String,
            default: '#3c9cff',
        },
        // 菜单选择中时的样式
        activeStyle: {
            type: [String, Object],
            default: () => ({
                color: '#303133',
            }),
        },
        // 菜单非选中时的样式
        inactiveStyle: {
            type: [String, Object],
            default: () => ({
                color: '#606266',
            }),
        },
        // 滑块长度
        lineWidth: {
            type: [String, Number],
            default: 20,
        },
        // 滑块高度
        lineHeight: {
            type: [String, Number],
            default: 3,
        },
        // 菜单item的样式
        itemStyle: {
            type: [String, Object],
            default: () => ({
                height: '88rpx',
            }),
        },
        // 菜单是否可滚动
        scrollable: {
            type: Boolean,
            default: true,
        },
        // 当前选中标签的索引
        current: {
            type: [Number, String],
            default: 0,
        },
        // 默认读取的键名
        keyName: {
            type: String,
            default: 'name',
        },
    },
    data() {
        return {
            firstTime: true,
            scrollLeft: 0,
            scrollViewWidth: 0,
            lineOffsetLeft: 0,
            tabsRect: {
                left: 0,
            },
            innerCurrent: 0,
            moving: false,
        };
    },
    computed: {
        textStyle() {
            return (index) => {
                const style = {};
                // 取当期是否激活的样式
                const customeStyle =
                    index === this.innerCurrent
                        ? uni.$util.addStyle(this.activeStyle)
                        : uni.$util.addStyle(this.inactiveStyle);
                // 如果当前菜单被禁用，则加上对应颜色，需要在此做处理，是因为nvue下，无法在style样式中通过!import覆盖标签的内联样式
                if (this.list[index].disabled) {
                    style.color = '#c8c9cc';
                }
                return uni.$util.deepMerge(customeStyle, style);
            };
        },
        propsBadge() {
            return configBadge.props;
        },
    },
    watch: {
        current: {
            immediate: true,
            handler(newValue) {
                // 内外部值不相等时，才尝试移动滑块
                if (newValue !== this.innerCurrent) {
                    this.innerCurrent = newValue;
                    this.$nextTick(() => {
                        this.resize();
                    });
                }
            },
        },
        // list变化时，重新渲染list各项信息
        list() {
            this.$nextTick(() => {
                this.resize();
            });
        },
    },
    async mounted() {
        this.init();
    },
    methods: {
        setLineLeft() {
            const tabItem = this.list[this.innerCurrent];
            if (!tabItem) {
                return;
            }
            // 获取滑块该移动的位置
            let lineOffsetLeft = this.list
                .slice(0, this.innerCurrent)
                .reduce((total, curr) => total + curr.rect.width, 0);
            let lineWidth = this.lineWidth; // 拷贝副本，防止间接修改props中的值
            // 如果lineWidth不是数字类型的话
            if (typeof lineWidth !== 'number') {
                // 判断后缀是否为rpx
                if (lineWidth.indexOf('rpx') > -1) {
                    lineWidth = uni.upx2px(parseFloat(lineWidth)); // rpx -> px
                } else {
                    lineWidth = parseFloat(lineWidth);
                }
            }
            this.lineOffsetLeft = lineOffsetLeft + (tabItem.rect.width - lineWidth) / 2;
            // #ifdef APP-NVUE
            // 第一次移动滑块，无需过渡时间
            this.animation(this.lineOffsetLeft, this.firstTime ? 0 : parseInt(this.duration));
            // #endif

            // 如果是第一次执行此方法，让滑块在初始化时，瞬间滑动到第一个tab item的中间
            // 这里需要一个定时器，因为在非nvue下，是直接通过style绑定过渡时间，需要等其过渡完成后，再设置为false(非第一次移动滑块)
            if (this.firstTime) {
                setTimeout(() => {
                    this.firstTime = false;
                }, 10);
            }
        },
        // nvue下设置滑块的位置
        animation(x, duration = 0) {
            // #ifdef APP-NVUE
            const ref = this.$refs['ai-tabs__wrapper__nav__line'];
            animation.transition(ref, {
                styles: {
                    transform: `translateX(${x}px)`,
                },
                duration,
            });
            // #endif
        },
        // 点击某一个标签
        onClick(item, index) {
            // 因为标签可能为disabled状态，所以click是一定会发出的，但是change事件是需要可用的状态才发出
            this.$emit('click', {
                ...item,
                index,
            });
            // 如果disabled状态，返回
            if (item.disabled) return;
            this.innerCurrent = index;
            this.resize();
            this.$emit('change', {
                ...item,
                index,
            });
        },
        init() {
            uni.$util.sleep().then(() => {
                this.resize();
            });
        },
        setScrollLeft() {
            // 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
            const tabRect = this.list[this.innerCurrent];
            // 累加得到当前item到左边的距离
            const offsetLeft = this.list.slice(0, this.innerCurrent).reduce((total, curr) => {
                return total + curr.rect.width;
            }, 0);
            // 此处为屏幕宽度
            const windowWidth = uni.$util.sys().windowWidth;
            // 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
            let scrollLeft =
                offsetLeft -
                (this.tabsRect.width - tabRect.rect.width) / 2 -
                (windowWidth - this.tabsRect.right) / 2 +
                this.tabsRect.left / 2;
            // 这里做一个限制，限制scrollLeft的最大值为整个scroll-view宽度减去tabs组件的宽度
            scrollLeft = Math.min(scrollLeft, this.scrollViewWidth - this.tabsRect.width);
            this.scrollLeft = Math.max(0, scrollLeft);
        },
        // 获取所有标签的尺寸
        resize() {
            // 如果不存在list，则不处理
            if (this.list.length === 0) {
                return;
            }
            Promise.all([this.getTabsRect(), this.getAllItemRect()]).then(([tabsRect, itemRect = []]) => {
                this.tabsRect = tabsRect;
                this.scrollViewWidth = 0;
                itemRect.map((item, index) => {
                    // 计算scroll-view的宽度，这里
                    this.scrollViewWidth += item.width;
                    // 另外计算每一个item的中心点X轴坐标
                    // eslint-disable-next-line vue/no-mutating-props
                    this.list[index].rect = item;
                });
                // 获取了tabs的尺寸之后，设置滑块的位置
                this.setLineLeft();
                this.setScrollLeft();
            });
        },
        // 获取导航菜单的尺寸
        getTabsRect() {
            return new Promise((resolve) => {
                this.queryRect('ai-tabs__wrapper__scroll-view').then((size) => resolve(size));
            });
        },
        // 获取所有标签的尺寸
        getAllItemRect() {
            return new Promise((resolve) => {
                const promiseAllArr = this.list.map((item, index) =>
                    this.queryRect(`ai-tabs__wrapper__nav__item-${index}`, true)
                );
                Promise.all(promiseAllArr).then((sizes) => resolve(sizes));
            });
        },
        // 获取各个标签的尺寸
        queryRect(el, item) {
            // #ifndef APP-NVUE
            return new Promise((resolve) => {
                this.getRect(`.${el}`).then((size) => {
                    resolve(size);
                });
            });
            // #endif

            // #ifdef APP-NVUE
            // nvue下，使用dom模块查询元素高度
            // 返回一个promise，让调用此方法的主体能使用then回调
            // eslint-disable-next-line no-unreachable
            return new Promise((resolve) => {
                dom.getComponentRect(item ? this.$refs[el][0] : this.$refs[el], (res) => {
                    resolve(res.size);
                });
            });
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-tabs {
    &__wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;

        &__scroll-view-wrapper {
            flex: 1;
            /* #ifndef APP-NVUE */
            overflow: auto hidden;
            /* #endif */
        }

        &__scroll-view {
            display: flex;
            flex-direction: row;
            flex: 1;
        }

        &__nav {
            display: flex;
            flex-direction: row;
            position: relative;

            &__item {
                padding: 0 22rpx;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                flex: 1;

                &--disabled {
                    /* #ifndef APP-NVUE */
                    cursor: not-allowed;
                    /* #endif */
                }

                &__text {
                    font-size: 30rpx;
                    color: $color-dark;

                    &--disabled {
                        color: $color-light !important;
                    }
                }
            }

            &__line {
                height: 6rpx;
                background-color: $color-primary;
                width: 60rpx;
                position: absolute;
                bottom: 4rpx;
                border-radius: 200rpx;
                transition-property: transform;
                transition-duration: 300ms;
            }
        }
    }
}
</style>
