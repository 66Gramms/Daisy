import AdminHeader from "@/components/organisms/AdminHeader";
import { Cookies } from "@/constants/cookies";
import { Roboto_Mono } from "next/font/google";
import { cookies } from "next/headers";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(Cookies.BEARER_TOKEN)?.value;

  if (!token) {
    return <>{children}</>;
  }

  return (
    <div
      className={`grid grid-cols-12 grid-rows-[80px_1fr] h-screen ${robotoMono.className}`}
    >
      <div className="row-span-1 col-span-2 flex items-center justify-center font-semibold text-3xl border-b border-r">
        Daisy
      </div>
      <nav className="border-r flex-1 row-start-2 col-span-2 ">
        <ul className="flex flex-col gap-4 p-4">
          <li>Dashboard</li>
          <li>Settings</li>
          <li>Profile</li>
        </ul>
      </nav>
      <AdminHeader />
      <main className="row-start-2 col-start-3 col-span-10">{children}</main>
    </div>
  );
}
