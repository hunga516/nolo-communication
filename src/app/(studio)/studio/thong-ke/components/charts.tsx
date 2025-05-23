'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface ChartData {
    videoData: Array<{ date: string; count: number }>;
    categoryData: Array<{ name: string; count: number }>;
}

interface ChartsProps {
    period?: 'weekly' | 'monthly' | 'yearly';
}

export function Charts({ period = 'weekly' }: ChartsProps) {
    const [data, setData] = useState<ChartData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/statistics?period=${period}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [period]);

    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Video theo ngày</CardTitle>
                        <CardDescription>
                            <Skeleton className="h-4 w-[200px]" />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Video theo danh mục</CardTitle>
                        <CardDescription>
                            <Skeleton className="h-4 w-[200px]" />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Không có dữ liệu</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Không có dữ liệu</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Video theo ngày</CardTitle>
                    <CardDescription>
                        Số lượng video được đăng trong {period === 'weekly' ? '7 ngày qua' : period === 'monthly' ? 'tháng này' : 'năm nay'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.videoData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis 
                                    dataKey="date" 
                                    className="text-sm"
                                    tick={{ fill: 'currentColor' }}
                                />
                                <YAxis 
                                    className="text-sm"
                                    tick={{ fill: 'currentColor' }}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '0.5rem',
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#2563eb"
                                    fillOpacity={1}
                                    fill="url(#colorCount)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Video theo danh mục</CardTitle>
                    <CardDescription>
                        Phân bố video theo các danh mục
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.categoryData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis 
                                    dataKey="name" 
                                    className="text-sm"
                                    tick={{ fill: 'currentColor' }}
                                />
                                <YAxis 
                                    className="text-sm"
                                    tick={{ fill: 'currentColor' }}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '0.5rem',
                                    }}
                                />
                                <Bar 
                                    dataKey="count" 
                                    fill="#2563eb"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 