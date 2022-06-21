<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-15 19:45:59
 * @Description: 底部导航栏
-->

<template>
    <view class="ai-tabbar">
        <view
            ref="ai-tabbar__content"
            class="ai-tabbar__content"
            :class="[border && 'ai-border--top', fixed && 'ai-tabbar--fixed']"
            :style="[tabbarStyle]"
            @touchmove.stop.prevent="preventEvent"
        >
            <view class="ai-tabbar__content__item-wrapper">
                <slot />
            </view>
            <ai-safe-bottom v-if="safeAreaInsetBottom" />
        </view>
        <view
            v-if="placeholder"
            class="ai-tabbar__placeholder"
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
    name: 'AiTabbar',
    mixins: [mixins],
    props: {
        // 当前匹配项的name
        value: {
            type: [String, Number, null],
            default: null,
        },
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
        // 元素层级z-index
        zIndex: {
            type: [String, Number],
            default: 1,
        },
        // 选中标签的颜色
        activeColor: {
            type: String,
            default: '#1989fa',
        },
        // 未选中标签的颜色
        inactiveColor: {
            type: String,
            default: '#7d7e80',
        },
        // 是否固定在底部
        fixed: {
            type: Boolean,
            default: true,
        },
        // fixed定位固定在底部时，是否生成一个等高元素防止塌陷
        placeholder: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            placeholderHeight: 0,
        };
    },
    computed: {
        tabbarStyle() {
            const style = {
                zIndex: this.zIndex,
            };
            // 合并来自父组件的customStyle样式
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
        // 监听多个参数的变化，通过在computed执行对应的操作
        updateChild() {
            return [this.value, this.activeColor, this.inactiveColor];
        },
        updatePlaceholder() {
            return [this.fixed, this.placeholder];
        },
    },
    watch: {
        updateChild() {
            // 如果updateChildren中的元素发生了变化，则执行子元素初始化操作
            this.updateChildren();
        },
        updatePlaceholder() {
            // 如果fixed，placeholder等参数发生变化，重新计算占位元素的高度
            this.setPlaceholderHeight();
        },
    },
    created() {
        this.children = [];
    },
    mounted() {
        this.setPlaceholderHeight();
    },
    methods: {
        updateChildren() {
            // 如果存在子元素，则执行子元素的updateFromParent进行更新数据
            this.children.length && this.children.map((child) => child.updateFromParent());
        },
        // 设置用于防止塌陷元素的高度
        async setPlaceholderHeight() {
            if (!this.fixed || !this.placeholder) return;
            // 延时一定时间
            await uni.$util.sleep(20);
            // #ifndef APP-NVUE
            this.getRect('.ai-tabbar__content').then(({ height = 50 }) => {
                // 修复IOS safearea bottom 未填充高度
                this.placeholderHeight = height;
            });
            // #endif

            // #ifdef APP-NVUE
            dom.getComponentRect(this.$refs['ai-tabbar__content'], (res) => {
                const { size } = res;
                this.placeholderHeight = size.height;
            });
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-tabbar {
    flex-direction: column;
    flex: 1;
    justify-content: center;

    &__content {
        flex-direction: column;
        background-color: #fff;

        &__item-wrapper {
            height: 100rpx;
            flex-direction: row;
        }
    }

    &--fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>
