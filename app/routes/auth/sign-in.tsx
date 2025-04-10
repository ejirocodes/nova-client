import SignInPage from "~/module/auth/pages/sign-in";
import type { Route } from "../+types/sign-in";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nova - Sign In" },
    { name: "description", content: "Welcome to Nova" },
  ];
}

export default function SignIn() {
  return <SignInPage />;
}
