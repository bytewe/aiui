<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:15:43
 * @Description: 索引列表项
-->

<template>
    <!-- #ifdef APP-NVUE -->
    <cell ref="ai-index-item">
        <!-- #endif -->
        <view :id="`ai-index-item-${id}`" :class="`ai-index-item ai-index-item-${id}`">
            <slot />
        </view>
        <!-- #ifdef APP-NVUE -->
    </cell>
    <!-- #endif -->
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
// NVUE不支持百分比单位，这里需要通过dom查询组件的宽度
const dom = uni.requireNativePlugin('dom');
// #endif
export default {
    name: 'AiIndexItem',
    mixins: [mixins],
    data() {
        return {
            // 本组件到滚动条顶部的距离
            top: 0,
            height: 0,
            id: '',
        };
    },
    created() {
        // 子组件ai-index-anchor的实例
        this.anchor = {};
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 此处会活动父组件实例，并赋值给实例的parent属性
            this.getParentData('AiIndexList');
            if (!this.parent) {
                return uni.$util.error('ai-index-item必须要搭配ai-index-list组件使用');
            }
            uni.$util.sleep().then(() => {
                this.getIndexItemRect().then((size) => {
                    // 由于对象的引用特性，此处会同时生效到父组件的children数组的本实例的top属性中，供父组件判断读取
                    this.top = Math.ceil(size.top);
                    this.height = Math.ceil(size.height);
                });
            });
        },
        getIndexItemRect() {
            return new Promise((resolve) => {
                // #ifndef APP-NVUE
                this.getRect('.ai-index-item').then((size) => {
                    resolve(size);
                });
                // #endif
                // #ifdef APP-NVUE
                const ref = this.$refs['ai-index-item'];
                dom.getComponentRect(ref, (res) => {
                    resolve(res.size);
                });
                // #endif
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
