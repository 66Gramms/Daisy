"use client";

import { adminLogoutAction } from "@/actions/admin";
import { Button } from "../molecules/Button";

const AdminHeader = () => {
  const handleLogout = async () => {
    await adminLogoutAction();
  };

  return (
    <header className="col-span-10 border-b font-semibold border-[#30363d] flex justify-between items-center px-8">
      <p className="text-3xl">Daisy dashboard</p>
      <form action={handleLogout}>
        <Button type="submit">Logout</Button>
      </form>
    </header>
  );
};

export default AdminHeader;
