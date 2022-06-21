<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:39:48
 * @Description: 表格
-->

<template>
    <ai-page background="white" padding>
        <view class="container">
            <table>
                <scroll-view class="scroll__head" scroll-x :scroll-left="scrollLeft">
                    <thead>
                        <tr>
                            <td>栏目1</td>
                            <td>栏目2</td>
                            <td>栏目3</td>
                            <td>栏目4</td>
                            <td>栏目5</td>
                            <td>栏目6</td>
                            <td>栏目7</td>
                        </tr>
                    </thead>
                </scroll-view>
                <scroll-view class="scroll__body" scroll-x scroll-y @scroll="scroll">
                    <tbody>
                        <tr v-for="(item, index) in list" :key="index">
                            <td>{{ item[0] + index }}</td>
                            <td>{{ item[1] + index }}</td>
                            <td>{{ item[2] + index }}</td>
                            <td>{{ item[3] + index }}</td>
                            <td>{{ item[4] + index }}</td>
                            <td>{{ item[5] + index }}</td>
                            <td>{{ item[6] + index }}</td>
                        </tr>
                    </tbody>
                </scroll-view>
            </table>
            <view class="scrollbar" :style="{ left: left }" />
        </view>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            list: [
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
                ['项目', '项目', '项目', '项目', '项目', '项目', '项目'],
            ],
            left: '10px',
            scrollLeft: 0,
        };
    },
    methods: {
        scroll(e) {
            this.left = 10 + Math.ceil((323 - 75) * (e.detail.scrollLeft / 365)) + 'px';
            this.scrollLeft = e.detail.scrollLeft;
        },
    },
};
</script>

<style lang="scss">
.container {
    position: relative;
    border: 1px solid #eee;
}
.scroll__head {
    width: 343px;
}
.scroll__body {
    width: 343px;
    height: 429px;
}
.scrollbar {
    position: absolute;
    bottom: 0;
    left: 10px;
    width: 75px;
    height: 4px;
    border-radius: 2px;
    background: rgba(0, 0, 0, 0.5);
}
table {
    border-collapse: collapse;
    text-align: center;
    margin: -1px;
}
thead {
    width: 708px;
    display: block;
}
tbody {
    margin-top: -1px;
    width: 708px;
    display: block;
}
td {
    width: 100px;
    border: 1px solid #eee;
    line-height: 38px;
    padding: 0;
}
</style>
