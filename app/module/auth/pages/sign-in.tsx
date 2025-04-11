import { SignIn } from "@clerk/react-router";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@clerk/react-router";
import { useEffect, useState } from "react";
import { AuthLayout } from "../layout/auth-layout";

export default function SignInPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, isLoaded } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const from = location.state?.from || "/";

  useEffect(() => {
    if (isLoaded && userId) {
      navigate("/", { replace: true });
    }
  }, [isLoaded, userId, navigate, from]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <AuthLayout
      title=""
      subtitle=""
      isLoading={isLoading}
      footer={
        <p className="">
          Need help?{" "}
          <a
            href="https://www.linkedin.com/company/parahuman"
            target="_blank"
            className="text-primary hover:underline"
          >
            Contact support
          </a>
        </p>
      }
    >
      <SignIn
        path="/auth/sign-in"
        routing="path"
        signUpUrl="/auth/sign-up"
        fallbackRedirectUrl={"/dashboard"}
        afterSignOutUrl={"/auth/sign-in"}
        signInUrl="/auth/sign-in"
        appearance={{
          elements: {
            rootBox: "mx-auto w-full",
            card: "shadow-none",
          },
        }}
      />
    </AuthLayout>
  );
}
