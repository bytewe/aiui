<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-11 21:45:51
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
                @click="openLoadingPage(index)"
            />
        </ai-cell-group>

        <ai-loading-page
            :loading-text="loadingPageData.loadingText"
            :image="loadingPageData.image"
            :loading-mode="loadingPageData.loadingMode"
            :background="loadingPageData.background"
            :loading="loading"
            :color="loadingPageData.color"
            :loading-color="loadingPageData.loadingColor"
        />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            loadingPageData: {
                // 自定义提示内容
                loadingText: '',
                // 自定义图片
                image: '',
                // 自定义加载动画模式
                loadingMode: '',
                // 自定义背景色
                background: '#ffffff',
            },
            list: [
                {
                    title: '自定义提示内容',
                    iconUrl: `${uni.$config.static}loading-page/promptContent.png`,
                },
                {
                    title: '自定义图片',
                    iconUrl: `${uni.$config.static}loading-page/customPicture.png`,
                },
                {
                    title: '自定义加载动画模式',
                    iconUrl: `${uni.$config.static}loading-page/customMode.png`,
                },
                {
                    title: '自定义背景色',
                    iconUrl: `${uni.$config.static}loading-page/customBgColor.png`,
                },
            ],
        };
    },
    methods: {
        navigateBack() {
            uni.navigateBack();
        },
        openLoadingPage(indexNum) {
            this.loadingPageData = {
                loadingText: '',
                image: '',
                loadingMode: '',
                background: '#ffffff',
            };
            if (indexNum == 0) {
                //自定义提示内容
                this.loadingPageData.loadingMode = 'semicircle';
                this.loadingPageData.loadingText = 'Hello uView';
                (this.loadingPageData.color = '#C8C8C8'), (this.loadingPageData.loadingColor = '#C8C8C8');
            } else if (indexNum == 1) {
                // 自定义图片
                this.loadingPageData.image = '/static/common/logo.png';
                this.loadingPageData.loadingText = 'AIUI';
                (this.loadingPageData.color = '#C8C8C8'), (this.loadingPageData.loadingColor = '#C8C8C8');
            } else if (indexNum == 2) {
                // 自定义加载动画模式
                this.loadingPageData.loadingMode = 'circle';
                this.loadingPageData.loadingText = 'AIUI';
                (this.loadingPageData.color = '#C8C8C8'), (this.loadingPageData.loadingColor = '#C8C8C8');
            } else if (indexNum == 3) {
                // 自定义背景色
                this.loadingPageData.loadingMode = 'spinner';
                this.loadingPageData.background = 'rgba(0, 0, 0, 0.3)';
                this.loadingPageData.loadingText = 'AIUI';
                (this.loadingPageData.color = '#eee'), (this.loadingPageData.loadingColor = '#ddd');
            }
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
    },
};
</script>

<style lang="scss" scoped></style>
