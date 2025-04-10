import { Outlet } from "react-router";
import Header from "~/components/common/header";

export default function DashboardLayout() {
  return (
    <main className="h-full w-full bg-primary/5 overflow-hidden">
      <Header />
      <Outlet />
    </main>
  );
}
