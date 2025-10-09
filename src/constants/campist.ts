import { Campist, CampistNewApi } from "@/types";

const DEFAULT_CAMPIST = {
  sysId: "",
  id: "",
  name: "",
  lastName: "",
  idType: null,
  campistType: "",
  cellphone: "",
  birthdate: null,
  gender: null,
  bloodType: "",
  allergies: "",
  age: "",
  fullName: "",
  photo: null,
  _searchIndex: "",
} as Campist;

const DEFAULT_CAMPIST_NEW_API = {
  sysId: "",
  id: "",
  age: "",
  fullName: "",
  photo: "",
  cellphone: "",
  birthdate: "",
  idIssueDate: "",
  _searchIndex: "",
} as CampistNewApi;

export { DEFAULT_CAMPIST, DEFAULT_CAMPIST_NEW_API };
