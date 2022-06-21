<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:29:42
 * @Description: 相册
-->

<template>
    <ai-page background="white">
        <ai-box title="基础使用">
            <view class="album">
                <view class="album__avatar">
                    <image src="/static/uview/common/logo.png" style="width: 64rpx; height: 64rpx" />
                </view>
                <view class="album__content">
                    <ai-text text="AIUI" type="primary" bold size="34rpx" />
                    <ai-text margin="0 0 16rpx 0" text="全面的组件和便捷的工具会让您信手拈来，如鱼得水" />
                    <ai-album :urls="urls1" key-name="src2" />
                </view>
            </view>
        </ai-box>

        <ai-box title="多图模式">
            <view class="album">
                <view class="album__avatar">
                    <image src="/static/uview/common/logo.png" style="width: 64rpx; height: 64rpx" />
                </view>
                <view class="album__content">
                    <ai-text text="AIUI" type="primary" bold size="34rpx" />
                    <ai-text margin="0 0 16rpx 0" text="全面的组件和便捷的工具会让您信手拈来，如鱼得水" />
                    <ai-album :urls="urls2" />
                </view>
            </view>
        </ai-box>

        <ai-box title="图文对齐">
            <view class="album">
                <view class="album__avatar">
                    <image src="/static/uview/common/logo.png" style="width: 64rpx; height: 64rpx" />
                </view>
                <view class="album__content">
                    <ai-text text="AIUI" type="primary" bold size="34rpx" />
                    <view
                        :style="{
                            marginBottom: '16rpx',
                            width: albumWidth + 'px',
                        }"
                    >
                        <ai-text
                            text="全面的组件和便捷的工具会让您信手拈来，如鱼得水"
                            :custom-style="{
                                width: albumWidth + 'px',
                            }"
                        />
                    </view>
                    <ai-album :urls="urls2" multiple-size="136rpx" @albumWidth="(width) => (albumWidth = width)" />
                </view>
            </view>
        </ai-box>

        <ai-box title="更改裁剪模式">
            <view class="album">
                <view class="album__avatar">
                    <image src="/static/uview/common/logo.png" style="width: 64rpx; height: 64rpx" />
                </view>
                <view class="album__content">
                    <ai-text text="AIUI" type="primary" bold size="34rpx" />
                    <ai-text margin="0 0 16rpx 0" text="全面的组件和便捷的工具会让您信手拈来，如鱼得水" />
                    <ai-album :urls="urls3" row-count="2" max-count="4" multiple-mode="scaleToFill" />
                </view>
            </view>
        </ai-box>

        <ai-box title="更改图片大小">
            <view class="album">
                <view class="album__avatar">
                    <image src="/static/uview/common/logo.png" mode="" style="width: 64rpx; height: 64rpx" />
                </view>
                <view class="album__content">
                    <ai-text text="AIUI" type="primary" bold size="34rpx" />
                    <ai-text margin="0 0 16rpx 0" text="全面的组件和便捷的工具会让您信手拈来，如鱼得水" />
                    <ai-album :urls="urls4" row-count="2" max-count="4" multiple-size="100rpx" />
                </view>
            </view>
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
                    src2: 'https://ui.bytewe.cn/demo/album/1.jpg',
                },
            ],
            urls2: [
                'https://ui.bytewe.cn/demo/album/1.jpg',
                'https://ui.bytewe.cn/demo/album/2.jpg',
                'https://ui.bytewe.cn/demo/album/3.jpg',
                'https://ui.bytewe.cn/demo/album/4.jpg',
                'https://ui.bytewe.cn/demo/album/5.jpg',
                'https://ui.bytewe.cn/demo/album/6.jpg',
                'https://ui.bytewe.cn/demo/album/7.jpg',
                'https://ui.bytewe.cn/demo/album/8.jpg',
                'https://ui.bytewe.cn/demo/album/9.jpg',
                'https://ui.bytewe.cn/demo/album/10.jpg',
            ],
            urls3: [
                'https://ui.bytewe.cn/demo/album/5.jpg',
                'https://ui.bytewe.cn/demo/album/6.jpg',
                'https://ui.bytewe.cn/demo/album/7.jpg',
                'https://ui.bytewe.cn/demo/album/8.jpg',
            ],
            urls4: [
                'https://ui.bytewe.cn/demo/album/7.jpg',
                'https://ui.bytewe.cn/demo/album/8.jpg',
                'https://ui.bytewe.cn/demo/album/9.jpg',
                'https://ui.bytewe.cn/demo/album/10.jpg',
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.album {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    &__avatar {
        background-color: $background-default;
        padding: 10rpx;
        border-radius: 6rpx;
    }

    &__content {
        margin-left: 20rpx;
        flex: 1;
    }
}
</style>
