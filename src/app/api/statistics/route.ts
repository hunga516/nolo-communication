import { NextResponse } from 'next/server';
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns';
import { vi } from 'date-fns/locale';

// Giả lập dữ liệu từ database
const generateMockData = (period: 'weekly' | 'monthly' | 'yearly') => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;
    let dateArray: Date[];

    switch (period) {
        case 'weekly':
            startDate = subDays(now, 6);
            endDate = now;
            dateArray = eachDayOfInterval({ start: startDate, end: endDate });
            break;
        case 'monthly':
            startDate = startOfMonth(now);
            endDate = endOfMonth(now);
            dateArray = eachWeekOfInterval({ start: startDate, end: endDate });
            break;
        case 'yearly':
            startDate = startOfYear(now);
            endDate = endOfYear(now);
            dateArray = eachMonthOfInterval({ start: startDate, end: endDate });
            break;
    }

    const videoData = dateArray.map(date => ({
        date: format(date, period === 'weekly' ? 'dd/MM' : period === 'monthly' ? 'dd/MM' : 'MM/yyyy', { locale: vi }),
        count: Math.floor(Math.random() * 10) + 1
    }));

    const categoryData = [
        { name: 'Game', count: Math.floor(Math.random() * 20) + 5 },
        { name: 'Âm nhạc', count: Math.floor(Math.random() * 15) + 3 },
        { name: 'Giáo dục', count: Math.floor(Math.random() * 10) + 2 },
        { name: 'Giải trí', count: Math.floor(Math.random() * 25) + 8 },
        { name: 'Thể thao', count: Math.floor(Math.random() * 12) + 4 },
    ].sort((a, b) => b.count - a.count); // Sắp xếp theo số lượng giảm dần

    const totalVideos = categoryData.reduce((sum, cat) => sum + cat.count, 0);
    const newVideosToday = Math.floor(Math.random() * 10) + 1;
    const averageViews = Math.floor(Math.random() * 2000) + 1000;
    const averageWatchTime = (Math.random() * 5 + 2).toFixed(1);

    return {
        videoData,
        categoryData,
        summary: {
            totalVideos,
            newVideosToday,
            averageViews,
            averageWatchTime
        }
    };
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') as 'weekly' | 'monthly' | 'yearly' || 'weekly';

    const data = generateMockData(period);

    return NextResponse.json(data);
} 