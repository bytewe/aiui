<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:15:41
 * @Description: 索引锚点
-->

<template>
    <!-- #ifdef APP-NVUE -->
    <header :ref="`ai-index-anchor-${index}`">
        <!-- #endif -->
        <view v-if="text" class="ai-index-anchor">
            <text class="ai-index-anchor__text">{{ text }}</text>
        </view>
        <!-- #ifdef APP-NVUE -->
    </header>
    <!-- #endif -->
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiIndexAnchor',
    mixins: [mixins],
    props: {
        // 索引
        index: {
            type: [String, Number],
            default: '',
        },
        // 文本
        text: {
            type: String,
            default: '',
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 此处会活动父组件实例，并赋值给实例的parent属性
            const indexList = uni.$util.$parent.call(this, 'AiIndexList');
            if (!indexList) {
                return uni.$util.error('ai-index-anchor必须要搭配ai-index-list组件使用');
            }
            // 将当前实例放入到ai-index-list中
            indexList.anchors.push(this);
            const indexListItem = uni.$util.$parent.call(this, 'AiIndexItem');
            // #ifndef APP-NVUE
            // 只有在非nvue下，ai-index-anchor才是嵌套在ai-index-item中的
            if (!indexListItem) {
                return uni.$util.error('ai-index-anchor必须要搭配ai-index-item组件使用');
            }
            // 设置ai-index-item的id为anchor的索引标识符，因为非nvue下滚动列表需要依赖scroll-view滚动到元素的特性
            indexListItem.id = this.index.charCodeAt(0);
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-index-anchor-padding: $space-mini $space-normal;
$ai-index-anchor-background: $background-default;
$ai-index-anchor-font-size: $font-size-mini;
$ai-index-anchor-line-height: $line-height-mini;
$ai-index-anchor-color: $color-dark;

.ai-index-anchor {
    z-index: 1;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: $ai-index-anchor-padding;
    background: $ai-index-anchor-background;

    &__text {
        font-size: $ai-index-anchor-font-size;
        line-height: $ai-index-anchor-line-height;
        color: $ai-index-anchor-color;
    }
}
</style>
