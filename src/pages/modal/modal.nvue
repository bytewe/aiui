<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:34
 * @Description: 模态框
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
                @click="showModal(index)"
            />
        </ai-cell-group>

        <ai-modal :content="content" title="标题" :show="show1" @confirm="() => (show1 = false)" />

        <ai-modal :content="content" :show="show2" @confirm="() => (show2 = false)" />

        <ai-modal
            :content="content"
            :show="show3"
            show-cancel-button
            close-on-click-overlay
            @confirm="confirm"
            @cancel="cancel"
            @close="close"
        />

        <ai-modal
            :content="content"
            :show="show4"
            show-cancel-button
            async-close
            @confirm="confirm4"
            @cancel="() => (show4 = false)"
        />

        <ai-modal
            :content="content"
            :show="show5"
            show-cancel-button
            button-reverse
            @confirm="() => (show5 = false)"
            @cancel="() => (show5 = false)"
        />

        <ai-modal
            :content="content"
            title="标题"
            :show="show6"
            close-on-click-overlay
            @confirm="() => (show6 = false)"
            @close="() => (show6 = false)"
        />

        <ai-modal title="利剑出鞘,一统江湖" :show="show7" close-on-click-overlay @confirm="() => (show7 = false)">
            <image style="width: 160rpx; height: 160rpx" src="/static/common/logo.png" />
        </ai-modal>

        <ai-modal title="标题" :show="show8" :content="content" close-on-click-overlay show-cancel-button>
            <ai-button slot="footer" text="确定" type="success" shape="circle" @click="show8 = false" />
        </ai-modal>

        <ai-modal :content="content" title="标题" :show="show9" :zoom="false" @confirm="() => (show9 = false)" />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            content: '模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作',
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            show6: false,
            show7: false,
            show8: false,
            show9: false,
            list: [
                {
                    title: '基础使用',
                    iconUrl: `${uni.$config.static}modal/4.png`,
                },
                {
                    title: '无标题',
                    iconUrl: `${uni.$config.static}modal/5.png`,
                },
                {
                    title: '带取消按钮',
                    iconUrl: `${uni.$config.static}modal/2.png`,
                },
                {
                    title: '异步关闭',
                    iconUrl: `${uni.$config.static}modal/6.png`,
                },
                {
                    title: '对调取消和确认按钮',
                    iconUrl: `${uni.$config.static}modal/3.png`,
                },
                {
                    title: '允许点击遮罩关闭',
                    iconUrl: `${uni.$config.static}modal/7.png`,
                },
                {
                    title: '传入slot',
                    iconUrl: `${uni.$config.static}modal/1.png`,
                },
                {
                    title: '自定义按钮',
                    iconUrl: `${uni.$config.static}modal/8.png`,
                },
                {
                    title: '淡入淡出动画',
                    iconUrl: `${uni.$config.static}modal/9.png`,
                },
            ],
        };
    },
    methods: {
        showModal(index) {
            this[`show${index + 1}`] = true;
        },
        navigateBack() {
            uni.navigateBack();
        },
        confirm4() {
            setTimeout(() => {
                this.show4 = false;
            }, 2000);
        },
        confirm() {
            this.show3 = false;
            console.log('confirm');
        },
        cancel() {
            this.show3 = false;
            console.log('cancel');
        },
        close() {
            this.show3 = false;
            console.log('close');
        },
    },
};
</script>

<style lang="scss" scoped></style>
