import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
// import PdfDocument from "@/components/PdfDocument";

// const userData = {
//   image: "3x1DVePjb8Ltgd6xNKXe/user-image-1748274152267.jpg",
//   address: "Klaipėda, Lietuva",
//   education: [
//     {
//       id: "7e4123f9-3085-4410-bff7-16e61a858dfd",
//       title: "Klaipėdos universitetas",
//       subtitle: "Lietuvių filologija ir režisūra",
//       description: null,
//       dateFrom: "2012-05-31T21:00:00.000Z",
//       dateTo: "2016-06-30T21:00:00.000Z",
//     },
//   ],
//   languages: [],
//   fullName: "Vytautas Čepulis",
//   experience: [],
//   skills: [
//     "HTML, CSS, JS",
//     "CSS preprocessors",
//     "React",
//     "REST api, graphql",
//     "Typescript",
//   ],
//   desiredPositions: [],
//   phoneNumber: "+37064168305",
//   intro:
//     "Hello, I’m Vytautas. I enjoy learning about various software engineering topics, improve my skills, work on side projects and occasionally play video games to relax.",
//   expectedSalary: "",
//   subdomainCode: "1234",
//   email: "",
//   websiteDesign: "CLASSIC",
//   subdomainStatus: "HIDDEN",
//   userStatus: "ACTIVE",
// };

// const userDataFull = {
//   image: "3x1DVePjb8Ltgd6xNKXe/user-image-1748347860229.jpg",
//   address: "Klaipėda, Lietuva",
//   education: [
//     {
//       id: "7e4123f9-3085-4410-bff7-16e61a858dfd",
//       title: "Klaipėdos universitetas",
//       subtitle: "Lietuvių filologija ir režisūra",
//       description: null,
//       dateFrom: "2012-05-31T21:00:00.000Z",
//       dateTo: "2016-06-30T21:00:00.000Z",
//     },
//   ],
//   languages: [
//     {
//       language: "Germanų",
//       level: "NATIVE",
//       id: "a2a3a501-9b7a-47b7-a4b4-3924db5d23c5",
//     },
//     {
//       language: "Niendartaliečių",
//       level: "BEGINNER",
//       id: "b89fee8a-cb16-42b3-81bc-0854718f7df5",
//     },
//     {
//       language: "Šnypštuolių",
//       level: "NATIVE",
//       id: "54fd73e9-1ac2-413e-ab7c-cda9bc850a7a",
//     },
//   ],
//   fullName: "Vytautas Čepulis",
//   experience: [
//     {
//       id: "19572a95-9c24-49f1-a6ad-6635a53c55c5",
//       title: "Eneba",
//       subtitle: "Frontend developer",
//       description:
//         "Tech used: React, bootstrap, scss\n\nWorked on:\nDeveloped backoffice for companies product \"Unlokk\" where agents can accept or decline user verifications, handle issued loans, search, view and edit user details, admins can\nmanage agents' access, etc.\nAlso developed unlokk.lt landing page though it's now updated.\n\nLessons learned:\n- Worked closely with backend devs on api schemas for it to be both intuitive for the user\nand quick to develop.\n- Started developing required features independently, with minimal help from others.\n- Took in feedback and adjusted code as was needed.\n- Made effort to give opinions and ideas about technical and business sides of the project.\n- Quickly learned best practices not theoretically but practically",
//       dateFrom: "2025-04-30T21:00:00.000Z",
//       dateTo: null,
//     },
//     {
//       id: "7bc4b77b-82c9-46f3-a6a1-008142072b55",
//       title: "UAB Craftsoft - Unlokk",
//       subtitle: "Frontend developer",
//       description:
//         "Tech used: React, bootstrap, scss\n\nWorked on:\nDeveloped backoffice for companies product \"Unlokk\" where agents can accept or decline user verifications, handle issued loans, search, view and edit user details, admins can manage agents' access, etc.\nAlso developed unlokk.lt landing page though it's now updated.\n\nLessons learned:\n- Worked closely with backend devs on api schemas for it to be both intuitive for the user\nand quick to develop.\n- Started developing required features independently, with minimal help from others.\n- Took in feedback and adjusted code as was needed.\n- Made effort to give opinions and ideas about technical and business sides of the project.\n- Quickly learned best practices not theoretically but practically",
//       dateFrom: "2020-05-31T21:00:00.000Z",
//       dateTo: "2022-04-30T21:00:00.000Z",
//     },
//   ],
//   skills: [
//     "HTML, CSS, JS",
//     "CSS preprocessors",
//     "React",
//     "REST api, graphql",
//     "Typescript",
//     "Krapštumas",
//   ],
//   desiredPositions: ["Frontend developer"],
//   phoneNumber: "+37064168305",
//   intro:
//     "Hello, I’m Vytautas. I enjoy learning about various software engineering topics, improve my skills, work on side projects and occasionally play video games to relax.",
//   expectedSalary: "2500",
//   subdomainCode: "1234",
//   email: "cepulis.vytas@gmail.com",
//   drivingLicences: [
//     {
//       category: "B",
//       issuedAt: "2016-07",
//       id: "11c27fff-d54d-49a4-b812-660e13b2d0a7",
//     },
//   ],
//   websiteDesign: "CLASSIC",
//   subdomainStatus: "ACTIVE",
//   userStatus: "ACTIVE",
// };

const Rendered = () => {
  return (
    <div style={{ height: "100vh" }}>
      <PDFViewer width="100%" height="100%">
        {/*<PdfDocument userData={userDataFull} slug="test" />*/}
      </PDFViewer>
    </div>
  );
};

export default Rendered;
