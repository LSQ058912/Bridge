/*
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-11 14:25:04
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-26 13:33:12
 * @FilePath: /Labwant/src/hooks/useQuery.tsx
 * @Description: 查询api hook
 *
 * Copyright (c) 2024 by 904852749@qq.com, All Rights Reserved.
 */

import useSWRImmutable from "swr/immutable";
import { PROCESS_MAP_TYPE } from "@/common/contains";
import { getHeader } from "@/api";


export function useImmutableQuery<T = any>(
    url: string | null,
    params: any = {},
    options: {
        showLoading?: boolean;
        processType?: PROCESS_MAP_TYPE;
    } = {}
) {
    type t = keyof T
    
    const token = getHeader("Authorization")
    const { data, isLoading, isValidating, error, mutate } = useSWRImmutable<T>([
        url,
        url === null ? {} : params,
        options,
        token
    ]);

    return { data, isLoading, isValidating, error, mutate };
}
