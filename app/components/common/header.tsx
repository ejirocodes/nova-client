import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/react-router";
import { Button } from "../ui/button";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-white/5 bg-[#121212] text-white px-8 py-3">
      <Link to="/" className="flex items-center gap-3.5">
        <img src="/logo.jpg" alt="Nova" className="w-8 h-8 rounded-lg" />
        <h1 className="text-xl font-medium">Nova</h1>
      </Link>
      <SignedOut>
        <Button type="button" variant="secondary">
          <SignInButton />
        </Button>
      </SignedOut>
      <div className="flex items-center gap-3.5">
        <SignedIn>
          <Link
            to="/dashboard"
            className="bg-white/5 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white/10 transition-colors ease-in-out duration-300 cursor-pointer"
          >
            Dashboard
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
