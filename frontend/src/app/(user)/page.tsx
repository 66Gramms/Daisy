import { QueryKeys } from "@/constants/querykeys";
import { getParty } from "@/services/api/admin/party";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default async function Home() {
  const queryClient = new QueryClient();

  const response = await queryClient
    .fetchQuery({
      queryKey: [QueryKeys.HAS_PARTY],
      queryFn: getParty,
    })
    .catch((error) => {
      console.error(error);
    });

  if (!response?.name.length) {
    return (
      <div>
        <h1 className="text-3xl text-center mt-10">
          To setup Daisy navigate to{" "}
          <Link href="/admin/login" className="highlight-text ">
            /admin/login
          </Link>
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to {response.name}</h1>
    </div>
  );
}
