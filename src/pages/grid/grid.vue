<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:28
 * @Description: 宫格
-->

<template>
    <ai-page background="white">
        <ai-box title="基本案例">
            <ai-grid :border="false" align="center" @click="click">
                <ai-grid-item
                    v-for="(baseListItem, baseListIndex) in baseList"
                    :key="baseListIndex"
                    :icon="baseListItem.name"
                    :text="baseListItem.title"
                />
            </ai-grid>
        </ai-box>

        <ai-box title="显示边框">
            <ai-grid :border="true">
                <ai-grid-item
                    v-for="(listItem, listIndex) in list"
                    :key="listIndex"
                    :icon="listItem.name"
                    :text="listItem.title"
                />
            </ai-grid>
        </ai-box>

        <ai-box title="绑定点击事件&自定义列数">
            <ai-grid :border="false" col="4">
                <ai-grid-item
                    v-for="(listItem, listIndex) in list"
                    :key="listIndex"
                    :icon="listItem.name"
                    :text="listItem.title"
                />
            </ai-grid>
        </ai-box>

        <ai-box title="可滑动">
            <swiper :indicator-dots="true" style="height: 500rpx">
                <swiper-item>
                    <ai-grid :border="true">
                        <ai-grid-item
                            v-for="(item, index) in swiperList"
                            :key="index"
                            :index="index"
                            :icon="item"
                            :text="'宫格' + (index + 1)"
                        />
                    </ai-grid>
                </swiper-item>
                <swiper-item>
                    <ai-grid :border="true">
                        <ai-grid-item
                            v-for="(item, index) in swiperList"
                            :key="index"
                            :index="index + 9"
                            :icon="item"
                            :text="'宫格' + (index + 1)"
                        />
                    </ai-grid>
                </swiper-item>
                <swiper-item>
                    <ai-grid :border="true">
                        <ai-grid-item
                            v-for="(item, index) in swiperList"
                            :key="index"
                            :index="index + 18"
                            :icon="item"
                            :text="'宫格' + (index + 1)"
                        />
                    </ai-grid>
                </swiper-item>
            </swiper>
        </ai-box>

        <ai-toast ref="uToast" />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            baseList: [
                {
                    name: 'photo',
                    title: '图片',
                },
                {
                    name: 'lock',
                    title: '锁头',
                },
                {
                    name: 'star',
                    title: '星星',
                },
            ],
            list: [
                {
                    name: 'photo',
                    title: '图片',
                },
                {
                    name: 'lock',
                    title: '锁头',
                },
                {
                    name: 'star',
                    title: '星星',
                },
                {
                    name: 'filter',
                    title: '沙漏',
                },
                {
                    name: 'home',
                    title: '首页',
                },
                {
                    name: 'volume',
                    title: '音量',
                },
            ],
            swiperList: ['gem', 'service', 'coupon', 'gift', 'scan', 'pause-circle', 'cart', 'comment', 'list'],
        };
    },
    methods: {
        click(name) {
            this.$refs.uToast.success(`点击了第${name}个`);
        },
    },
};
</script>

<style lang="scss" scoped></style>
