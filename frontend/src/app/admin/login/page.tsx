import { QueryKeys } from "@/constants/querykeys";
import AdminLoginRegisterPage from "@/pages/admin/LoginRegister";
import { getHasParty } from "@/services/api/admin/party";
import { QueryClient } from "@tanstack/react-query";

export default async function AdminLoginRegister() {
  const queryClient = new QueryClient();

  const response = await queryClient
    .fetchQuery({
      queryKey: [QueryKeys.HAS_PARTY],
      queryFn: getHasParty,
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-12 items-center flex-1">
        <div className="w-full max-w-sm p-8 rounded-xl shadow-lg bg-neutral-900 flex flex-col gap-8">
          <h1 className="text-3xl font-bold text-green-500 text-center mb-2">
            Daisy
          </h1>
          <AdminLoginRegisterPage hasParty={response?.hasParty ?? false} />
        </div>
        {!response?.hasParty && (
          <p className="bg-black/70 rounded-lg p-4 text-center text-green-200 text-base font-medium shadow-inner mb-2">
            Create the super administrator. If you see this screen after
            creating the super administrator, there is a problem with the
            backend SQLite connection.
            <br /> Please check your configuration. If the issue persists,
            contact me at
            <span className="highlight-text"> meszarosricsi01@gmail.com</span>
          </p>
        )}
      </div>
    </div>
  );
}
