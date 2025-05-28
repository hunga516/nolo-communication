'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Charts } from "./components/charts";
import { trpc } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import {useRef, useEffect } from "react";

export default function Page() {
    // TODO: Lấy id thực tế từ user context hoặc props, tạm hardcode để không lỗi
    const userId = "94ba3123-ec62-4dc3-8f68-a355a3afde80"; // Thay bằng id thực tế của user
    const { data, isLoading } = trpc.studio.statistics.useQuery({ id: userId });
    const summary = data?.summary || { totalVideos: 0 };

    return (
        <div className="container mx-auto py-8 p-4">
            <h1 className="text-3xl font-bold mb-8">Thống kê video clip</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng số video
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <>
                                <Skeleton className="h-8 w-24 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">{summary.totalVideos}</div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% so với tháng trước
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Video mới hôm nay
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <>
                                <Skeleton className="h-8 w-24 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">
                                    +2 so với hôm qua
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Lượt xem trung bình
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <>
                                <Skeleton className="h-8 w-24 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">
                                    +12% so với tuần trước
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Thời gian xem trung bình
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <>
                                <Skeleton className="h-8 w-24 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">0 phút</div>
                                <p className="text-xs text-muted-foreground">
                                    +0.2 phút so với tháng trước
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="weekly" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="weekly">Tuần này</TabsTrigger>
                    <TabsTrigger value="monthly">Tháng này</TabsTrigger>
                    <TabsTrigger value="yearly">Năm nay</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="space-y-4">
                    <Charts period="weekly" />
                </TabsContent>
                <TabsContent value="monthly">
                    <Charts period="monthly" />
                </TabsContent>
                <TabsContent value="yearly">
                    <Charts period="yearly" />
                </TabsContent>
            </Tabs>
        </div>
    );
}