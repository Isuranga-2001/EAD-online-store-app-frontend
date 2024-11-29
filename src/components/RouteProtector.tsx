import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/userContext";
import LoadingScreen from "@/components/LoadingScreen";
import { isTokenExpiredFunction, getTokenContent } from "@/utils/authUtils";
import { getUserByEmail } from "@/services/userService";
import { User, UserType } from "@/interfaces/userInterface";

export default function RouteProtector({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenExpiry = async (): Promise<boolean> => {
      const token = localStorage.getItem("ead-token");
      if (!token) {
        return false;
      }
      return !isTokenExpiredFunction(token);
    };

    const getUserDetails = async (
      token: string | null
    ): Promise<User | null> => {
      if (!token) {
        return null;
      }
      const content = getTokenContent(token);
      const response = await getUserByEmail(content.email);
      if (!response) {
        return null;
      }
      return response;
    };

    const checkAccess = async () => {
      if (
        !router.pathname.startsWith("/admin") ||
        router.pathname.startsWith("/auth")
      ) {
        console.log("Not an admin route. Skipping access check.");
        setLoading(false);
      } else {
        if (!user) {
          console.log("User not found in context. Checking token validity.");
          const tokenValid = await checkTokenExpiry();

          if (!tokenValid) {
            console.log("Token is invalid. Redirecting to login");
            router.push(`/auth/signin`);
            return;
          }

          console.log("Token is valid. Fetching user details.");
          const userDetails = await getUserDetails(
            localStorage.getItem("ead-token")
          );
          if (!userDetails) {
            console.log("User not found. Redirecting to login");
            router.push(`/auth/signin`);
            return;
          }

          setUser(userDetails); // Set user details in context

          console.log("Checking user access.");
          const role = userDetails.type;
          let hasAccess = false;
          if (role === UserType.ADMIN) {
            hasAccess = true;
          }

          if (!hasAccess && router.pathname !== "/admin") {
            console.log("Unauthorized access! Redirecting to login.");
            router.push(`/auth/signin`);
          } else {
            console.log("User has access.");
            setLoading(false);
          }
        } else {
          console.log("User found in context. Checking user access.");
          const role = user.type;
          let hasAccess = false;
          if (role === UserType.ADMIN) {
            hasAccess = true;
          }

          if (!hasAccess && router.pathname !== "/admin") {
            console.log("Unauthorized access! Redirecting to login.");
            router.push(`/auth/signin`);
          } else {
            console.log("User has access.");
            setLoading(false);
          }
        }
      }
    };

    checkAccess();
  }, [router.pathname, user]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
