<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:29:44
 * @Description: 警告
-->

<template>
    <ai-page background="white">
        <ai-box title="基础功能">
            <view class="ai-margin-bottom--small">
                <ai-alert description="山不在于高，有了神仙就出名" type="warning" />
            </view>
            <view class="ai-margin-bottom--small">
                <ai-alert description="水不在深，有龙则灵" type="primary" />
            </view>
            <view class="ai-margin-bottom--small">
                <ai-alert description="斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青" type="danger" />
            </view>
            <view class="ai-margin-bottom--small">
                <ai-alert description="谈笑有鸿儒，往来无白丁" type="info" />
            </view>
            <view class="ai-margin-bottom--small">
                <ai-alert description="可以调素琴，阅金经" type="success" />
            </view>
        </ai-box>

        <ai-box title="深浅色">
            <view class="ai-margin-bottom--small">
                <ai-alert description="无丝竹之乱耳，无案牍之劳形" type="warning" />
            </view>
            <view class="ai-margin-bottom--small">
                <ai-alert description="南阳诸葛庐，西蜀子云亭。孔子云：何陋之有" type="warning" effect="dark" />
            </view>
        </ai-box>

        <ai-box title="显示图标">
            <view class="ai-margin-bottom--small">
                <ai-alert description="六王毕，四海一；蜀山兀，阿房出" type="danger" show-icon />
            </view>
            <view class="ai-margin-bottom--small">
                <ai-alert
                    description="覆压三百余里，隔离天日。骊山北构而西折，直走咸阳，二川溶溶，流入宫墙"
                    type="danger"
                    effect="dark"
                    show-icon
                />
            </view>
        </ai-box>

        <ai-box title="可关闭">
            <view class="ai-margin-bottom--small">
                <ai-alert
                    description="五步一楼，十步一阁；廊腰缦回，檐牙高啄；各抱地势，钩心斗角"
                    type="success"
                    show-icon
                    closable
                />
            </view>
            <view class="ai-margin-bottom--small">
                <ai-alert
                    description="盘盘焉，囷囷焉，蜂房水涡，矗不知其几千万落"
                    type="success"
                    effect="dark"
                    closable
                    show-icon
                />
            </view>
        </ai-box>

        <ai-box title="带标题">
            <view class="ai-margin-bottom--small">
                <ai-alert
                    title="妃嫔媵嫱，王子皇孙，辞楼下殿"
                    description="长桥卧波，未云何龙？复道行空，不霁何虹"
                    type="info"
                    show-icon
                    closable
                />
            </view>
            <view class="ai-margin-bottom--small">
                <ai-alert
                    title="辇来于秦，朝歌夜弦，为秦宫人。明星荧荧，开妆镜也"
                    description="高低冥迷，不知西东。歌台暖响，春光融融；舞殿冷袖，风雨凄凄。一日之内，一宫之间，而气候不齐"
                    type="info"
                    effect="dark"
                    closable
                    show-icon
                />
            </view>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            description: '',
            title: '',
        };
    },
};
</script>

<style lang="scss" scoped></style>
