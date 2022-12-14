<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:48:12
 * @Description: 吸顶
-->

<template>
    <view :id="elId" class="ai-sticky" :style="[style]">
        <view :style="[stickyContent]" class="ai-sticky__content">
            <slot />
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiSticky',
    mixins: [mixins],
    props: {
        // 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为88rpx
        offsetTop: {
            type: [String, Number],
            default: 0,
        },
        // 自定义导航栏的高度
        customNavbarHeight: {
            type: [String, Number],
            // #ifdef H5
            // H5端的导航栏属于“自定义”导航栏的范畴，因为它是非原生的，与普通元素一致
            default: 44,
            // #endif
            // #ifndef H5
            // eslint-disable-next-line no-dupe-keys
            default: 0,
            // #endif
        },
        // 是否开启吸顶功能
        disabled: {
            type: Boolean,
            default: false,
        },
        // 吸顶区域的背景颜色
        background: {
            type: String,
            default: 'transparent',
        },
        // z-index值
        zIndex: {
            type: [String, Number],
            default: '',
        },
        // 列表中的索引值
        index: {
            type: [String, Number],
            default: '',
        },
    },
    data() {
        return {
            cssSticky: false, // 是否使用css的sticky实现
            stickyTop: 0, // 吸顶的top值，因为可能受自定义导航栏影响，最终的吸顶值非offsetTop值
            elId: uni.$util.guid(),
            left: 0, // js模式时，吸顶的内容因为处于postition: fixed模式，为了和原来保持一致的样式，需要记录并重新设置它的left，height，width属性
            width: 'auto',
            height: 'auto',
            fixed: false, // js模式时，是否处于吸顶模式
        };
    },
    computed: {
        style() {
            const style = {};
            if (!this.disabled) {
                if (this.cssSticky) {
                    style.position = 'sticky';
                    style.zIndex = this.uZindex;
                    style.top = uni.$util.addUnit(this.stickyTop);
                } else {
                    style.height = this.fixed ? this.height + 'px' : 'auto';
                }
            } else {
                // 无需吸顶时，设置会默认的relative(nvue)和非nvue的static静态模式即可
                // #ifdef APP-NVUE
                style.position = 'relative';
                // #endif
                // #ifndef APP-NVUE
                style.position = 'static';
                // #endif
            }
            style.backgroundColor = this.background;
            return uni.$util.deepMerge(uni.$util.addStyle(this.customStyle), style);
        },
        // 吸顶内容的样式
        stickyContent() {
            const style = {};
            if (!this.cssSticky) {
                style.position = this.fixed ? 'fixed' : 'static';
                style.top = this.stickyTop + 'px';
                style.left = this.left + 'px';
                style.width = this.width == 'auto' ? 'auto' : this.width + 'px';
                style.zIndex = this.uZindex;
            }
            return style;
        },
        uZindex() {
            return this.zIndex ? this.zIndex : uni.$config['z-index-sticky'];
        },
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.disconnectObserver('contentObserver');
    },
    methods: {
        init() {
            this.getStickyTop();
            // 判断使用的模式
            this.checkSupportCssSticky();
            // 如果不支持css sticky，则使用js方案，此方案性能比不上css方案
            if (!this.cssSticky) {
                !this.disabled && this.initObserveContent();
            }
        },
        initObserveContent() {
            // 获取吸顶内容的高度，用于在js吸顶模式时，给父元素一个填充高度，防止"塌陷"
            this.getRect('#' + this.elId).then((res) => {
                this.height = res.height;
                this.left = res.left;
                this.width = res.width;
                this.$nextTick(() => {
                    this.observeContent();
                });
            });
        },
        observeContent() {
            // 先断掉之前的观察
            this.disconnectObserver('contentObserver');
            const contentObserver = uni.createIntersectionObserver({
                // 检测的区间范围
                thresholds: [0.95, 0.98, 1],
            });
            // 到屏幕顶部的高度时触发
            contentObserver.relativeToViewport({
                top: -this.stickyTop,
            });
            // 绑定观察的元素
            contentObserver.observe(`#${this.elId}`, (res) => {
                this.setFixed(res.boundingClientRect.top);
            });
            this.contentObserver = contentObserver;
        },
        setFixed(top) {
            // 判断是否出于吸顶条件范围
            const fixed = top <= this.stickyTop;
            this.fixed = fixed;
        },
        disconnectObserver(observerName) {
            // 断掉观察，释放资源
            const observer = this[observerName];
            observer && observer.disconnect();
        },
        getStickyTop() {
            this.stickyTop = uni.$util.getPx(this.offsetTop) + uni.$util.getPx(this.customNavbarHeight);
        },
        async checkSupportCssSticky() {
            // #ifdef H5
            // H5，一般都是现代浏览器，是支持css sticky的，这里使用创建元素嗅探的形式判断
            if (this.checkCssStickyForH5()) {
                this.cssSticky = true;
            }
            // #endif

            // 如果安卓版本高于8.0，依然认为是支持css sticky的(因为安卓7在某些机型，可能不支持sticky)
            if (uni.$util.os() === 'android' && Number(uni.$util.sys().system) > 8) {
                this.cssSticky = true;
            }

            // APP-Vue和微信平台，通过computedStyle判断是否支持css sticky
            // #ifdef APP-VUE || MP-WEIXIN
            this.cssSticky = await this.checkComputedStyle();
            // #endif

            // ios上，从ios6开始，都是支持css sticky的
            if (uni.$util.os() === 'ios') {
                this.cssSticky = true;
            }

            // nvue，是支持css sticky的
            // #ifdef APP-NVUE
            this.cssSticky = true;
            // #endif
        },
        // 在APP和微信小程序上，通过uni.createSelectorQuery可以判断是否支持css sticky
        checkComputedStyle() {
            // 方法内进行判断，避免在其他平台生成无用代码
            // #ifdef APP-VUE || MP-WEIXIN
            return new Promise((resolve) => {
                uni.createSelectorQuery()
                    .in(this)
                    .select('.ai-sticky')
                    .fields({
                        computedStyle: ['position'],
                    })
                    .exec((e) => {
                        resolve('sticky' === e[0].position);
                    });
            });
            // #endif
        },
        // H5通过创建元素的形式嗅探是否支持css sticky
        // 判断浏览器是否支持sticky属性
        checkCssStickyForH5() {
            // 方法内进行判断，避免在其他平台生成无用代码
            // #ifdef H5
            const vendorList = ['', '-webkit-', '-ms-', '-moz-', '-o-'],
                vendorListLength = vendorList.length,
                stickyElement = document.createElement('div');
            for (let i = 0; i < vendorListLength; i++) {
                stickyElement.style.position = vendorList[i] + 'sticky';
                if (stickyElement.style.position !== '') {
                    return true;
                }
            }
            return false;
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-sticky {
    /* #ifdef APP-VUE || MP-WEIXIN */
    // 此处默认写sticky属性，是为了给微信和APP通过uni.createSelectorQuery查询是否支持css sticky使用
    position: sticky;
    /* #endif */
}
</style>
