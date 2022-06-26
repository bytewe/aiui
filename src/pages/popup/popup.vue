<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:40
 * @Description: 弹窗
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
                @click="openPopup(item.popupData)"
            />
        </ai-cell-group>

        <ai-popup
            :safe-area-inset-bottom="true"
            :safe-area-inset-top="true"
            :mode="popupData.mode"
            :show="show"
            :round="popupData.round"
            :overlay="popupData.overlay"
            :border-radius="popupData.borderRadius"
            :closeable="popupData.closeable"
            :close-on-click-overlay="popupData.closeOnClickOverlay"
            @close="close"
            @open="open"
        >
            <view
                class="popup"
                :style="{
                    width: ['bottom', 'top'].includes(popupData.mode) ? '750rpx' : '400rpx',
                    marginTop: ['left', 'right'].includes(popupData.mode) ? '480rpx' : '0',
                }"
            >
                <ai-button type="success" text="点我关闭" custom-style="width: 200rpx" @click="show = !show" />
            </view>
        </ai-popup>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            popupData: {
                overlay: true,
                mode: 'bottom',
                borderRadius: '',
                closeable: true,
                closeOnClickOverlay: true,
            },
            list: [
                {
                    popupData: {
                        overlay: true,
                        mode: 'top',
                        closeOnClickOverlay: true,
                    },
                    title: '顶部弹出',
                    iconUrl: `${uni.$config.static}popup/modeTop.png`,
                },
                {
                    popupData: {
                        overlay: true,
                        mode: 'right',
                        closeOnClickOverlay: true,
                    },
                    title: '右侧弹出',
                    iconUrl: `${uni.$config.static}popup/modeRight.png`,
                },
                {
                    popupData: {
                        overlay: true,
                        mode: 'bottom',
                        closeOnClickOverlay: true,
                    },
                    title: '底部弹出',
                    iconUrl: `${uni.$config.static}popup/modeBottom.png`,
                },
                {
                    popupData: {
                        overlay: true,
                        mode: 'left',
                        closeOnClickOverlay: true,
                    },
                    title: '左侧弹出',
                    iconUrl: `${uni.$config.static}popup/modeLeft.png`,
                },
                {
                    popupData: {
                        overlay: true,
                        mode: 'center',
                        round: 10,
                        closeOnClickOverlay: true,
                    },
                    title: '居中弹出',
                    iconUrl: `${uni.$config.static}popup/modeCenter.png`,
                },
                {
                    popupData: {
                        overlay: true,
                        mode: 'bottom',
                        round: 10,
                        closeOnClickOverlay: true,
                    },
                    title: '显示圆角',
                    iconUrl: `${uni.$config.static}popup/showRadis.png`,
                },
                {
                    popupData: {
                        overlay: true,
                        mode: 'bottom',
                        closeable: false,
                        closeOnClickOverlay: false,
                    },
                    title: '禁止点击遮罩关闭',
                    iconUrl: `${uni.$config.static}popup/noClose.png`,
                },
                {
                    popupData: {
                        overlay: true,
                        mode: 'bottom',
                        closeable: true,
                        closeOnClickOverlay: true,
                    },
                    title: '显示关闭按钮',
                    iconUrl: `${uni.$config.static}popup/showCloseBtn.png`,
                },
            ],
        };
    },
    methods: {
        openPopup(popupData) {
            this.popupData = popupData;
            uni.$util.sleep().then(() => {
                this.show = !this.show;
            });
        },
        navigateBack() {
            uni.navigateBack();
        },
        open() {
            // console.log('open');
        },
        close() {
            this.show = false;
            // console.log('close');
        },
    },
};
</script>

<style lang="scss" scoped>
.popup {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 400rpx;
    height: 300rpx;
}
</style>
