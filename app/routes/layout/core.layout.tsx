import { Outlet } from "react-router";
import Header from "~/components/common/header";

export default function DashboardLayout() {
  return (
    <main className="h-full w-full overflow-hidden bg-[#121212] ">
      <Header />
      <Outlet />
    </main>
  );
}
