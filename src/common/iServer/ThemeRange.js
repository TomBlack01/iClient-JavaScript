﻿import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Theme} from './Theme';
import {ThemeRangeItem} from './ThemeRangeItem';
import {RangeMode, ColorGradientType} from '../REST';

/**
 * @class SuperMap.ThemeRange
 * @category  iServer Map Theme
 * @classdesc 范围分段专题图。
 * @description 范围分段专题图是按照指定的分段方法（如：等距离分段法）对字段的属性值进行分段，使用不同的颜色或符号（线型、填充）表示不同范围段落的属性值在整体上的分布情况，体现区域的差异。
 *              在分段专题图中，专题值按照某种分段方式被分成多个范围段，要素根据各自的专题值被分配到其中一个范围段中，在同一个范围段中的要素使用相同的颜色，填充，符号等风格进行显示。
 *              分段专题图所基于的专题变量必须为数值型，分段专题图一般用来反映连续分布现象的数量或程度特征，如降水量的分布，土壤侵蚀强度的分布等。
 * @extends {SuperMap.Theme}
 * @param {Object} options - 参数。
 * @param {Array.<SuperMap.ThemeRangeItem>} options.items - 分段专题图子项数组。
 * @param {string} options.rangeExpression - 分段字段表达式。
 * @param {SuperMap.RangeMode} [options.rangeMode=SuperMap.RangeMode.EQUALINTERVAL] - 分段专题图的分段模式。
 * @param {number} options.rangeParameter - 分段参数。
 * @param {SuperMap.ColorGradientType} [options.colorGradientType=SuperMap.ColorGradientType.YELLOW_RED] - 渐变颜色枚举类。
 * @param {SuperMap.ThemeMemoryData} [options.memoryData] - 专题图内存数据。
 */
export class ThemeRange extends Theme {

    constructor(options) {
        super("RANGE", options);
        /**
         * @member {string} SuperMap.ThemeRange.prototype.precision
         * @description 精准度
         */
        this.precision = '1.0E-12';

        /**
         * @member {Array.<SuperMap.ThemeRangeItem>} SuperMap.ThemeRange.prototype.items
         * @description 分段专题图子项数组。
         *              在分段专题图中，字段值按照某种分段模式被分成多个范围段，每个范围段即为一个子项，同一范围段的要素属于同一个分段专题图子项。
         *              每个子项都有其分段起始值、终止值、名称和风格等。每个分段所表示的范围为[start, end)。
         *              如果设置了范围分段模式和分段数，则会自动计算每段的范围[start, end)，故无需设置[start, end)；当然可以设置，那么结果就会按照您设置的值对分段结果进行调整。
         */
        this.items = null;

        /**
         * @member {string} SuperMap.ThemeRange.prototype.rangeExpression
         * @description 分段字段表达式。
         *              由于范围分段专题图基于各种分段方法根据一定的距离进行分段，因而范围分段专题图所基于的字段值的数据类型必须为数值型。对于字段表达式，只能为数值型的字段间的运算。必设字段。
         */
        this.rangeExpression = null;

        /**
         * @member {SuperMap.RangeMode} SuperMap.ThemeRange.prototype.rangeMode
         * @description 分段专题图的分段模式。
         *              默认值为 {@link RangeMode|SuperMap.RangeMode.EQUALINTERVAL}（等距离分段）。
         *              在分段专题图中，作为专题变量的字段或表达式的值按照某种分段方式被分成多个范围段。
         *              目前 SuperMap 提供的分段方式包括：等距离分段法、平方根分段法、标准差分段法、对数分段法、等计数分段法和自定义距离法，
         *              显然这些分段方法根据一定的距离进行分段，因而范围分段专题图所基于的专题变量必须为数值型。
         */
        this.rangeMode = RangeMode.EQUALINTERVAL;

        /**
         * @member {number} SuperMap.ThemeRange.prototype.rangeParameter
         * @description 分段参数。
         *              当分段模式为等距离分段法，平方根分段，对数分段法，计数分段法其中一种模式时，该参数用于设置分段个数，必设；当分段模式为标准差分段法时，
         *              该参数不起作用；当分段模式为自定义距离时，该参数用于设置自定义距离。默认值为 -1。
         */
        this.rangeParameter = 0;

        /**
         * @member {SuperMap.ColorGradientType} [SuperMap.ThemeRange.prototype.colorGradientType=SuperMap.ColorGradientType.YELLOW_RED]
         * @description 渐变颜色枚举类。
         *              渐变色是由起始色根据一定算法逐渐过渡到终止色的一种混合型颜色。
         *              该类作为单值专题图参数类、分段专题图参数类的属性，负责设置单值专题图、分段专题图的配色方案，在默认情况下专题图所有子项会根据这个配色
         *              方案完成填*充。但如果为某几个子项的风格进行单独设置后（设置了 {@link SuperMap.ThemeUniqueItem} 或 {@link SuperMap.ThemeRangeItem} 类中Style属性），
         *              该配色方案对于这几个子项将不起作用。
         */
        this.colorGradientType = ColorGradientType.YELLOW_RED;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeRange";
    }


    /**
     * @function SuperMap.ThemeRange.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.items) {
            if (me.items.length > 0) {
                for (var item in me.items) {
                    me.items[item].destroy();
                    me.items[item] = null;
                }
            }
            me.items = null;
        }
        me.rangeExpression = null;
        me.rangeMode = null;
        me.rangeParameter = null;
        me.colorGradientType = null;
    }

    /**
     * @function SuperMap.ThemeRange.fromObj
     * @description 从传入对象获取范围分段专题图类。
     * @param {Object} obj - 传入对象。
     * @returns {SuperMap.ThemeRange} ThemeRange对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeRange();
        Util.copy(res, obj);
        var itemsR = obj.items;
        var len = itemsR ? itemsR.length : 0;
        res.items = [];
        for (var i = 0; i < len; i++) {
            res.items.push(ThemeRangeItem.fromObj(itemsR[i]));
        }
        return res;
    }

}

SuperMap.ThemeRange = ThemeRange;
