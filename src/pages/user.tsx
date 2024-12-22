import UserTable from "@modules/user/user-table";
import Layout from "../layouts/base";
import { LucideUserSquare } from "lucide-react";

const Users = () => {
  return (
    <Layout title="Users" icon={LucideUserSquare}>
      <UserTable />
    </Layout>
  );
};

export default Users;
