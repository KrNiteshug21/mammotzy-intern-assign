export type FormState = {
  activityName: string;
  category: string;
  about: string;
  activityType: string;
  locationType: string;
  minMembers: number;
  maxMembers: number;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  city: string;
  state: string;
  contactNumber: string;
  contactName: string;
};

export type ParseResult = {
  success: boolean;
  data?: string;
  error?: string;
};