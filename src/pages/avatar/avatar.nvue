<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:30:05
 * @Description: 头像
-->

<template>
    <ai-page background="white">
        <ai-box title="基础演示">
            <ai-avatar :src="src1" />
        </ai-box>

        <ai-box title="头像形状" direction="row">
            <view class="ai-margin-right">
                <ai-avatar :src="src2" shape="circle" @click="click" />
            </view>
            <view class="ai-margin-right">
                <ai-avatar :src="src3" shape="square" />
            </view>
        </ai-box>

        <ai-box title="头像尺寸" direction="row">
            <view class="ai-margin-right">
                <ai-avatar :src="src4" size="30" />
            </view>
            <view class="ai-margin-right">
                <ai-avatar :src="src5" size="40" />
            </view>
            <view class="ai-margin-right">
                <ai-avatar :src="src6" size="50" />
            </view>
        </ai-box>

        <ai-box title="图标头像" direction="row">
            <view class="ai-margin-right">
                <ai-avatar icon="like--fill" font-size="22" />
            </view>
            <view class="ai-margin-right">
                <ai-avatar icon="star--fill" font-size="22" />
            </view>
        </ai-box>

        <ai-box title="文字头像(自动背景色)" direction="row">
            <view class="ai-margin-right">
                <ai-avatar text="U" font-size="20" random-background :color-index="0" />
            </view>
            <view class="ai-margin-right">
                <ai-avatar text="邓" font-size="18" random-background />
            </view>
            <view class="ai-margin-right">
                <ai-avatar text="张" font-size="18" random-background />
            </view>
            <view class="ai-margin-right">
                <ai-avatar text="王" font-size="18" random-background />
            </view>
        </ai-box>

        <ai-box title="图片加载失败(显示默认头像)">
            <ai-avatar :src="src7" />
        </ai-box>

        <!-- #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU -->
        <ai-box title="小程序开放能力">
            <view class="ai-margin-right">
                <ai-avatar mp-avatar size="60" />
            </view>
        </ai-box>
        <!-- #endif -->

        <ai-box title="头像组">
            <ai-avatar-group :urls="urls" size="35" gap="0.4" />
        </ai-box>

        <ai-box>
            <ai-avatar-group :urls="urls" size="35" gap="0.6" />
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            src1: 'https://ui.bytewe.cn/demo/album/1.jpg',
            src2: 'https://ui.bytewe.cn/demo/album/2.jpg',
            src3: 'https://ui.bytewe.cn/demo/album/3.jpg',
            src4: 'https://ui.bytewe.cn/demo/album/4.jpg',
            src5: 'https://ui.bytewe.cn/demo/album/5.jpg',
            src6: 'https://ui.bytewe.cn/demo/album/6.jpg',
            src7: 'https://ui.bytewe.cn/demo/album/noExist.jpg',
            urls: [
                'https://ui.bytewe.cn/demo/album/1.jpg',
                'https://ui.bytewe.cn/demo/album/2.jpg',
                'https://ui.bytewe.cn/demo/album/3.jpg',
                'https://ui.bytewe.cn/demo/album/4.jpg',
                'https://ui.bytewe.cn/demo/album/7.jpg',
                'https://ui.bytewe.cn/demo/album/6.jpg',
                'https://ui.bytewe.cn/demo/album/5.jpg',
            ],
        };
    },
    onLoad() {},
    methods: {
        click(name) {
            console.log('click', name);
        },
    },
};
</script>

<style lang="scss" scoped></style>
