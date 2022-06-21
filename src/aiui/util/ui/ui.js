/*
 * @Author: airobot
 * @Date: 2022-02-13 15:21:43
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 15:28:44
 * @Description: 界面
 */

// 错误提示
function error(err) {
    // 开发环境才提示，生产环境不会提示
    if (process.env.NODE_ENV === 'development') {
        console.error(`ai提示: ${err}`);
    }
}

// 提示
function toast(title, duration = 2000) {
    uni.showToast({
        title: String(title),
        icon: 'none',
        duration,
    });
}

// 获取父组件
function $parent(name = undefined) {
    let parent = this.$parent;
    // 通过while历遍，这里主要是为了H5需要多层解析的问题
    while (parent) {
        // 父组件
        if (parent.$options && parent.$options.name !== name) {
            // 如果组件的name不相等，继续上一级寻找
            parent = parent.$parent;
        } else {
            return parent;
        }
    }
    return false;
}

// 表单校验
function formValidate(instance, event) {
    const formItem = uni.$util.$parent.call(instance, 'AiFormItem');
    const form = uni.$util.$parent.call(instance, 'AiForm');
    // 如果发生变化的input或者textarea等，其父组件中有ai-form-item或者ai-form等，就执行form的validate方法
    // 同时将form-item的pros传递给form，让其进行精确对象验证
    if (formItem && form) {
        form.validateField(formItem.prop, () => {}, event);
    }
}

export default {
    error,
    toast,
    $parent,
    formValidate,
};
