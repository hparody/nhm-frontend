import {
  CampistRawNewApi,
  CampistNewApi,
  FeedingRecord,
  FeedingObj,
  FeedingRecordApi,
} from "@/types";

import normalizeText from "./normalizeText";
import mapObject from "./mapObject";

const campistKeysMapping = {
  id: "sysId",
  nombreCompleto: "fullName",
  telefono: "cellphone",
  cedula: "id",
  fechaNacimiento: "birthdate",
  fechaExpedicionCedula: "idIssueDate",
  fotoUrl: "photoUrl",
  edad: "age",
} as const;

type CampistKeysMapping = typeof campistKeysMapping;

const parseCampistsData = (rawData: CampistRawNewApi[]): CampistNewApi[] => {
  const parsedCampists = rawData.map((campist) => {
    const mappedCampist = mapObject<
      CampistRawNewApi,
      CampistNewApi,
      CampistKeysMapping
    >(campist, campistKeysMapping);

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

type FieldMapping<ApiType, WebType> = {
  api: keyof Partial<ApiType>;
  web: keyof Partial<WebType>;
};

const feedingLogMapping: FieldMapping<FeedingRecordApi, FeedingRecord>[] = [
  { api: "id", web: "id" },
  { api: "campistaId", web: "campistSysId" },
  { api: "tipoComida", web: "foodType" },
  { api: "diaComida", web: "day" },
  { api: "registradoPor", web: "registeredBy" },
  { api: "fechaRegistro", web: "registerDate" },
];

const parseFeedingRecordToApi = (feedingRecord: FeedingObj) => {
  return parseToApi<FeedingRecordApi, FeedingRecord>(
    feedingRecord,
    feedingLogMapping
  );
};

const parseToApi = <ApiType, WebType>(
  object: Partial<WebType>,
  mappingArray: FieldMapping<ApiType, WebType>[]
) => {
  const result = {};
  for (const key in object) {
    const targetKey = mappingArray.find((r) => r.web == key)?.api;
    (result as any)[targetKey] = object[key] ?? "";
  }
  return result;
};

export { parseCampistsData, parseFeedingRecordToApi };
