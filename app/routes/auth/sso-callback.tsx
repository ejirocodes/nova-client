import { AuthenticateWithRedirectCallback } from "@clerk/react-router";

export default function SSOCallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
