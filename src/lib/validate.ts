/*
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *                               神兽保佑            永无BUG
 * 
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-19 11:13:21
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-19 12:38:15
 * @FilePath: /Labwant/src/lib/validate.ts
 * @Description: 校验工具
 * 
 * Copyright (c) 2024 by 赵晨炀, All Rights Reserved. 
 */

import Schema, {type Value, type Rules} from "async-validator"

/**
 * @description: 表单校验
 * @param {ValidateSource} value
 * @param {Rules} rules
 * @return {*}
 */
export const onValidateField = (value: Value, rules: Rules) => {
    const validator = new Schema(rules);
    return new Promise<any>((resolve) => {
      // @ts-ignore
      validator.validate(value, (errors, fields) => {
        if (errors) {
          resolve(errors);
        } else {
          resolve(null);
        }
      });
    });
  };
  
