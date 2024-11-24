import { FaBox, FaClipboardList, FaUser } from "react-icons/fa";
import { UserType } from "@/interfaces/userInterface";

export interface SubFeature {
  name: string;
  path: string;
  code: string;
  title: string;
  subtitle: string;
}

export interface Feature {
  name: string;
  path?: string;
  subFeatures?: SubFeature[];
  code?: string;
  icon?: React.ComponentType;
  title: string;
  subtitle: string;
}

export interface FeatureGroup {
  name: string;
  items: Feature[];
}

export const features: FeatureGroup[] = [
  {
    name: "admin",
    items: [
      {
        name: "Products",
        subFeatures: [
          {
            name: "View Products",
            path: "/admin/products",
            code: "viewProducts",
            title: "View Products",
            subtitle: "Browse existing products",
          },
          {
            name: "Add Products",
            path: "/admin/products/add",
            code: "addProducts",
            title: "Add Products",
            subtitle: "Create a new product",
          },
        ],
        icon: FaBox,
        title: "Products",
        subtitle: "Manage products",
      },
      {
        name: "Orders",
        path: "/admin/orders",
        code: "viewOrders",
        icon: FaClipboardList,
        title: "Orders",
        subtitle: "View orders",
      },
      {
        name: "Users",
        path: "/admin/users",
        code: "viewUsers",
        icon: FaUser,
        title: "Users",
        subtitle: "View users",
      },
    ],
  },
];
