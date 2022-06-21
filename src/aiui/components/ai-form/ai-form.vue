<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:40:07
 * @Description: 表单
-->

<template>
    <view class="ai-form">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
import Schema from './async-validator';
// 去除警告信息
Schema.warning = function () {};

export default {
    name: 'AiForm',
    mixins: [mixins],
    provide() {
        return {
            uForm: this,
        };
    },
    props: {
        // 当前form的需要验证字段的集合
        model: {
            type: Object,
            default: () => ({}),
        },
        // 验证规则
        rules: {
            type: [Object, Function, Array],
            default: () => ({}),
        },
        // 有错误时的提示方式，message-提示信息，toast-进行toast提示
        // border-bottom-下边框呈现红色，none-无提示
        errorType: {
            type: String,
            default: 'message',
        },
        // 是否显示表单域的下划线边框
        borderBottom: {
            type: Boolean,
            default: true,
        },
        // label的位置，left-左边，top-上边
        labelPosition: {
            type: String,
            default: 'left',
        },
        // label的宽度，单位px
        labelWidth: {
            type: [String, Number],
            default: '90rpx',
        },
        // lable字体的对齐方式
        labelAlign: {
            type: String,
            default: 'left',
        },
        // lable的样式，对象形式
        labelStyle: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            formRules: {},
            // 规则校验器
            validator: {},
            // 原始的model快照，用于resetFields方法重置表单时使用
            originalModel: null,
        };
    },
    computed: {
        propsChange() {
            return [
                this.errorType,
                this.borderBottom,
                this.labelPosition,
                this.labelWidth,
                this.labelAlign,
                this.labelStyle,
            ];
        },
    },
    watch: {
        // 监听规则的变化
        rules: {
            immediate: true,
            handler(n) {
                this.setRules(n);
            },
        },
        // 监听属性的变化，通知子组件ai-form-item重新获取信息
        propsChange() {
            if (this.children?.length) {
                this.children.map((child) => {
                    // 判断子组件(ai-form-item)如果有updateParentData方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
                    typeof child.updateParentData == 'function' && child.updateParentData();
                });
            }
        },
        // 监听model的初始值作为重置表单的快照
        model: {
            immediate: true,
            handler(n) {
                if (!this.originalModel) {
                    this.originalModel = uni.$util.deepClone(n);
                }
            },
        },
    },
    created() {
        // 存储当前form下的所有ai-form-item的实例
        // 不能定义在data中，否则微信小程序会造成循环引用而报错
        this.children = [];
    },
    methods: {
        // 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
        setRules(rules) {
            // 判断是否有规则
            if (Object.keys(rules).length === 0) return;
            if (Object.keys(this.model).length === 0) {
                uni.$util.error('设置rules，model必须设置');
                return;
            }
            this.formRules = rules;
            // 重新将规则赋予Validator
            this.validator = new Schema(rules);
        },
        // 清空所有ai-form-item组件的内容，本质上是调用了ai-form-item组件中的resetField()方法
        resetFields() {
            this.resetModel();
        },
        // 重置model为初始值的快照
        resetModel() {
            // 历遍所有ai-form-item，根据其prop属性，还原model的原始快照
            this.children.map((child) => {
                const prop = child?.prop;
                const value = uni.$util.getProperty(this.originalModel, prop);
                uni.$util.setProperty(this.model, prop, value);
            });
        },
        // 清空校验结果
        clearValidate(props) {
            props = [].concat(props);
            this.children.map((child) => {
                // 如果ai-form-item的prop在props数组中，则清除对应的校验结果信息
                if (props.includes(child.props)) {
                    child.message = null;
                }
            });
        },
        // 对部分表单字段进行校验
        async validateField(value, callback, event = null) {
            if (Object.keys(this.formRules).length === 0) {
                uni.$util.error('未设置rules，请看文档说明');
                return;
            }
            // $nextTick是必须的，否则model的变更，可能会延后于此方法的执行
            this.$nextTick(() => {
                // 校验错误信息，返回给回调方法，用于存放所有form-item的错误信息
                const errorsRes = [];
                // 如果为字符串，转为数组
                value = [].concat(value);
                // 历遍children所有子form-item
                this.children.map((child) => {
                    // 用于存放form-item的错误信息
                    const childErrors = [];
                    if (value.includes(child.prop)) {
                        // 获取对应的属性，通过类似'a.b.c'的形式
                        const propertyVal = uni.$util.getProperty(this.model, child.prop);
                        // 属性链数组
                        const propertyChain = child.prop.split('.');
                        const propertyName = propertyChain[propertyChain.length - 1];

                        const rule = this.formRules[child.prop];
                        // 如果不存在对应的规则，直接返回，否则校验器会报错
                        if (!rule) return;
                        // rule规则可为数组形式，也可为对象形式，此处拼接成为数组
                        const rules = [].concat(rule);

                        // 对rules数组进行校验
                        for (let i = 0; i < rules.length; i++) {
                            const ruleItem = rules[i];
                            // 将ai-form-item的触发器转为数组形式
                            const trigger = [].concat(ruleItem?.trigger);
                            // 如果是有传入触发事件，但是此form-item却没有配置此触发器的话，不执行校验操作
                            if (event && !trigger.includes(event)) continue;
                            // 实例化校验对象，传入构造规则
                            const validator = new Schema({
                                [propertyName]: ruleItem,
                            });
                            validator.validate(
                                {
                                    [propertyName]: propertyVal,
                                },
                                (errors) => {
                                    if (uni.$util.test.array(errors)) {
                                        errorsRes.push(...errors);
                                        childErrors.push(...errors);
                                    }
                                    child.message = childErrors[0]?.message ?? null;
                                }
                            );
                        }
                    }
                });
                // 执行回调函数
                typeof callback === 'function' && callback(errorsRes);
            });
        },
        // 校验全部数据
        validate() {
            return new Promise((resolve, reject) => {
                // $nextTick是必须的，否则model的变更，可能会延后于validate方法
                this.$nextTick(() => {
                    // 获取所有form-item的prop，交给validateField方法进行校验
                    const formItemProps = this.children.map((item) => item.prop);
                    this.validateField(formItemProps, (errors) => {
                        if (errors.length) {
                            // 如果错误提示方式为toast，则进行提示
                            this.errorType === 'toast' && uni.$util.toast(errors[0].message);
                            reject(errors);
                        } else {
                            resolve(true);
                        }
                    });
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
