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
  age: "age",
  full_name: "fullName",
};

const parseCampistsData = (rawData) => {
  const keys = rawData[0];
  const parsedData = rawData.slice(1, rawData.length).map((row) =>
    row.reduce((campistObj, value, idx) => {
      campistObj[keysMapping[keys[idx]]] = value;
      return campistObj;
    }, {})
  );

  return parsedData;
};

export { parseCampistsData };
