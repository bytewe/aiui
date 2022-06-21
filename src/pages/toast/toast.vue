<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-12 23:48:26
 * @Description: 提示消息
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
                @click="showToast(item)"
            />
        </ai-cell-group>

        <ai-toast ref="aiToast" />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            list: [
                {
                    type: 'default',
                    title: '默认主题',
                    message: '锦瑟无端五十弦',
                    iconUrl: 'https://ui.bytewe.cn/demo/toast/default.png',
                },
                {
                    type: 'danger',
                    icon: false,
                    title: '失败主题',
                    message: '一弦一柱思华年',
                    iconUrl: 'https://ui.bytewe.cn/demo/toast/error.png',
                },
                {
                    type: 'success',
                    title: '成功主题(带图标)',
                    message: '庄生晓梦迷蝴蝶',
                    iconUrl: 'https://ui.bytewe.cn/demo/toast/success.png',
                },
                {
                    type: 'warning',
                    position: 'top',
                    title: '位置偏移上方',
                    message: '望帝春心托杜鹃',
                    iconUrl: 'https://ui.bytewe.cn/demo/toast/top.png',
                },
                {
                    type: 'loading',
                    title: '正在加载',
                    message: '正在加载',
                    iconUrl: 'https://ui.bytewe.cn/demo/toast/loading.png',
                },
                {
                    type: 'default',
                    title: '结束后跳转标签页',
                    message: '此情可待成追忆',
                    url: '/pages/tag/tag',
                    iconUrl: 'https://ui.bytewe.cn/demo/toast/jump.png',
                },
            ],
        };
    },
    computed: {
        getIcon() {
            return (path) => {
                return 'https://ui.bytewe.cn/demo/example/' + path + '.png';
            };
        },
    },
    methods: {
        showToast(params) {
            this.$refs.aiToast.show({
                ...params,
                complete() {
                    params.url &&
                        uni.navigateTo({
                            url: params.url,
                        });
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
