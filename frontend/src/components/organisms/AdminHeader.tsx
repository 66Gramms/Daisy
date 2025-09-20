"use client";

import { adminLogoutAction } from "@/actions/admin";
import { Button } from "../molecules/Button";

const AdminHeader = () => {
  const handleLogout = async () => {
    await adminLogoutAction();
  };

  return (
    <header className="col-span-10 border-b flex justify-between items-center px-8">
      <p>Admin dashboard</p>
      <form action={handleLogout}>
        <Button type="submit">Logout</Button>
      </form>
    </header>
  );
};

export default AdminHeader;
