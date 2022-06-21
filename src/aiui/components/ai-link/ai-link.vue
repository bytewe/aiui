<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:45:56
 * @Description: 超链接
-->

<template>
    <text class="ai-link" :style="[linkStyle, $util.addStyle(customStyle)]" @click.stop="openLink">{{ text }}</text>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiLink',
    mixins: [mixins],
    props: {
        // 文字颜色
        color: {
            type: String,
            default: uni.$config['color-primary'],
        },
        // 字体大小，单位px
        fontSize: {
            type: [String, Number],
            default: 15,
        },
        // 是否显示下划线
        underLine: {
            type: Boolean,
            default: false,
        },
        // 要跳转的链接
        href: {
            type: String,
            default: '',
        },
        // 小程序中复制到粘贴板的提示语
        mpTips: {
            type: String,
            default: '链接已复制，请在浏览器打开',
        },
        // 下划线颜色
        lineColor: {
            type: String,
            default: '',
        },
        // 超链接的问题，不使用slot形式传入，是因为nvue下无法修改颜色
        text: {
            type: String,
            default: '',
        },
    },
    computed: {
        linkStyle() {
            const style = {
                color: this.color,
                fontSize: uni.$util.addUnit(this.fontSize),
                // line-height设置为比字体大小多4rpx
                lineHeight: uni.$util.addUnit(uni.$util.getPx(this.fontSize) + 2),
                textDecoration: this.underLine ? 'underline' : 'none',
            };
            // if (this.underLine) {
            //   style.borderBottomColor = this.lineColor || this.color
            //   style.borderBottomWidth = '2rpx'
            // }
            return style;
        },
    },
    methods: {
        openLink() {
            // #ifdef APP-PLUS
            // eslint-disable-next-line no-undef
            plus.runtime.openURL(this.href);
            // #endif
            // #ifdef H5
            window.open(this.href);
            // #endif
            // #ifdef MP
            uni.setClipboardData({
                data: this.href,
                success: () => {
                    uni.hideToast();
                    this.$nextTick(() => {
                        uni.$util.toast(this.mpTips);
                    });
                },
            });
            // #endif
            this.$emit('click');
        },
    },
};
</script>

<style lang="scss" scoped>
$link-line-height: 1 !default;
.ai-link {
    /* #ifndef APP-NVUE */
    line-height: $link-line-height;
    /* #endif */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
}
</style>
