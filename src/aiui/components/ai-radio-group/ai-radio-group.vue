<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:22
 * @Description: 单选框父分组
-->

<template>
    <view class="ai-radio-group" :class="bemClass">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiRadioGroup',
    mixins: [mixins],
    props: {
        // 绑定的值
        value: {
            type: [String, Number, Boolean],
            default: '',
        },
        // 是否禁用全部radio
        disabled: {
            type: Boolean,
            default: false,
        },
        // 形状，circle-圆形，square-方形
        shape: {
            type: String,
            default: 'circle',
        },
        // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
        activeColor: {
            type: String,
            default: '#2979ff',
        },
        // 未选中的颜色
        inactiveColor: {
            type: String,
            default: '#c8c9cc',
        },
        // 标识符
        name: {
            type: String,
            default: '',
        },
        // 整个组件的尺寸，默认px
        size: {
            type: [String, Number],
            default: 18,
        },
        // 布局方式，row-横向，column-纵向
        direction: {
            type: String,
            default: 'row',
        },
        // label的文本
        label: {
            type: [String],
            default: '',
        },
        // label的颜色 （默认 '#303133' ）
        labelColor: {
            type: [String],
            default: '#303133',
        },
        // label的字体大小，px单位
        labelSize: {
            type: [String, Number],
            default: 14,
        },
        // 是否禁止点击文本操作checkbox(默认 false )
        labelDisabled: {
            type: Boolean,
            default: false,
        },
        // 图标颜色
        iconColor: {
            type: String,
            default: '#ffffff',
        },
        // 图标的大小，单位px
        iconSize: {
            type: [String, Number],
            default: '',
        },
        // 竖向配列时，是否显示下划线
        borderBottom: {
            type: Boolean,
            default: false,
        },
        // 图标与文字的对齐方式
        iconPlacement: {
            type: String,
            default: 'left',
        },
    },
    data() {
        return {};
    },
    computed: {
        // 这里computed的变量，都是子组件ai-radio需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
        // 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(ai-radio-group)
        // 拉取父组件新的变化后的参数
        parentData() {
            return [
                this.value,
                this.disabled,
                this.inactiveColor,
                this.activeColor,
                this.size,
                this.labelDisabled,
                this.shape,
                this.iconSize,
                this.borderBottom,
                this.direction,
            ];
        },
        bemClass() {
            return uni.$util.bem('ai-radio-group', [this.direction]);
        },
    },
    watch: {
        // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
        parentData() {
            if (this.children.length) {
                this.children.map((child) => {
                    // 判断子组件(ai-radio)如果有init方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
                    typeof child.init === 'function' && child.init();
                });
            }
        },
    },
    created() {
        this.children = [];
    },
    methods: {
        // 将其他的radio设置为未选中的状态
        unCheckedOther(childInstance) {
            this.children.map((child) => {
                // 所有子radio中，被操作组件实例的checked的值无需修改
                if (childInstance !== child) {
                    child.checked = false;
                }
            });
            const { name } = childInstance;
            // 通过emit事件，设置父组件通过v-model双向绑定的值
            this.$emit('input', name);
            // 发出事件
            this.$emit('change', name);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-radio-group {
    &--row {
        display: flex;
        flex-direction: row;
    }

    &--column {
        flex-direction: column;
    }
}
</style>
