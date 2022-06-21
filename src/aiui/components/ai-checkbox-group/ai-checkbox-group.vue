<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:14:36
 * @Description: 复选框组
-->

<template>
    <view class="ai-checkbox-group" :class="bemClass">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiCheckboxGroup',
    mixins: [mixins],
    props: {
        // 标识符
        name: {
            type: String,
            default: '',
        },
        // 绑定的值
        value: {
            type: Array,
            default: () => [],
        },
        // 形状，circle-圆形，square-方形
        shape: {
            type: String,
            default: 'square',
        },
        // 是否禁用全部checkbox
        disabled: {
            type: Boolean,
            default: false,
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
        // label的字体大小，px单位
        labelSize: {
            type: [String, Number],
            default: 14,
        },
        // label的字体颜色
        labelColor: {
            type: [String],
            default: '#303133',
        },
        // 是否禁止点击文本操作
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
        // 勾选图标的对齐方式，left-左边，right-右边
        iconPlacement: {
            type: String,
            default: 'left',
        },
        // 竖向配列时，是否显示下划线
        borderBottom: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    computed: {
        // 这里computed的变量，都是子组件ai-checkbox需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
        // 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(ai-checkbox-group)
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
            return uni.$util.bem('ai-checkbox-group', [this.direction]);
        },
    },
    watch: {
        // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
        parentData() {
            if (this.children.length) {
                this.children.map((child) => {
                    // 判断子组件(ai-checkbox)如果有init方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
                    typeof child.init === 'function' && child.init();
                });
            }
        },
    },
    created() {
        this.children = [];
    },
    methods: {
        // 将其他的checkbox设置为未选中的状态
        unCheckedOther() {
            const values = [];
            this.children.map((child) => {
                // 将被选中的checkbox，放到数组中返回
                if (child.isChecked) {
                    values.push(child.name);
                }
            });
            // 发出事件
            this.$emit('change', values);
            // 修改通过v-model绑定的值
            this.$emit('input', values);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-checkbox-group {
    &--row {
        display: flex;
        flex-direction: row;
    }

    &--column {
        flex-direction: column;
    }
}
</style>
