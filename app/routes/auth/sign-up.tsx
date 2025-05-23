import SignUpPage from "~/module/auth/pages/sign-up";

export function meta() {
  return [
    { title: "Nova - Sign Up" },
    { name: "description", content: "Create your account to get started" },
  ];
}

export default function SignUp() {
  return <SignUpPage />;
}
