<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-12 15:32:48
 * @Description: 消息提示
-->

<template>
    <ai-page>
        <ai-cell-group>
            <ai-cell
                v-for="(item, index) in list"
                :key="index"
                :icon="item.iconUrl"
                :title-style="{ fontWeight: 500 }"
                :title="item.title"
                arrow
                :border="index !== list.length - 1"
                @click="openNotify(item.notifyData)"
            />
        </ai-cell-group>

        <ai-notify ref="aiNotify" />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            notifyData: {
                message: 'notify顶部提示',
                type: 'primary',
                color: '#ffffff',
                background: '',
                fontSize: 15,
                duration: 3000,
            },
            list: [
                {
                    notifyData: {
                        message: 'notify顶部提示',
                        type: 'primary',
                        color: '#ffffff',
                        background: '',
                        fontSize: 15,
                        duration: 3000,
                    },
                    title: '主要通知',
                    iconUrl: `${uni.$config.static}notify/main.png`,
                },
                {
                    notifyData: {
                        message: 'notify顶部提示',
                        type: 'success',
                        color: '#ffffff',
                        background: '',
                        fontSize: 15,
                        duration: 3000,
                        safeAreaInsetTop: false,
                    },
                    title: '成功通知',
                    iconUrl: `${uni.$config.static}notify/success.png`,
                },
                {
                    notifyData: {
                        message: 'notify顶部提示',
                        type: 'danger',
                        color: '#ffffff',
                        background: '',
                        fontSize: 14,
                        duration: 3000,
                        safeAreaInsetTop: false,
                    },
                    title: '危险通知',
                    iconUrl: `${uni.$config.static}notify/error.png`,
                },
                {
                    notifyData: {
                        message: 'notify顶部提示',
                        type: 'warning',
                        color: '#ffffff',
                        background: '',
                        fontSize: 15,
                        duration: 3000,
                        safeAreaInsetTop: false,
                    },
                    title: '警告通知',
                    iconUrl: `${uni.$config.static}notify/warning.png`,
                },
                {
                    notifyData: {
                        message: 'notify顶部提示',
                        color: '#fff',
                        background: '#000',
                        fontSize: 15,
                        duration: 3000,
                        safeAreaInsetTop: false,
                    },
                    title: '自定义样式',
                    iconUrl: `${uni.$config.static}notify/customStyle.png`,
                },
                {
                    notifyData: {
                        message: 'notify顶部提示',
                        type: 'primary',
                        color: '#ffffff',
                        background: '',
                        fontSize: 15,
                        duration: 6000,
                        safeAreaInsetTop: false,
                    },
                    title: '自定义时间',
                    iconUrl: `${uni.$config.static}notify/customTime.png`,
                },
                {
                    notifyData: {
                        message: 'notify顶部提示',
                        color: '#fff',
                        background: '',
                        fontSize: 15,
                        duration: 3000,
                        safeAreaInsetTop: true,
                    },
                    title: '插入状态栏高度',
                    iconUrl: `${uni.$config.static}notify/height.png`,
                },
            ],
        };
    },
    onLoad() {},
    methods: {
        openNotify(params) {
            this.$refs.aiNotify.show({
                ...params,
            });
            // 也可以通过主题形式调用，如：
            // this.$refs.aiNotify.primary('Primary主题')
        },
    },
};
</script>

<style lang="scss" scoped></style>
