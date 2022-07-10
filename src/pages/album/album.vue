<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-10 22:05:27
 * @Description: 相册
-->

<template>
    <ai-page background="white">
        <ai-box title="基础使用">
            <ai-row align="top">
                <ai-avatar src="/static/common/logo.png" />
                <ai-content>
                    <ai-text text="AIUI" type="primary" bold size="big" />
                    <ai-text text="全面的组件和便捷的工具会让您信手拈来，如鱼得水" />
                    <ai-album :urls="urls1" key-name="src2" custom-class="ai-margin-top--xs" />
                </ai-content>
            </ai-row>
        </ai-box>

        <ai-box title="多图模式">
            <ai-row align="top">
                <ai-avatar src="/static/common/logo.png" />
                <ai-content>
                    <ai-text text="AIUI" type="primary" bold size="big" />
                    <ai-text text="全面的组件和便捷的工具会让您信手拈来，如鱼得水" custom-class="ai-margin-top--xs" />
                    <ai-album :urls="urls2" />
                </ai-content>
            </ai-row>
        </ai-box>

        <ai-box title="图文对齐">
            <ai-row align="top">
                <ai-avatar src="/static/common/logo.png" />
                <ai-content>
                    <ai-text text="AIUI" type="primary" bold size="big" />
                    <ai-text
                        text="全面的组件和便捷的工具会让您信手拈来，如鱼得水"
                        :custom-style="{ width: albumWidth + 'px' }"
                    />
                    <ai-album
                        :urls="urls2"
                        multiple-size="136rpx"
                        custom-class="ai-margin-top--xs"
                        @albumWidth="(width) => (albumWidth = width)"
                    />
                </ai-content>
            </ai-row>
        </ai-box>

        <ai-box title="更改裁剪模式">
            <ai-row align="top">
                <ai-avatar src="/static/common/logo.png" />
                <ai-content>
                    <ai-text text="AIUI" type="primary" bold size="big" />
                    <ai-text text="全面的组件和便捷的工具会让您信手拈来，如鱼得水" />
                    <ai-album
                        :urls="urls3"
                        row-count="2"
                        max-count="4"
                        multiple-mode="scaleToFill"
                        custom-class="ai-margin-top--xs"
                    />
                </ai-content>
            </ai-row>
        </ai-box>

        <ai-box title="更改图片大小">
            <ai-row align="top">
                <ai-avatar src="/static/common/logo.png" />
                <ai-content>
                    <ai-text text="AIUI" type="primary" bold size="big" />
                    <ai-text text="全面的组件和便捷的工具会让您信手拈来，如鱼得水" />
                    <ai-album
                        :urls="urls4"
                        row-count="2"
                        max-count="4"
                        multiple-size="100rpx"
                        custom-class="ai-margin-top--xs"
                    />
                </ai-content>
            </ai-row>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            albumWidth: 0,
            urls1: [
                {
                    src2: `${uni.$config.static}album/1.jpg`,
                },
            ],
            urls2: [
                `${uni.$config.static}album/1.jpg`,
                `${uni.$config.static}album/2.jpg`,
                `${uni.$config.static}album/3.jpg`,
                `${uni.$config.static}album/4.jpg`,
                `${uni.$config.static}album/5.jpg`,
                `${uni.$config.static}album/6.jpg`,
                `${uni.$config.static}album/7.jpg`,
                `${uni.$config.static}album/8.jpg`,
                `${uni.$config.static}album/9.jpg`,
                `${uni.$config.static}album/10.jpg`,
            ],
            urls3: [
                `${uni.$config.static}album/5.jpg`,
                `${uni.$config.static}album/6.jpg`,
                `${uni.$config.static}album/7.jpg`,
                `${uni.$config.static}album/8.jpg`,
            ],
            urls4: [
                `${uni.$config.static}album/7.jpg`,
                `${uni.$config.static}album/8.jpg`,
                `${uni.$config.static}album/9.jpg`,
                `${uni.$config.static}album/10.jpg`,
            ],
        };
    },
};
</script>

<style lang="scss" scoped></style>
