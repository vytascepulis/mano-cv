import { AuthProvider } from "@/contexts/AuthContext";
import SubdomainPageContent from "@/pages/subdomains/[slug]/main";

export default function SubdomainPage() {
  return (
    <AuthProvider>
      <SubdomainPageContent />
    </AuthProvider>
  );
}
