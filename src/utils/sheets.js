const keysMapping = {
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
  photo: "photo",
};

const parseCampistsData = (rawData) => {
  const keys = rawData[0];
  const parsedData = rawData
    .slice(1, rawData.length)
    .map((row) => {
      const campist = keys.reduce((campistObj, key, idx) => {
        const value =
          key === "photo" ? parsePhotoUrl(row[idx] ?? "") : row[idx];
        campistObj[keysMapping[key]] = value ?? "";
        return campistObj;
      }, {});
      return campist;
    })
    .filter((row) => row.id != "");

  return parsedData;
};

const parsePhotoUrl = (rawUrl) => {
  if (import.meta.env.MODE === "development" && rawUrl !== "") {
    return rawUrl.replace(
      "https://drive.usercontent.google.com/download",
      "/drive-api"
    );
  }
  return rawUrl;
};

export { parseCampistsData };
