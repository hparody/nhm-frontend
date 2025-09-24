import { FRIDAY, SATURDAY, SUNDAY, MONDAY } from "@/constants/feeding";

const getSuggestedDay = (defaultValue = "") => {
  const currentDay = new Date().getDay();

  switch (currentDay) {
    case 0:
      return SUNDAY;
    case 1:
      return MONDAY;

    case 5:
      return FRIDAY;

    case 6:
      return SATURDAY;
    case 2:
    case 3:
    case 4:
    default:
      return defaultValue;
  }
};

export default getSuggestedDay;
