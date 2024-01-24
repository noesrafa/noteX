"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import React from "react";

const MarketingPage = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <div className="w-full min-h-full ">
      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && !isAuthenticated && (
        <SignInButton mode="modal">
          <button>Sign in</button>
        </SignInButton>
      )}
      {!isLoading && isAuthenticated && <UserButton afterSignOutUrl="/" />}
    </div>
  );
};

export default MarketingPage;
