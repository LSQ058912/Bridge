/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-06 10:28:50
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2025-07-01 16:19:59
 * @FilePath: /Labwant3/src/pages/login/index.tsx
 * @Description: 登录页面
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */
import { Page } from "@/components/Page";
import { cn } from "@/lib/utils";
import { View, Image, Picker, Form, Button } from "@tarojs/components";
import { useState } from "react";
import { AtList, AtListItem } from "taro-ui";
import { useImmutableQuery } from "@/hooks/useQuery";
import { useMutate } from "@/hooks/useMutate";
import JSEncrypt from "jsencrypt";
import { RSA_PUBLIC_KEY } from "@/common/contains";
import { setHeader } from "@/api";
import Taro from "@tarojs/taro";
import { showInfoToast } from "@/lib/tip";
import { ValidateInput } from "@/components/ValidateInput";

const units = ["海军"];

export default function Login() {
    const [unit, setUnit] = useState(units[0]);
    const { data: code, mutate: refresh } = useImmutableQuery("/auth/code");
    const { trigger: login } = useMutate("/auth/login", { showLoading: true });

    const onChange = (e) => {
        setUnit(units[e.detail.value]);
    };

    /**
     * @description: 提交表单
     * @param {*} e
     * @return {*}
     */
    const submitHandle = (e) => {
        const { unit, password } = e.detail.value;
        console.log(e.detail.value);
        // if (!unit) {
        //     showInfoToast("请选择单位");
        //     return;
        // }

        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(RSA_PUBLIC_KEY);
        const encrypted = encrypt.encrypt(password);
        const params = {
            ...e.detail.value,
            password: encrypted,
            uuid: code.uuid,
        };
        login(params, {
            onSuccess: (data: any) => {
                setHeader("Authorization", data.token);
                Taro.reLaunch({ url: "/pages/menu/index" });
            },
            onError: (err: any) => {
                Taro.showToast({
                    title: err.message,
                    icon: "none",
                });
                // 刷新验证码
                refresh();
            },
        });
    };

    return (
        <Page className="px-10 pt-6 bg-white">
            <Image
                className=" absolute w-32 h-auto object-cover left-4"
                mode="widthFix"
                src={require("@/assets/png/logo.jpg")}
                fadeIn
            >
                Logo
            </Image>
            <Image
                className=" block mt-14 w-52 h-52 object-cover  bg-gray-300 mx-auto my-4"
                src={require("@/assets/jpg/labwant.pic.jpg")}
            ></Image>

            <Form onSubmit={submitHandle}>
                <View className=" flex w-full h-12 rounded-full bg-fill-base items-center relative">
                    <Image
                        className=" w-6 h-6 ml-5"
                        src={require("@/assets/svg/account.svg")}
                    ></Image>
                    <ValidateInput
                        name="username"
                        className=" p-3 flex-grow text-text-primary"
                        placeholderClass=" text-text-placeholder"
                        type="text"
                        placeholder="请输入账号"
                        rules={[{ required: true, message: "请输入账号" }]}
                    />
                </View>
                <View className=" mt-5 flex w-full h-12 rounded-full bg-fill-base items-center relative">
                    <Image className=" w-6 h-6 ml-5" src={require("@/assets/svg/lock.svg")}></Image>
                    <ValidateInput
                        name="password"
                        className=" p-3 flex-grow text-text-primary"
                        placeholderClass=" text-text-placeholder"
                        password
                        placeholder="请输入密码"
                        rules={[{ required: true, message: "请输入密码" }]}
                    />
                </View>

                <View className=" mt-5 h-12  w-full flex rounded-full bg-fill-base items-center relative">
                    <Image className=" w-6 h-6 ml-5" src={require("@/assets/svg/unit.svg")}></Image>
                    <Picker
                        name="unit"
                        mode="selector"
                        className={cn(
                            " ml-3 flex-1 h-12 flex flex-grow items-center relative text-text-placeholder",
                            unit && " text-text-primary"
                        )}
                        range={units}
                        onChange={onChange}
                    >
                        <AtList className=" flex-grow w-56">
                            <AtListItem className="flex-grow flex " title={unit || "请选择单位"} />
                        </AtList>
                    </Picker>
                </View>

                <View className=" mt-5 h-12 w-full flex items-center">
                    <View className=" flex w-full rounded-full bg-fill-base items-center relative">
                        <ValidateInput
                            name="code"
                            className=" py-3 px-6 w-full text-text-primary"
                            placeholderClass=" text-text-placeholder"
                            type="text"
                            placeholder="请输入验证码"
                            rules={[{ required: true, message: "请输入验证码" }]}
                        />
                    </View>
                    <Image
                        className=" ml-2 bg-red-50 h-9"
                        src={code?.img}
                        onClick={() => refresh()}
                    ></Image>
                </View>
                <Button
                    formType="submit"
                    className=" mt-5 h-12 flex justify-center items-center rounded-full bg-brand-600 text-white font-normal"
                >
                    登录
                </Button>
            </Form>
        </Page>
    );
}
