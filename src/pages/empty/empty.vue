<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-26 18:24:39
 * @Description: 内容为空
-->

<template>
    <ai-page background="white">
        <ai-empty :icon="list[current].icon" :title="list[current].title">
            <ai-button v-if="list[current].type == 'cart'" size="small" type="primary" text="查看更多商品" />
        </ai-empty>
        <ai-cell-group>
            <ai-cell
                v-for="(item, index) in list"
                :key="index"
                :icon="item.iconUrl"
                :title="item.title"
                arrow
                :border="index !== list.length - 1"
                @click="openImg(index)"
            />
        </ai-cell-group>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            current: 0,
            list: [
                {
                    type: 'cart',
                    title: '购物车为空(同时传入slot)',
                    icon: `${uni.$config.static}aiui/empty/cart.png`,
                    iconUrl: `${uni.$config.static}empty/car.png`,
                },
                {
                    type: 'address',
                    title: '地址为空',
                    icon: `${uni.$config.static}aiui/empty/address.png`,
                    iconUrl: `${uni.$config.static}empty/comment.png`,
                },
                {
                    type: 'comment',
                    title: '评论为空',
                    icon: `${uni.$config.static}aiui/empty/comment.png`,
                    iconUrl: `${uni.$config.static}empty/comment.png`,
                },
                {
                    type: 'data',
                    title: '数据为空',
                    icon: `${uni.$config.static}aiui/empty/data.png`,
                    iconUrl: `${uni.$config.static}empty/data.png`,
                },
                {
                    type: 'coupon',
                    title: '没有优惠券',
                    icon: `${uni.$config.static}aiui/empty/coupon.png`,
                    iconUrl: `${uni.$config.static}empty/coupon.png`,
                },
                {
                    type: 'history',
                    title: '无历史记录',
                    icon: `${uni.$config.static}aiui/empty/history.png`,
                    iconUrl: `${uni.$config.static}empty/history.png`,
                },
                {
                    type: 'list',
                    title: '列表为空',
                    icon: `${uni.$config.static}aiui/empty/list.png`,
                    iconUrl: `${uni.$config.static}empty/list.png`,
                },
                {
                    type: 'message',
                    title: '消息列表为空',
                    icon: `${uni.$config.static}aiui/empty/message.png`,
                    iconUrl: `${uni.$config.static}empty/message.png`,
                },
                {
                    type: 'news',
                    title: '无新闻列表',
                    icon: `${uni.$config.static}aiui/empty/news.png`,
                    iconUrl: `${uni.$config.static}empty/news.png`,
                },
                {
                    type: 'order',
                    title: '订单为空',
                    icon: `${uni.$config.static}aiui/empty/order.png`,
                    iconUrl: `${uni.$config.static}empty/order.png`,
                },
                {
                    type: 'page',
                    title: '页面不存在',
                    icon: `${uni.$config.static}aiui/empty/page.png`,
                    iconUrl: `${uni.$config.static}empty/page.png`,
                },
                {
                    type: 'permission',
                    title: '无权限',
                    icon: `${uni.$config.static}aiui/empty/permission.png`,
                    iconUrl: `${uni.$config.static}empty/permission.png`,
                },
                {
                    type: 'search',
                    title: '没有搜索结果',
                    icon: `${uni.$config.static}aiui/empty/search.png`,
                    iconUrl: `${uni.$config.static}empty/search.png`,
                },
                {
                    type: 'wifi',
                    title: '没有WiFi',
                    icon: `${uni.$config.static}aiui/empty/wifi.png`,
                    iconUrl: `${uni.$config.static}empty/wifi.png`,
                },
            ],
        };
    },
    methods: {
        // 点击改变图片
        openImg(index) {
            this.current = index;
        },
    },
};
</script>

<style lang="scss" scoped></style>
