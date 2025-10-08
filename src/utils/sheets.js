import normalizeText from "./normalizeText";

const keysMapping = {
  sys_id: "sysId",
  id: "id",
  name: "name",
  last_name: "lastName",
  id_type: "idType",
  campist_type: "campistType",
  cellphone: "cellphone",
  birthdate: "birthdate",
  gender: "gender",
  blood_type: "bloodType",
  allergies: "allergies",
  age: "age",
  full_name: "fullName",
  photo_id: "photo",
  attendance_days: "attendanceDays",
  attendance: "attendance",
  attendance_register_date: "attendanceRegisterDate",
};

const parseCampistsData = (rawData) => {
  const keys = rawData[0];
  const parsedData = rawData
    .slice(1, rawData.length)
    .map((row) => {
      const campist = keys.reduce((campistObj, key, idx) => {
        let value =
          key === "photo_id" ? parsePhotoUrl(row[idx] ?? "") : row[idx];
        if (key == "attendance") {
          value = value == "TRUE";
        }
        campistObj[keysMapping[key]] = value ?? "";
        return campistObj;
      }, {});
      return campist;
    })
    .map((c) => ({
      ...c,
      _searchIndex: normalizeText(`${c.fullName} ${c.id}`.toLowerCase()),
    }))
    .filter((row) => row.id != "");

  return parsedData;
};

const parsePhotoUrl = (photoId) => {
  if (photoId !== "") {
    return `${import.meta.env.VITE_GOOGLE_DRIVE_URL}/v3/files/${photoId}?alt=media&key=${import.meta.env.VITE_GOOGLE_DRIVE_API_KEY}`;
  }
  return photoId;
};

export { parseCampistsData };
