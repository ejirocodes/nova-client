import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useClerk } from "@clerk/react-router";

type VerificationStatus =
  | "loading"
  | "verified"
  | "expired"
  | "failed"
  | "client_mismatch";

export function meta() {
  return [
    { title: "Nova - Verify Email" },
    { name: "description", content: "Verify your email address to continue" },
  ];
}

export default function VerifyEmailAddress() {
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("loading");
  const { handleEmailLinkVerification, loaded } = useClerk();

  async function verify() {
    try {
      await handleEmailLinkVerification({
        redirectUrl: "/dashboard",
      });
      setVerificationStatus("verified");
    } catch (err: any) {
      let status: VerificationStatus = "failed";

      // Check for specific error types
      if (err.code) {
        if (
          err.code === "email_link_error" &&
          err.longMessage?.includes("expired")
        ) {
          status = "expired";
        } else if (
          err.code === "email_link_error" &&
          err.longMessage?.includes("different device")
        ) {
          status = "client_mismatch";
        }
      }

      setVerificationStatus(status);
    }
  }

  useEffect(() => {
    if (!loaded) return;
    verify();
  }, [loaded]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] p-4">
      <div className="w-full max-w-md rounded-lg bg-[#1a1a1a] p-6 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-white">
          Verify your email
        </h1>

        {verificationStatus === "loading" && (
          <p className="text-white">Verifying your email...</p>
        )}

        {verificationStatus === "verified" && (
          <div>
            <p className="mb-4 text-green-400">
              Your email has been successfully verified!
            </p>
            <Link
              to="/dashboard"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {verificationStatus === "expired" && (
          <div>
            <p className="mb-4 text-amber-400">
              The verification link has expired.
            </p>
            <Link
              to="/auth/sign-up"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Try signing up again
            </Link>
          </div>
        )}

        {verificationStatus === "client_mismatch" && (
          <div>
            <p className="mb-4 text-amber-400">
              You must verify your email from the same device and browser that
              you started the sign-up process on.
            </p>
            <Link
              to="/auth/sign-up"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Try signing up again
            </Link>
          </div>
        )}

        {verificationStatus === "failed" && (
          <div>
            <p className="mb-4 text-red-400">
              We encountered an error while verifying your email.
            </p>
            <Link
              to="/auth/sign-up"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Try signing up again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
