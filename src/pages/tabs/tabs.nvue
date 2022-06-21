<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:47
 * @Description: 标签
-->

<template>
    <ai-page>
        <ai-cell-group title="基础演示">
            <ai-tabs :list="list1" :current="3" @click="click" />
        </ai-cell-group>

        <ai-cell-group :border="false" title="粘性布局" />
        <ai-sticky background="#fff">
            <ai-tabs :list="list1" />
        </ai-sticky>

        <ai-cell-group :border="false" title="显示徽标">
            <ai-tabs :list="list2" />
        </ai-cell-group>

        <ai-cell-group :border="false" title="禁止滚动">
            <ai-tabs :list="list6" :scrollable="false" />
        </ai-cell-group>

        <ai-cell-group :border="false" title="禁用菜单">
            <ai-tabs :list="list3" />
        </ai-cell-group>

        <ai-cell-group :border="false" title="自定义样式">
            <ai-tabs
                :list="list4"
                line-width="30"
                line-color="#f56c6c"
                :active-style="{
                    color: '#303133',
                    fontWeight: 'bold',
                    transform: 'scale(1.05)',
                }"
                :inactive-style="{
                    color: '#606266',
                    transform: 'scale(1)',
                }"
                item-style="padding-left: 30rpx; padding-right: 30rpx; height: 68rpx;"
            />
        </ai-cell-group>

        <ai-cell-group :border="false" title="右侧自定义插槽">
            <ai-tabs :list="list1">
                <view slot="right" style="padding-left: 8rpx" @click="showToast">
                    <ai-icon name="list" size="21" bold />
                </view>
            </ai-tabs>
        </ai-cell-group>

        <ai-gap size="3000rpx" />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            list1: [
                {
                    name: '关注',
                },
                {
                    name: '推荐',
                },
                {
                    name: '电影',
                },
                {
                    name: '科技',
                },
                {
                    name: '音乐',
                },
                {
                    name: '美食',
                },
                {
                    name: '文化',
                },
                {
                    name: '财经',
                },
                {
                    name: '手工',
                },
            ],
            list2: [
                {
                    name: '关注',
                },
                {
                    name: '推荐',
                    badge: {
                        isDot: true,
                    },
                },
                {
                    name: '电影',
                    badge: {
                        value: 5,
                    },
                },
                {
                    name: '科技',
                },
                {
                    name: '音乐',
                },
                {
                    name: '美食',
                },
                {
                    name: '文化',
                },
                {
                    name: '财经',
                },
                {
                    name: '手工',
                },
            ],
            list3: [
                {
                    name: '关注',
                },
                {
                    name: '推荐',
                },
                {
                    name: '电影',
                    disabled: true,
                },
                {
                    name: '科技',
                },
                {
                    name: '音乐',
                },
                {
                    name: '美食',
                },
                {
                    name: '文化',
                },
                {
                    name: '财经',
                },
                {
                    name: '手工',
                },
            ],
            list4: [
                {
                    name: '关注',
                },
                {
                    name: '推荐',
                    badge: {
                        isDot: true,
                    },
                },
                {
                    name: '电影',
                },
                {
                    name: '科技',
                },
                {
                    name: '音乐',
                },
                {
                    name: '美食',
                },
                {
                    name: '文化',
                },
                {
                    name: '财经',
                },
                {
                    name: '手工',
                },
            ],
            list6: [
                {
                    name: '关注',
                },
                {
                    name: '推荐',
                },
                {
                    name: '电影',
                },
                {
                    name: '科技',
                },
            ],
        };
    },
    onLoad() {},
    methods: {
        click(item) {
            console.log('item', item);
        },
        showToast() {
            uni.$util.toast('插槽被点击');
        },
    },
};
</script>

<style lang="scss" scoped></style>
