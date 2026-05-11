import { Suspense, lazy } from "react";
import { useParams, Navigate, Link } from "react-router-dom";

const CompstackPage = lazy(() => import("../../imports/Frame427321900-1/Frame427321900"));
const CatlogAIPage = lazy(() => import("./CatlogAIProjectPage"));

function LoadingFallback() {
  return (
    <div className="min-h-screen w-full bg-canvas flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal mx-auto mb-4" />
        <p className="text-grey-8">Loading...</p>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/" replace />;

  if (slug === "compstack") {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <CompstackPage />
      </Suspense>
    );
  }

  if (slug === "catlog-ai") {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <CatlogAIPage />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen w-full bg-canvas flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-[48px] tracking-[-1.5px] mb-4">Project Not Found</h1>
        <p className="text-grey-9 mb-8">The project "{slug}" doesn't exist.</p>
        <Link to="/" className="text-accent hover:underline">Go back home</Link>
      </div>
    </div>
  );
}
