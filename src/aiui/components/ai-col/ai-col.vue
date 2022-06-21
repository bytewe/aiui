<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-12 22:19:02
 * @Description: 栅格系统的列
-->

<template>
    <view ref="ai-col" class="ai-col" :class="['ai-col-' + span]" :style="[colStyle]" @click="onClick">
        <slot />
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiCol',
    mixins: [mixins],
    props: {
        // 占父容器宽度的多少等分，总分为12份
        span: {
            type: [String, Number],
            default: 12,
        },
        // 指定栅格左侧的间隔数(总12栏)
        offset: {
            type: [String, Number],
            default: 0,
        },
        // 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
        justify: {
            type: String,
            default: 'start',
        },
        // 垂直对齐方式，可选值为top、center、bottom、stretch
        align: {
            type: String,
            default: 'stretch',
        },
        // 文字对齐方式
        textAlign: {
            type: String,
            default: 'left',
        },
    },
    data() {
        return {
            width: 0,
            parentData: {
                gutter: 0,
            },
            gridNum: 12,
        };
    },
    computed: {
        justifyContent() {
            if (this.justify == 'end' || this.justify == 'start') return 'flex-' + this.justify;
            else if (this.justify == 'around' || this.justify == 'between') return 'space-' + this.justify;
            else return this.justify;
        },
        alignItem() {
            if (this.align == 'top') return 'flex-start';
            if (this.align == 'bottom') return 'flex-end';
            else return this.align;
        },
        colStyle() {
            const style = {
                alignItems: this.alignItem,
                justifyContent: this.justifyContent,
                textAlign: this.textAlign,
                // #ifndef APP-NVUE
                // 在非nvue上，使用百分比形式
                flex: `0 0 ${(100 / this.gridNum) * this.span}%`,
                marginLeft: (100 / 12) * this.offset + '%',
                // #endif
                // #ifdef APP-NVUE
                // 在nvue上，由于无法使用百分比单位，这里需要获取父组件的宽度，再计算得出该有对应的百分比尺寸
                width: uni.$util.addUnit(Math.floor((this.width / this.gridNum) * Number(this.span))),
                // eslint-disable-next-line no-dupe-keys
                marginLeft: uni.$util.addUnit(Math.floor((this.width / this.gridNum) * Number(this.offset))),
                // #endif
            };
            if (this.parentData.gutter) {
                const gutter = uni.$util.deleteUnit(
                    uni.$config[`space-${this.parentData.gutter}`] || this.parentData.gutter
                );
                style.paddingLeft = uni.$util.addUnit(gutter / 2);
                style.paddingRight = uni.$util.addUnit(gutter / 2);
            }
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            // 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
            this.updateParentData();
            this.width = await this.parent.getComponentWidth();
        },
        updateParentData() {
            this.getParentData('AiRow');
        },
        onClick() {
            this.$emit('click');
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-col {
    display: flex;
    flex-direction: column;
    padding: 0;
    /* #ifdef MP */
    display: block;
    /* #endif */
}

// nvue下百分比无效
/* #ifndef APP-NVUE */
.ai-col-0 {
    width: 0;
}

.ai-col-1 {
    width: calc(100% / 12);
}

.ai-col-2 {
    width: calc(100% / 12 * 2);
}

.ai-col-3 {
    width: calc(100% / 12 * 3);
}

.ai-col-4 {
    width: calc(100% / 12 * 4);
}

.ai-col-5 {
    width: calc(100% / 12 * 5);
}

.ai-col-6 {
    width: calc(100% / 12 * 6);
}

.ai-col-7 {
    width: calc(100% / 12 * 7);
}

.ai-col-8 {
    width: calc(100% / 12 * 8);
}

.ai-col-9 {
    width: calc(100% / 12 * 9);
}

.ai-col-10 {
    width: calc(100% / 12 * 10);
}

.ai-col-11 {
    width: calc(100% / 12 * 11);
}

.ai-col-12 {
    width: calc(100% / 12 * 12);
}

/* #endif */
</style>
