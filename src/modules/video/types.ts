import { inferRouterOutputs } from '@trpc/server'

import { AppRouter } from '@/trpc/routers/_app'

export type VideoGetOneOutput = inferRouterOutputs<AppRouter>['videos']['getOne']
export type VideoGetManyItem = inferRouterOutputs<AppRouter>['videos']['getMany']['items'][number];
export type VideoGetOneOutoutWithoutViewerReaction = Omit<
    VideoGetOneOutput,
    'viewerReaction'
>