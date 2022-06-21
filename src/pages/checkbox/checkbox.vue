<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:20
 * @Description: 复选框
-->

<template>
    <ai-page background="white">
        <ai-box title="基本案例">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="苹果、香蕉和橙子哪个最甜？" />
            <ai-checkbox-group v-model="checkboxValue1" direction="column" @change="checkboxChange">
                <ai-checkbox
                    v-for="(item, index) in checkboxList1"
                    :key="index"
                    :custom-style="{ marginBottom: '16rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-checkbox-group>
        </ai-box>

        <ai-box title="自定义形状">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="中国四大名著是？" />
            <ai-checkbox-group v-model="checkboxValue2" direction="column" shape="square" @change="checkboxChange">
                <ai-checkbox
                    v-for="(item, index) in checkboxList2"
                    :key="index"
                    :custom-style="{ marginBottom: '16rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-checkbox-group>
        </ai-box>

        <ai-box title="是否禁用">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="下面什么东西不能吃？" />
            <ai-checkbox-group v-model="checkboxValue3" direction="column" @change="checkboxChange">
                <ai-checkbox
                    v-for="(item, index) in checkboxList3"
                    :key="index"
                    :custom-style="{ marginBottom: '16rpx' }"
                    :label="item.name"
                    :name="item.name"
                    :disabled="index === 0"
                />
            </ai-checkbox-group>
        </ai-box>

        <ai-box title="是否禁止点击提示语选中复选框">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="北宋四大家是谁？" />
            <ai-checkbox-group
                v-model="checkboxValue4"
                direction="column"
                :label-disabled="true"
                @change="checkboxChange"
            >
                <ai-checkbox
                    v-for="(item, index) in checkboxList4"
                    :key="index"
                    :custom-style="{ marginBottom: '16rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-checkbox-group>
        </ai-box>

        <ai-box title="自定义颜色">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="哪个颜色最好看？" />
            <ai-checkbox-group
                v-model="checkboxValue5"
                direction="column"
                active-color="#19be6b"
                @change="checkboxChange"
            >
                <ai-checkbox
                    v-for="(item, index) in checkboxList5"
                    :key="index"
                    :custom-style="{ marginBottom: '16rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-checkbox-group>
        </ai-box>

        <ai-box title="横向排列形式">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="什么东西不能飞？" />
            <ai-checkbox-group v-model="checkboxValue6" @change="checkboxChange">
                <ai-checkbox
                    v-for="(item, index) in checkboxList6"
                    :key="index"
                    :custom-style="{ marginRight: '32rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-checkbox-group>
        </ai-box>

        <ai-box title="横向两端排列形式">
            <ai-text color="dark" custom-class="ai-margin-bottom" text="什么东西不能吃？" />
            <ai-checkbox-group
                v-model="checkboxValue7"
                :border-bottom="true"
                direction="column"
                icon-placement="right"
                @change="checkboxChange"
            >
                <ai-checkbox
                    v-for="(item, index) in checkboxList7"
                    :key="index"
                    :custom-style="{ marginBottom: '32rpx' }"
                    :label="item.name"
                    :name="item.name"
                />
            </ai-checkbox-group>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            // 基本案列数据
            checkboxList1: [
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
            ],
            // ai-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
            checkboxValue1: ['苹果', '橙子'],

            // 自定义形状数据
            checkboxList2: [
                {
                    name: '西游记',
                    disabled: false,
                },
                {
                    name: '红楼梦',
                    disabled: false,
                },
                {
                    name: '三国演义',
                    disabled: false,
                },
                {
                    name: '水浒传',
                    disabled: false,
                },
            ],
            // ai-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
            checkboxValue2: ['西游记', '红楼梦', '三国演义', '水浒传'],

            // 是否禁用数据
            checkboxList3: [
                {
                    name: '冬瓜',
                    disabled: false,
                },
                {
                    name: '西瓜',
                    disabled: false,
                },
                {
                    name: '黄瓜',
                    disabled: false,
                },
                {
                    name: '傻瓜',
                    disabled: false,
                },
            ],
            // ai-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
            checkboxValue3: ['傻瓜'],

            // 是否禁止点击提示语选中复选框数据
            checkboxList4: [
                {
                    name: '黄庭坚',
                    disabled: false,
                },
                {
                    name: '欧阳修',
                    disabled: false,
                },
                {
                    name: '苏小宝',
                    disabled: false,
                },
                {
                    name: '王安石',
                    disabled: false,
                },
            ],
            // ai-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
            checkboxValue4: ['黄庭坚', '欧阳修', '王安石'],

            //自定义颜色数据
            checkboxList5: [
                {
                    name: '红色',
                    disabled: false,
                },
                {
                    name: '黄色',
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
            ],
            // ai-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
            checkboxValue5: ['绿色'],

            //横向排列形式数据
            checkboxList6: [
                {
                    name: '小鸟',
                    disabled: false,
                },
                {
                    name: '游艇',
                    disabled: false,
                },
                {
                    name: '轮船',
                    disabled: false,
                },
                {
                    name: '飞机',
                    disabled: false,
                },
            ],
            // ai-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
            checkboxValue6: ['游艇', '轮船'],

            //横向两端排列形式
            checkboxList7: [
                {
                    name: '汽车',
                    disabled: false,
                },
                {
                    name: '蒸汽机',
                    disabled: false,
                },
                {
                    name: '猪肉',
                    disabled: false,
                },
                {
                    name: '抄手',
                    disabled: false,
                },
            ],
            // ai-checkbox-group的v-model绑定的值如果设置为某个checkbox的name，就会被默认选中
            checkboxValue7: ['汽车', '蒸汽机'],
        };
    },
    methods: {
        checkboxChange() {
            // console.log('change', n);
        },
    },
};
</script>

<style lang="scss" scoped></style>
