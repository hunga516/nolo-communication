import VideosSection from "@/modules/studio/ui/sections/videos-section";

const StudioView = () => {
  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
        <div className="px-4">
            <h1 className="text-2xl font-bold">Nội dung</h1>
            <p className="text-sm text-muted-foreground">
                Quản lý các nội dung và video của bạn
            </p>
        </div>
      <VideosSection />
    </div>
  );
};

export default StudioView;
