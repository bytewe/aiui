<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:25
 * @Description: 评分
-->

<template>
    <view :id="elId" ref="ai-rate" class="ai-rate" :style="[$util.addStyle(customStyle)]">
        <view class="ai-rate__content" @touchmove.stop="touchMove" @touchend.stop="touchEnd">
            <view v-for="(item, index) in Number(count)" :key="index" class="ai-rate__content__item" :class="[elClass]">
                <view
                    ref="ai-rate__content__item__icon-wrap"
                    class="ai-rate__content__item__icon-wrap"
                    @click.stop="onClick($event, index + 1)"
                >
                    <ai-icon
                        :name="Math.floor(activeIndex) > index ? activeIcon : inactiveIcon"
                        :color="disabled ? '#c8c9cc' : Math.floor(activeIndex) > index ? activeColor : inactiveColor"
                        :custom-style="{
                            padding: `0 ${$util.addUnit(gutter / 2)}`,
                        }"
                        :size="size"
                    />
                </view>
                <view
                    v-if="allowHalf"
                    ref="ai-rate__content__item__icon-wrap"
                    class="ai-rate__content__item__icon-wrap ai-rate__content__item__icon-wrap--half"
                    :style="[
                        {
                            width: $util.addUnit(rateWidth / 2),
                        },
                    ]"
                    @click.stop="onClick($event, index + 1)"
                >
                    <ai-icon
                        :name="Math.ceil(activeIndex) > index ? activeIcon : inactiveIcon"
                        :color="disabled ? '#c8c9cc' : Math.ceil(activeIndex) > index ? activeColor : inactiveColor"
                        :custom-style="{
                            padding: `0 ${$util.addUnit(gutter / 2)}`,
                        }"
                        :size="size"
                    />
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif

export default {
    name: 'AiRate',
    mixins: [mixins],
    props: {
        // 用于v-model双向绑定选中的星星数量
        value: {
            type: [String, Number],
            default: 1,
        },
        // 要显示的星星数量
        count: {
            type: [String, Number],
            default: 5,
        },
        // 是否不可选中
        disabled: {
            type: Boolean,
            default: false,
        },
        // 星星的大小，单位px
        size: {
            type: [String, Number],
            default: 18,
        },
        // 未选中时的颜色
        inactiveColor: {
            type: String,
            default: '#909399',
        },
        // 选中的颜色
        activeColor: {
            type: String,
            default: '#FA3534',
        },
        // 星星之间的间距，单位px
        gutter: {
            type: [String, Number],
            default: 4,
        },
        // 最少能选择的星星个数
        minCount: {
            type: [String, Number],
            default: 1,
        },
        // 是否允许半星
        allowHalf: {
            type: Boolean,
            default: false,
        },
        // 选中时的图标(星星)
        activeIcon: {
            type: String,
            default: 'star--fill',
        },
        // 未选中时的图标(星星)
        inactiveIcon: {
            type: String,
            default: 'star',
        },
        // 是否可以通过滑动手势选择评分
        touchable: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            // 生成一个唯一id，否则一个页面多个评分组件，会造成冲突
            elId: uni.$util.guid(),
            elClass: uni.$util.guid(),
            rateBoxLeft: 0, // 评分盒子左边到屏幕左边的距离，用于滑动选择时计算距离
            activeIndex: this.value,
            rateWidth: 0, // 每个星星的宽度
            // 标识是否正在滑动，由于iOS事件上touch比click先触发，导致快速滑动结束后，接着触发click，导致事件混乱而出错
            moving: false,
        };
    },
    watch: {
        value(val) {
            this.activeIndex = val;
        },
        activeIndex: 'emitEvent',
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            uni.$util.sleep().then(() => {
                this.getRateItemRect();
                this.getRateIconWrapRect();
            });
        },
        // 获取评分组件盒子的布局信息
        async getRateItemRect() {
            await uni.$util.sleep();
            // ai封装的获取节点的方法，详见文档
            // #ifndef APP-NVUE
            this.getRect('#' + this.elId).then((res) => {
                this.rateBoxLeft = res.left;
            });
            // #endif
            // #ifdef APP-NVUE
            dom.getComponentRect(this.$refs['ai-rate'], (res) => {
                this.rateBoxLeft = res.size.left;
            });
            // #endif
        },
        // 获取单个星星的尺寸
        getRateIconWrapRect() {
            // ai封装的获取节点的方法，详见文档
            // #ifndef APP-NVUE
            this.getRect('.' + this.elClass).then((res) => {
                this.rateWidth = res.width;
            });
            // #endif
            // #ifdef APP-NVUE
            dom.getComponentRect(this.$refs['ai-rate__content__item__icon-wrap'][0], (res) => {
                this.rateWidth = res.size.width;
            });
            // #endif
        },
        // 手指滑动
        touchMove(e) {
            // 如果禁止通过手动滑动选择，返回
            if (!this.touchable) {
                return;
            }
            this.preventEvent(e);
            const x = e.changedTouches[0].pageX;
            this.getActiveIndex(x);
        },
        // 停止滑动
        touchEnd(e) {
            // 如果禁止通过手动滑动选择，返回
            if (!this.touchable) {
                return;
            }
            this.preventEvent(e);
            const x = e.changedTouches[0].pageX;
            this.getActiveIndex(x);
        },
        // 通过点击，直接选中
        onClick(e, index) {
            // ios上，moving状态取消事件触发
            if (uni.$util.os() === 'ios' && this.moving) {
                return;
            }
            this.preventEvent(e);
            let x = 0;
            // 点击时，在nvue上，无法获得点击的坐标，所以无法实现点击半星选择
            // #ifndef APP-NVUE
            x = e.changedTouches[0].pageX;
            // #endif
            // #ifdef APP-NVUE
            // nvue下，无法通过点击获得坐标信息，这里通过元素的位置尺寸值模拟坐标
            x = index * this.rateWidth + this.rateBoxLeft;
            // #endif
            this.getActiveIndex(x, true);
        },
        // 发出事件
        emitEvent() {
            // 发出change事件
            this.$emit('change', this.activeIndex);
            // 同时修改双向绑定的value的值
            this.$emit('input', this.activeIndex);
        },
        // 获取当前激活的评分图标
        getActiveIndex(x, isClick = false) {
            if (this.disabled) {
                return;
            }
            // 判断当前操作的点的x坐标值，是否在允许的边界范围内
            const allRateWidth = this.rateWidth * this.count + this.rateBoxLeft;
            // 如果小于第一个图标的左边界，设置为最小值，如果大于所有图标的宽度，则设置为最大值
            x = uni.$util.range(this.rateBoxLeft, allRateWidth, x) - this.rateBoxLeft;
            // 滑动点相对于评分盒子左边的距离
            const distance = x;
            // 滑动的距离，相当于多少颗星星
            let index;
            // 判断是否允许半星
            if (this.allowHalf) {
                index = Math.floor(distance / this.rateWidth);
                // 取余，判断小数的区间范围
                const decimal = distance % this.rateWidth;
                if (decimal <= this.rateWidth / 2 && decimal > 0) {
                    index += 0.5;
                } else if (decimal > this.rateWidth / 2) {
                    index++;
                }
            } else {
                index = Math.floor(distance / this.rateWidth);
                // 取余，判断小数的区间范围
                const decimal = distance % this.rateWidth;
                // 非半星时，只有超过了图标的一半距离，才认为是选择了这颗星
                if (isClick) {
                    if (decimal > 0) index++;
                } else {
                    if (decimal > this.rateWidth / 2) index++;
                }
            }
            this.activeIndex = Math.min(index, this.count);
            // 对最少颗星星的限制
            if (this.activeIndex < this.minCount) {
                this.activeIndex = this.minCount;
            }

            // 设置延时为了让click事件在touchmove之前触发
            setTimeout(() => {
                this.moving = true;
            }, 10);
            // 一定时间后，取消标识为移动中状态，是为了让click事件无效
            setTimeout(() => {
                this.moving = false;
            }, 10);
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-rate-margin: 0 !default;
$ai-rate-padding: 0 !default;
$ai-rate-item-icon-wrap-half-top: 0 !default;
$ai-rate-item-icon-wrap-half-left: 0 !default;

.ai-rate {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: $ai-rate-margin;
    padding: $ai-rate-padding;
    /* #ifndef APP-NVUE */
    touch-action: none;
    /* #endif */

    &__content {
        display: flex;
        flex-direction: row;

        &__item {
            position: relative;

            &__icon-wrap {
                &--half {
                    position: absolute;
                    overflow: hidden;
                    top: $ai-rate-item-icon-wrap-half-top;
                    left: $ai-rate-item-icon-wrap-half-left;
                }
            }
        }
    }
}

.ai-icon {
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */
}
</style>
