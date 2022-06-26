<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-26 18:14:57
 * @Description: Tabbar
-->

<template>
    <ai-page>
        <ai-cell-group :border="false" title="基础功能">
            <ai-tabbar
                :value="value1"
                :fixed="false"
                :placeholder="false"
                :safe-area-inset-bottom="false"
                @change="change1"
            >
                <ai-tabbar-item text="首页" icon="home" @click="click1" />
                <ai-tabbar-item text="放映厅" icon="photo" @click="click1" />
                <ai-tabbar-item text="直播" icon="play" @click="click1" />
                <ai-tabbar-item text="我的" icon="user" @click="click1" />
            </ai-tabbar>
        </ai-cell-group>

        <ai-cell-group :border="false" title="显示徽标">
            <ai-tabbar
                :value="value2"
                :placeholder="false"
                :fixed="false"
                :safe-area-inset-bottom="false"
                @change="(name) => (value2 = name)"
            >
                <ai-tabbar-item text="首页" icon="home" dot />
                <ai-tabbar-item text="放映厅" icon="photo" badge="3" />
                <ai-tabbar-item text="直播" icon="play" />
                <ai-tabbar-item text="我的" icon="user" />
            </ai-tabbar>
        </ai-cell-group>

        <ai-cell-group :border="false" title="匹配标签的名称">
            <ai-tabbar
                :placeholder="false"
                :value="value3"
                :fixed="false"
                :safe-area-inset-bottom="false"
                @change="(name) => (value3 = name)"
            >
                <ai-tabbar-item text="首页" icon="home" name="home" />
                <ai-tabbar-item text="放映厅" icon="photo" name="photo" />
                <ai-tabbar-item text="直播" icon="play" name="play" />
                <ai-tabbar-item text="我的" name="user" icon="user" />
            </ai-tabbar>
        </ai-cell-group>

        <ai-cell-group :border="false" title="自定义图标/颜色">
            <ai-tabbar
                :value="value4"
                :fixed="false"
                :placeholder="false"
                active-color="#d81e06"
                :safe-area-inset-bottom="false"
                @change="(name) => (value4 = name)"
            >
                <ai-tabbar-item text="首页">
                    <ai-icon slot="active-icon" :name="`${$config.static}common/bell-selected.png`" size="32rpx" />
                    <ai-icon slot="inactive-icon" :name="`${$config.static}common/bell.png`" size="32rpx" />
                </ai-tabbar-item>
                <ai-tabbar-item text="放映厅" icon="photo" />
                <ai-tabbar-item text="直播" icon="play" />
                <ai-tabbar-item text="我的" icon="user" />
            </ai-tabbar>
        </ai-cell-group>

        <ai-cell-group :border="false" title="拦截切换事件(点击第二个标签)">
            <ai-tabbar
                :value="value5"
                :fixed="false"
                :safe-area-inset-bottom="false"
                :placeholder="false"
                @change="change5"
            >
                <ai-tabbar-item text="首页" icon="home" />
                <ai-tabbar-item text="放映厅" icon="photo" />
                <ai-tabbar-item text="直播" icon="play" />
                <ai-tabbar-item text="我的" icon="user" />
            </ai-tabbar>
        </ai-cell-group>

        <ai-cell-group :border="false" title="去除上边框">
            <ai-tabbar
                :value="value7"
                :placeholder="false"
                :border="false"
                :fixed="false"
                :safe-area-inset-bottom="false"
                @change="(name) => (value7 = name)"
            >
                <ai-tabbar-item text="首页" icon="home" />
                <ai-tabbar-item text="放映厅" icon="photo" />
                <ai-tabbar-item text="直播" icon="play" />
                <ai-tabbar-item text="我的" icon="user" />
            </ai-tabbar>
        </ai-cell-group>

        <ai-cell-group :border="false" title="固定在底部(固定在屏幕最下方)">
            <ai-gap size="300rpx" />
            <ai-tabbar
                :value="value6"
                :fixed="true"
                :placeholder="true"
                :safe-area-inset-bottom="true"
                @change="(name) => (value6 = name)"
            >
                <ai-tabbar-item text="首页" icon="home" />
                <ai-tabbar-item text="放映厅" icon="photo" />
                <ai-tabbar-item text="直播" icon="play" />
                <ai-tabbar-item text="我的" icon="user" />
            </ai-tabbar>
        </ai-cell-group>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            value1: 0,
            value2: 1,
            value3: 'play',
            value4: 0,
            value5: 0,
            value6: 0,
            value7: 3,
        };
    },
    computed: {
        $config() {
            return uni.$config;
        },
    },
    methods: {
        change5(name) {
            if (name === 1) return uni.$util.toast('请您先登录');
            else this.value5 = name;
        },
        change1(e) {
            this.value1 = e;
            console.log('change1', e);
        },
        click1(e) {
            console.log('click1', e);
        },
    },
};
</script>

<style lang="scss" scoped></style>
