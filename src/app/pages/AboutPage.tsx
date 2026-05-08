import { Suspense, lazy } from "react";

const AboutPageComponent = lazy(() => import("../../imports/Frame427321899/Frame427321899"));

export default function AboutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-canvas flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal mx-auto mb-4" />
            <p className="text-grey-8">Loading...</p>
          </div>
        </div>
      }
    >
      <AboutPageComponent />
    </Suspense>
  );
}
