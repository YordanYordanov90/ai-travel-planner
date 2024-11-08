import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-end gap-6 p-6 absolute top-0 left-0 right-0 z-50 bg-dark max-w-[1440px] ">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className='flex gap-4'>
          
        <Button asChild variant="outline" className='text-white'>
          <Link href="/my-plans">My Plans</Link>
        </Button>
        <UserButton />
        </div>
      </SignedIn>
    </header>
  );
};

export default Header;
