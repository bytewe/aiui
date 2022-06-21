<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:39
 * @Description: 选择器
-->

<template>
    <ai-page>
        <ai-cell-group>
            <ai-cell
                v-for="(item, key) in list"
                :key="key"
                :icon="item.iconUrl"
                :title="item.title"
                arrow
                :border="key !== list.length - 1"
                @click="showPicker(key)"
            />
        </ai-cell-group>

        <ai-picker :show="show1" :columns="columns1" @change="change" @cancel="cancel" @confirm="confirm" />

        <ai-picker
            :show="show2"
            :columns="columns2"
            :default-index="[1]"
            @cancel="cancel"
            @confirm="confirm"
            @change="change"
        />

        <ai-picker
            ref="uPicker3"
            :show="show3"
            :columns="columns3"
            @cancel="cancel"
            @confirm="confirm"
            @change="changeHandler1"
        />

        <ai-picker
            ref="uPicker4"
            :show="show4"
            :columns="columns4"
            :loading="loading"
            @cancel="cancel"
            @confirm="confirm"
            @change="changeHandler2"
        />

        <ai-picker
            :show="show5"
            :columns="columns5"
            title="标题太长就会显示省略号"
            @cancel="cancel"
            @confirm="confirm"
            @change="change"
        />

        <ai-picker
            :show="show6"
            :columns="columns6"
            close-on-click-overlay
            @cancel="cancel"
            @confirm="confirm"
            @close="close"
            @change="change"
        />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            index: 0,
            loading: false,
            columnData: [
                ['深圳', '厦门', '上海', '拉萨'],
                ['得州', '华盛顿', '纽约', '阿拉斯加'],
            ],
            columns1: [['中国', '美国', '日本']],
            columns2: [['中国', '美国', '日本']],
            columns3: [
                ['中国', '美国'],
                ['深圳', '厦门', '上海', '拉萨'],
            ],
            columns4: [
                ['中国', '美国'],
                ['深圳', '厦门', '上海', '拉萨'],
            ],
            columns5: [['中国', '美国', '日本']],
            columns6: [['中国', '美国', '日本']],
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            show6: false,
            list: [
                {
                    title: '基础使用',
                    iconUrl: 'https://ui.bytewe.cn/demo/picker/2.png',
                },
                {
                    title: '设置默认项',
                    iconUrl: 'https://ui.bytewe.cn/demo/picker/5.png',
                },
                {
                    title: '多列联动',
                    iconUrl: 'https://ui.bytewe.cn/demo/picker/1.png',
                },
                {
                    title: '加载中状态(切换第一列)',
                    iconUrl: 'https://ui.bytewe.cn/demo/picker/3.png',
                },
                {
                    title: '设置标题',
                    iconUrl: 'https://ui.bytewe.cn/demo/picker/4.png',
                },
                {
                    title: '允许点击遮罩关闭',
                    iconUrl: 'https://ui.bytewe.cn/demo/picker/6.png',
                },
            ],
        };
    },
    methods: {
        changeHandler1(e) {
            this.change(e);
            const {
                columnIndex,
                index,
                // 微信小程序无法将picker实例传出来，只能通过ref操作
                picker = this.$refs.uPicker3,
            } = e;
            if (columnIndex === 0) {
                picker.setColumnValues(1, this.columnData[index]);
            }
        },
        changeHandler2(e) {
            this.change(e);
            const {
                columnIndex,
                index,
                // 微信小程序无法将picker实例传出来，只能通过ref操作
                picker = this.$refs.uPicker4,
            } = e;
            if (columnIndex === 0) {
                this.loading = true;
                uni.$util.sleep(1500).then(() => {
                    picker.setColumnValues(1, this.columnData[index]);
                    this.loading = false;
                });
            }
        },
        navigateBack() {
            uni.navigateBack();
        },
        change(e) {
            console.log('change', e);
        },
        showPicker(index) {
            this.index = index + 1;
            this[`show${index + 1}`] = true;
        },
        close() {
            // console.log('close');
            this[`show${this.index}`] = false;
        },
        confirm() {
            // console.log('confirm', e);
            this[`show${this.index}`] = false;
        },
        cancel() {
            // console.log('cancel');
            this[`show${this.index}`] = false;
        },
    },
};
</script>

<style lang="scss" scoped></style>
