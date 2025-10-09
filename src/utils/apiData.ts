import { CampistRawNewApi, CampistNewApi } from "@/types";

import normalizeText from "./normalizeText";
import mapObject from "./mapObject";

const keysMapping = {
  id: "sysId",
  nombreCompleto: "fullName",
  telefono: "cellphone",
  cedula: "id",
  fechaNacimiento: "birthdate",
  fechaExpedicionCedula: "idIssueDate",
  fotoUrl: "photoUrl",
  edad: "age",
} as const;

type KeysMapping = typeof keysMapping;

const parseCampistsData = (rawData: CampistRawNewApi[]): CampistNewApi[] => {
  const parsedCampists = rawData.map((campist) => {
    const mappedCampist = mapObject<
      CampistRawNewApi,
      CampistNewApi,
      KeysMapping
    >(campist, keysMapping);

    mappedCampist["photo"] = "";
    if (campist.fotoUrl) {
      const photoId = campist.fotoUrl.split("?id=")[1];
      mappedCampist["photo"] = parsePhotoUrl(photoId);
    }

    mappedCampist["_searchIndex"] = normalizeText(
      `${mappedCampist.fullName} ${mappedCampist.id}`.toLowerCase()
    );
    return mappedCampist;
  });

  return parsedCampists;
};

const parsePhotoUrl = (photoId) => {
  if (photoId !== "") {
    return `${import.meta.env.VITE_GOOGLE_DRIVE_URL}/v3/files/${photoId}?alt=media&key=${import.meta.env.VITE_GOOGLE_DRIVE_API_KEY}`;
  }
  return photoId;
};

export { parseCampistsData };
