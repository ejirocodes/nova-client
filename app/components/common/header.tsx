import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/react-router";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="flex items-center border-b border-white/5 justify-between bg-[#121212] text-white p-4 py-3">
      <SignedOut>
        <Button type="button" variant="secondary">
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
