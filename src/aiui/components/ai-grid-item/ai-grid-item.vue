<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 19:48:21
 * @Description: 宫格布局项
-->

<template>
    <view
        class="ai-grid-item"
        hover-class="ai-grid-item--hover"
        :hover-stay-time="200"
        :class="classes"
        :style="[itemStyle]"
        @click="onClick"
    >
        <slot>
            <ai-icon :name="icon" size="xl" />
            <ai-text custom-class="ai-padding--top--mini" :text="text" size="small" line="1" />
        </slot>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiGridItem',
    mixins: [mixins],
    props: {
        // 标识
        name: {
            type: [String, Number, null],
            default: null,
        },
        // 图标
        icon: {
            type: String,
            default: '',
        },
        // 文本
        text: {
            type: String,
            default: '',
        },
        // 背景颜色
        background: {
            type: String,
            default: 'transparent',
        },
    },
    data() {
        return {
            parentData: {
                col: 3, // 父组件划分的宫格数
                border: true, // 是否显示边框，根据父组件决定
            },
            // #ifdef APP-NVUE
            width: 0, // nvue下才这么计算，vue下放到computed中，否则会因为延时造成闪烁
            // #endif
            classes: [], // 类名集合，用于判断是否显示右边和下边框
        };
    },
    computed: {
        // #ifndef APP-NVUE
        // vue下放到computed中，否则会因为延时造成闪烁
        // eslint-disable-next-line vue/no-dupe-keys
        width() {
            return 100 / Number(this.parentData.col) + '%';
        },
        // #endif
        itemStyle() {
            const style = {
                background: this.background,
                width: this.width,
            };
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        // 移除事件监听，释放性能
        uni.$off('$uGridItem');
    },
    methods: {
        init() {
            // 用于在父组件ai-grid的children中被添加入子组件时，
            // 重新计算item的边框
            uni.$on('$uGridItem', () => {
                this.gridItemClasses();
            });
            // 父组件的实例
            this.updateParentData();
            // #ifdef APP-NVUE
            // 获取元素该有的长度，nvue下要延时才准确
            this.$nextTick(function () {
                this.getItemWidth();
            });
            // #endif
            // 发出事件，通知所有的grid-item都重新计算自己的边框
            uni.$emit('$uGridItem');
            this.gridItemClasses();
        },
        // 获取父组件的参数
        updateParentData() {
            // 此方法写在mixin中
            this.getParentData('AiGrid');
        },
        onClick() {
            let name = this.name;
            // 如果没有设置name属性，历遍父组件的children数组，判断当前的元素是否和本实例this相等，找出当前组件的索引
            const children = this.parent?.children;
            if (children && this.name === null) {
                name = children.findIndex((child) => child === this);
            }
            // 调用父组件方法，发出事件
            this.parent && this.parent.childClick(name);
            this.$emit('click', name);
        },
        async getItemWidth() {
            // 如果是nvue，不能使用百分比，只能使用固定宽度
            let width = 0;
            if (this.parent) {
                // 获取父组件宽度后，除以栅格数，得出每个item的宽度
                const parentWidth = await this.getParentWidth();
                width = parentWidth / Number(this.parentData.col) + 'px';
            }
            this.width = width;
        },
        // 获取父元素的尺寸
        getParentWidth() {
            // #ifdef APP-NVUE
            // 返回一个promise，让调用者可以用await同步获取
            const dom = uni.requireNativePlugin('dom');
            return new Promise((resolve) => {
                // 调用父组件的ref
                dom.getComponentRect(this.parent.$refs['ai-grid'], (res) => {
                    resolve(res.size.width);
                });
            });
            // #endif
        },
        gridItemClasses() {
            if (this.parentData.border) {
                let classes = [];
                this.parent.children.map((child, index) => {
                    if (this === child) {
                        const len = this.parent.children.length;
                        // 贴近右边屏幕边沿的child，并且最后一个（比如只有横向2个的时候），无需右边框
                        if ((index + 1) % this.parentData.col !== 0 && index + 1 !== len) {
                            classes.push('ai-border--right');
                        }
                        // 总的宫格数量对列数取余的值
                        // 如果取余后，值为0，则意味着要将最后一排的宫格，都不需要下边框
                        const lessNum =
                            len % this.parentData.col === 0 ? this.parentData.col : len % this.parentData.col;
                        // 最下面的一排child，无需下边框
                        if (index < len - lessNum) {
                            classes.push('ai-border--bottom');
                        }
                    }
                });
                // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
                // #ifdef MP-ALIPAY || MP-TOUTIAO
                classes = classes.join(' ');
                // #endif
                this.classes = classes;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-grid-item-hover-opcatiy: 0.5 !default;
$ai-grid-item-margin-top: 0.5px !default;
$ai-grid-item-border-right-width: 0.5px !default;
$ai-grid-item-border-bottom-width: 0.5px !default;
$ai-grid-item-border-right-color: $border-color-default !default;
$ai-grid-item-border-bottom-color: $border-color-default !default;

.ai-grid-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $space-small $space-mini;

    &--hover {
        opacity: $ai-grid-item-hover-opcatiy;
    }
}
</style>
