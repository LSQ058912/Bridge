/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑     永不宕机     永无BUG
 * 
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-13 10:46:23
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-26 14:34:31
 * @FilePath: /Labwant/src/common/contains.ts
 * @Description: 常量
 * 
 * Copyright (c) 2024 by 904852749@qq.com, All Rights Reserved. 
 */

import { hardwareDataProcess, sensorDataProcess } from "@/lib/process";


/**
 * @description: 公钥
 */
export const RSA_PUBLIC_KEY = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD\n" +
"2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ=="


/**
 * @description: 传感器类型
 */
export enum SENSOR_TYPE {
    TEMPERATURE_SENSOR = 1,     // 温度
    HUMIDITY_SENSOR = 2,    // 湿度
    VOC_SENSOR = 3,        // VOC
    COMBUSTIBLE_GAS_SENSOR = 4  // 可燃气体
}

/**
 * @description: 硬件类型
 */
export enum HARDWARE_TYPE {
    AIR_BLOWER = 1,  // 风机
    ENTRANCE_GUARD = 2,  // 门禁  
    AIR_CONDITIONER = 3, // 空调 
    ACOUSTO_OPTIC_ALARM = 4, // 声光报警器  
    DISCARD_HANDLER = 5, //废弃处置器
    ULTRAVIOLET_LAMP = 6, // 紫外灯
    FLOOD_LIGHT = 10, //照明灯
}

/**
 * @description: 加工函数
 */
export const PROCESS_MAP = {
    SENSOR_PROCESS: sensorDataProcess,
    HARDWRAE_PROCESS: hardwareDataProcess,
    NONE_PROCESS: null
}

export type PROCESS_MAP_TYPE = keyof typeof PROCESS_MAP;