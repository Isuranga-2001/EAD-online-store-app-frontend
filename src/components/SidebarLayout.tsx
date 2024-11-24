import React, { useState, useEffect, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface SidebarLayoutProps {
  selectedSidebarItem?: string;
  children: ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  selectedSidebarItem = "websiteManipulation",
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (
      e: MediaQueryListEvent | MediaQueryList
    ) => {
      setSidebarOpen(!e.matches);
      setSmallScreen(e.matches);
    };

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="flex h-screen bg-whiteI">
      <div
        className={`w-[20rem] fixed h-full bg-primary z-50 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar selected={selectedSidebarItem} />
      </div>
      <div
        className={`${
          sidebarOpen && !smallScreen ? "ml-[20rem]" : ""
        } flex-1 overflow-y-auto bg-white px-2`}
        onClick={() => {
          if (smallScreen && sidebarOpen) {
            setSidebarOpen(false);
          }
        }}
      >
        {sidebarOpen && smallScreen && (
          <div className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 z-40"></div>
        )}
        <Topbar
          sidebarOpen={sidebarOpen}
          smallScreen={smallScreen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          selected={selectedSidebarItem}
        />
        <div className="w-full px-4 pb-2">{children}</div>
      </div>
    </div>
  );
};

export default SidebarLayout;
