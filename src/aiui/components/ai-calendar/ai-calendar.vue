<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:14:18
 * @Description: 日历
-->

<template>
    <ai-popup
        :show="show"
        mode="bottom"
        closeable
        :round="round"
        :close-on-click-overlay="closeOnClickOverlay"
        @close="close"
    >
        <view class="ai-calendar">
            <uHeader :title="title" :subtitle="subtitle" :show-subtitle="showSubtitle" :show-title="showTitle" />
            <scroll-view
                :style="{
                    height: $util.addUnit(listHeight),
                }"
                scroll-y
                :scroll-top="scrollTop"
                :scroll-into-view="scrollIntoView"
                @scroll="onScroll"
            >
                <uMonth
                    ref="month"
                    :color="color"
                    :row-height="rowHeight"
                    :show-mark="showMark"
                    :months="months"
                    :mode="mode"
                    :max-count="maxCount"
                    :start-text="startText"
                    :end-text="endText"
                    :default-date="defaultDate"
                    :min-date="innerMinDate"
                    :max-date="innerMaxDate"
                    :max-month="monthNum"
                    :readonly="readonly"
                    :max-range="maxRange"
                    :range-prompt="rangePrompt"
                    :show-range-prompt="showRangePrompt"
                    :allow-same-day="allowSameDay"
                    @monthSelected="monthSelected"
                    @updateMonthTop="updateMonthTop"
                />
            </scroll-view>
            <slot v-if="showConfirm" name="footer">
                <view class="ai-calendar__confirm">
                    <ai-button
                        shape="circle"
                        :text="buttonDisabled ? confirmDisabledText : confirmText"
                        :color="color"
                        :disabled="buttonDisabled"
                        @click="confirm"
                    />
                </view>
            </slot>
        </view>
    </ai-popup>
</template>

<script>
import uHeader from './header.vue';
import uMonth from './month.vue';
import mixins from '@/aiui/mixins/mixins';
import Calendar from './calendar.js';
import dayjs from '@/aiui/util/dayjs/dayjs';

export default {
    name: 'AiCalendar',
    components: {
        uHeader,
        uMonth,
    },
    mixins: [mixins],
    props: {
        // 日历顶部标题
        title: {
            type: String,
            default: '日期选择',
        },
        // 是否显示标题
        showTitle: {
            type: Boolean,
            default: true,
        },
        // 是否显示副标题
        showSubtitle: {
            type: Boolean,
            default: true,
        },
        // 日期类型选择，single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
        mode: {
            type: String,
            default: 'single',
        },
        // mode=range时，第一个日期底部的提示文字
        startText: {
            type: String,
            default: '开始',
        },
        // mode=range时，最后一个日期底部的提示文字
        endText: {
            type: String,
            default: '结束',
        },
        // 自定义列表
        customList: {
            type: Array,
            default: () => [],
        },
        // 主题色，对底部按钮和选中日期有效
        color: {
            type: String,
            default: '#3c9cff',
        },
        // 最小的可选日期
        minDate: {
            type: [String, Number],
            default: 0,
        },
        // 最大可选日期
        maxDate: {
            type: [String, Number],
            default: 0,
        },
        // 默认选中的日期，mode为multiple或range是必须为数组格式
        defaultDate: {
            type: [Array, String, Date, null],
            default: null,
        },
        // mode=multiple时，最多可选多少个日期
        maxCount: {
            type: [String, Number],
            default: Number.MAX_SAFE_INTEGER,
        },
        // 日期行高
        rowHeight: {
            type: [String, Number],
            default: 56,
        },
        // 日期格式化函数
        formatter: {
            type: [Function, null],
            default: null,
        },
        // 是否显示农历
        showLunar: {
            type: Boolean,
            default: false,
        },
        // 是否显示月份背景色
        showMark: {
            type: Boolean,
            default: true,
        },
        // 确定按钮的文字
        confirmText: {
            type: String,
            default: '确定',
        },
        // 确认按钮处于禁用状态时的文字
        confirmDisabledText: {
            type: String,
            default: '确定',
        },
        // 是否显示日历弹窗
        show: {
            type: Boolean,
            default: false,
        },
        // 是否允许点击遮罩关闭日历
        closeOnClickOverlay: {
            type: Boolean,
            default: false,
        },
        // 是否为只读状态，只读状态下禁止选择日期
        readonly: {
            type: Boolean,
            default: false,
        },
        //   是否展示确认按钮
        showConfirm: {
            type: Boolean,
            default: true,
        },
        // 日期区间最多可选天数，默认无限制，mode = range时有效
        maxRange: {
            type: [Number, String],
            default: Number.MAX_SAFE_INTEGER,
        },
        // 范围选择超过最多可选天数时的提示文案，mode = range时有效
        rangePrompt: {
            type: String,
            default: '',
        },
        // 范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效
        showRangePrompt: {
            type: Boolean,
            default: true,
        },
        // 是否允许日期范围的起止时间为同一天，mode = range时有效
        allowSameDay: {
            type: Boolean,
            default: false,
        },
        // 圆角值
        round: {
            type: [Boolean, String, Number],
            default: 0,
        },
        // 最多展示月份数量
        monthNum: {
            type: [Number, String],
            default: 3,
        },
    },
    data() {
        return {
            // 需要显示的月份的数组
            months: [],
            // 在月份滚动区域中，当前视图中月份的index索引
            monthIndex: 0,
            // 月份滚动区域的高度
            listHeight: 0,
            // month组件中选择的日期数组
            selected: [],
            scrollIntoView: '',
            scrollTop: 0,
            // 过滤处理方法
            innerFormatter: (value) => value,
        };
    },
    computed: {
        // 由于maxDate和minDate可以为字符串(2021-10-10)，或者数值(时间戳)，但是dayjs如果接受字符串形式的时间戳会有问题，这里进行处理
        innerMaxDate() {
            return uni.$util.test.number(this.maxDate) ? Number(this.maxDate) : this.maxDate;
        },
        innerMinDate() {
            return uni.$util.test.number(this.minDate) ? Number(this.minDate) : this.minDate;
        },
        // 多个条件的变化，会引起选中日期的变化，这里统一管理监听
        selectedChange() {
            return [this.innerMinDate, this.innerMaxDate, this.defaultDate];
        },
        subtitle() {
            // 初始化时，this.months为空数组，所以需要特别判断处理
            if (this.months.length) {
                return `${this.months[this.monthIndex].year}年${this.months[this.monthIndex].month}月`;
            } else {
                return '';
            }
        },
        buttonDisabled() {
            // 如果为range类型，且选择的日期个数不足1个时，让底部的按钮出于disabled状态
            if (this.mode === 'range') {
                if (this.selected.length <= 1) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
    },
    watch: {
        selectedChange: {
            immediate: true,
            handler() {
                this.setMonth();
            },
        },
        // 打开弹窗时，设置月份数据
        show: {
            immediate: true,
            handler() {
                this.setMonth();
            },
        },
    },
    mounted() {
        this.start = Date.now();
        this.init();
    },
    methods: {
        // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
        setFormatter(e) {
            this.innerFormatter = e;
        },
        // month组件内部选择日期后，通过事件通知给父组件
        monthSelected(e) {
            this.selected = e;
            if (!this.showConfirm) {
                // 在不需要确认按钮的情况下，如果为单选，或者范围多选且已选长度大于2，则直接进行返还
                if (
                    this.mode === 'multiple' ||
                    this.mode === 'single' ||
                    (this.mode === 'range' && this.selected.length >= 2)
                ) {
                    this.$emit('confirm', this.selected);
                }
            }
        },
        init() {
            // 校验maxDate，不能小于当前时间
            if (this.innerMaxDate && new Date(this.innerMaxDate).getTime() <= Date.now()) {
                return uni.$util.error('maxDate不能小于当前时间');
            }
            // 滚动区域的高度
            this.listHeight = this.rowHeight * 5 + 30;
            this.setMonth();
        },
        close() {
            this.$emit('close');
        },
        // 点击确定按钮
        confirm() {
            if (!this.buttonDisabled) {
                this.$emit('confirm', this.selected);
            }
        },
        // 获得两个日期之间的月份数
        getMonths(minDate, maxDate) {
            const minYear = dayjs(minDate).year();
            const minMonth = dayjs(minDate).month() + 1;
            const maxYear = dayjs(maxDate).year();
            const maxMonth = dayjs(maxDate).month() + 1;
            return (maxYear - minYear) * 12 + (maxMonth - minMonth) + 1;
        },
        // 设置月份数据
        setMonth() {
            // 最小日期的毫秒数
            const minDate = this.innerMinDate || dayjs().valueOf();
            // 如果没有指定最大日期，则往后推3个月
            const maxDate =
                this.innerMaxDate ||
                dayjs(minDate)
                    .add(this.monthNum - 1, 'month')
                    .valueOf();
            // 最大最小月份之间的共有多少个月份，
            const months = uni.$util.range(1, this.monthNum, this.getMonths(minDate, maxDate));
            // 先清空数组
            this.months = [];
            for (let i = 0; i < months; i++) {
                this.months.push({
                    date: new Array(dayjs(minDate).add(i, 'month').daysInMonth()).fill(1).map((item, index) => {
                        // 日期，取值1-31
                        let day = index + 1;
                        // 星期，0-6，0为周日
                        const week = dayjs(minDate).add(i, 'month').date(day).day();
                        const date = dayjs(minDate).add(i, 'month').date(day).format('YYYY-MM-DD');
                        let bottomInfo = '';
                        if (this.showLunar) {
                            // 将日期转为农历格式
                            const lunar = Calendar.solar2lunar(
                                dayjs(date).year(),
                                dayjs(date).month() + 1,
                                dayjs(date).date()
                            );
                            bottomInfo = lunar.IDayCn;
                        }
                        let config = {
                            day,
                            week,
                            // 小于最小允许的日期，或者大于最大的日期，则设置为disabled状态
                            disabled:
                                dayjs(date).isBefore(dayjs(minDate).format('YYYY-MM-DD')) ||
                                dayjs(date).isAfter(dayjs(maxDate).format('YYYY-MM-DD')),
                            // 返回一个日期对象，供外部的formatter获取当前日期的年月日等信息，进行加工处理
                            date: new Date(date),
                            bottomInfo,
                            dot: false,
                            month: dayjs(minDate).add(i, 'month').month() + 1,
                        };
                        const formatter = this.formatter || this.innerFormatter;
                        return formatter(config);
                    }),
                    // 当前所属的月份
                    month: dayjs(minDate).add(i, 'month').month() + 1,
                    // 当前年份
                    year: dayjs(minDate).add(i, 'month').year(),
                });
            }
        },
        // 滚动到默认设置的月份
        scrollIntoDefaultMonth(selected) {
            // 查询默认日期在可选列表的下标
            const _index = this.months.findIndex(({ year, month }) => {
                month = uni.$util.padZero(month);
                return `${year}-${month}` === selected;
            });
            if (_index !== -1) {
                // #ifndef MP-WEIXIN
                this.$nextTick(() => {
                    this.scrollIntoView = `month-${_index}`;
                });
                // #endif
                // #ifdef MP-WEIXIN
                this.scrollTop = this.months[_index].top || 0;
                // #endif
            }
        },
        // scroll-view滚动监听
        onScroll(event) {
            // 不允许小于0的滚动值，如果scroll-view到顶了，继续下拉，会出现负数值
            const scrollTop = Math.max(0, event.detail.scrollTop);
            // 将当前滚动条数值，除以滚动区域的高度，可以得出当前滚动到了哪一个月份的索引
            for (let i = 0; i < this.months.length; i++) {
                if (scrollTop >= (this.months[i].top || this.listHeight)) {
                    this.monthIndex = i;
                }
            }
        },
        // 更新月份的top值
        updateMonthTop(topArr = []) {
            // 设置对应月份的top值，用于onScroll方法更新月份
            topArr.map((item, index) => {
                this.months[index].top = item;
            });

            // 获取默认日期的下标
            if (!this.defaultDate) {
                // 如果没有设置默认日期，则将当天日期设置为默认选中的日期
                const selected = dayjs().format('YYYY-MM');
                this.scrollIntoDefaultMonth(selected);
                return;
            }
            let selected = dayjs().format('YYYY-MM');
            // 单选模式，可以是字符串或数组，Date对象等
            if (!uni.$util.test.array(this.defaultDate)) {
                selected = dayjs(this.defaultDate).format('YYYY-MM');
            } else {
                selected = dayjs(this.defaultDate[0]).format('YYYY-MM');
            }
            this.scrollIntoDefaultMonth(selected);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-calendar {
    &__confirm {
        padding: 14rpx 36rpx;
    }
}
</style>
