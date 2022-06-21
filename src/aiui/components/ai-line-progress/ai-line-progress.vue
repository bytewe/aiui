<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:15:59
 * @Description: 线型进度条
-->

<template>
    <view class="ai-line-progress" :style="[$util.addStyle(customStyle)]">
        <view
            ref="ai-line-progress__background"
            class="ai-line-progress__background"
            :style="[
                {
                    backgroundColor: inactiveColor,
                    height: $util.addUnit(height),
                },
            ]"
        />
        <view class="ai-line-progress__line" :style="[progressStyle]">
            <slot>
                <text v-if="showText && percentage >= 10" class="ai-line-progress__text">{{
                    innserPercentage + '%'
                }}</text>
            </slot>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif
export default {
    name: 'AiLineProgress',
    mixins: [mixins],
    props: {
        // 激活部分的颜色
        activeColor: {
            type: String,
            default: '#19be6b',
        },
        inactiveColor: {
            type: String,
            default: '#ececec',
        },
        // 进度百分比，数值
        percentage: {
            type: [String, Number],
            default: 0,
        },
        // 是否在进度条内部显示百分比的值
        showText: {
            type: Boolean,
            default: true,
        },
        // 进度条的高度，单位px
        height: {
            type: [String, Number],
            default: 12,
        },
    },
    data() {
        return {
            lineWidth: 0,
        };
    },
    computed: {
        progressStyle() {
            let style = {};
            style.width = this.lineWidth;
            style.backgroundColor = this.activeColor;
            style.height = uni.$util.addUnit(this.height);
            return style;
        },
        innserPercentage() {
            // 控制范围在0-100之间
            return uni.$util.range(0, 100, this.percentage);
        },
    },
    watch: {
        percentage() {
            this.resizeProgressWidth();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            uni.$util.sleep(20).then(() => {
                this.resizeProgressWidth();
            });
        },
        getProgressWidth() {
            // #ifndef APP-NVUE
            return this.getRect('.ai-line-progress__background');
            // #endif

            // #ifdef APP-NVUE
            // 返回一个promise
            // eslint-disable-next-line no-unreachable
            return new Promise((resolve) => {
                dom.getComponentRect(this.$refs['ai-line-progress__background'], (res) => {
                    resolve(res.size);
                });
            });
            // #endif
        },
        resizeProgressWidth() {
            this.getProgressWidth().then((size) => {
                const { width } = size;
                // 通过设置的percentage值，计算其所占总长度的百分比
                this.lineWidth = (width * this.innserPercentage) / 100 + 'px';
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-line-progress {
    align-items: stretch;
    position: relative;
    flex-direction: row;
    flex: 1;
    overflow: hidden;
    border-radius: 200rpx;

    &__background {
        background-color: #ececec;
        border-radius: 200rpx;
        flex: 1;
    }

    &__line {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        align-items: center;
        flex-direction: row;
        color: #ffffff;
        border-radius: 200rpx;
        transition: width 0.5s ease;
        justify-content: flex-end;
    }

    &__text {
        font-size: 20rpx;
        align-items: center;
        text-align: right;
        color: #ffffff;
        margin-right: 10rpx;
        transform: scale(0.9);
    }
}
</style>
