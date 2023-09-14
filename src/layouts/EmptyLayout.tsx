import { useEffect } from "react";
import Image from "next/image";
import logo from "../../public/svg/chat.svg";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function EmptyLayout({
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

    console.log("user: ", user);

    if (user) router.push("/");
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="flex flex-col justify-center items-center space-y-4 p-4 min-h-screen max-w-4xl m-auto h-screen">
      <div className="flex justify-center items-center space-x-2 text-2xl">
        <Image priority src={logo} alt="Chatting" height={64} />
        <span>Chatting</span>
      </div>
      {children}
    </div>
  );
}
