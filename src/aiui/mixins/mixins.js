/*
 * @Author: airobot
 * @Date: 2022-01-27 20:55:48
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-06 02:51:10
 * @Description: 混入
 */
module.exports = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
        // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
        customStyle: {
            type: [String, Object],
            default: '',
        },
        // 自定义属性
        customClass: {
            type: String,
            default: '',
        },
        // 跳转的页面路径
        url: {
            type: String,
            default: '',
        },
        // 页面跳转的类型
        linkType: {
            type: String,
            default: 'navigateTo',
        },
    },
    // #ifdef MP-WEIXIN
    // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
    options: {
        virtualHost: true,
    },
    // #endif
    computed: {
        // 把uni.$util挂载到this.$util上，可以在模板或者js中使用$util
        $util() {
            return uni.$util;
        },
        // 把uni.$config挂载到this.$config上，可以在模板或者js中使用$config
        $config() {
            return uni.$config;
        },
    },
    methods: {
        // 跳转某一个页面
        openPage(urlKey = 'url') {
            const url = this[urlKey];
            if (url) {
                // 执行类似uni.navigateTo的方法
                uni[this.linkType]({
                    url,
                });
            }
        },
        // 查询节点信息
        // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
        // 解决办法为在组件根部再套一个没有任何作用的view元素
        getRect(selector, all = false) {
            return new Promise((resolve) => {
                const selectorQuery = uni.createSelectorQuery().in(this);
                selectorQuery[all ? 'selectAll' : 'select'](selector)
                    .boundingClientRect((rect) => {
                        if (all && Array.isArray(rect) && rect.length) {
                            resolve(rect);
                        }
                        if (!all && rect) {
                            resolve(rect);
                        }
                    })
                    .exec();
            });
        },
        getParentData(parentName = '') {
            // 避免在created中去定义parent变量
            if (!this.parent) this.parent = {};
            // 这里的本质原理是，通过获取父组件实例(也即类似ai-radio的父组件ai-radio-group的this)
            // 将父组件this中对应的参数，赋值给本组件(ai-radio的this)的parentData对象中对应的属性
            // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
            // 此处并不会自动更新子组件的数据，而是依赖父组件ai-radio-group去监听data的变化，手动调用更新子组件的方法去重新获取
            this.parent = uni.$util.$parent.call(this, parentName);
            if (this.parent.children) {
                // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
                this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
            }
            if (this.parent && this.parentData) {
                // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
                Object.keys(this.parentData).map((key) => {
                    this.parentData[key] = this.parent[key];
                });
            }
        },
        // 阻止事件冒泡
        preventEvent(e) {
            e && typeof e.stopPropagation === 'function' && e.stopPropagation();
        },
    },
    onReachBottom() {
        uni.$emit('uOnReachBottom');
    },
    beforeDestroy() {
        // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
        // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
        if (this.parent && uni.$util.test.array(this.parent.children)) {
            // 组件销毁时，移除父组件中的children数组中对应的实例
            const childrenList = this.parent.children;
            childrenList.map((child, index) => {
                // 如果相等，则移除
                if (child === this) {
                    childrenList.splice(index, 1);
                }
            });
        }
    },
};
