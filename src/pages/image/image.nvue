<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 22:06:51
 * @Description: 图片
-->

<template>
    <ai-page background="white">
        <ai-box title="基本案例">
            <ai-image :show-loading="true" :src="image" width="80px" height="80px" @click="onClick" />
        </ai-box>
        <ai-box title="自定义形状">
            <ai-image shape="circle" :src="image" width="80px" height="80px" />
        </ai-box>
        <ai-box title="自定义圆角">
            <ai-image radius="4" :src="image" width="80px" height="80px" />
        </ai-box>
        <ai-box title="图片模式(widthFit)">
            <ai-image :src="image" width="80px" height="80px" mode="widthFit" />
        </ai-box>
        <!-- #ifndef APP-NVUE -->
        <ai-box title="自定义图片加载插槽">
            <ai-image :src="customImage" width="80px" height="80px" mode="widthFit">
                <template #loading>
                    <ai-loading-icon color="red" />
                </template>
            </ai-image>
        </ai-box>
        <!-- #endif -->
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            image: 'https://ui.bytewe.cn/demo/album/1.jpg',
            customImage: '',
        };
    },
    onLoad() {
        setTimeout(() => {
            this.customImage = this.image;
        }, 3000);
    },
    methods: {
        onClick() {
            console.log('onClick');
        },
    },
};
</script>

<style lang="scss" scoped></style>
