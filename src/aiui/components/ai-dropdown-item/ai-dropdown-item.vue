<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:15:15
 * @Description: 下拉框项
-->

<template>
    <view class="ai-drawdown-item">
        <ai-overlay
            custom-style="top: 252rpx"
            :show="show"
            :close-on-click-overlay="closeOnClickOverlay"
            @click="overlayClick"
        />
        <view ref="animation" class="ai-drawdown-item__content" :style="[style]" :animation="animationData">
            <slot />
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiDrawdownItem',
    mixins: [mixins],
    props: {
        // 当前选中项的value值
        value: {
            type: [Number, String, Array],
            default: '',
        },
        // 菜单项标题
        title: {
            type: [String, Number],
            default: '',
        },
        // 选项数据，如果传入了默认slot，此参数无效
        options: {
            type: Array,
            default() {
                return [];
            },
        },
        // 是否禁用此菜单项
        disabled: {
            type: Boolean,
            default: false,
        },
        // 下拉弹窗的高度
        height: {
            type: [Number, String],
            default: 'auto',
        },
        // 点击遮罩是否可以收起弹窗
        closeOnClickOverlay: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            show: false,
            top: '252rpx',
            // uni.createAnimation的导出数据
            animationData: {},
        };
    },
    computed: {
        // 监听对应变量的变化
        dataChange() {
            return [this.title, this.disabled];
        },
        style() {
            const style = {
                zIndex: 10071,
                position: 'fixed',
                display: 'flex',
                left: 0,
                right: 0,
            };
            style.top = uni.$util.addUnit(this.top);
            return style;
        },
    },
    watch: {
        // 发生变化时，需要去更新父组件对应的值
        dataChange() {
            this.updateParentData();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.updateParentData();
        },
        // 更新父组件所需的数据
        updateParentData() {
            // 获取父组件ai-dropdown
            this.getParentData('AiDropdown');
            if (!this.parent) uni.$util.error('ai-dropdown-item必须配合ai-dropdown使用');
            // 查找父组件menuList数组中对应的标题数据
            const menuIndex = this.parent.menuList.findIndex((item) => item.title === this.title);
            const menuContent = {
                title: this.title,
                disabled: this.disabled,
            };
            if (menuIndex >= 0) {
                // 如果能找到，则直接修改
                this.parent.menuList[menuIndex] = menuContent;
            } else {
                // 如果无法找到，则为第一次添加，直接push即可
                this.parent.menuList.push(menuContent);
            }
        },
        async setContentAnimate(height) {
            this.animating = true;
            // #ifdef APP-NVUE
            const ref = this.$refs['animation'].ref;
            animation.transition(
                ref,
                {
                    styles: {
                        height: uni.$util.addUnit(height),
                    },
                    duration: this.duration,
                    timingFunction: 'ease-in-out',
                },
                () => {
                    this.animating = false;
                }
            );
            // #endif

            // #ifndef APP-NVUE
            const animation = uni.createAnimation({
                timingFunction: 'ease-in-out',
            });
            animation
                .height(height)
                .step({
                    duration: this.duration,
                })
                .step();
            // 导出动画数据给面板的animationData值
            this.animationData = animation.export();
            // 标识动画结束
            uni.$util.sleep(this.duration).then(() => {
                this.animating = false;
            });
            // #endif
        },
        overlayClick() {
            this.show = false;
            this.setContentAnimate(0);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-drawdown-item {
    &__content {
        background-color: #ffffff;
        overflow: hidden;
        height: 0;
    }
}
</style>
