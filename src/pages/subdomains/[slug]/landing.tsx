import { SubdomainData } from "@/types/types";
import { useRouter } from "next/router";
import Head from "next/head";
import { WebsiteDesigns } from "@/types/enums";
import ClassicDesignLayout from "@/components/layouts/ClassicDesignLayout";
import { pdf } from "@react-pdf/renderer";
import PdfDocument from "@/components/PdfDocument";
import { ISubdomain } from "@/pages/api/types";
import ModernDesignLayout from "@/components/layouts/ModernDesignLayout";
import MinimalisticDesignLayout from "@/components/layouts/MinimalisticDesignLayout";
import { useEffect, useState } from "react";
import { usePosthogContext } from "@/contexts/PosthogContext";

interface Props {
  subdomainData: SubdomainData;
}

const LandingPage = ({ subdomainData }: Props) => {
  const { capturePageView } = usePosthogContext();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    if (slug) {
      capturePageView({ name: "Subdomain page", options: { slug } });
    }
  }, [slug]);

  if (!subdomainData) {
    return null;
  }

  const title = `${subdomainData.fullName} - ${slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  const handleDownload = async () => {
    setDownloadLoading(true);
    const blob = await pdf(
      <PdfDocument
        userData={subdomainData}
        slug={slug as ISubdomain["slug"]}
      />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${subdomainData.fullName} CV.pdf`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloadLoading(false);
  };

  const renderDesign = () => {
    switch (subdomainData.websiteDesign) {
      case WebsiteDesigns.CLASSIC:
        return (
          <ClassicDesignLayout
            subdomainData={subdomainData}
            handleDownload={handleDownload}
            downloadLoading={downloadLoading}
          />
        );
      case WebsiteDesigns.MODERN:
        return (
          <ModernDesignLayout
            subdomainData={subdomainData}
            handleDownload={handleDownload}
            downloadLoading={downloadLoading}
          />
        );
      case WebsiteDesigns.MINIMALISTIC:
        return (
          <MinimalisticDesignLayout
            subdomainData={subdomainData}
            handleDownload={handleDownload}
            downloadLoading={downloadLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {renderDesign()}
    </>
  );
};

export default LandingPage;
