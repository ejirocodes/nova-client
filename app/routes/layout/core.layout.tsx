import { useAuth } from "@clerk/react-router";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "~/components/common/header";

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/auth/sign-in", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [isLoaded, userId, navigate, location.pathname]);

  if (!isLoaded) {
    return (
      <div className="h-screen grid place-items-center bg-primary/5">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-700 font-medium">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="h-screen grid place-items-center bg-primary/5">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-700 font-medium">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="h-full w-full overflow-hidden bg-[#121212] ">
      <Header />
      <Outlet />
    </main>
  );
}
