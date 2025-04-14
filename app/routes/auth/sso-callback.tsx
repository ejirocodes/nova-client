import { AuthenticateWithRedirectCallback } from "@clerk/react-router";
import { Loader2 } from "lucide-react";
export default function SSOCallback() {
  return (
    <div className="flex justify-center items-center h-screen text-black">
      <Loader2 className="w-10 h-10 animate-spin" />
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
