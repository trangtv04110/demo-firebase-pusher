import Header from "@/components/Header";
import { auth } from "@/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) router.push("/login");
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="flex flex-col space-y-8 p-4 min-h-screen max-w-4xl m-auto">
      <Header />
      {children}
    </div>
  );
}
