import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/react-router";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-white/5 bg-[#121212] text-white px-8 py-3">
      <h1 className="text-xl font-medium">Nova</h1>
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
