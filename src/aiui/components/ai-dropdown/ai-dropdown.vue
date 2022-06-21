<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:15:12
 * @Description: 下拉框
-->

<template>
    <view class="ai-drawdown">
        <view
            ref="ai-dropdown__menu"
            class="ai-dropdown__menu"
            :style="{
                height: $util.addUnit(height),
            }"
        >
            <view
                v-for="(item, index) in menuList"
                :key="index"
                class="ai-dropdown__menu__item"
                @click.stop="onClick(item, index)"
            >
                <text
                    class="ai-dropdown__menu__item__text"
                    :style="[index === current ? activeStyle : inactiveStyle]"
                    >{{ item.title }}</text
                >
                <view
                    class="ai-dropdown__menu__item__arrow"
                    :class="[index === current && 'ai-dropdown__menu__item__arrow--rotate']"
                >
                    <ai-icon :name="menuIcon" :size="$util.addUnit(menuIconSize)" />
                </view>
            </view>
        </view>
        <view class="ai-dropdown__content">
            <slot />
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif
export default {
    name: 'AiDropdown',
    mixins: [mixins],
    props: {
        // 标题选中时的样式
        activeStyle: {
            type: [String, Object],
            default: () => ({
                color: '#2979ff',
                fontSize: '28rpx',
            }),
        },
        // 标题未选中时的样式
        inactiveStyle: {
            type: [String, Object],
            default: () => ({
                color: '#606266',
                fontSize: '28rpx',
            }),
        },
        // 点击遮罩是否关闭菜单
        closeOnClickMask: {
            type: Boolean,
            default: true,
        },
        // 点击当前激活项标题是否关闭菜单
        closeOnClickSelf: {
            type: Boolean,
            default: true,
        },
        // 过渡时间
        duration: {
            type: [Number, String],
            default: 300,
        },
        // 标题菜单的高度
        height: {
            type: [Number, String],
            default: 40,
        },
        // 是否显示下边框
        borderBottom: {
            type: Boolean,
            default: false,
        },
        // 标题的字体大小
        titleSize: {
            type: [Number, String],
            default: 14,
        },
        // 下拉出来的内容部分的圆角值
        borderRadius: {
            type: [Number, String],
            default: 0,
        },
        // 菜单右侧的icon图标
        menuIcon: {
            type: String,
            default: 'arrow-down',
        },
        // 菜单右侧图标的大小
        menuIconSize: {
            type: [Number, String],
            default: 14,
        },
    },
    data() {
        return {
            menuList: [],
            current: 0,
        };
    },
    computed: {},
    created() {
        this.children = [];
    },
    methods: {
        onClick(item) {
            this.children.map((child) => {
                if (child.title === item.title) {
                    child.$emit('click');
                    child.setContentAnimate(child.show ? 0 : 300);
                    child.show = !child.show;
                } else {
                    child.show = false;
                    child.setContentAnimate(0);
                }
            });
        },
        queryRect(el) {
            // #ifndef APP-NVUE
            return new Promise((resolve) => {
                this.getRect(`.${el}`).then((size) => {
                    resolve(size);
                });
            });
            // #endif

            // #ifdef APP-NVUE
            // eslint-disable-next-line no-unreachable
            return new Promise((resolve) => {
                dom.getComponentRect(this.$refs[el], (res) => {
                    resolve(res.size);
                });
            });
            // #endif
        },
    },
};
</script>

<style lang="scss">
.ai-dropdown {
    &__menu {
        display: flex;
        flex-direction: row;
        align-items: center;

        &__item {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            flex: 1;

            &__arrow {
                margin-left: $space-mini;

                &--rotate {
                    transform: rotate(180deg);
                }
            }
        }
    }
}
</style>
