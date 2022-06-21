<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:40:26
 * @Description: 步骤条
-->

<template>
    <view class="ai-steps" :class="[`ai-steps--${direction}`]">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiSteps',
    mixins: [mixins],
    props: {
        // 排列方向
        direction: {
            type: String,
            default: 'row',
        },
        // 设置第几个步骤
        current: {
            type: [String, Number],
            default: 0,
        },
        // 激活状态颜色
        activeColor: {
            type: String,
            default: '#3c9cff',
        },
        // 未激活状态颜色
        inactiveColor: {
            type: String,
            default: '#969799',
        },
        // 激活状态的图标
        activeIcon: {
            type: String,
            default: '',
        },
        // 未激活状态图标
        inactiveIcon: {
            type: String,
            default: '',
        },
        // 是否显示点类型
        dot: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    computed: {
        // 监听参数的变化，通过watch中，手动去更新子组件的数据，否则子组件不会自动变化
        parentData() {
            return [
                this.current,
                this.direction,
                this.activeColor,
                this.inactiveColor,
                this.activeIcon,
                this.inactiveIcon,
                this.dot,
            ];
        },
    },
    watch: {
        children() {
            this.updateChildData();
        },
        parentData() {
            this.updateChildData();
        },
    },
    created() {
        this.children = [];
    },
    methods: {
        // 更新子组件的数据
        updateChildData() {
            this.children.map((child) => {
                // 先判断子组件是否存在对应的方法
                uni.$util.test.func((child || {}).updateFromParent()) && child.updateFromParent();
            });
        },
        // 接受子组件的通知，去修改其他子组件的数据
        updateFromChild() {
            this.updateChildData();
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-steps {
    display: flex;
    flex-direction: row;

    &--column {
        flex-direction: column;
    }

    &--row {
        flex-direction: row;
        flex: 1;
    }
}
</style>
