<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:16:06
 * @Description: 列表项
-->

<template>
    <!-- #ifdef APP-NVUE -->
    <cell>
        <!-- #endif -->
        <view
            :ref="`ai-list-item-${anchor}`"
            class="ai-list-item"
            :anchor="`ai-list-item-${anchor}`"
            :class="[`ai-list-item-${anchor}`]"
        >
            <slot />
        </view>
        <!-- #ifdef APP-NVUE -->
    </cell>
    <!-- #endif -->
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif

export default {
    name: 'AiListItem',
    mixins: [mixins],
    inject: ['aiList'],
    props: {
        // 用于滚动到指定item
        anchor: {
            type: [String, Number],
            default: '',
        },
    },
    data() {
        return {
            // 节点信息
            rect: {},
            index: 0,
            show: true,
            sys: uni.$util.sys(),
        };
    },
    computed: {},
    watch: {
        // #ifndef APP-NVUE
        'aiList.innerScrollTop'(n) {
            const preLoadScreen = this.aiList.preLoadScreen;
            const windowHeight = this.sys.windowHeight;
            if (n <= windowHeight * preLoadScreen) {
                this.parent.updateOffsetFromChild(0);
            } else if (this.rect.top <= n - windowHeight * preLoadScreen) {
                this.parent.updateOffsetFromChild(this.rect.top);
            }
        },
        // #endif
    },
    created() {
        this.parent = {};
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 初始化数据
            this.updateParentData();
            this.index = this.parent.children.indexOf(this);
            this.resize();
        },
        updateParentData() {
            // 此方法在mixin中
            this.getParentData('AiList');
        },
        resize() {
            this.queryRect(`ai-list-item-${this.anchor}`).then((size) => {
                const lastChild = this.parent.children[this.index - 1];
                this.rect = size;
                const preLoadScreen = this.aiList.preLoadScreen;
                const windowHeight = this.sys.windowHeight;
                // #ifndef APP-NVUE
                if (lastChild) {
                    this.rect.top = lastChild.rect.top + lastChild.rect.height;
                }
                if (size.top >= this.aiList.innerScrollTop + (1 + preLoadScreen) * windowHeight) this.show = false;
                // #endif
            });
        },
        // 查询元素尺寸
        queryRect(el) {
            return new Promise((resolve) => {
                // #ifndef APP-NVUE
                this.getRect(`.${el}`).then((size) => {
                    resolve(size);
                });
                // #endif

                // #ifdef APP-NVUE
                const ref = this.$refs[el];
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
