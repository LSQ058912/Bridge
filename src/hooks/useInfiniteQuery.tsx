/*
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-11 14:25:04
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-19 10:43:44
 * @FilePath: /Labwant/src/hooks/useInfiniteQuery.tsx
 * @Description: 分页查询api hook
 *
 * Copyright (c) 2024 by 904852749@qq.com, All Rights Reserved.
 */

import useSWRInfinite from "swr/infinite";
import { PROCESS_MAP_TYPE } from "@/common/contains";
import { getHeader, quertFetcher } from "@/api";
import { useCallback, useState } from "react";



export function useInfiniteQuery(
    url: string | null,
    params: any = {},
    options: {
        showLoading?: boolean;
        processType?: PROCESS_MAP_TYPE;
    } = {}
) {
    const [limit, setLimit] = useState(10);

    const getKey = useCallback((pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.content.length) {
            return null;
        } // reached the end
        const token = getHeader("Authorization");
        const baseParams = {
            current: pageIndex + 1,
            size: limit,
        };
        return [url, url === null ? {} : { ...baseParams, ...params }, options, token]; // SWR key
    }, [url, params]);

    const { data, isLoading, isValidating, error, mutate, size, setSize } = useSWRInfinite(
        getKey,
        quertFetcher,
        {
            revalidateFirstPage: false,
        }
    );

    const next = () => {
        if (isLoading) return;
        setSize(size + 1);
    };

    return {
        data: data as any,
        isLoading,
        isValidating,
        error,
        mutate,
        current: size,
        next,
        setSize: setLimit,
    };
}
