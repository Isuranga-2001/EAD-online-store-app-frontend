import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Feature } from "@/utils/adminFeatures";
import { FaAngleUp, FaAngleDown, FaAngleRight } from "react-icons/fa";

interface SidebarFeatureProps {
  feature: Feature;
  selected?: string;
}

const SidebarFeature: React.FC<SidebarFeatureProps> = ({
  feature,
  selected,
}) => {
  const hasSubFeatures = feature.subFeatures && feature.subFeatures.length > 0;

  const isSelected = (code: string) => selected === code;

  const isAnySubFeatureSelected = () =>
    feature.subFeatures?.some((subFeature) => isSelected(subFeature.code)) ||
    false;

  const [isOpen, setIsOpen] = useState(isAnySubFeatureSelected());
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isAnySubFeatureSelected()) {
      setIsOpen(true);
    }
  }, [selected]);

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current?.scrollHeight}px` : "0px");
  }, [isOpen]);

  const IconComponent = feature.icon;

  return (
    <li>
      {hasSubFeatures ? (
        <div
          className={`flex items-center justify-between p-2 hover:bg-gray-400/10 rounded-md cursor-pointer transition-all ease-in-out duration-200 ${
            isSelected(feature.code || "") ? "bg-gray-400/20" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            {IconComponent &&
              React.createElement(
                IconComponent as React.ComponentType<{ className?: string }>,
                { className: "mr-2" }
              )}
            <span className="text-white text-sm">{feature.name}</span>
          </div>
          <span className="text-gray-200">
            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>
      ) : (
        <Link
          href={feature.path || "#"}
          className={`block p-2 hover:bg-gray-400/10 rounded-md text-sm cursor-pointer transition-all ease-in-out duration-200 ${
            isSelected(feature.code || "") ? "bg-gray-400/20" : ""
          }`}
        >
          <div className="flex items-center">
            {IconComponent &&
              React.createElement(
                IconComponent as React.ComponentType<{ className?: string }>,
                { className: "mr-2" }
              )}
            <span>{feature.name}</span>
          </div>
        </Link>
      )}

      {hasSubFeatures && (
        <ul
          ref={contentRef}
          style={{ height }}
          className="ml-4 space-y-1 overflow-hidden transition-all duration-300"
        >
          {feature.subFeatures &&
            feature.subFeatures.map((subFeature) => (
              <li key={subFeature.name}>
                <Link
                  href={subFeature.path}
                  className={`flex items-center p-2 hover:bg-gray-400/10 rounded-md text-sm cursor-pointer transition-all ease-in-out duration-200 ${
                    isSelected(subFeature.code) ? "bg-gray-400/20" : ""
                  }`}
                >
                  <FaAngleRight className="mr-2" />
                  {subFeature.name}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarFeature;
