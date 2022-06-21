<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:14:52
 * @Description: 折叠面板项
-->

<template>
    <view class="ai-collapse-item">
        <ai-cell
            :title="title"
            :value="value"
            :label="label"
            :icon="icon"
            :disabled="disabled"
            :arrow="arrow"
            :border="parentData.border && showBorder"
            :arrow-icon="expanded ? 'arrow-up' : 'arrow-down'"
            @click="onClick"
        >
            <!-- #ifndef MP-WEIXIN -->
            <!-- 微信小程序不支持，因为微信中不支持 <slot name="title" slot="title" />的写法 -->
            <slot name="title" />
            <template slot="icon">
                <slot name="icon" />
            </template>
            <template slot="value">
                <slot name="value" />
            </template>
            <template slot="right-icon">
                <slot name="right-icon" />
            </template>
            <!-- #endif -->
        </ai-cell>
        <view ref="animation" class="ai-collapse-item__content" :animation="animationData">
            <view :id="elId" :ref="elId" class="ai-collapse-item__content__text content-class">
                <slot />
            </view>
        </view>
        <ai-line v-if="parentData.border" />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif

export default {
    name: 'AiCollapseItem',
    mixins: [mixins],
    props: {
        // 标题
        title: {
            type: String,
            default: '',
        },
        // 标题右侧内容
        value: {
            type: String,
            default: '',
        },
        // 标题下方的描述信息
        label: {
            type: String,
            default: '',
        },
        // 是否禁用折叠面板
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否展示右侧箭头并开启点击反馈
        arrow: {
            type: Boolean,
            default: true,
        },
        // 是否显示内边框
        border: {
            type: Boolean,
            default: true,
        },
        // 标题的对齐方式
        align: {
            type: String,
            default: 'left',
        },
        // 唯一标识符
        name: {
            type: [String, Number],
            default: '',
        },
        // 标题左侧图片，可为绝对路径的图片或内置图标
        icon: {
            type: String,
            default: '',
        },
        // 面板展开收起的过渡时间，单位ms
        duration: {
            type: Number,
            default: 300,
        },
    },
    data() {
        return {
            elId: uni.$util.guid(),
            // uni.createAnimation的导出数据
            animationData: {},
            // 是否展开状态
            expanded: false,
            // 根据expanded确定是否显示border，为了控制展开时，cell的下划线更好的显示效果，进行一定时间的延时
            showBorder: false,
            // 是否动画中，如果是则不允许继续触发点击
            animating: false,
            // 父组件ai-collapse的参数
            parentData: {
                accordion: false,
                border: false,
            },
        };
    },
    watch: {
        expanded(n) {
            clearTimeout(this.timer);
            this.timer = null;
            // 这里根据expanded的值来进行一定的延时，是为了cell的下划线更好的显示效果
            this.timer = setTimeout(
                () => {
                    this.showBorder = n;
                },
                n ? 10 : 290
            );
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        // 异步获取内容，或者动态修改了内容时，需要重新初始化
        init() {
            // 初始化数据
            this.updateParentData();
            if (!this.parent) {
                return uni.$util.error('ai-collapse-item必须要搭配ai-collapse组件使用');
            }
            const { value, accordion } = this.parent;

            if (accordion) {
                if (uni.$util.test.array(value)) {
                    return uni.$util.error('手风琴模式下，ai-collapse组件的value参数不能为数组');
                }
                this.expanded = this.name == value;
            } else {
                if (!uni.$util.test.array(value) && value !== null) {
                    return uni.$util.error('非手风琴模式下，ai-collapse组件的value参数必须为数组');
                }
                this.expanded = (value || []).some((item) => item == this.name);
            }
            // 设置组件的展开或收起状态
            this.$nextTick(function () {
                this.setContentAnimate();
            });
        },
        updateParentData() {
            // 此方法在mixin中
            this.getParentData('AiCollapse');
        },
        async setContentAnimate() {
            // 每次面板打开或者收起时，都查询元素尺寸
            // 好处是，父组件从服务端获取内容后，变更折叠面板后可以获得最新的高度
            const rect = await this.queryRect();
            const height = this.expanded ? rect.height : 0;
            this.animating = true;
            // #ifdef APP-NVUE
            const ref = this.$refs['animation'].ref;
            animation.transition(
                ref,
                {
                    styles: {
                        height: height + 'px',
                    },
                    duration: this.duration,
                    // 必须设置为true，否则会到面板收起或展开时，页面其他元素不会随之调整它们的布局
                    needLayout: true,
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
        // 点击collapsehead头部
        onClick() {
            if (this.disabled || this.animating) return;
            // 设置本组件为相反的状态
            this.parent && this.parent.onChange(this);
        },
        // 查询内容高度
        queryRect() {
            // #ifndef APP-NVUE
            return new Promise((resolve) => {
                this.getRect(`#${this.elId}`).then((size) => {
                    resolve(size);
                });
            });
            // #endif

            // #ifdef APP-NVUE
            // nvue下，使用dom模块查询元素高度
            // 返回一个promise，让调用此方法的主体能使用then回调
            // eslint-disable-next-line no-unreachable
            return new Promise((resolve) => {
                dom.getComponentRect(this.$refs[this.elId], (res) => {
                    resolve(res.size);
                });
            });
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-collapse-item {
    &__content {
        overflow: hidden;
        height: 0;

        &__text {
            padding: 24rpx 30rpx;
            color: $color-dark;
            font-size: 28rpx;
            line-height: 36rpx;
        }
    }
}
</style>
