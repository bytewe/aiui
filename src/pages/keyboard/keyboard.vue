<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-11 21:47:44
 * @Description: 键盘
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
                @click="openKeyboard(index)"
            />
        </ai-cell-group>

        <ai-keyboard
            :mode="keyData.mode"
            :dot-disabled="keyData.dotDisabled"
            :random="keyData.random"
            :show="show"
            @close="close"
            @cancel="cancel"
            @confirm="confirm"
            @change="change"
            @backspace="backspace"
        />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            input: '',
            keyData: {
                mode: '',
                dotDisabled: false,
                random: false,
            },
            list: [
                {
                    title: '车牌号键盘',
                    iconUrl: 'https://ui.bytewe.cn/demo/keyboard/car.png',
                },
                {
                    title: '数字键盘',
                    iconUrl: 'https://ui.bytewe.cn/demo/keyboard/number.png',
                },
                {
                    title: '身份证键盘',
                    iconUrl: 'https://ui.bytewe.cn/demo/keyboard/IdCard.png',
                },
                {
                    title: '隐藏键盘"."符号',
                    iconUrl: 'https://ui.bytewe.cn/demo/keyboard/dot.png',
                },
                {
                    title: '打乱键盘按键的顺序',
                    iconUrl: 'https://ui.bytewe.cn/demo/keyboard/order.png',
                },
            ],
            show: false,
        };
    },
    methods: {
        navigateBack() {
            uni.navigateBack();
        },
        // 点击展示不同的键盘
        openKeyboard(indexNum) {
            this.keyData = {
                mode: '',
                dotDisabled: false,
                random: false,
            };
            if (indexNum == 0) {
                this.keyData.mode = '';
            } else if (indexNum == 1) {
                this.keyData.mode = 'number';
            } else if (indexNum == 2) {
                this.keyData.mode = 'card';
            } else if (indexNum == 3) {
                this.keyData.mode = 'number';
                this.keyData.dotDisabled = true;
            } else if (indexNum == 4) {
                this.keyData.mode = 'number';
                this.keyData.random = true;
            }
            this.input = '';
            this.show = true;
        },
        change(e) {
            // console.log('change');
            this.input += e;
        },
        close() {
            // console.log('close');
            this.show = false;
        },
        cancel() {
            // console.log('cancel');
            this.show = false;
        },
        confirm() {
            // console.log('confirm');
            this.show = false;
        },
        backspace() {
            this.input = this.input.slice(0, -1);
        },
    },
};
</script>

<style lang="scss" scoped></style>
