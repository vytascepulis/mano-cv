import dynamic from "next/dynamic";

const PDFViewerNoSSR = dynamic(() => import("./rendered"), {
  ssr: false,
});

const CvTest = () => {
  return <PDFViewerNoSSR />;
};

export default CvTest;
