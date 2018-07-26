﻿import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {QueryParameters} from './QueryParameters';

/**
 * @class SuperMap.QueryBySQLParameters
 * @category  iServer Map QueryResults
 * @classdesc SQL 查询参数类。
 *            该类用于设置 SQL 查询的相关参数。
 * @extends {SuperMap.QueryParameters}
 * @param {Object} options - 参数。
 * @param {string} options.customParams - 自定义参数，供扩展使用。
 * @param {Object} [options.prjCoordSys] - 自定义参数，供 SuperMap Online 提供的动态投影查询扩展使用。如 {"epsgCode":3857}。
 * @param {number} [options.expectCount=10000] - 期望返回结果记录个数。
 * @param {SuperMap.GeometryType} [options.networkType=SuperMap.GeometryType.LINE] - 网络数据集对应的查询类型。
 * @param {SuperMap.QueryOption} options.queryOption - 查询结果类型枚举类。
 * @param {Array.<SuperMap.FilterParameter>} options.queryParams - 查询过滤条件参数数组。
 * @param {number} [options.startRecord=0] - 查询起始记录号。
 * @param {number} [options.holdTime=10] - 资源在服务端保存的时间，单位为分钟。
 * @param {boolean} [options.returnCustomResult=false] - 仅供三维使用。
 * @param {boolean} [options.returnContent=true] - 是否立即返回新创建资源的表述还是返回新资源的 URI。
 */
export class QueryBySQLParameters extends QueryParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        super(options);
        /**
         * @member {boolean} [SuperMap.QueryBySQLParameters.prototype.returnContent=true]
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。
         *              如果为 true，则直接返回新创建资源，即查询结果的表述。
         *              为 false，则返回的是查询结果资源的 URI。
         */
        this.returnContent = true;
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.QueryBySQLParameters";
    }

    /**
     * @function SuperMap.QueryBySQLParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
    }

}
SuperMap.QueryBySQLParameters = QueryBySQLParameters;