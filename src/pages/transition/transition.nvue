<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:51:36
 * @Description: 过渡动画
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
                @click="openTransition(item.mode)"
            />
        </ai-cell-group>

        <ai-transition
            :mode="mode"
            :show="show"
            :custom-style="style"
            @click="click"
            @beforeEnter="beforeEnter"
            @enter="enter"
            @afterEnter="afterEnter"
            @beforeLeave="beforeLeave"
            @leave="leave"
            @afterLeave="afterLeave"
        />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            mode: '',
            show: false,
            style: {
                position: 'fixed',
                top: `${uni.$util.sys().windowHeight / 2 - 50}px`,
                left: `${uni.$util.sys().windowWidth / 2 - 50}px`,
                width: '240rpx',
                height: '240rpx',
                background: uni.$config['background-primary'],
            },
            list: [
                {
                    mode: 'fade',
                    title: '淡入',
                    iconUrl: 'https://ui.bytewe.cn/demo/transition/fade.png',
                },
                {
                    mode: 'fade-up',
                    title: '上滑淡入',
                    iconUrl: 'https://ui.bytewe.cn/demo/transition/fadeUp.png',
                },
                {
                    mode: 'zoom',
                    title: '缩放',
                    iconUrl: 'https://ui.bytewe.cn/demo/transition/zoom.png',
                },
                {
                    mode: 'fade-zoom',
                    title: '缩放淡入',
                    iconUrl: 'https://ui.bytewe.cn/demo/transition/fadeZoom.png',
                },
                {
                    mode: 'fade-down',
                    title: '下滑淡入',
                    iconUrl: 'https://ui.bytewe.cn/demo/transition/fadeDown.png',
                },
                {
                    mode: 'fade-left',
                    title: '左滑淡入',
                    iconUrl: 'https://ui.bytewe.cn/demo/transition/fadeLeft.png',
                },
                {
                    mode: 'fade-right',
                    title: '右滑淡入',
                    iconUrl: 'https://ui.bytewe.cn/demo/transition/fadeRight.png',
                },
                {
                    mode: 'slide-up',
                    title: '上滑进入',
                    iconUrl: 'https://ui.bytewe.cn/demo/transition/slideUp.png',
                },
                {
                    mode: 'slide-down',
                    title: '下滑进入',
                    iconUrl: 'https://ui.bytewe.cn/demo/transition/slideDown.png',
                },
                {
                    mode: 'slide-left',
                    title: '左滑进入',
                    iconUrl: 'https://ui.bytewe.cn/demo/transition/slideLeft.png',
                },
                {
                    mode: 'slide-right',
                    title: '右滑进入',
                    iconUrl: 'https://ui.bytewe.cn/demo/transition/slideRight.png',
                },
            ],
        };
    },
    methods: {
        openTransition(mode) {
            this.mode = mode;
            this.show = true;
            setTimeout(() => {
                this.show = false;
            }, 1500);
        },
        click() {
            // console.log("click");
        },
        beforeEnter() {
            // console.log("beforeEnter");
        },
        enter() {
            // console.log("enter");
        },
        afterEnter() {
            // console.log("afterEnter");
        },
        beforeLeave() {
            // console.log("beforeLeave");
        },
        leave() {
            // console.log("leave");
        },
        afterLeave() {
            // console.log("afterLeave");
        },
    },
};
</script>

<style lang="scss" scoped></style>
