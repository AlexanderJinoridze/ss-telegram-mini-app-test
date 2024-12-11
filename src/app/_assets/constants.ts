import { PropertyTypeStatusMap } from "@/types";

export const numberPattern = /^\d+$/;

export const dealTypeMap = [
  { id: 1, label: "ქირავდება" },
  { id: 2, label: "იყიდება" },
  { id: 3, label: "გირავდება" },
  { id: 4, label: "ქირავდება დღიურად" },
];

export const propertyTypeMap = [
  {
    id: 1,
    label: "კერძო სახლი",
    iconName: "home",
  },
  {
    id: 2,
    label: "ბინა",
    iconName: "chair",
  },
  { id: 3, label: "მიწა", iconName: "psychiatry" },
  {
    id: 4,
    label: "კომერციული ფართი",
    iconName: "home_work",
  },
  { id: 5, label: "სასტუმრო", iconName: "hotel" },
  {
    id: 6,
    label: "აგარაკი",
    iconName: "cabin",
  },
];

export const propertyTypeStatusMap: PropertyTypeStatusMap = {
  1: [
    { id: 2, label: "ახალი აშენებული" },
    { id: 3, label: "მშენებარე" },
    { id: 453, label: "ძველი აშენებული" },
  ],
  2: [
    { id: 2, label: "ახალი აშენებული" },
    { id: 3, label: "მშენებარე" },
    { id: 453, label: "ძველი აშენებული" },
  ],
  4: [
    { id: 13, label: "კვების ობიექტი" },
    { id: 14, label: "გარაჟი" },
    { id: 21, label: "სარდაფი" },
    { id: 22, label: "სავაჭრო ობიექტი" },
    { id: 31, label: "სხვა კომერციული ფართი" },
    { id: 6, label: "სასაწყობე / საწარმოო ფართი" },
    { id: 7, label: "საოფისე ფართი" },
  ],
  6: [
    { id: 2, label: "ახალი აშენებული" },
    { id: 3, label: "მშენებარე" },
    { id: 453, label: "ძველი აშენებული" },
  ],
};

export const roomsMap = [
  { id: 1, label: "1 ოთახიანი" },
  { id: 2, label: "2 ოთახიანი" },
  { id: 3, label: "3 ოთახიანი" },
  { id: 4, label: "4 ოთახიანი" },
  { id: 5, label: "5 ოთახიანი" },
  { id: 6, label: "6+ ოთახიანი" },
];

export const priceTypes = [
  { id: 1, label: "სრული" },
  { id: 2, label: "მ² - ის" },
];

export const currencies = [
  { id: 1, label: "₾ - ლარში" },
  { id: 2, label: "$ - დოლარში" },
];
