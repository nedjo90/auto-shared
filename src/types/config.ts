export interface IConfigRegistrationField {
  ID: string;
  fieldName: string;
  fieldType: string;
  isRequired: boolean;
  isVisible: boolean;
  displayOrder: number;
  validationPattern: string | null;
  labelKey: string;
  placeholderKey: string;
}
