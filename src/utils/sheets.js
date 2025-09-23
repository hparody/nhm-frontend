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
};

const parseCampistsData = (rawData) => {
  const keys = rawData[0];
  const parsedData = rawData
    .slice(1, rawData.length)
    .map((row) => {
      const campist = keys.reduce((campistObj, key, idx) => {
        const value =
          key === "photo_id" ? parsePhotoUrl(row[idx] ?? "") : row[idx];
        campistObj[keysMapping[key]] = value ?? "";
        return campistObj;
      }, {});
      return campist;
    })
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
