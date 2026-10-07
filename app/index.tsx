import { Redirect } from "expo-router";
import { useAuth } from "@/auth/AuthProvider";
import { LoadingBlock } from "@/components/ui";

export default function Index() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingBlock />;
  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;
  return <Redirect href="/(app)/servers" />;
}
