<!--
 * @Author: airobot
 * @Date: 2022-02-11 00:17:54
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-14 23:01:05
 * @Description: 盒子
-->

<template>
    <view :class="_customClass" :style="_customStyle">
        <view v-if="title" :class="_titleClass" :style="_titleStyle">
            <text class="ai-box__title__text">{{ title }}</text>
        </view>
        <view :class="_contentClass" :style="_contentStyle">
            <slot />
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    mixins: [mixins],
    props: {
        // 边框
        border: {
            type: Boolean,
            default: false,
        },
        // 背景色
        background: {
            type: String,
            default: '',
        },
        // 大小，可选值：normal|big|small
        size: {
            type: String,
            default: '',
        },
        // 标题
        title: {
            type: String,
            default: '',
        },
        // 标题是否有下滑线
        titleBorder: {
            type: Boolean,
            default: false,
        },
        // 水平排列方式，可选值为start、end、center、around、between
        justify: {
            type: String,
            default: '',
        },
        // 垂直对齐方式，可选值为top、center、bottom
        align: {
            type: String,
            default: '',
        },
        // 标题样式
        titleStyle: {
            type: [String, Object],
            default: '',
        },
        // 内容样式
        contentStyle: {
            type: [String, Object],
            default: '',
        },
    },
    computed: {
        // 自定义属性
        _customClass() {
            return [uni.$util.bem('ai-box'), this.border ? 'ai-border--top-bottom' : ''];
        },
        // 标题属性
        _titleClass() {
            return [uni.$util.bem('ai-box__title', this.size), this.titleBorder ? 'ai-border--bottom' : ''];
        },
        // 内容属性
        _contentClass() {
            return [
                uni.$util.bem('ai-box__content', [
                    this.direction,
                    this.justify,
                    this.align,
                    this.size,
                    { padding: !this.title },
                ]),
            ];
        },
        // 自定义样式
        _customStyle() {
            const style = {};
            if (this.background) {
                style.background = uni.$config[`background-${this.background}`] || this.background;
            }
            return [uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle))];
        },
        // 标题样式
        _titleStyle() {
            return [uni.$util.addStyle(this.titleStyle)];
        },
        // 内容样式
        _contentStyle() {
            return [uni.$util.addStyle(this.contentStyle)];
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-box {
    display: flex;
    flex-direction: column;

    &__title {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: $space-small $space-normal $space-mini;

        &__text {
            display: flex;
            flex-direction: row;
            font-size: $font-size-normal;
            line-height: $line-height-normal;
            color: $color-dark;
        }

        &--small {
            padding: $space-mini $space-normal;
        }

        &--big {
            padding: $space-normal $space-normal;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        padding: 0 $space-normal $space-small;

        &--small {
            padding-bottom: $space-mini;
        }

        &--big {
            padding-bottom: $space-normal;
        }

        &--padding {
            padding-top: $space-small;
        }

        &--small.ai-box__content--padding {
            padding-top: $space-mini;
        }

        &--big.ai-box__content--padding {
            padding-top: $space-normal;
        }

        &--center {
            align-items: center;
        }
    }
}
</style>
