<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:26:20
 * @Description: 底部导航栏项
-->

<template>
    <view class="ai-tabbar-item" :style="[$util.addStyle(customStyle)]" @click="onClick">
        <view class="ai-tabbar-item__icon">
            <ai-icon
                v-if="icon"
                :name="icon"
                :color="isActive ? parentData.activeColor : parentData.inactiveColor"
                :size="20"
            />
            <template v-else>
                <slot v-if="isActive" name="active-icon" />
                <slot v-else name="inactive-icon" />
            </template>
            <ai-badge
                absolute
                :offset="[0, dot ? '34rpx' : badge > 9 ? '14rpx' : '20rpx']"
                :custom-style="badgeStyle"
                :is-dot="dot"
                :value="badge || (dot ? 1 : null)"
                :show="dot || badge > 0"
            />
        </view>
        <slot name="text">
            <text
                class="ai-tabbar-item__text"
                :style="{
                    color: isActive ? parentData.activeColor : parentData.inactiveColor,
                }"
                >{{ text }}</text
            >
        </slot>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiTabbarItem',
    mixins: [mixins],
    props: {
        // item标签的名称，作为与ai-tabbar的value参数匹配的标识符
        name: {
            type: [String, Number, null],
            default: null,
        },
        // ai内置图标或者绝对路径的图片
        icon: {
            type: String,
            default: '',
        },
        // 右上角的角标提示信息
        badge: {
            type: [String, Number, null],
            default: null,
        },
        // 是否显示圆点，将会覆盖badge参数
        dot: {
            type: Boolean,
            default: false,
        },
        // 描述文本
        text: {
            type: String,
            default: '',
        },
        // 控制徽标的位置，对象或者字符串形式，可以设置top和right属性
        badgeStyle: {
            type: [String, Object],
            default: 'top: 12rpx;right:4rpx;',
        },
    },
    data() {
        return {
            isActive: false, // 是否处于激活状态
            parentData: {
                value: null,
                activeColor: '',
                inactiveColor: '',
            },
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            // 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
            this.updateParentData();
            if (!this.parent) {
                uni.$util.error('ai-tabbar-item必须搭配ai-tabbar组件使用');
            }
            // 本子组件在ai-tabbar的children数组中的索引
            const index = this.parent.children.indexOf(this);
            // 判断本组件的name(如果没有定义name，就用index索引)是否等于父组件的value参数
            this.isActive = (this.name || index) === this.parentData.value;
        },
        updateParentData() {
            // 此方法在mixin中
            this.getParentData('AiTabbar');
        },
        // 此方法将会被父组件ai-tabbar调用
        updateFromParent() {
            // 重新初始化
            this.init();
        },
        onClick() {
            this.$nextTick(() => {
                const index = this.parent.children.indexOf(this);
                const name = this.name || index;
                // 点击的item为非激活的item才发出change事件
                if (name !== this.parent.value) {
                    this.parent.$emit('change', name);
                }
                this.$emit('click', name);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-tabbar-item {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;

    &__icon {
        display: flex;
        flex-direction: row;
        position: relative;
        width: 150rpx;
        justify-content: center;
    }

    &__text {
        margin-top: 4rpx;
        font-size: 24rpx;
        color: $color-dark;
    }
}

/* #ifdef MP */
// 由于小程序都使用shadow DOM形式实现，需要给影子宿主设置flex: 1才能让其撑开
:host {
    flex: 1;
}
/* #endif */
</style>
