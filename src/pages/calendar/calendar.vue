<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-10 20:58:17
 * @Description: 日历
-->

<template>
    <ai-page>
        <ai-cell-group>
            <ai-cell
                v-for="(item, key) in list"
                :key="key"
                :icon="item.iconUrl"
                :title="item.title"
                :label="values[key]"
                arrow
                :border="key !== list.length - 1"
                @click="showCalendar(key)"
            />
        </ai-cell-group>

        <ai-calendar :show="show1" default-date="2022-02-15" @confirm="confirm" @close="close" />

        <ai-calendar :show="show2" mode="multiple" :default-date="['2022-03-01']" @confirm="confirm" @close="close" />

        <ai-calendar :show="show3" mode="range" @confirm="confirm" @close="close" />

        <ai-calendar
            :show="show4"
            mode="range"
            color="#f56c6c"
            :default-date="customThemeDefaultDate"
            @confirm="confirm"
            @close="close"
        />

        <ai-calendar
            :show="show5"
            mode="range"
            :default-date="customTextDefaultDate"
            start-text="住店"
            end-text="离店"
            confirm-disabled-text="请选择离店日期"
            :formatter="formatter"
            @confirm="confirm"
            @close="close"
        />

        <ai-calendar :show="show6" :max-date="maxDate" @confirm="confirm" @close="close" />

        <ai-calendar :show="show7" show-lunar @confirm="confirm" @close="close" />

        <ai-calendar
            :show="show8"
            mode="multiple"
            :default-date="defaultDateMultiple"
            @confirm="confirm"
            @close="close"
        />
    </ai-page>
</template>

<script>
export default {
    data() {
        const d = new Date();
        const year = d.getFullYear();
        let month = d.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        const date = d.getDate();
        return {
            index: 0,
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            show6: false,
            show7: false,
            show8: false,
            values: ['', '', '', '', '', '', '', ''],
            customThemeDefaultDate: [`${year}-${month}-${date}`, `${year}-${month}-${date + 5}`],
            customTextDefaultDate: [`${year}-${month}-${date}`],
            maxDate: `${year}-${month}-${date + 10}`,
            defaultDateMultiple: [
                `${year}-${month}-${date}`,
                `${year}-${month}-${date + 1}`,
                `${year}-${month}-${date + 2}`,
            ],
            list: [
                {
                    title: '单个日期',
                    iconUrl: `${uni.$config.static}calendar/7.png`,
                },
                {
                    title: '多个日期',
                    iconUrl: `${uni.$config.static}calendar/8.png`,
                },
                {
                    title: '日期范围',
                    iconUrl: `${uni.$config.static}calendar/9.png`,
                },
                {
                    title: '自定义主题颜色',
                    iconUrl: `${uni.$config.static}calendar/15.png`,
                },
                {
                    title: '自定义文案',
                    iconUrl: `${uni.$config.static}calendar/14.png`,
                },
                {
                    title: '日期最大范围',
                    iconUrl: `${uni.$config.static}calendar/13.png`,
                },
                {
                    title: '显示农历',
                    iconUrl: `${uni.$config.static}calendar/5.png`,
                },
                {
                    title: '默认日期',
                    iconUrl: `${uni.$config.static}calendar/10.png`,
                },
            ],
        };
    },
    methods: {
        showCalendar(index) {
            this.index = index + 1;
            this[`show${index + 1}`] = true;
        },
        navigateBack() {
            uni.navigateBack();
        },
        confirm(e) {
            this[`show${this.index}`] = false;
            console.log(e);
            switch (this.index - 1) {
                case 0:
                    this.values[this.index - 1] = e[0];
                    break;
                case 1:
                    e.forEach((value, index) => {
                        index === 0
                            ? (this.values[this.index - 1] = value)
                            : (this.values[this.index - 1] += ';' + value);
                    });
                    break;
                case 2:
                    this.values[this.index - 1] = e[0] + '~' + e[e.length - 1];
                    break;
                case 3:
                    this.values[this.index - 1] = e[0] + '~' + e[e.length - 1];
                    break;
                case 4:
                    this.values[this.index - 1] = e[0] + '~' + e[e.length - 1];
                    break;
                case 5:
                    this.values[this.index - 1] = e[0];
                    break;
                case 6:
                    this.values[this.index - 1] = e[0];
                    break;
                case 7:
                    e.forEach((value, index) => {
                        index === 0
                            ? (this.values[this.index - 1] = value)
                            : (this.values[this.index - 1] += ';' + value);
                    });
                    break;
            }
        },
        close() {
            this[`show${this.index}`] = false;
        },
        formatter(day) {
            const d = new Date();
            let month = d.getMonth() + 1;
            const date = d.getDate();
            if (day.month == month && day.day == date + 3) {
                day.bottomInfo = '有优惠';
                day.dot = true;
            }
            return day;
        },
    },
};
</script>

<style lang="scss" scoped></style>
