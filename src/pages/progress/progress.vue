<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-10 22:26:19
 * @Description: 进度条
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能">
            <ai-line-progress :percentage="percentage1" />
        </ai-box>

        <ai-box title="不显示百分比">
            <ai-line-progress :show-text="false" :percentage="percentage2" />
        </ai-box>

        <ai-box title="自定义高度">
            <ai-line-progress height="8" :show-text="false" :percentage="percentage3" />
        </ai-box>

        <ai-box title="自定义颜色">
            <ai-line-progress
                height="8"
                :show-text="false"
                :percentage="percentage4"
                active-color="#3c9cff"
                inactive-color="#f3f4f6"
            />
        </ai-box>

        <ai-box v-if="!androidNvue" title="自定义样式(不支持安卓环境的nvue)">
            <ai-line-progress
                height="8"
                :show-text="false"
                :percentage="percentage5"
                active-color="#3c9cff"
                inactive-color="#f3f4f6"
            >
                <ai-text
                    :text="`${percentage5}%`"
                    size="mini"
                    color="white"
                    background="warning"
                    :custom-style="{
                        padding: '2rpx 10rpx',
                        borderRadius: '200rpx',
                    }"
                />
            </ai-line-progress>
        </ai-box>

        <ai-box title="手动加减">
            <ai-line-progress
                height="8"
                :show-text="false"
                :percentage="percentage6"
                active-color="#3c9cff"
                inactive-color="#f3f4f6"
            />
        </ai-box>

        <ai-box>
            <ai-row justify="around">
                <ai-button
                    text="减少"
                    color="#dbfbdb"
                    shape="circle"
                    :custom-style="{
                        width: '50px',
                        height: '50px',
                        color: 'rgb(25, 190, 107)',
                    }"
                    @click="computedWidth('minus')"
                />
                <ai-button
                    text="增加"
                    color="#dbfbdb"
                    shape="circle"
                    :custom-style="{
                        width: '50px',
                        height: '50px',
                        color: 'rgb(25, 190, 107)',
                    }"
                    @click="computedWidth('plus')"
                />
            </ai-row>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            androidNvue: false,
            percentage1: 30,
            percentage2: 40,
            percentage3: 50,
            percentage4: 60,
            percentage5: 70,
            percentage6: 50,
        };
    },
    onLoad() {
        // #ifdef APP-NVUE
        this.androidNvue = uni.$util.os() === 'android';
        // #endif
        uni.$util.sleep(2500).then(() => {
            this.percentage1 = 120;
        });
    },
    methods: {
        computedWidth(type) {
            if (type === 'plus') {
                this.percentage6 = uni.$util.range(0, 100, this.percentage6 + 10);
            } else {
                this.percentage6 = uni.$util.range(0, 100, this.percentage6 - 10);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
