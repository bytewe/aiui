<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:16:03
 * @Description: 列表
-->

<template>
    <block>
        <!-- #ifdef APP-NVUE -->
        <list
            class="ai-list"
            :enable-back-to-top="enableBackToTop"
            :loadmoreoffset="lowerThreshold"
            :show-scrollbar="showScrollbar"
            :style="[listStyle]"
            :offset-accuracy="Number(offsetAccuracy)"
            @scroll="onScroll"
            @loadmore="scrolltolower"
        >
            <slot />
        </list>
        <!-- #endif -->
        <!-- #ifndef APP-NVUE -->
        <scroll-view
            class="ai-list"
            :scroll-into-view="scrollIntoView"
            :style="[listStyle]"
            scroll-y
            :scroll-top="Number(scrollTop)"
            :lower-threshold="Number(lowerThreshold)"
            :upper-threshold="Number(upperThreshold)"
            :show-scrollbar="showScrollbar"
            :enable-back-to-top="enableBackToTop"
            :scroll-with-animation="scrollWithAnimation"
            @scroll="onScroll"
            @scrolltolower="scrolltolower"
            @scrolltoupper="scrolltoupper"
        >
            <view
                :style="{
                    paddingTop: `${offset}px`,
                }"
            >
                <slot />
            </view>
        </scroll-view>
        <!-- #endif -->
    </block>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif

export default {
    name: 'AiList',
    mixins: [mixins],
    provide() {
        return {
            aiList: this,
        };
    },
    props: {
        // 控制是否出现滚动条，仅nvue有效
        showScrollbar: {
            type: Boolean,
            default: false,
        },
        // 距底部多少时触发scrolltolower事件
        lowerThreshold: {
            type: [String, Number],
            default: 50,
        },
        // 距顶部多少时触发scrolltoupper事件，非nvue有效
        upperThreshold: {
            type: [String, Number],
            default: 0,
        },
        // 设置竖向滚动条位置
        scrollTop: {
            type: [String, Number],
            default: 0,
        },
        // 控制 onscroll 事件触发的频率，仅nvue有效
        offsetAccuracy: {
            type: [String, Number],
            default: 10,
        },
        // 启用 flexbox 布局。开启后，当前节点声明了display: flex就会成为flex container，并作用于其孩子节点，仅微信小程序有效
        enableFlex: {
            type: Boolean,
            default: false,
        },
        // 是否按分页模式显示List，默认值false
        pagingEnabled: {
            type: Boolean,
            default: false,
        },
        // 是否允许List滚动
        scrollable: {
            type: Boolean,
            default: true,
        },
        // 值应为某子元素id（id不能以数字开头）
        scrollIntoView: {
            type: String,
            default: '',
        },
        // 在设置滚动条位置时使用动画过渡
        scrollWithAnimation: {
            type: Boolean,
            default: false,
        },
        // iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只对微信小程序有效
        enableBackToTop: {
            type: Boolean,
            default: false,
        },
        // 列表的高度
        height: {
            type: [String, Number],
            default: 0,
        },
        // 列表宽度
        width: {
            type: [String, Number],
            default: 0,
        },
        // 列表前后预渲染的屏数，1代表一个屏幕的高度，1.5代表1个半屏幕高度
        preLoadScreen: {
            type: [String, Number],
            default: 1,
        },
    },
    data() {
        return {
            // 记录内部滚动的距离
            innerScrollTop: 0,
            // vue下，scroll-view在上拉加载时的偏移值
            offset: 0,
            sys: uni.$util.sys(),
        };
    },
    computed: {
        listStyle() {
            const style = {},
                addUnit = uni.$util.addUnit;
            if (this.width != 0) style.width = addUnit(this.width);
            if (this.height != 0) style.height = addUnit(this.height);
            // 如果没有定义列表高度，则默认使用屏幕高度
            if (!style.height) style.height = addUnit(this.sys.windowHeight, 'px');
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
    watch: {
        scrollIntoView(n) {
            this.scrollIntoViewById(n);
        },
    },
    created() {
        this.refs = [];
        this.children = [];
        this.anchors = [];
    },
    mounted() {},
    methods: {
        updateOffsetFromChild(top) {
            this.offset = top;
        },
        onScroll(e) {
            let scrollTop = 0;
            // #ifdef APP-NVUE
            scrollTop = e.contentOffset.y;
            // #endif
            // #ifndef APP-NVUE
            scrollTop = e.detail.scrollTop;
            // #endif
            this.innerScrollTop = scrollTop;
            this.$emit('scroll', Math.abs(scrollTop));
        },
        scrollIntoViewById(id) {
            // #ifdef APP-NVUE
            // 根据id参数，找到所有ai-list-item中匹配的节点，再通过dom模块滚动到对应的位置
            const item = this.refs.find((item) => (item.$refs[id] ? true : false));
            dom.scrollToElement(item.$refs[id], {
                // 是否需要滚动动画
                animated: this.scrollWithAnimation,
            });
            // #endif
        },
        // 滚动到底部触发事件
        scrolltolower() {
            uni.$util.sleep(30).then(() => {
                this.$emit('scrolltolower');
            });
        },
        // #ifndef APP-NVUE
        // 滚动到底部时触发，非nvue有效
        scrolltoupper() {
            uni.$util.sleep(30).then(() => {
                this.$emit('scrolltolower');
                // 这一句很重要，能绝对保证在性功能障碍的webview，滚动条到顶时，取消偏移值，让页面置顶
                this.offset = 0;
            });
        },
        // #endif
    },
};
</script>

<style lang="scss" scoped>
.ai-list {
    flex-direction: column;
}
</style>
