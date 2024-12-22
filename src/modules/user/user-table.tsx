import { useState } from "react";
import { useUsers } from "./hooks/useUser";

import { Table } from "@components/ui/table";
import UserDetailsDrawer from "./components/user-drawer";
import { Skeleton } from "@components/ui/skeleton";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Badge } from "@components/ui/badge";

import { Mail, PersonStanding, Search } from "lucide-react";
import { User } from "./types";

const UserTable = () => {
  const { data: users = [], isLoading } = useUsers();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user: User) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  });

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (name: string) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded bg-[#2A2A2A] flex items-center justify-center mr-3">
            <span className="text-gray-400">{name.charAt(0)}</span>
          </div>
          <span>{name}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (email: string) => (
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2" />
          <span>{email}</span>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: () => (
        <Badge className="bg-purple-500/10 text-purple-400">
          <PersonStanding className="w-5 h-5 mr-1" />
          Member
        </Badge>
      ),
    },

    {
      key: "id",
      label: "Actions",
      render: (_: any, user: User) => (
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setSelectedUserId(user.id);
            setIsDrawerOpen(true);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div>
        <Skeleton className="w-full h-12 mb-4" />
        <Skeleton className="w-full h-12 mb-4" />
        <Skeleton className="w-full h-12" />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#1E1E1E] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white">Members</h2>
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-[#2A2A2A] border-none text-white focus:border-white"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      <Table data={filteredUsers} columns={columns} defaultSortKey="name" />
      <UserDetailsDrawer
        userId={selectedUserId}
        open={isDrawerOpen}
        onOpenChange={(open) => {
          setIsDrawerOpen(open);
          if (!open) setSelectedUserId(null);
        }}
      />
    </div>
  );
};

export default UserTable;
