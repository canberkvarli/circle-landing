import FullCircleLandingPage from "@/app/components/CircleLandingPage";

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <FullCircleLandingPage />
    </>
  );
}
