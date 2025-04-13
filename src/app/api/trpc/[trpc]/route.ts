import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";

// handler cho GET và POST requests
const handler = async (req: Request) => {
  try {
    // Đọc query từ URL trong request
    const url = new URL(req.url);
    const query = url.searchParams;

    // Kiểm tra nếu query không có
    if (!query || query.toString() === "") {
      return new Response(JSON.stringify({ error: "Query is undefined" }), {
        status: 400,
      });
    }

    // Gọi fetchRequestHandler để xử lý request TRPC
    return await fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext: createTRPCContext,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
};

export { handler as GET, handler as POST };
