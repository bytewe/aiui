<!--
 * @Author: airobot
 * @Date: 2022-02-05 00:07:36
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:29
 * @Description: 通讯录
-->

<template>
    <ai-page>
        <ai-index-list :list="indexList">
            <template v-for="(group, key) in currentList">
                <!-- #ifdef APP-NVUE -->
                <ai-index-anchor :key="key" :index="group.index" :text="group.title" />
                <!-- #endif -->
                <ai-index-item :key="key">
                    <!-- #ifndef APP-NVUE -->
                    <ai-index-anchor :index="group.index" :text="group.title" />
                    <!-- #endif -->
                    <ai-cell-group v-if="group.list && group.list.length">
                        <ai-cell
                            v-for="(item, index) in group.list"
                            :key="index"
                            :icon="item.avatar"
                            icon-size="76rpx"
                            :title="item.name"
                            hover
                            :border="index !== group.list.length - 1 || key === currentList.length - 1"
                        />
                        <ai-cell v-if="key === currentList.length - 1" :border="false">
                            <ai-text :text="`共${listCount}位好友`" align="center" size="small" color="gray" />
                        </ai-cell>
                    </ai-cell-group>
                </ai-index-item>
            </template>
        </ai-index-list>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {
                    index: '↑',
                    title: '',
                    list: [
                        { avatar: `${uni.$config.static}aiui/contact/new.png`, name: '新的朋友' },
                        { avatar: `${uni.$config.static}aiui/contact/only_chat.png`, name: '仅聊天的朋友' },
                        { avatar: `${uni.$config.static}aiui/contact/group.png`, name: '群聊' },
                        { avatar: `${uni.$config.static}aiui/contact/tag.png`, name: '标签' },
                        { avatar: `${uni.$config.static}aiui/contact/offical_account.png`, name: '公众号' },
                    ],
                },
                {
                    index: '☆',
                    title: '我的企业及企业联系人',
                    list: [{ avatar: `${uni.$config.static}aiui/contact/enterprise.png`, name: '测试' }],
                },
                {
                    index: 'A',
                    title: 'A',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'B',
                    title: 'B',
                    list: [{ avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' }],
                },
                {
                    index: 'C',
                    title: 'C',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'D',
                    title: 'D',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'E',
                    title: 'E',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'F',
                    title: 'F',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'G',
                    title: 'G',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'H',
                    title: 'H',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'I',
                    title: 'I',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'J',
                    title: 'J',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'K',
                    title: 'K',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'L',
                    title: 'L',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'M',
                    title: 'M',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'N',
                    title: 'N',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'O',
                    title: 'O',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'P',
                    title: 'P',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'Q',
                    title: 'Q',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'R',
                    title: 'R',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'S',
                    title: 'S',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'T',
                    title: 'T',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'U',
                    title: 'U',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'V',
                    title: 'V',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'W',
                    title: 'W',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'X',
                    title: 'X',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'Y',
                    title: 'Y',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: 'Z',
                    title: 'Z',
                    list: [
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                        { avatar: `${uni.$config.static}aiui/account/avatar.png`, name: '测试' },
                    ],
                },
                {
                    index: '#',
                    title: '#',
                    list: [],
                },
            ],
        };
    },
    computed: {
        currentList() {
            return this.list.filter((item) => item.list && item.list.length);
        },
        listCount() {
            return this.currentList.reduce((ret, item) => ret + (item.list ? item.list.length : 0), 0);
        },
        indexList() {
            return this.currentList.map((item) => item.index);
        },
    },
};
</script>

<style lang="scss" scoped></style>
