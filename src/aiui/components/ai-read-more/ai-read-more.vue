<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:25:28
 * @Description: 阅读更多
-->

<template>
    <view class="ai-read-more">
        <view
            class="ai-read-more__content"
            :style="{
                height: isLongContent && status === 'close' ? $util.addUnit(showHeight) : $util.addUnit(contentHeight),
                textIndent: textIndent,
            }"
        >
            <view ref="ai-read-more__content__inner" class="ai-read-more__content__inner" :class="[elId]">
                <slot />
            </view>
        </view>
        <view v-if="isLongContent" class="ai-read-more__toggle" :style="[innerShadowStyle]">
            <slot name="toggle">
                <view class="ai-read-more__toggle__text" @click="toggleReadMore">
                    <ai-text
                        :text="status === 'close' ? closeText : openText"
                        :color="color"
                        :size="fontSize"
                        :line-height="fontSize"
                        margin="0 10rpx 0 0"
                    />
                    <view class="ai-read-more__toggle__icon">
                        <ai-icon
                            :color="color"
                            :size="fontSize + 2"
                            :name="status === 'close' ? 'arrow-down' : 'arrow-up'"
                        />
                    </view>
                </view>
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
    name: 'AiReadMore',
    mixins: [mixins],
    props: {
        // 默认的显示占位高度
        showHeight: {
            type: [String, Number],
            default: 400,
        },
        // 展开后是否显示"收起"按钮
        toggle: {
            type: Boolean,
            default: false,
        },
        // 关闭时的提示文字
        closeText: {
            type: String,
            default: '展开阅读全文',
        },
        // 展开时的提示文字
        openText: {
            type: String,
            default: '收起',
        },
        // 提示的文字颜色
        color: {
            type: String,
            default: '#2979ff',
        },
        // 提示文字的大小
        fontSize: {
            type: [String, Number],
            default: 14,
        },
        // 是否显示阴影
        // 此参数不能写在props/readMore.js中进行默认配置，因为使用了条件编译，在外部js中
        // uni无法准确识别当前是否处于nvue还是非nvue下
        shadowStyle: {
            type: Object,
            default: () => ({
                // #ifndef APP-NVUE
                backgroundImage: 'linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)',
                // #endif
                // #ifdef APP-NVUE
                // nvue上不支持设置复杂的backgroundImage属性
                // eslint-disable-next-line no-dupe-keys
                backgroundImage: 'linear-gradient(to top, #fff, rgba(255, 255, 255, 0.5))',
                // #endif
                paddingTop: '200rpx',
                marginTop: '-200rpx',
            }),
        },
        // 段落首行缩进的字符个数
        textIndent: {
            type: String,
            default: '2em',
        },
        // open和close事件时，将此参数返回在回调参数中
        name: {
            type: [String, Number],
            default: '',
        },
    },
    data() {
        return {
            isLongContent: false, // 是否需要隐藏一部分内容
            status: 'close', // 当前隐藏与显示的状态，close-收起状态，open-展开状态
            elId: uni.$util.guid(), // 生成唯一class
            contentHeight: 100, // 内容高度
        };
    },
    computed: {
        // 展开后无需阴影，收起时才需要阴影样式
        innerShadowStyle() {
            if (this.status === 'open') return {};
            else return this.shadowStyle;
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            this.getContentHeight().then((height) => {
                this.contentHeight = height;
                // 判断高度，如果真实内容高度大于占位高度，则显示收起与展开的控制按钮
                if (height > uni.$util.getPx(this.showHeight)) {
                    this.isLongContent = true;
                    this.status = 'close';
                }
            });
        },
        // 获取内容的高度
        async getContentHeight() {
            // 延时一定时间再获取节点
            await uni.$util.sleep(30);
            return new Promise((resolve) => {
                // #ifndef APP-NVUE
                this.getRect('.' + this.elId).then((res) => {
                    resolve(res.height);
                });
                // #endif

                // #ifdef APP-NVUE
                const ref = this.$refs['ai-read-more__content__inner'];
                dom.getComponentRect(ref, (res) => {
                    resolve(res.size.height);
                });
                // #endif
            });
        },
        // 展开或者收起
        toggleReadMore() {
            this.status = this.status === 'close' ? 'open' : 'close';
            // 如果toggle为false，隐藏"收起"部分的内容
            if (this.toggle == false) this.isLongContent = false;
            // 发出打开或者收齐的事件
            this.$emit(this.status, this.name);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-read-more {
    &__content {
        overflow: hidden;
        color: $color-dark;
        font-size: 30rpx;
        text-align: left;
    }

    &__toggle {
        display: flex;
        flex-direction: row;
        justify-content: center;

        &__text {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-top: 10rpx;
        }
    }
}
</style>
