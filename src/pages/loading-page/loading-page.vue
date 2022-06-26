<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-26 21:08:14
 * @Description: 加载页
-->

<template>
    <ai-page>
        <ai-cell-group>
            <ai-cell
                v-for="(item, index) in list"
                :key="index"
                :icon="item.iconUrl"
                :title="item.title"
                arrow
                :border="index !== list.length - 1"
                @click="openLoadingPage(item)"
            />
        </ai-cell-group>

        <ai-loading-page
            :loading-text="loadingPage.loadingText"
            :image="loadingPage.image"
            :loading-mode="loadingPage.loadingMode"
            :background="loadingPage.background"
            :loading="loading"
            :color="loadingPage.color"
            :loading-color="loadingPage.loadingColor"
        />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            loadingPage: {},
            list: [
                {
                    title: '自定义提示内容',
                    iconUrl: `${uni.$config.static}loading-page/promptContent.png`,
                    loadingMode: 'semicircle',
                    loadingText: 'AIUI',
                },
                {
                    title: '自定义图片',
                    iconUrl: `${uni.$config.static}loading-page/customPicture.png`,
                    loadingText: 'AIUI',
                    image: `${uni.$config.static}common/logo.png`,
                },
                {
                    title: '自定义加载动画模式',
                    iconUrl: `${uni.$config.static}loading-page/customMode.png`,
                    loadingMode: 'circle',
                    loadingText: 'AIUI',
                },
                {
                    title: '自定义颜色',
                    iconUrl: `${uni.$config.static}loading-page/customBgColor.png`,
                    loadingMode: 'spinner',
                    loadingText: 'AIUI',
                    loadingColor: '#ddd',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#eee',
                },
            ],
        };
    },
    methods: {
        navigateBack() {
            uni.navigateBack();
        },
        openLoadingPage(item) {
            this.loadingPage = {
                loadingMode: item.loadingMode || '',
                loadingText: item.loadingText || '',
                loadingColor: item.loadingColor || '',
                background: item.background || '#fff',
                color: item.color || '',
                image: item.image || '',
            };
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
    },
};
</script>

<style lang="scss" scoped></style>
