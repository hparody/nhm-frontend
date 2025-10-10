export type FeedingRecord = {
  id: string;
  campistSysId: string;
  day: string;
  foodType: string;
  registeredBy: string;
  registerDate: string;
};

export type FeedingObj = Pick<
  FeedingRecord,
  "campistSysId" | "foodType" | "day" | "registeredBy"
>;

export type FeedingRecordApi = {
  id: string;
  campistaId: string;
  tipoComida: string;
  diaComida: string;
  registradoPor: string;
  fechaRegistro: string;
};
