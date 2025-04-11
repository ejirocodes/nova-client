import type { Route } from "./+types/home";
import { Dashboard } from "../dashboard/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nova" },
    { name: "description", content: "Welcome to Nova" },
  ];
}

export default function Home() {
  return <Dashboard />;
}
