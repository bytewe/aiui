<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:39
 * @Description: 单选框
-->

<template>
    <ai-page background="white">
        <ai-box title="基本案例">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="苹果、香蕉和橙子哪个最甜？" />
            <ai-radio-group v-model="radiovalue1" direction="column" @change="groupChange">
                <ai-radio
                    v-for="(item, index) in radiolist1"
                    :key="index"
                    :custom-style="{ marginBottom: '16rpx' }"
                    :label="item.name"
                    :name="item.name"
                    @change="radioChange"
                />
            </ai-radio-group>
        </ai-box>

        <ai-box title="自定义形状">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="王者荣耀谁最帅？" />
            <ai-radio-group v-model="radiovalue2" direction="column" shape="square">
                <ai-radio
                    v-for="(item, index) in radiolist2"
                    :key="index"
                    :custom-style="{ marginBottom: '16rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-radio-group>
        </ai-box>

        <ai-box title="是否禁用">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="苹果、香蕉和菠萝哪个最甜？" />
            <ai-radio-group v-model="radiovalue3" direction="column">
                <ai-radio
                    v-for="(item, index) in radiolist3"
                    :key="index"
                    :custom-style="{ marginBottom: '16rpx' }"
                    :label="item.name"
                    :name="item.name"
                    :disabled="!index"
                />
            </ai-radio-group>
        </ai-box>

        <ai-box title="纵向排列">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="狙击枪用哪个倍镜最好？" />
            <ai-radio-group v-model="radiovalue4" direction="column" :label-disabled="true">
                <ai-radio
                    v-for="(item, index) in radiolist4"
                    :key="index"
                    :custom-style="{ marginBottom: '16rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-radio-group>
        </ai-box>

        <ai-box title="自定义颜色？">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="你比较喜欢下面哪个颜色？" />
            <ai-radio-group v-model="radiovalue5" direction="column" active-color="#19be6b">
                <ai-radio
                    v-for="(item, index) in radiolist5"
                    :key="index"
                    :custom-style="{ marginBottom: '16rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-radio-group>
        </ai-box>

        <ai-box title="横向排列形式？">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="王者荣耀哪个英雄最美？" />
            <ai-radio-group v-model="radiovalue6" placement="row">
                <ai-radio
                    v-for="(item, index) in radiolist6"
                    :key="index"
                    :custom-style="{ marginRight: '32rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-radio-group>
        </ai-box>

        <ai-box title="横向两端排列形式？">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="你觉得阿木木可爱吗？" />
            <ai-radio-group v-model="radiovalue7" :border-bottom="true" direction="column" icon-placement="right">
                <ai-radio
                    v-for="(item, index) in radiolist7"
                    :key="index"
                    :custom-style="{ marginBottom: '32rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-radio-group>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            // 基本案列数据
            radiolist1: [
                {
                    name: '苹果',
                    disabled: false,
                },
                {
                    name: '香蕉',
                    disabled: false,
                },
                {
                    name: '橙子',
                    disabled: false,
                },
                {
                    name: '榴莲',
                    disabled: false,
                },
            ],
            // ai-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
            radiovalue1: '苹果',

            // 自定义形状数据
            radiolist2: [
                {
                    name: '李白',
                    disabled: false,
                },
                {
                    name: '韩信',
                    disabled: false,
                },
                {
                    name: '马可波罗',
                    disabled: false,
                },
                {
                    name: '百里守约',
                    disabled: false,
                },
            ],
            // ai-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
            radiovalue2: '李白',

            // 是否禁用数据
            radiolist3: [
                {
                    name: '苹果',
                    disabled: false,
                },
                {
                    name: '香蕉',
                    disabled: false,
                },
                {
                    name: '菠萝',
                    disabled: false,
                },
            ],
            // ai-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
            radiovalue3: '苹果',

            // 是否禁止点击提示语选中单选框数据
            radiolist4: [
                {
                    name: '3倍镜',
                    disabled: false,
                },
                {
                    name: '4倍镜',
                    disabled: false,
                },
                {
                    name: '6倍镜',
                    disabled: false,
                },
                {
                    name: '8倍镜',
                    disabled: false,
                },
            ],
            // ai-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
            radiovalue4: '6倍镜',

            //自定义颜色数据
            radiolist5: [
                {
                    name: '红色',
                    disabled: false,
                },
                {
                    name: '绿色',
                    disabled: false,
                },
                {
                    name: '蓝色',
                    disabled: false,
                },
                {
                    name: '黄色',
                    disabled: false,
                },
            ],
            // ai-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
            radiovalue5: '绿色',

            //横向排列形式数据
            radiolist6: [
                {
                    name: '妲己',
                    disabled: false,
                },
                {
                    name: '虞姬',
                    disabled: false,
                },
                {
                    name: '不知火舞',
                    disabled: false,
                },
            ],
            // ai-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
            radiovalue6: '妲己',

            //横向两端排列形式数据
            radiolist7: [
                {
                    name: '可爱',
                    disabled: false,
                },
                {
                    name: '一般',
                    disabled: false,
                },
                {
                    name: '不可爱',
                    disabled: false,
                },
            ],
            // ai-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
            radiovalue7: '可爱',
        };
    },
    watch: {
        radiovalue1(newValue) {
            console.log('v-model', newValue);
        },
    },
    methods: {
        groupChange(n) {
            console.log('groupChange', n);
        },
        radioChange(n) {
            console.log('radioChange', n);
        },
    },
};
</script>

<style lang="scss" scoped></style>
