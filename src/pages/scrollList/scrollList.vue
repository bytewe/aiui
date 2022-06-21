<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:42
 * @Description: 横向滚动列表
-->

<template>
    <ai-page background="white">
        <ai-box title="基础使用">
            <ai-scroll-list indicator-color="#fff0f0" indicator-active-color="#f56c6c" @right="right" @left="left">
                <view class="scroll-list" style="flex-direction: row">
                    <view
                        v-for="(item, index) in goodsArr"
                        :key="index"
                        class="scroll-list__goods-item"
                        :class="[index === 9 && 'scroll-list__goods-item--no-margin-right']"
                    >
                        <image class="scroll-list__goods-item__image" :src="item.thumbnail" mode="" />
                        <text class="scroll-list__goods-item__text">￥{{ item.price }}</text>
                    </view>
                    <view class="scroll-list__show-more" @tap="showMore">
                        <text class="scroll-list__show-more__text">查看更多</text>
                        <ai-icon name="direction-left" color="#f56c6c" size="12" />
                    </view>
                </view>
            </ai-scroll-list>
        </ai-box>

        <ai-box title="多菜单扩展">
            <ai-scroll-list>
                <view class="scroll-list">
                    <view v-for="(item, index) in menuArr" :key="index" class="scroll-list__line">
                        <view
                            v-for="(item1, index1) in item"
                            :key="index1"
                            class="scroll-list__line__item"
                            :class="[index1 === item.length - 1 && 'scroll-list__line__item--no-margin-right']"
                        >
                            <image class="scroll-list__line__item__image" :src="item1.icon" mode="" />
                            <text class="scroll-list__line__item__text">{{ item1.name }}</text>
                        </view>
                    </view>
                </view>
            </ai-scroll-list>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            goodsArr: [
                {
                    price: '230.5',
                    thumbnail: 'https://ui.bytewe.cn/demo/goods/1.jpg',
                },
                {
                    price: '74.1',
                    thumbnail: 'https://ui.bytewe.cn/demo/goods/2.jpg',
                },
                {
                    price: '8457',
                    thumbnail: 'https://ui.bytewe.cn/demo/goods/6.jpg',
                },
                {
                    price: '1442',
                    thumbnail: 'https://ui.bytewe.cn/demo/goods/5.jpg',
                },
                {
                    price: '541',
                    thumbnail: 'https://ui.bytewe.cn/demo/goods/2.jpg',
                },
                {
                    price: '234',
                    thumbnail: 'https://ui.bytewe.cn/demo/goods/3.jpg',
                },
                {
                    price: '562',
                    thumbnail: 'https://ui.bytewe.cn/demo/goods/4.jpg',
                },
                {
                    price: '251.5',
                    thumbnail: 'https://ui.bytewe.cn/demo/goods/1.jpg',
                },
            ],
            menuArr: [
                [
                    {
                        name: '天猫新品',
                        icon: 'https://ui.bytewe.cn/demo/menu/11.png',
                    },
                    {
                        name: '今日爆款',
                        icon: 'https://ui.bytewe.cn/demo/menu/9.png',
                    },
                    {
                        name: '天猫国际',
                        icon: 'https://ui.bytewe.cn/demo/menu/17.png',
                    },
                    {
                        name: '饿了么',
                        icon: 'https://ui.bytewe.cn/demo/menu/6.png',
                    },
                    {
                        name: '天猫超市',
                        icon: 'https://ui.bytewe.cn/demo/menu/11.png',
                    },
                    {
                        name: '分类',
                        icon: 'https://ui.bytewe.cn/demo/menu/2.png',
                    },
                    {
                        name: '天猫美食',
                        icon: 'https://ui.bytewe.cn/demo/menu/3.png',
                    },
                    {
                        name: '阿里健康',
                        icon: 'https://ui.bytewe.cn/demo/menu/12.png',
                    },
                    {
                        name: '口碑生活',
                        icon: 'https://ui.bytewe.cn/demo/menu/7.png',
                    },
                ],
                [
                    {
                        name: '充值中心',
                        icon: 'https://ui.bytewe.cn/demo/menu/8.png',
                    },
                    {
                        name: '机票酒店',
                        icon: 'https://ui.bytewe.cn/demo/menu/10.png',
                    },
                    {
                        name: '金币庄园',
                        icon: 'https://ui.bytewe.cn/demo/menu/18.png',
                    },
                    {
                        name: '阿里拍卖',
                        icon: 'https://ui.bytewe.cn/demo/menu/15.png',
                    },
                    {
                        name: '淘宝吃货',
                        icon: 'https://ui.bytewe.cn/demo/menu/16.png',
                    },
                    {
                        name: '闲鱼',
                        icon: 'https://ui.bytewe.cn/demo/menu/4.png',
                    },
                    {
                        name: '会员中心',
                        icon: 'https://ui.bytewe.cn/demo/menu/6.png',
                    },
                    {
                        name: '造点新货',
                        icon: 'https://ui.bytewe.cn/demo/menu/13.png',
                    },
                    {
                        name: '土货鲜食',
                        icon: 'https://ui.bytewe.cn/demo/menu/14.png',
                    },
                ],
            ],
        };
    },
    methods: {
        showMore() {
            uni.$util.toast('查看更多');
        },
        left() {
            console.log('left');
        },
        right() {
            console.log('right');
        },
    },
};
</script>

<style lang="scss" scoped>
.scroll-list {
    flex-direction: column;

    &__goods-item {
        margin-right: 40rpx;

        &__image {
            width: 120rpx;
            height: 120rpx;
            border-radius: 8rpx;
        }

        &__text {
            color: #f56c6c;
            text-align: center;
            font-size: 24rpx;
            margin-top: 10rpx;
        }
    }

    &__show-more {
        background-color: #fff0f0;
        border-radius: 6rpx;
        padding: 6rpx 12rpx;
        flex-direction: column;
        align-items: center;

        &__text {
            font-size: 24rpx;
            width: 24rpx;
            color: #f56c6c;
            line-height: 32rpx;
        }
    }

    &__line {
        display: flex;
        flex-direction: row;
        margin-top: 20rpx;

        &__item {
            margin-right: 30rpx;

            &__image {
                width: 122rpx;
                height: 96rpx;
            }

            &__text {
                margin-top: 10rpx;
                color: $color-dark;
                font-size: 24rpx;
                text-align: center;
            }

            &--no-margin-right {
                margin-right: 0;
            }
        }
    }
}
</style>
