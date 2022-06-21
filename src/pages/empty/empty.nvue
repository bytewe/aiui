<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:25
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
                    icon: 'https://ui.bytewe.cn/image/empty/cart.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/car.png',
                },
                {
                    type: 'address',
                    title: '地址为空',
                    icon: 'https://ui.bytewe.cn/image/empty/address.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/comment.png',
                },
                {
                    type: 'comment',
                    title: '评论为空',
                    icon: 'https://ui.bytewe.cn/image/empty/comment.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/comment.png',
                },
                {
                    type: 'data',
                    title: '数据为空',
                    icon: 'https://ui.bytewe.cn/image/empty/data.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/data.png',
                },
                {
                    type: 'coupon',
                    title: '没有优惠券',
                    icon: 'https://ui.bytewe.cn/image/empty/coupon.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/coupon.png',
                },
                {
                    type: 'history',
                    title: '无历史记录',
                    icon: 'https://ui.bytewe.cn/image/empty/history.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/history.png',
                },
                {
                    type: 'list',
                    title: '列表为空',
                    icon: 'https://ui.bytewe.cn/image/empty/list.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/list.png',
                },
                {
                    type: 'message',
                    title: '消息列表为空',
                    icon: 'https://ui.bytewe.cn/image/empty/message.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/message.png',
                },
                {
                    type: 'news',
                    title: '无新闻列表',
                    icon: 'https://ui.bytewe.cn/image/empty/news.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/news.png',
                },
                {
                    type: 'order',
                    title: '订单为空',
                    icon: 'https://ui.bytewe.cn/image/empty/order.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/order.png',
                },
                {
                    type: 'page',
                    title: '页面不存在',
                    icon: 'https://ui.bytewe.cn/image/empty/page.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/page.png',
                },
                {
                    type: 'permission',
                    title: '无权限',
                    icon: 'https://ui.bytewe.cn/image/empty/permission.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/permission.png',
                },
                {
                    type: 'search',
                    title: '没有搜索结果',
                    icon: 'https://ui.bytewe.cn/image/empty/search.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/search.png',
                },
                {
                    type: 'wifi',
                    title: '没有WiFi',
                    icon: 'https://ui.bytewe.cn/image/empty/wifi.png',
                    iconUrl: 'https://ui.bytewe.cn/demo/empty/wifi.png',
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
