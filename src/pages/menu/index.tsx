/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-06 17:08:31
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-26 10:09:22
 * @FilePath: /Labwant/src/pages/menu/index.tsx
 * @Description: 菜单页面
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */
import { Page } from "@/components/Page";
import { View, Image } from "@tarojs/components";
import { Card } from "./Card";
import Taro, { useLoad } from "@tarojs/taro";
import { getHeader, removeHeader } from "@/api";
import { useImmutableQuery } from "@/hooks/useQuery";

export default function Menu() {
    const { data: userInfo } = useImmutableQuery("/auth/info");

    useLoad(() => {
        if (!getHeader("Authorization")) {
            Taro.navigateTo({ url: "/pages/login/index" });
        }
    });

    const logout = () => {
        removeHeader("Authorization");
        Taro.removeStorageSync("token");
        Taro.navigateTo({ url: "/pages/login/index" });
    };

    return (
        <Page className=" bg-white">
            <View className=" flex justify-between py-6 items-center">
                <Image
                    className=" w-32 h-auto object-cover"
                    mode="widthFix"
                    src={require("@/assets/png/logo.jpg")}
                    fadeIn
                >
                    Logo
                </Image>
                {/* <Image
                    className=" w-9 h-9 bg-gray-300 rounded-full bg-fill-base"
                    src={userInfo?.user?.avatarPath ?? ""}
                    onClick={() => logout()}
                ></Image> */}
            </View>
            <View className=" grid grid-cols-2 gap-3">
                <Card
                    title="智能库房"
                    subTitle="智能化操作"
                    icon={require("@/assets/svg/menu.svg")}
                    onClick={() => {
                        Taro.navigateTo({ url: "/pages/intelligentWarehouse/index" });
                    }}
                ></Card>
                 <Card
                    title="视频监控"
                    subTitle="实时监控"
                    icon={require("@/assets/svg/menu.svg")}
                    onClick={() => {
                        Taro.navigateTo({ url: "/pages/pageHaijun/index" });
                    }}
                ></Card>
                {/* <Card v-if="false"
                    title="测试"
                    subTitle="测试"
                    icon={require("@/assets/svg/menu.svg")}
                    onClick={() => {
                        Taro.navigateTo({ url: "/pages/order/index" });
                    }}
                ></Card> */}
                <Card
                    className=" opacity-50"
                    title="敬请期待"
                    subTitle="持续更新中..."
                    showGo={false}
                    icon={require("@/assets/svg/more.svg")}
                ></Card>
            </View>
        </Page>
    );
}
