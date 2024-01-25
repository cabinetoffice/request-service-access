export interface Member {
    githandle: string;
    email: string;
    name: string;
    surname: string;
    role: 'Write' | 'Maintainer' | 'Admin';
    description: string;
    IsContractor: boolean;
    contractDuration?: number;
}
