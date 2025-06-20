import { SubdomainData } from "@/types/types";
import { useRouter } from "next/router";
import Head from "next/head";
import { WebsiteDesigns } from "@/types/enums";
import ClassicDesignLayout from "@/components/layouts/ClassicDesignLayout";
import { pdf } from "@react-pdf/renderer";
import PdfDocument from "@/components/PdfDocument";
import { ISubdomain } from "@/pages/api/types";

interface Props {
  subdomainData: SubdomainData;
}

const LandingPage = ({ subdomainData }: Props) => {
  const router = useRouter();
  const slug = router.query.slug;

  const title = `${subdomainData.fullName} - ${slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  const handleDownload = async () => {
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
  };

  const renderDesign = () => {
    switch (subdomainData.websiteDesign) {
      case WebsiteDesigns.CLASSIC:
      case WebsiteDesigns.MODERN:
      case WebsiteDesigns.MINIMALISTIC:
        return (
          <ClassicDesignLayout
            subdomainData={subdomainData}
            handleDownload={handleDownload}
          />
        );
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
