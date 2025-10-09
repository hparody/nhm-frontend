export type Campist = {
  sysId: string;
  id: string;
  name: string;
  lastName: string;
  idType: string | number;
  campistType: string;
  cellphone: string;
  birthdate: string;
  gender: "Mujer" | "Hombre";
  bloodType: string;
  allergies: string;
  age: string | number;
  fullName: string;
  photo: string;
  attendance?: boolean;
  attendanceDays?: string;
  attendanceRegisterDate?: string;
  idIssueDate?: string;
  _searchIndex: string;
};

export type CampistRaw = {
  sys_id: string;
  id: string;
  name: string;
  last_name: string;
  id_type: string;
  campist_type: string;
  cellphone: string;
  birthdate: string;
  gender: string;
  blood_type: string;
  allergies: string;
  age: string;
  full_name: string;
  photo_id: string;
  attendance_days: string;
  attendance: string;
  attendance_register_date: string;
};

export type CampistRawNewApi = {
  id: string;
  nombreCompleto: string;
  telefono: string;
  cedula: string;
  fechaNacimiento: string;
  fechaExpedicionCedula: string;
  fotoUrl: string;
  edad: string | number;
};

export type CampistNewApi = Partial<Campist> & { photoUrl: string };
