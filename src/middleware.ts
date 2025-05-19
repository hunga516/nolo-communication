import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/cong-dong(.*)",
  "/vi-short",
  "/giao-dich(.*)",
  "/cua-hang(.*)",
  "/nhiem-vu(.*)",
  "/studio(.*)",
  "/studio/video",
]);

export default clerkMiddleware(async (auth, req) => {
//    try {
//   // Lấy IP từ API
//   const response = await fetch('http://103.249.200.149:5000/get_my_ip');
  
//   if (!response.ok) {
//     throw new Error('Không thể lấy IP từ API');
//   }

//   const data = await response.json();
//   const clientIp = data;  // Giả sử 'data' chứa trường 'ip'

//   console.log('Địa chỉ IP của client:', clientIp);

//   // Kiểm tra số lượng yêu cầu từ IP này
//   const response2 = await fetch('http://103.249.200.149:5000/check_request_limit', {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ ip: clientIp }),
//   });

//   if (!response2.ok) {
//     throw new Error('Không thể kiểm tra giới hạn yêu cầu');
//   }

//   const data2 = await response2.json();

//   console.log('Thông điệp từ server:', data2.message);  // Kiểm tra trường 'message' trong dữ liệu trả về

// } catch (e) {
//   console.error('Đã xảy ra lỗi:', e);
// }

    
  
  if (isProtectedRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: `${req.nextUrl.origin}/sign-in?redirectTo=${req.url}`,
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
  headers: [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'ALLOWALL',
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src * 'self' data: blob: 'unsafe-inline' 'unsafe-eval'",
        },
      ],
    },
  ],
};
