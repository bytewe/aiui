<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 11:50:39
 * @Description: 上拉菜单
-->

<template>
    <ai-page>
        <ai-cell-group>
            <ai-cell
                v-for="(item, index) in list"
                :key="index"
                :icon="item.iconUrl"
                :title="item.title"
                :border="index !== list.length - 1"
                arrow
                @click="openSheet(index)"
            />
        </ai-cell-group>

        <ai-action-sheet
            :show="show0"
            :actions="actions0"
            :close-on-click-overlay="false"
            @close="close"
            @select="select"
        />

        <ai-action-sheet :show="show1" :actions="actions1" @close="show1 = false" />

        <ai-action-sheet :show="show2" :actions="actions2" cancel-text="取消" @close="show2 = false" />

        <ai-action-sheet
            :show="show3"
            :actions="actions3"
            description="这是一段描述文本,字号偏小,颜色偏淡"
            @close="show3 = false"
        />

        <ai-action-sheet :show="show4" title="标题位置" :round="10" @close="show4 = false">
            <text style="margin: 20rpx 40rpx 60rpx 40rpx; color: #303133; font-size: 30rpx"
                >这是一段通过slot传入的内容,您可以在此自定义操作面板</text
            >
        </ai-action-sheet>

        <ai-action-sheet
            :show="show5"
            title="微信开放能力"
            :actions="actions5"
            @close="show5 = false"
            @getuserinfo="getuserinfo"
        />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            show0: false,
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            actions0: [
                {
                    name: '选项1',
                },
                {
                    name: '选项2',
                },
                {
                    name: '选项3',
                    subname: '描述文本',
                },
            ],
            actions1: [
                {
                    name: '选项1',
                },
                {
                    loading: true,
                },
                {
                    name: '选项被禁用',
                    disabled: true,
                },
            ],
            actions2: [
                {
                    name: '选项1',
                },
                {
                    name: '选项2',
                },
                {
                    name: '选项3',
                },
            ],
            actions3: [
                {
                    name: '选项1',
                },
                {
                    name: '选项2',
                },
                {
                    name: '选项3',
                },
            ],
            actions5: [
                {
                    name: '获取用户信息',
                    openType: 'getUserInfo',
                    color: uni.$config['color-success'],
                },
            ],
            list: [
                {
                    title: '普通使用',
                    iconUrl: 'https://ui.bytewe.cn/demo/actionSheet/custom.png',
                },
                {
                    title: '设置状态',
                    iconUrl: 'https://ui.bytewe.cn/demo/actionSheet/status.png',
                },
                {
                    title: '显示取消按钮',
                    iconUrl: 'https://ui.bytewe.cn/demo/actionSheet/cancel.png',
                },
                {
                    title: '描述内容',
                    iconUrl: 'https://ui.bytewe.cn/demo/actionSheet/desc.png',
                },
                {
                    title: '显示标题(显示圆角)',
                    iconUrl: 'https://ui.bytewe.cn/demo/actionSheet/title.png',
                },
                {
                    title: '微信开放能力',
                    iconUrl: 'https://ui.bytewe.cn/demo/actionSheet/open.png',
                },
            ],
        };
    },
    methods: {
        // 点击cell，判断显示哪个功能
        openSheet(index) {
            // #ifndef MP
            if (index === 5) return uni.$util.toast('请在微信内预览');
            // #endif
            this[`show${index}`] = true;
        },
        getuserinfo(res) {
            uni.$util.toast(`用户名：${res.userInfo.nickName}`);
        },
        navigateBack() {
            uni.navigateBack();
        },
        close() {
            console.log('close');
            this['show0'] = false;
        },
        select(e) {
            console.log('select', e);
        },
    },
};
</script>

<style lang="scss" scoped></style>
