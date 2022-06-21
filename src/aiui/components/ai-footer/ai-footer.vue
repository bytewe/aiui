<!--
 * @Author: airobot
 * @Date: 2022-02-06 17:22:02
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:15:19
 * @Description: 提交栏
-->

<template>
    <view class="ai-footer">
        <view
            ref="ai-footer__container"
            :class="[$util.bem('ai-footer__container', [{ fixed }]), border && fixed && 'ai-border--top']"
            :style="[{ zIndex: zIndex }, $util.addStyle(customStyle)]"
        >
            <view class="ai-footer__container__slot">
                <slot />
            </view>
            <ai-safe-bottom v-if="safeAreaInsetBottom" />
        </view>
        <view
            v-if="fixed"
            class="ai-footer__placeholder"
            :style="{
                height: placeholderHeight + 'px',
            }"
        />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif

export default {
    name: 'AiFooter',
    mixins: [mixins],
    props: {
        // 是否为iPhoneX留出底部安全距离
        safeAreaInsetBottom: {
            type: Boolean,
            default: true,
        },
        // 是否显示上方边框
        border: {
            type: Boolean,
            default: true,
        },
        // 元素层级
        zIndex: {
            type: [String, Number],
            default: 1,
        },
        // 是否固定在底部
        fixed: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            placeholderHeight: 0,
        };
    },
    mounted() {
        this.setPlaceholderHeight();
    },
    methods: {
        // 设置用于防止塌陷元素的高度
        async setPlaceholderHeight() {
            if (!this.fixed) {
                return;
            }
            // 延时一定时间
            await uni.$util.sleep(20);
            // #ifndef APP-NVUE
            this.getRect('.ai-footer__container').then(({ height = 50 }) => {
                // 修复IOS safearea bottom 未填充高度
                this.placeholderHeight = height;
            });
            // #endif
            // #ifdef APP-NVUE
            dom.getComponentRect(this.$refs['ai-footer__container'], (res) => {
                const { size } = res;
                this.placeholderHeight = size.height;
            });
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-footer-padding: $space-mini $space-small;
$ai-footer-background: $background-white;

.ai-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__container {
        display: flex;
        flex-direction: column;
        background-color: $ai-footer-background;

        &__slot {
            display: flex;
            flex-direction: row;
            padding: $ai-footer-padding;
        }

        &--fixed {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
}
</style>
