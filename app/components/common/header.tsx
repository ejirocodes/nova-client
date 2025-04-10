import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/react-router";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-end border-b border-white/5 bg-[#121212] text-white px-8 py-3">
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
