export interface StrainSummary {
  id: number;
  name: string;
  description: string;
   
};
export interface AddEditResult {
  strain: StrainSummary;
  isNew: boolean;
}
