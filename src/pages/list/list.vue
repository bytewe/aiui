<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:38:47
 * @Description: 列表
-->

<template>
    <ai-page background="white">
        <ai-list @scrolltolower="scrolltolower">
            <ai-list-item v-for="(item, index) in indexList" :key="index">
                <ai-cell :title="`列表长度-${index + 1}`">
                    <ai-avatar slot="icon" shape="square" size="70rpx" :src="item.url" />
                </ai-cell>
            </ai-list-item>
        </ai-list>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            indexList: [],
            urls: [
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
        };
    },
    onLoad() {
        this.loadmore();
    },
    methods: {
        scrolltolower() {
            this.loadmore();
        },
        loadmore() {
            for (let i = 0; i < 30; i++) {
                this.indexList.push({
                    url: this.urls[uni.$util.random(0, this.urls.length - 1)],
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
