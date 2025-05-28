import {
  CreateUserResponse,
  FirestoreResponse,
  GetUserByGoogleIdResponse,
  ISettings,
  ISubdomain,
  IUser,
} from "@/pages/api/types";
import { RegisterData, SettingsData, SubdomainData } from "@/types/types";
import { checkGoogleId } from "@/lib/checks";
import { NextApiRequest } from "next";
import {
  buildErrorResponse,
  formatSettingsData,
  parseForm,
  validateSettingsData,
} from "@/pages/api/utils";
import { HttpError } from "@/constants/http";
import fs from "fs";
import { uploadFileBuffer } from "@/lib/upload";
import { bucket, db } from "@/lib/firebase";
import { SubdomainStatus, UserStatus } from "@/types/enums";
import { firestore } from "firebase-admin";
import FieldValue = firestore.FieldValue;
import { buildSettings, validateSettingsState } from "@/utils/settings";
import { isSlugValid } from "@/utils/subdomain";

export const getUserSettings = async ({
  id,
  googleId,
  subdomainSlug,
}: {
  id: string;
  googleId: string;
  subdomainSlug: string;
}): FirestoreResponse<SettingsData> => {
  const { userRef, error: validationErr } = await checkGoogleId({
    id,
    googleId,
  });

  if (validationErr) {
    return {
      data: null,
      error: validationErr,
    };
  }

  const settingsSnap = await db
    .collection("settings")
    .select(
      "address",
      "subdomainCode",
      "desiredPositions",
      "education",
      "email",
      "expectedSalary",
      "fullName",
      "phoneNumber",
      "experience",
      "image",
      "intro",
      "skills",
      "languages",
      "websiteDesign",
      "drivingLicences",
    )
    .where("user", "==", userRef) // compare with the reference
    .limit(1)
    .get();

  const subdomainSnap = await db
    .collection("subdomains")
    .select("status", "slug")
    .where("user", "==", userRef)
    .limit(1)
    .get();

  if (subdomainSnap.docs[0].data().slug !== subdomainSlug) {
    return {
      data: null,
      error: buildErrorResponse({
        code: HttpError.NOT_ALLOWED,
        serverMessage: `Subdomain ${subdomainSlug} does not belong to user ${id}`,
      }),
    };
  }

  const userSnap = await userRef?.get();

  return {
    data: {
      ...settingsSnap.docs[0]?.data(),
      subdomainStatus: subdomainSnap.docs[0].data().status,
      userStatus: userSnap?.data()?.status,
    } as SettingsData,
    error: null,
  };
};

export const updateUserSettings = async ({
  id,
  googleId,
  req,
}: {
  id: string;
  googleId: string;
  req: NextApiRequest;
}): FirestoreResponse<SettingsData> => {
  const { userRef, error: validationErr } = await checkGoogleId({
    id,
    googleId,
  });

  const userSnap = await userRef?.get();
  const userDoc = userSnap?.data();

  if (userDoc?.status === UserStatus.BLOCKED) {
    return {
      data: null,
      error: buildErrorResponse({
        code: HttpError.NOT_ALLOWED,
        clientMessage: "Vartotojas užblokuotas",
        serverMessage: `User is blocked: ${userRef?.id}`,
      }),
    };
  }

  if (validationErr) {
    return {
      data: null,
      error: validationErr,
    };
  }

  const { fields, files, error: parseError } = await parseForm(req);
  const imageBlob = files?.imageBlob?.[0];

  if (parseError || !fields) {
    return {
      data: null,
      error: buildErrorResponse({
        code: HttpError.INTERNAL_ERROR,
        serverMessage: `Form parsing error: ${parseError}`,
      }),
    };
  }

  const { settings, error: settingsValidationError } =
    validateSettingsData(fields);

  if (settingsValidationError) {
    return {
      data: null,
      error: settingsValidationError,
    };
  }

  const settingsSnapshot = await db
    .collection("settings")
    .where("user", "==", userRef)
    .limit(1)
    .get();

  let url = undefined;

  if (imageBlob) {
    const fileBuffer = fs.readFileSync(imageBlob.filepath);

    url = await uploadFileBuffer(
      fileBuffer,
      `${id}/user-image-${Date.now()}.jpg`,
      "image/jpeg",
      settingsSnapshot.docs[0].data().image,
    );
  }

  if (settingsSnapshot.empty) {
    return {
      data: null,
      error: buildErrorResponse({
        code: HttpError.INTERNAL_ERROR,
        serverMessage: `Settings object not found for user ${id}`,
      }),
    };
  }

  const updateData = { ...settings, image: url };
  const settingsDocRef = settingsSnapshot.docs[0].ref;
  await settingsDocRef.update(updateData);
  const updatedDoc = await settingsDocRef.get();

  const subdomainSnap = await db
    .collection("subdomains")
    .where("user", "==", userRef)
    .select("status")
    .limit(1)
    .get();

  const updatedData = {
    ...updatedDoc.data(),
    userStatus: userDoc?.status,
    subdomainStatus: subdomainSnap.docs[0].data().status,
  };

  return { data: formatSettingsData(updatedData as SettingsData), error: null };
};

export const getUserByGoogleId = async ({
  hashedGoogleId,
}: {
  hashedGoogleId: IUser["googleId"];
}): FirestoreResponse<GetUserByGoogleIdResponse> => {
  try {
    const userSnap = await db
      .collection("users")
      .select("status")
      .where("googleId", "==", hashedGoogleId)
      .limit(1)
      .get();

    if (userSnap.empty) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.NOT_FOUND,
          serverMessage: `User not found for googleId ${hashedGoogleId}`,
        }),
      };
    }

    const subdomainSnap = await db
      .collection("subdomains")
      .select("slug")
      .where("user", "==", userSnap.docs[0].ref)
      .limit(1)
      .get();

    const settingsSnap = await db
      .collection("settings")
      .select("image")
      .where("user", "==", userSnap.docs[0].ref)
      .limit(1)
      .get();

    return {
      data: {
        id: userSnap.docs[0]?.id,
        status: userSnap.docs[0]?.data().status,
        subdomainSlug: subdomainSnap.docs[0]?.data().slug,
        image: settingsSnap.docs[0]?.data().image,
      },
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: buildErrorResponse({
        code: HttpError.INTERNAL_ERROR,
        serverMessage: `Error getting user by googleId: ${err}`,
      }),
    };
  }
};

export const createUser = async ({
  hashedGoogleId,
  email,
}: {
  hashedGoogleId: IUser["googleId"];
  email: IUser["email"];
}): FirestoreResponse<CreateUserResponse> => {
  try {
    const userSnap = await db
      .collection("users")
      .where("googleId", "==", hashedGoogleId)
      .limit(1)
      .get();

    if (!userSnap.empty) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.INTERNAL_ERROR,
          serverMessage: `User already exists for googleId ${hashedGoogleId}`,
        }),
      };
    }

    const docRef = await db.collection("users").add({
      email,
      googleId: hashedGoogleId,
      status: UserStatus.INITIALIZED,
      createdAt: FieldValue.serverTimestamp(),
    });

    const docSnap = await docRef.get();

    return {
      data: { id: docRef.id, status: docSnap.data()?.status },
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: buildErrorResponse({
        code: HttpError.INTERNAL_ERROR,
        serverMessage: `Error creating user: ${err}`,
      }),
    };
  }
};

export const createSubdomain = async ({
  slug,
  userId,
}: {
  slug: ISubdomain["slug"];
  userId: string;
}): FirestoreResponse<RegisterData> => {
  try {
    if (!isSlugValid(slug)) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.BAD_REQUEST,
          serverMessage: `Subdomain is invalid: ${slug}`,
        }),
      };
    }

    if (slug.length < 4) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.BAD_REQUEST,
          serverMessage: `Subdomain is too short: ${slug}`,
        }),
      };
    }

    if (slug.length > 16) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.BAD_REQUEST,
          serverMessage: `Subdomain is too long: ${slug}`,
        }),
      };
    }

    const userRef = db.collection("users").doc(userId);

    const subUserSnap = await db
      .collection("subdomains")
      .select("status")
      .where("user", "==", userRef)
      .limit(1)
      .get();

    if (!subUserSnap.empty) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.INTERNAL_ERROR,
          serverMessage: `Subdomain already exists for user ${userId}`,
        }),
      };
    }

    const subSlugSnap = await db
      .collection("subdomains")
      .select("status")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (!subSlugSnap.empty) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.INTERNAL_ERROR,
          serverMessage: `Error creating subdomain ${slug} for user ${userId}`,
          clientMessage: "Toks svetainės pavadinimas jau egzistuoja",
        }),
      };
    }

    const docRef = await db.collection("subdomains").add({
      slug,
      user: userRef,
      status: SubdomainStatus.HIDDEN,
      createdAt: FieldValue.serverTimestamp(),
    });

    await userRef.update({
      status: UserStatus.ACTIVE,
    });

    await db.collection("settings").add({
      user: userRef,
      image: null,
      fullName: null,
      phoneNumber: null,
      email: null,
      address: null,
      intro: null,
      skills: [],
      languages: [],
      experience: [],
      education: [],
      expectedSalary: null,
      websiteDesign: null,
      subdomainCode: null,
      desiredPositions: [],
      drivingLicences: [],
      createdAt: FieldValue.serverTimestamp(),
    });

    return {
      data: {
        id: docRef.id,
        slug,
      },
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: buildErrorResponse({
        code: HttpError.INTERNAL_ERROR,
        serverMessage: `Error creating subdomain: ${err}`,
      }),
    };
  }
};

export const updateSubdomainStatus = async ({
  id,
  googleId,
  status,
}: {
  id: string;
  googleId: IUser["googleId"];
  status: SubdomainStatus;
}): FirestoreResponse<ISubdomain["status"]> => {
  try {
    if (
      status !== SubdomainStatus.HIDDEN &&
      status !== SubdomainStatus.ACTIVE
    ) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.BAD_REQUEST,
          serverMessage: `Cannot update subdomain status to ${status} for user ${id}`,
        }),
      };
    }

    const { userRef, error: validationErr } = await checkGoogleId({
      id,
      googleId,
    });

    const userSnap = await userRef?.get();
    const userDoc = userSnap?.data();

    if (userDoc?.status === UserStatus.BLOCKED) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.NOT_ALLOWED,
          clientMessage: "Vartotojas užblokuotas",
          serverMessage: `User is blocked: ${userRef?.id}`,
        }),
      };
    }

    if (validationErr) {
      return {
        data: null,
        error: validationErr,
      };
    }

    const settingsSnap = await db
      .collection("settings")
      .where("user", "==", userRef)
      .limit(1)
      .get();

    const { isValid, errorMessage, errorFields } = validateSettingsState(
      buildSettings(settingsSnap.docs[0]?.data() as SettingsData),
    );

    if (status === SubdomainStatus.ACTIVE && !isValid) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.NOT_ALLOWED,
          clientMessage: errorMessage!,
          serverMessage: `Cannot activate subdomain for user: ${id}, missing fields: ${errorFields.join(", ")}`,
        }),
      };
    }

    const subdomainSnap = await db
      .collection("subdomains")
      .where("user", "==", userRef)
      .limit(1)
      .get();

    if (subdomainSnap.empty) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.INTERNAL_ERROR,
          serverMessage: `Subdomain object not found for user ${id}`,
        }),
      };
    }

    const subdomainRef = subdomainSnap.docs[0].ref;
    await subdomainRef.update({ status });
    const updatedSubdomain = await subdomainRef.get();

    return {
      data: updatedSubdomain.data()?.status,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: buildErrorResponse({
        code: HttpError.INTERNAL_ERROR,
        serverMessage: `Error updating subdomain status: ${err}`,
      }),
    };
  }
};

export const getSubdomainByCode = async ({
  subdomainCode,
  subdomainSlug,
}: {
  subdomainCode: ISettings["subdomainCode"];
  subdomainSlug: ISubdomain["slug"];
}): FirestoreResponse<SubdomainData> => {
  try {
    const subdomainSnap = await db
      .collection("subdomains")
      .select("status", "user")
      .where("slug", "==", subdomainSlug)
      .limit(1)
      .get();

    if (subdomainSnap.empty) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.NOT_FOUND,
          serverMessage: `Subdomain not found for slug ${subdomainSlug}`,
        }),
      };
    }

    const userSnap = await subdomainSnap.docs[0]?.data().user.get();

    if (
      subdomainSnap.docs[0].data().status === SubdomainStatus.HIDDEN ||
      userSnap.data().status === UserStatus.BLOCKED
    ) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.NOT_FOUND,
          serverMessage: `Subdomain is hidden or user is blocked for slug: ${subdomainSlug}`,
        }),
      };
    }

    if (!subdomainCode) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.BAD_REQUEST,
          serverMessage: "No subdomain code provided",
        }),
      };
    }

    const settingsSnap = await db
      .collection("settings")
      .select(
        "address",
        "desiredPositions",
        "education",
        "email",
        "expectedSalary",
        "fullName",
        "phoneNumber",
        "experience",
        "image",
        "intro",
        "skills",
        "languages",
        "websiteDesign",
        "drivingLicences",
      )
      .where("subdomainCode", "==", subdomainCode) // compare with the reference
      .limit(1)
      .get();

    if (settingsSnap.empty) {
      return {
        data: null,
        error: buildErrorResponse({
          code: HttpError.BAD_REQUEST,
          serverMessage: `Subdomain code is incorrect for slug: ${subdomainSlug}`,
          clientMessage: "Svetainės kodas neteisingas",
        }),
      };
    }

    return {
      data: settingsSnap.docs[0]?.data() as SubdomainData,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: buildErrorResponse({
        code: HttpError.INTERNAL_ERROR,
        serverMessage: `Error getting subdomain by code: ${err}`,
      }),
    };
  }
};

export const deleteUserAccount = async ({
  id,
  googleId,
}: {
  id: string;
  googleId: IUser["googleId"];
}): FirestoreResponse<string> => {
  const { error: validationErr } = await checkGoogleId({
    id,
    googleId,
  });

  if (validationErr) {
    return {
      data: null,
      error: validationErr,
    };
  }

  try {
    const userRef = db.doc(`users/${id}`);
    const collectionsToQuery = ["settings", "subdomains"];
    for (const col of collectionsToQuery) {
      const snapshot = await db
        .collection(col)
        .where("user", "==", userRef)
        .get();

      const deletions = snapshot.docs.map((doc) => doc.ref.delete());
      await Promise.all(deletions);
    }

    await Promise.all([userRef.delete()]);

    const [files] = await bucket.getFiles({ prefix: `${id}/` });
    await Promise.all(files.map((file) => file.delete()));

    return {
      data: id,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: buildErrorResponse({
        code: HttpError.INTERNAL_ERROR,
        serverMessage: `Error deleting user data: ${error}`,
      }),
    };
  }
};
