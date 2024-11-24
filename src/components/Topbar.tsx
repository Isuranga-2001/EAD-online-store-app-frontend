import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { features } from "@/utils/adminFeatures";
import { useUser } from "@/contexts/userContext";
import { UserType } from "@/interfaces/userInterface";

interface TopbarProps {
  selected: string;
  sidebarOpen?: boolean;
  smallScreen?: boolean;
  toggleSidebar?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
  selected = "websiteManipulation",
  sidebarOpen = true,
  smallScreen = false,
  toggleSidebar = () => {},
}) => {
  const { user } = useUser();

  // Function to find the feature or sub-feature by code
  const findFeature = (code: string) => {
    for (const group of features) {
      for (const feature of group.items) {
        if (feature.code === code) {
          return feature;
        }
        if (feature.subFeatures) {
          for (const subFeature of feature.subFeatures) {
            if (subFeature.code === code) {
              return subFeature;
            }
          }
        }
      }
    }
    return null;
  };

  const selectedFeature = findFeature(selected);

  const handleLogout = () => {
    localStorage.removeItem("ead-token");
    window.location.href = "/auth/signin";
  };

  return (
    <div className="w-full flex flex-col justify-between py-4 px-4">
      <div className="flex justify-between items-center w-full sm:w-auto">
        <div className="flex items-center">
          {!sidebarOpen ? (
            <GiHamburgerMenu
              className="h-5 w-5 text-green cursor-pointer hover:text-light-green transition-all ease-in-out duration-300"
              onClick={toggleSidebar}
            />
          ) : (
            !smallScreen && (
              <div>
                <span className="text-green text-lg font-bold">
                  {selectedFeature?.title || "Dashboard"}
                </span>
                <br />
                <span className="text-gray-600 text-sm">
                  {selectedFeature?.subtitle || ""}
                </span>
              </div>
            )
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-green text-sm font-bold">{user?.name}</div>
            <div className="text-gray-600 text-xs">ADMIN</div>
          </div>
          <FaUserCircle className="h-8 w-8 text-green" />
          <div className="h-8 border-l border-gray-300"></div>
          <IoLogOut
            className="h-8 w-8 text-green cursor-pointer hover:text-light-green transition-all ease-in-out duration-300"
            onClick={handleLogout}
          />
        </div>
      </div>
      {smallScreen && (
        <div className="mt-4 text-center sm:hidden">
          <span className="text-green text-lg font-bold">
            {selectedFeature?.title || "Dashboard"}
          </span>
          <br />
          <span className="text-gray-600 text-sm">
            {selectedFeature?.subtitle || ""}
          </span>
        </div>
      )}
    </div>
  );
};

export default Topbar;
