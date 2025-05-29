/*
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-11 14:39:01
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-13 13:54:38
 * @FilePath: /Labwant/src/hooks/useMutate.tsx
 * @Description: 突变api hook
 * 
 * Copyright (c) 2024 by 904852749@qq.com, All Rights Reserved. 
 */


import { deleteFetcher, postFetcher, putFetcher } from "@/api";
import useSWRMutation from "swr/mutation";

const fetcherMap = {
    POST: postFetcher,
    PUT: putFetcher,
    DELETE: deleteFetcher,
};

// type MutationOptionsType = Parameters<typeof useSWRMutation>[2];

export function useMutate(
    url: string,
    options: {
        showLoading?: boolean
    } = {},
    method: keyof Taro.request.Method = "POST",
) {
    let fetcher = fetcherMap[method];

    const { trigger, isMutating, error, data } = useSWRMutation([url, options], fetcher);

    return { trigger, isMutating, error, data };
}
