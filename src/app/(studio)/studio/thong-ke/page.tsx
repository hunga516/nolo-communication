'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Charts } from "./components/charts";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
    const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
    const [summary, setSummary] = useState({
        totalVideos: 0,
        newVideosToday: 0,
        averageViews: 0,
        averageWatchTime: '0'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/statistics?period=${period}`);
                const data = await response.json();
                setSummary(data.summary);
            } catch (error) {
                console.error('Error fetching summary:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [period]);

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
                        {loading ? (
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
                        {loading ? (
                            <>
                                <Skeleton className="h-8 w-24 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">{summary.newVideosToday}</div>
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
                        {loading ? (
                            <>
                                <Skeleton className="h-8 w-24 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">{summary.averageViews.toLocaleString()}</div>
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
                        {loading ? (
                            <>
                                <Skeleton className="h-8 w-24 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">{summary.averageWatchTime} phút</div>
                                <p className="text-xs text-muted-foreground">
                                    +0.2 phút so với tháng trước
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="weekly" className="space-y-4" onValueChange={(value) => setPeriod(value as 'weekly' | 'monthly' | 'yearly')}>
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