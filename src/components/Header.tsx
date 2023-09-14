import React from "react";
import Button from "./Button";
import { auth, logout } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user && (
        <div className="flex justify-center items-center space-x-2">
          {user.photoURL ? (
            <img
              className="w-8 h-8 rounded-full"
              src={user.photoURL || ""}
              alt={user.displayName || ""}
            />
          ) : (
            <FaUserCircle className="w-8 h-8" />
          )}

          <span>{user.displayName || user.email}</span>
          <Button onClick={logout}>Logout</Button>
        </div>
      )}
    </div>
  );
}
