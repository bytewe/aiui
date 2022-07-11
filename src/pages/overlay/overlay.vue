<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-11 22:54:43
 * @Description: 遮罩层
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
                @click="openMask(index)"
            />
        </ai-cell-group>

        <ai-overlay :show="show" @click="show = !show" />

        <ai-overlay :show="showSlot" @click="showSlot = !showSlot">
            <ai-row justify="center">
                <ai-card background="primary" size="none" custom-style="width: 100px; height: 100px;" />
            </ai-row>
        </ai-overlay>

        <ai-overlay opacity=".85" :show="showOpcatiy" @click="showOpcatiy = !showOpcatiy" />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            showSlot: false,
            showOpcatiy: false,
            list: [
                {
                    title: '基本案列',
                    iconUrl: `${uni.$config.static}overlay/baseCases.png`,
                },
                {
                    title: '嵌入内容',
                    iconUrl: `${uni.$config.static}overlay/embeddedContent.png`,
                },
                {
                    title: '设置透明度',
                    iconUrl: `${uni.$config.static}overlay/setTransparency.png`,
                },
            ],
        };
    },
    methods: {
        openMask(indexNum) {
            if (indexNum == 0) {
                this.show = !this.show;
            } else if (indexNum == 1) {
                this.showSlot = !this.showSlot;
            } else if (indexNum == 2) {
                this.showOpcatiy = !this.showOpcatiy;
            }
        },
        navigateBack() {
            uni.navigateBack();
        },
    },
};
</script>

<style lang="scss" scoped></style>
