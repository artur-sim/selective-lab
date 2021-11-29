import { AuditUser } from "src/app/shared/models/users/audit-user.model";

export interface DeviceMeasurement {
    createdDate: Date;
    createdBy: AuditUser;
    notes: string;
    strainName: string;
    analyst: string;
    deviceId: string;
    potency: number;
};
