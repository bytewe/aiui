<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-14 07:46:43
 * @Description: 步骤条项
-->

<template>
    <view ref="ai-steps-item" class="ai-steps-item" :class="[`ai-steps-item--${parentData.direction}`]">
        <view
            v-if="index + 1 < childLength"
            class="ai-steps-item__line"
            :class="[`ai-steps-item__line--${parentData.direction}`]"
            :style="[lineStyle]"
        />
        <view
            class="ai-steps-item__wrapper"
            :class="[
                `ai-steps-item__wrapper--${parentData.direction}`,
                parentData.dot && `ai-steps-item__wrapper--${parentData.direction}--dot`,
            ]"
        >
            <slot name="icon">
                <view
                    v-if="parentData.dot"
                    class="ai-steps-item__wrapper__dot"
                    :style="{
                        backgroundColor: statusColor,
                    }"
                />
                <view v-else-if="parentData.activeIcon || parentData.inactiveIcon" class="ai-steps-item__wrapper__icon">
                    <ai-icon
                        :name="index <= parentData.current ? parentData.activeIcon : parentData.inactiveIcon"
                        :size="iconSize"
                        :color="index <= parentData.current ? parentData.activeColor : parentData.inactiveColor"
                    />
                </view>
                <view
                    v-else
                    :style="{
                        backgroundColor: statusClass === 'process' ? parentData.activeColor : 'transparent',
                        borderColor: statusColor,
                    }"
                    class="ai-steps-item__wrapper__circle"
                >
                    <text
                        v-if="statusClass === 'process' || statusClass === 'wait'"
                        class="ai-steps-item__wrapper__circle__text"
                        :style="{
                            color: index == parentData.current ? '#ffffff' : parentData.inactiveColor,
                        }"
                        >{{ index + 1 }}</text
                    >
                    <ai-icon
                        v-else
                        :color="statusClass === 'error' ? 'danger' : parentData.activeColor"
                        size="12"
                        :name="statusClass === 'error' ? 'close' : 'check'"
                    />
                </view>
            </slot>
        </view>
        <view
            class="ai-steps-item__content"
            :class="[`ai-steps-item__content--${parentData.direction}`]"
            :style="[contentStyle]"
        >
            <ai-text
                :text="title"
                :type="parentData.current == index ? 'main' : 'content'"
                line-height="40rpx"
                :size="parentData.current == index ? 14 : 13"
            />
            <slot name="desc">
                <ai-text :text="desc" type="tips" size="12" />
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
    name: 'AiStepsItem',
    mixins: [mixins],
    props: {
        // 标题
        title: {
            type: [String, Number],
            default: '',
        },
        // 描述文本
        desc: {
            type: [String, Number],
            default: '',
        },
        // 图标大小
        iconSize: {
            type: [String, Number],
            default: 17,
        },
        // 当前步骤是否处于失败状态
        error: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            index: 0,
            childLength: 0,
            showLine: false,
            size: {
                height: 0,
                width: 0,
            },
            parentData: {
                direction: 'row',
                current: 0,
                activeColor: '',
                inactiveColor: '',
                activeIcon: '',
                inactiveIcon: '',
                dot: false,
            },
        };
    },
    computed: {
        lineStyle() {
            const style = {};
            if (this.parentData.direction === 'row') {
                style.width = this.size.width + 'px';
                style.left = this.size.width / 2 + 'px';
            } else {
                style.height = this.size.height + 'px';
                // style.top = this.size.height / 2 + 'px'
            }
            style.backgroundColor = this.parent.children?.[this.index + 1]?.error
                ? uni.$config['color-danger']
                : this.index < this.parentData.current
                ? this.parentData.activeColor
                : this.parentData.inactiveColor;
            return style;
        },
        statusClass() {
            const { index, error } = this;
            const { current } = this.parentData;
            if (current == index) {
                return error === true ? 'error' : 'process';
            } else if (error) {
                return 'error';
            } else if (current > index) {
                return 'finish';
            } else {
                return 'wait';
            }
        },
        statusColor() {
            let color = '';
            switch (this.statusClass) {
                case 'finish':
                    color = this.parentData.activeColor;
                    break;
                case 'error':
                    color = uni.$config['color-danger'];
                    break;
                case 'process':
                    color = this.parentData.dot ? this.parentData.activeColor : 'transparent';
                    break;
                default:
                    color = this.parentData.inactiveColor;
                    break;
            }
            return color;
        },
        contentStyle() {
            const style = {};
            if (this.parentData.direction === 'column') {
                style.marginLeft = this.parentData.dot ? '4rpx' : '12rpx';
                style.marginTop = this.parentData.dot ? '0rpx' : '12rpx';
            } else {
                style.marginTop = this.parentData.dot ? '4rpx' : '12rpx';
                style.marginLeft = this.parentData.dot ? '4rpx' : '12rpx';
            }

            return style;
        },
    },
    created() {
        this.init();
    },
    mounted() {
        this.parent && this.parent.updateFromChild();
        uni.$util.sleep().then(() => {
            this.getStepsItemRect();
        });
    },
    methods: {
        init() {
            // 初始化数据
            this.updateParentData();
            if (!this.parent) {
                return uni.$util.error('ai-steps-item必须要搭配ai-steps组件使用');
            }
            this.index = this.parent.children.indexOf(this);
            this.childLength = this.parent.children.length;
        },
        updateParentData() {
            // 此方法在mixin中
            this.getParentData('AiSteps');
        },
        // 父组件数据发生变化
        updateFromParent() {
            this.init();
        },
        // 获取组件的尺寸，用于设置横线的位置
        getStepsItemRect() {
            // #ifndef APP-NVUE
            this.getRect('.ai-steps-item').then((size) => {
                this.size = size;
            });
            // #endif

            // #ifdef APP-NVUE
            dom.getComponentRect(this.$refs['ai-steps-item'], (res) => {
                const { size } = res;
                this.size = size;
            });
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-steps-item {
    flex: 1;
    display: flex;
    flex-direction: row;

    &--row {
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    &--column {
        position: relative;
        flex-direction: row;
        justify-content: flex-start;
        padding-bottom: 10rpx;
    }

    &__wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
        background-color: #fff;

        &--column {
            width: 40rpx;
            height: 64rpx;

            &--dot {
                height: 40rpx;
                width: 40rpx;
            }
        }

        &--row {
            width: 64rpx;
            height: 40rpx;

            &--dot {
                width: 40rpx;
                height: 40rpx;
            }
        }

        &__circle {
            width: 40rpx;
            height: 40rpx;
            /* #ifndef APP-NVUE */
            box-sizing: border-box;
            flex-shrink: 0;
            /* #endif */
            border-radius: 200rpx;
            border-width: 2rpx;
            border-color: $color-gray;
            border-style: solid;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s;

            &__text {
                color: $color-gray;
                font-size: 22rpx;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                text-align: center;
                line-height: 22rpx;
            }
        }

        &__dot {
            width: 20rpx;
            height: 20rpx;
            border-radius: 200rpx;
            background-color: $color-dark;
        }
    }

    &__content {
        display: flex;
        flex-direction: row;
        flex: 1;

        &--row {
            flex-direction: column;
            align-items: center;
        }

        &--column {
            flex-direction: column;
            margin-left: 12rpx;
        }
    }

    &__line {
        position: absolute;
        background: $color-gray;

        &--row {
            top: 20rpx;
            height: 2rpx;
        }

        &--column {
            width: 2rpx;
            left: 20rpx;
        }
    }
}
</style>
