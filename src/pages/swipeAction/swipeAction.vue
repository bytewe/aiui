<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:45
 * @Description: 滑动单元格
-->

<template>
    <ai-page>
        <ai-cell-group title="演示案例">
            <ai-swipe-action>
                <ai-swipe-action-item v-if="show1" :options="options1" @click="click">
                    <ai-cell title="基础使用" :border="false" />
                </ai-swipe-action-item>
            </ai-swipe-action>
        </ai-cell-group>

        <ai-cell-group title="按钮组">
            <ai-swipe-action>
                <ai-swipe-action-item :options="options2">
                    <ai-cell title="两个按钮并列" :border="false" />
                </ai-swipe-action-item>
            </ai-swipe-action>
        </ai-cell-group>

        <ai-cell-group title="带图标">
            <ai-swipe-action>
                <ai-swipe-action-item :options="options3">
                    <ai-cell title="自定义图标" :border="false" />
                </ai-swipe-action-item>
            </ai-swipe-action>
        </ai-cell-group>

        <ai-cell-group title="组合使用">
            <ai-swipe-action>
                <ai-swipe-action-item
                    v-for="(item, index) in options4"
                    :key="index"
                    :options="item.options"
                    :disabled="item.disabled"
                >
                    <ai-cell :title="item.text" :border="index !== options4.length - 1" />
                </ai-swipe-action-item>
            </ai-swipe-action>
        </ai-cell-group>

        <ai-cell-group title="自定义按钮形状">
            <ai-swipe-action>
                <ai-swipe-action-item :options="options5">
                    <ai-cell title="圆形按钮" :border="false" />
                </ai-swipe-action-item>
            </ai-swipe-action>
        </ai-cell-group>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            show1: true,
            moveX: 0,
            showText: '当前状态：关',
            showStatus: false,
            options1: [
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#f56c6c',
                    },
                },
            ],
            options2: [
                {
                    text: '收藏',
                    style: {
                        backgroundColor: '#3c9cff',
                    },
                },
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#f56c6c',
                    },
                },
            ],
            options3: [
                {
                    text: '收藏',
                    icon: 'star--fill',
                    iconSize: '20',
                    style: {
                        backgroundColor: '#f9ae3d',
                    },
                },
            ],
            options4: [
                {
                    text: '禁用状态',
                    disabled: true,
                    options: [
                        {
                            text: '置顶',
                            style: {
                                backgroundColor: '#3c9cff',
                            },
                        },
                        {
                            text: '取消',
                            style: {
                                backgroundColor: '#f9ae3d',
                            },
                        },
                    ],
                },
                {
                    text: '正常状态',
                    disabled: false,
                    options: [
                        {
                            text: '置顶',
                            style: {
                                backgroundColor: '#3c9cff',
                            },
                        },
                        {
                            text: '取消',
                            style: {
                                backgroundColor: '#f9ae3d',
                            },
                        },
                    ],
                },
                {
                    text: '自动关闭',
                    disabled: false,
                    options: [
                        {
                            text: '置顶',
                            style: {
                                backgroundColor: '#3c9cff',
                            },
                        },
                        {
                            text: '取消',
                            style: {
                                backgroundColor: '#f9ae3d',
                            },
                        },
                    ],
                },
            ],
            options5: [
                {
                    icon: 'delete--fill',
                    style: {
                        backgroundColor: '#f56c6c',
                        width: '80rpx',
                        height: '80rpx',
                        borderRadius: '200rpx',
                        margin: '0 12rpx',
                    },
                },
                {
                    icon: 'like--fill',
                    style: {
                        backgroundColor: '#5ac725',
                        width: '80rpx',
                        height: '80rpx',
                        borderRadius: '200rpx',
                        margin: '0 12rpx',
                    },
                },
            ],
        };
    },
    methods: {
        click(index) {
            console.log('click', index);
            uni.showModal({
                title: '温馨提示',
                content: '确定要删除吗？',
                success: (res) => {
                    if (res.confirm) {
                        this.show1 = false;
                    }
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
