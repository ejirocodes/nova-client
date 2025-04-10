import SignInPage from "~/module/auth/pages/sign-in";

export function meta() {
  return [
    { title: "Nova - Sign In" },
    { name: "description", content: "Welcome to Nova" },
  ];
}

export default function SignIn() {
  return <SignInPage />;
}
