import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Link,
} from "@react-pdf/renderer";
import { LanguageLevel, SubdomainData } from "@/types/types";
import { getUserPhoto } from "@/utils/user";
import { Card } from "@/components/InfoCards/types";
import { formatDate, getDateDiffString } from "@/utils/date";
import { formatSubdomainUrl, getDomainUrl } from "@/utils/subdomain";
import { ISubdomain } from "@/pages/api/types";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "/fonts/Poppins-Light.ttf",
      fontWeight: 300,
    },
    {
      src: "/fonts/Poppins-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "/fonts/Poppins-Medium.ttf",
      fontWeight: 500,
    },
    {
      src: "/fonts/Poppins-SemiBold.ttf",
      fontWeight: 600,
    },
    {
      src: "/fonts/Poppins-ExtraBold.ttf",
      fontWeight: 800,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Poppins",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: "20px 30px 30px 30px",
  },
  sidebar: {
    width: 230,
    flex: "0 0 200px",
    paddingRight: 30,
    marginTop: 10,
  },
  sidebarContent: {
    marginTop: 20,
  },
  imageWrapper: {
    display: "flex",
    alignItems: "flex-start",
  },
  imageBackground: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
    padding: 3,
    backgroundColor: "#7f22fe",
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 99,
  },
  content: {
    flex: "1 1",
  },
  contentTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    fontSize: "18px",
    fontWeight: 600,
    borderBottom: "1px solid #ddd6ff",
    paddingBottom: 10,
  },
  contentIcon: {
    marginRight: 10,
    width: 16,
  },
  contentBody: {
    fontSize: "11px",
    fontWeight: 300,
  },
  contentItem: {
    marginBottom: 25,
  },
  sidebarTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: 5,
  },
  sidebarIcon: {
    marginRight: 8,
    width: 12,
  },
  sidebarBody: {
    fontSize: 11,
    fontWeight: 300,
    marginBottom: 15,
  },
});

const CardNode = ({ data }: { data: Card }) => {
  return (
    <View wrap={false} style={{ fontSize: 9, fontWeight: 300 }}>
      <Text style={{ fontSize: 14, fontWeight: 500 }}>{data.title}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ marginBottom: 5 }}>{data.subtitle}</Text>
        <Text>
          {formatDate(data.dateFrom)} -{" "}
          {data.dateTo ? (
            formatDate(data.dateTo)
          ) : (
            <Text style={{ fontWeight: 500 }}>dabar</Text>
          )}
        </Text>
      </View>
      {data.description && (
        <Text style={{ fontSize: 11 }}>{data.description}</Text>
      )}
    </View>
  );
};

const PdfDocument = ({
  userData,
  slug,
  mock,
}: {
  userData: SubdomainData;
  slug: ISubdomain["slug"];
  mock?: boolean;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          fixed
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#7f22fe",
            padding: 2,
          }}
        >
          <Text
            style={{
              fontSize: 7,
              color: "#fff",
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            Sukurta su{" "}
            <Link
              style={{ color: "#FFF", textDecoration: "none" }}
              src={getDomainUrl()}
            >
              mano-cv.lt
            </Link>
          </Text>
        </View>
        <View style={styles.sidebar}>
          <View style={styles.imageWrapper}>
            <View style={styles.imageBackground}>
              <Link src={formatSubdomainUrl(slug)}>
                <Image
                  src={getUserPhoto(userData.image!, mock)}
                  style={styles.image}
                />
              </Link>
            </View>
          </View>
          <View style={styles.sidebarContent}>
            <View style={styles.sidebarTitle}>
              <Image src="/icons/phone.png" style={styles.sidebarIcon} />
              <Text>Kontaktai</Text>
            </View>
            <View style={styles.sidebarBody}>
              <Text>{userData.phoneNumber}</Text>
              {userData.email && <Text>{userData.email}</Text>}
              <Text>{userData.address}</Text>
            </View>
            {userData.skills.length > 0 && (
              <>
                <View style={styles.sidebarTitle}>
                  <Image src="/icons/skills.png" style={styles.sidebarIcon} />
                  <Text>Igūdžiai</Text>
                </View>
                <View style={styles.sidebarBody}>
                  {userData.skills.map((skill, idx) => (
                    <Text key={idx}>
                      <Text
                        style={{
                          color: "#a684ff",
                        }}
                      >
                        •
                      </Text>{" "}
                      {skill}
                    </Text>
                  ))}
                </View>
              </>
            )}
            {userData.desiredPositions.length > 0 && (
              <>
                <View style={styles.sidebarTitle}>
                  <Image src="/icons/eye.png" style={styles.sidebarIcon} />
                  <Text>Ieškomos pareigos</Text>
                </View>
                <View style={styles.sidebarBody}>
                  {userData.desiredPositions.map((position, idx) => (
                    <Text key={idx}>
                      <Text
                        style={{
                          color: "#a684ff",
                        }}
                      >
                        •
                      </Text>{" "}
                      {position}
                    </Text>
                  ))}
                </View>
              </>
            )}
            {userData.languages.length > 0 && (
              <>
                <View style={styles.sidebarTitle}>
                  <Image
                    src="/icons/languages.png"
                    style={styles.sidebarIcon}
                  />
                  <Text>Kalbos</Text>
                </View>
                <View style={styles.sidebarBody}>
                  {userData.languages.map(({ language, level, id }) => (
                    <Text key={id}>
                      <Text
                        style={{
                          color: "#a684ff",
                        }}
                      >
                        •
                      </Text>{" "}
                      {language} - {LanguageLevel[level]}
                    </Text>
                  ))}
                </View>
              </>
            )}
            {userData.drivingLicences.length > 0 && (
              <>
                <View style={styles.sidebarTitle}>
                  <Image src="/icons/car.png" style={styles.sidebarIcon} />
                  <View>
                    <Text style={{ lineHeight: "16px" }}>Vairuotojo</Text>
                    <Text>pažymėjimas</Text>
                  </View>
                </View>
                <View style={styles.sidebarBody}>
                  {userData.drivingLicences.map(
                    ({ category, issuedAt, id }) => (
                      <Text key={id}>
                        {category} - {getDateDiffString(issuedAt)}
                      </Text>
                    ),
                  )}
                </View>
              </>
            )}
            {Boolean(userData.expectedSalary) && (
              <>
                <View style={styles.sidebarTitle}>
                  <Image
                    src="/icons/money-bills.png"
                    style={styles.sidebarIcon}
                  />
                  <Text>Pageidaujamas atlygis</Text>
                </View>
                <View style={styles.sidebarBody}>
                  <Text>{userData.expectedSalary}€ (atskaičius mokesčius)</Text>
                </View>
              </>
            )}
          </View>
        </View>
        <View style={styles.content}>
          <View
            style={{
              marginBottom: 30,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {userData.fullName.split(" ").map((w, index) => (
              <Text
                key={index}
                style={{
                  textTransform: "uppercase",
                  fontSize: 32,
                  lineHeight: "28px",
                  color: "#7f22fe",
                  fontWeight: 800,
                }}
              >
                {w}
              </Text>
            ))}
          </View>
          <View style={styles.contentItem}>
            <View style={styles.contentTitle}>
              <Image src="/icons/about-me.png" style={styles.contentIcon} />
              <Text>Apie mane</Text>
            </View>
            <Text style={styles.contentBody}>{userData.intro}</Text>
          </View>
          {userData.experience.length > 0 && (
            <View style={styles.contentItem}>
              <View style={styles.contentTitle}>
                <Image src="/icons/experience.png" style={styles.contentIcon} />
                <Text>Darbo patirtis</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {userData.experience.map((card) => (
                  <CardNode key={card.id} data={card} />
                ))}
              </View>
            </View>
          )}
          <View style={styles.contentItem}>
            <View style={styles.contentTitle}>
              <Image src="/icons/education.png" style={styles.contentIcon} />
              <Text>Išsilavinimas</Text>
            </View>
            {userData.education.map((card) => (
              <CardNode key={card.id} data={card} />
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
