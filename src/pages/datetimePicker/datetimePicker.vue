<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-11 22:18:26
 * @Description: 时间选择
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
                @click="showDatetimePicker(index)"
            />
        </ai-cell-group>

        <ai-datetime-picker
            v-model="value1"
            :show="show1"
            mode="datetime"
            close-on-click-overlay
            @confirm="confirm"
            @cancel="cancel"
            @change="change"
            @close="close"
        />

        <ai-datetime-picker
            v-model="value2"
            :show="show2"
            mode="date"
            close-on-click-overlay
            @confirm="confirm"
            @cancel="cancel"
            @change="change"
            @close="close"
        />

        <ai-datetime-picker
            v-model="value3"
            :show="show3"
            mode="year-month"
            close-on-click-overlay
            @confirm="confirm"
            @cancel="cancel"
            @change="change"
            @close="close"
        />

        <ai-datetime-picker
            v-model="value4"
            :show="show4"
            mode="time"
            close-on-click-overlay
            @confirm="confirm"
            @cancel="cancel"
            @change="change"
            @close="close"
        />

        <ai-datetime-picker
            v-model="value5"
            :show="show5"
            :filter="filter"
            mode="date"
            close-on-click-overlay
            @confirm="confirm"
            @cancel="cancel"
            @change="change"
            @close="close"
        />

        <ai-datetime-picker
            v-model="value6"
            :show="show6"
            mode="date"
            :formatter="formatter"
            close-on-click-overlay
            @confirm="confirm"
            @cancel="cancel"
            @change="change"
            @close="close"
        />

        <ai-datetime-picker
            v-model="value7"
            :show="show7"
            mode="datetime"
            :min-date="1587524800000"
            :max-date="1786778555000"
            close-on-click-overlay
            @confirm="confirm"
            @cancel="cancel"
            @change="change"
            @close="close"
        />
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            current: 0,
            value1: Number(new Date()),
            value2: Number(new Date()),
            value3: Number(new Date()),
            value4: '05:28',
            value5: Number(new Date()),
            value6: Number(new Date()),
            value7: Number(new Date()),
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            show6: false,
            show7: false,
            list: [
                {
                    title: '完整日期时间',
                    iconUrl: `${uni.$config.static}datetime-picker/6.png`,
                },
                {
                    title: '年月日',
                    iconUrl: `${uni.$config.static}datetime-picker/4.png`,
                },
                {
                    title: '年月',
                    iconUrl: `${uni.$config.static}datetime-picker/3.png`,
                },
                {
                    title: '时间',
                    iconUrl: `${uni.$config.static}datetime-picker/5.png`,
                },
                {
                    title: '过滤器(保留偶数年)',
                    iconUrl: `${uni.$config.static}datetime-picker/2.png`,
                },
                {
                    title: '格式化',
                    iconUrl: `${uni.$config.static}datetime-picker/1.png`,
                },
                {
                    title: '限制最大最小值',
                    iconUrl: `${uni.$config.static}datetime-picker/7.png`,
                },
            ],
        };
    },
    methods: {
        close() {
            this[`show${this.current}`] = false;
        },
        cancel() {
            this[`show${this.current}`] = false;
        },
        confirm(e) {
            this[`show${this.current}`] = false;
            this.result(e.value, e.mode);
        },
        change() {
            // console.log('change', e)
        },
        navigateBack() {
            uni.navigateBack();
        },
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            }
            if (type === 'month') {
                return `${value}月`;
            }
            if (type === 'day') {
                return `${value}日`;
            }
            return value;
        },
        filter(mode, options) {
            if (mode === 'year') {
                return options.filter((option) => option % 2 === 0);
            }

            return options;
        },
        showDatetimePicker(index) {
            this.current = index + 1;
            this[`show${index + 1}`] = true;
        },
        result(time, mode) {
            const timeFormat = uni.$util.timeFormat,
                toast = uni.$util.toast;
            switch (mode) {
                case 'datetime':
                    return toast(timeFormat(time, 'yyyy-mm-dd hh:MM'));
                case 'date':
                    return toast(timeFormat(time, 'yyyy-mm-dd'));
                case 'year-month':
                    return toast(timeFormat(time, 'yyyy-mm'));
                case 'time':
                    return toast(time);
                default:
                    return '';
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
