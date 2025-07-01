/*
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-11 13:40:01
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2025-07-01 15:44:37
 * @FilePath: /Labwant3/src/api/index.ts
 * @Description: api 请求配置
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */

import { PROCESS_MAP, PROCESS_MAP_TYPE } from "@/common/contains";
import Taro from "@tarojs/taro";

// 测试服务器
const baseUrl = "https://fyzcgyxx.com";
// 测试
// const baseUrl = "http://192.168.2.84:9126";

const header = {
    "Content-Type": "application/json",
    Authorization: Taro.getStorageSync("token"),
};

export const setHeader = (key: string, value: string) => {
    header[key] = value;
    Taro.setStorageSync("token", value);
};

export const getHeader = (key: string) => {
    return header[key];
};

export const removeHeader = (key: string) => {
    delete header[key];
};

export const quertFetcher = ([url, data = {}, options = {}]: [
    string,
    any,
    {
        showLoading?: boolean;
        processType?: PROCESS_MAP_TYPE;
    }
]) => {
    return new Promise((resolve, reject) => {
        if (url === null) return;

        const { showLoading = false, processType = "NONE_PROCESS" } = options;

        if (showLoading) {
            Taro.showLoading({
                title: "数据同步",
            });
        }
        Taro.request({
            url: baseUrl + url,
            method: "GET",
            header,
            data: data,
            success: (res) => {
                if (processType !== "NONE_PROCESS") {
                    resolve(PROCESS_MAP[processType](res.data));
                }

                // token过期
                if (res.data.status === 401) {
                    delete header["Authorization"];
                    const pages = Taro.getCurrentPages();
                    if (pages[pages.length - 1].route == "pages/login/index") {
                        return;
                    }
                    Taro.navigateTo({
                        url: "/pages/login/index",
                    });
                }
                resolve(res.data);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                Taro.hideLoading();
            },
        });
    });
};

const createFetcher = (method: keyof Taro.request.Method) => {
    return ([url, fetcherOptions]: [string, any], options: { arg: any; showLoading: boolean }) => {
        return new Promise((resolve, reject) => {
            if (url === null) return;

            const { showLoading = false } = fetcherOptions;

            const { arg } = options;

            if (showLoading) {
                Taro.showLoading({
                    title: "数据同步",
                });
            }

            Taro.request({
                url: baseUrl + url,
                method: method,
                header,
                data: arg,
                success: (res) => {
                    if (res.statusCode.toString().startsWith("2")) {
                        resolve(res.data);
                    }
                    // token过期
                    if (res.data.status === 401) {
                        Taro.navigateTo({
                            url: "/pages/login/index",
                        });
                        delete header["Authorization"];
                    }
                    reject(res.data);
                },
                fail: (err: any) => {
                    reject(err);
                },
                complete: () => {
                    Taro.hideLoading();
                },
            });
        });
    };
};

export const postFetcher = createFetcher("POST");
export const putFetcher = createFetcher("PUT");
export const deleteFetcher = createFetcher("DELETE");
