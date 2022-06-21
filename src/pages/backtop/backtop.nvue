<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:29:51
 * @Description: 返回顶部
-->

<template>
    <ai-page background="white">
        <ai-box title="自定义backTop(滚动页面即可在右下角看到图标)">
            <ai-checkbox-group v-model="value" direction="column" shape="square" @change="checkboxChange">
                <ai-checkbox
                    v-for="(item, index) in checkboxList"
                    :key="index"
                    :custom-style="{ marginBottom: '16rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-checkbox-group>
        </ai-box>

        <ai-gap size="3000rpx" />

        <ai-back-top
            :right="backTopData.right"
            :custom-style="backTopData.customStyle"
            :bottom="backTopData.bottom"
            :icon="backTopData.icon"
            :mode="backTopData.mode"
            :icon-style="backTopData.iconStyle"
            :duration="backTopData.duration"
            :scroll-top="scrollTop"
            @click="click"
        />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            value: ['自定义图标'],
            backTopData: {
                mode: 'circle',
                icon: '',
                bottom: 100,
                customStyle: {},
                iconStyle: {},
                right: 20,
                duration: 300,
            },
            scrollTop: 0,
            checkboxList: [
                {
                    name: '显示方形',
                },
                {
                    name: '自定义图标',
                },
                {
                    name: '自定义距离',
                },
                {
                    name: '自定义样式',
                },
                {
                    name: '自定义返回顶部滚动时间',
                },
            ],
        };
    },
    onLoad() {
        // 演示中默认勾选了自定义图标
        this.backTopData.icon = 'arrow-up';
    },
    onPageScroll(e) {
        this.scrollTop = e.scrollTop;
    },
    methods: {
        checkboxChange(n) {
            if (n.includes('显示方形')) {
                this.backTopData.mode = 'square';
            } else {
                this.backTopData.mode = 'circle';
            }
            if (n.includes('自定义图标')) {
                this.backTopData.icon = 'arrow-up';
            } else {
                this.backTopData.icon = 'backtop';
            }
            if (n.includes('自定义距离')) {
                this.backTopData.bottom = 300;
                this.backTopData.right = 20;
            } else {
                this.backTopData.bottom = 100;
            }
            if (n.includes('自定义样式')) {
                this.backTopData.customStyle = {
                    backgroundColor: '#2979ff',
                };
                this.backTopData.iconStyle = {
                    color: '#ffffff',
                };
            } else {
                this.backTopData.customStyle = {};
                this.backTopData.iconStyle = {};
            }
            if (n.includes('自定义返回顶部滚动时间')) {
                this.backTopData.duration = 1500;
            } else {
                this.backTopData.duration = 300;
            }
        },
        click() {
            console.log('click');
        },
    },
};
</script>

<style lang="scss" scoped></style>
