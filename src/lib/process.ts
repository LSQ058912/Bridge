
/*
 * 
 *    ┏┓　　　┏┓
 *  ┏┛┻━━━┛┻┓
 *  ┃　　　　　　　┃
 *  ┃　　　━　　　┃
 *  ┃　＞　　　＜　┃
 *  ┃　　　　　　　┃
 *  ┃...　⌒　...　┃
 *  ┃　　　　　　　┃
 *  ┗━┓　　　┏━┛
 *      ┃　　　┃　
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃  神兽保佑
 *      ┃　　　┃  代码无bug　　
 *      ┃　　　┃
 *      ┃　　　┗━━━┓
 *      ┃　　　　　　　┣┓
 *      ┃　　　　　　　┏┛
 *      ┗┓┓┏━┳┓┏┛
 *        ┃┫┫　┃┫┫
 *        ┗┻┛　┗┻┛
 * 
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-13 11:29:29
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-19 13:59:29
 * @FilePath: /Labwant/src/lib/process.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 赵晨炀, All Rights Reserved. 
 */

/**
 * @description: 传感器加工函数
 * @param {*} data
 * @return {*}
 */
export const sensorDataProcess = (data) => {
    const map = {};
    data.content.forEach((item) => {
        map[item.type] = item;
    });
    return map;
};

/**
 * @description: 传感器加工函数
 * @param {*} data
 * @return {*}
 */
export const hardwareDataProcess = (data) => {
    const map = {};
    data.content.forEach((item) => {
        map[item.type] = item;
    });
    return map;
};


