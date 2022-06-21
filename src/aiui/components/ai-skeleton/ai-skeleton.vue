<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:45
 * @Description: 骨架屏
-->

<template>
    <view class="ai-skeleton">
        <view
            v-if="loading"
            ref="ai-skeleton__wrapper"
            class="ai-skeleton__wrapper"
            style="display: flex; flex-direction: row"
        >
            <view
                v-if="avatar"
                class="ai-skeleton__wrapper__avatar"
                :class="[`ai-skeleton__wrapper__avatar--${avatarShape}`, animate && 'animate']"
                :style="{
                    height: $util.addUnit(avatarSize),
                    width: $util.addUnit(avatarSize),
                }"
            />
            <view ref="ai-skeleton__wrapper__content" class="ai-skeleton__wrapper__content" style="flex: 1">
                <view
                    v-if="title"
                    class="ai-skeleton__wrapper__content__title"
                    :style="{
                        width: uTitleWidth,
                        height: $util.addUnit(titleHeight),
                    }"
                    :class="[animate && 'animate']"
                />
                <view
                    v-for="(item, index) in rowsArray"
                    :key="index"
                    class="ai-skeleton__wrapper__content__rows"
                    :class="[animate && 'animate']"
                    :style="{
                        width: item.width,
                        height: item.height,
                        marginTop: item.marginTop,
                    }"
                />
            </view>
        </view>
        <slot v-else />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
// NVUE不支持百分比单位，这里需要通过dom查询组件的宽度
const dom = uni.requireNativePlugin('dom');
const animation = uni.requireNativePlugin('animation');
// #endif

export default {
    name: 'AiSkeleton',
    mixins: [mixins],
    props: {
        // 是否展示骨架组件
        loading: {
            type: Boolean,
            default: true,
        },
        // 是否开启动画效果
        animate: {
            type: Boolean,
            default: true,
        },
        // 段落占位图行数
        rows: {
            type: [String, Number],
            default: 0,
        },
        // 段落占位图的宽度
        rowsWidth: {
            type: [String, Number, Array],
            default: '100%',
        },
        // 段落占位图的高度
        rowsHeight: {
            type: [String, Number, Array],
            default: 18,
        },
        // 是否展示标题占位图
        title: {
            type: Boolean,
            default: true,
        },
        // 段落标题的宽度
        titleWidth: {
            type: [String, Number],
            default: '50%',
        },
        // 段落标题的高度
        titleHeight: {
            type: [String, Number],
            default: 18,
        },
        // 是否展示头像占位图
        avatar: {
            type: Boolean,
            default: false,
        },
        // 头像占位图大小
        avatarSize: {
            type: [String, Number],
            default: 32,
        },
        // 头像占位图的形状，circle-圆形，square-方形
        avatarShape: {
            type: String,
            default: 'circle',
        },
    },
    data() {
        return {
            width: 0,
        };
    },
    computed: {
        rowsArray() {
            if (/%$/.test(this.rowsHeight)) {
                uni.$util.error('rowsHeight参数不支持百分比单位');
            }
            const rows = [];
            for (let i = 0; i < this.rows; i++) {
                let item = {},
                    // 需要预防超出数组边界的情况
                    rowWidth = uni.$util.test.array(this.rowsWidth)
                        ? this.rowsWidth[i] || (i === this.row - 1 ? '70%' : '100%')
                        : i === this.rows - 1
                        ? '70%'
                        : this.rowsWidth,
                    rowHeight = uni.$util.test.array(this.rowsHeight) ? this.rowsHeight[i] || '36rpx' : this.rowsHeight;
                // 如果有title占位图，第一个段落占位图的外边距需要大一些，如果没有title占位图，第一个段落占位图则无需外边距
                // 之所以需要这么做，是因为weex的无能，以提升性能为借口不支持css的一些伪类
                item.marginTop = !this.title && i === 0 ? 0 : this.title && i === 0 ? '40rpx' : '24rpx';
                // 如果设置的为百分比的宽度，转换为px值，因为nvue不支持百分比单位
                if (/%$/.test(rowWidth)) {
                    // 通过parseInt提取出百分比单位中的数值部分，除以100得到百分比的小数值
                    item.width = uni.$util.addUnit((this.width * parseInt(rowWidth)) / 100);
                } else {
                    item.width = uni.$util.addUnit(rowWidth);
                }
                item.height = uni.$util.addUnit(rowHeight);
                rows.push(item);
            }
            // console.log(rows);
            return rows;
        },
        uTitleWidth() {
            let tWidth = 0;
            if (/%$/.test(this.titleWidth)) {
                // 通过parseInt提取出百分比单位中的数值部分，除以100得到百分比的小数值
                tWidth = uni.$util.addUnit((this.width * parseInt(this.titleWidth)) / 100);
            } else {
                tWidth = uni.$util.addUnit(this.titleWidth);
            }
            return uni.$util.addUnit(tWidth);
        },
    },
    watch: {
        loading() {
            this.getComponentWidth();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getComponentWidth();
            // #ifdef APP-NVUE
            this.loading && this.animate && this.setNvueAnimation();
            // #endif
        },
        async setNvueAnimation() {
            // #ifdef APP-NVUE
            // 为了让opacity:1的状态保持一定时间，这里做一个延时
            await uni.$util.sleep(500);
            const skeleton = this.$refs['ai-skeleton__wrapper'];
            skeleton &&
                this.loading &&
                this.animate &&
                animation.transition(
                    skeleton,
                    {
                        styles: {
                            opacity: 0.5,
                        },
                        duration: 600,
                    },
                    () => {
                        // 这里无需判断是否loading和开启动画状态，因为最终的状态必须达到opacity: 1，否则可能
                        // 会停留在opacity: 0.5的状态中
                        animation.transition(
                            skeleton,
                            {
                                styles: {
                                    opacity: 1,
                                },
                                duration: 600,
                            },
                            () => {
                                // 只有在loading中时，才执行动画
                                this.loading && this.animate && this.setNvueAnimation();
                            }
                        );
                    }
                );
            // #endif
        },
        // 获取组件的宽度
        async getComponentWidth() {
            // 延时一定时间，以获取dom尺寸
            await uni.$util.sleep(20);
            // #ifndef APP-NVUE
            this.getRect('.ai-skeleton__wrapper__content').then((size) => {
                this.width = size.width;
            });
            // #endif

            // #ifdef APP-NVUE
            const ref = this.$refs['ai-skeleton__wrapper__content'];
            ref &&
                dom.getComponentRect(ref, (res) => {
                    this.width = res.size.width;
                });
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
@mixin background {
    /* #ifdef APP-NVUE */
    background-color: #f1f2f4;
    /* #endif */
    /* #ifndef APP-NVUE */
    background: linear-gradient(90deg, #f1f2f4 25%, #e6e6e6 37%, #f1f2f4 50%);
    background-size: 400% 100%;
    /* #endif */
}

.ai-skeleton {
    flex: 1;

    &__wrapper {
        flex-direction: row;

        &__avatar {
            @include background;
            margin-right: 30rpx;

            &--circle {
                border-radius: 200rpx;
            }

            &--square {
                border-radius: 8rpx;
            }
        }

        &__content {
            flex: 1;

            &__rows,
            &__title {
                @include background;
                border-radius: 6rpx;
            }
        }
    }
}

/* #ifndef APP-NVUE */
.animate {
    animation: skeleton 1.8s ease infinite;
}

@keyframes skeleton {
    0% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
}

/* #endif */
</style>
