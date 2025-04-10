import { SignUp } from "@clerk/react-router";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@clerk/react-router";
import { useEffect, useState } from "react";
import { AuthLayout } from "../layout/auth-layout";

export default function SignUpPage() {
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
      title="Join Nova"
      subtitle="Create your account to get started"
      isLoading={isLoading}
      footer={
        <p>
          By signing up, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      }
    >
      <SignUp
        path="/auth/sign-up"
        routing="path"
        signInUrl="/auth/sign-in"
        afterSignOutUrl={"/"}
        signInForceRedirectUrl={"/"}
        signInFallbackRedirectUrl={"/"}
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            footerActionLink: "text-primary hover:text-primary/90",
          },
        }}
      />
    </AuthLayout>
  );
}
