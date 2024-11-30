import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import { features } from "@/utils/adminFeatures";
import SidebarFeature from "./SidebarFeature";
import { UserType } from "@/interfaces/userInterface";
import { useRouter } from "next/router";

interface SidebarProps {
  selected?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ selected }) => {
  const router = useRouter();

  const { user } = useUser();
  const [userRole, setUserRole] = useState<UserType | undefined>(undefined);

  return (
    <aside className="w-full h-full bg-green p-3">
      <div className="mx-2 mt-2 mb-6 bg-white p-2 rounded-lg flex justify-start items-center">
        <img
          src="/img/logo.jpg"
          alt="logo"
          className="h-12 w-12 rounded-full"
        />
        <div className="flex flex-col ml-4">
          <h1 className="text-black font-bold">ITW Digital</h1>
          <p className="text-light-green text-sm">Administrator Portal</p>
        </div>
      </div>
      <div>
        {features.map((featureGroup, idx) => (
          <div key={idx}>
            <ul className="space-y-2">
              {featureGroup.items.map((feature) => (
                <SidebarFeature
                  key={feature.name}
                  feature={feature}
                  selected={selected}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
