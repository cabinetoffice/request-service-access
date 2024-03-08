import {
    getApplicationDataByID,
    removeApplicationDataByID,
    setApplicationDataByID,
    setApplicationDataKey,
    getSessionData
} from '@co-digital/login';
import { v4 as uuidv4 } from 'uuid';

export const mockGetApplicationDataByID = getApplicationDataByID as jest.Mock;
export const mockRemoveApplicationDataByID = removeApplicationDataByID as jest.Mock;
export const mockSetApplicationDataByID = setApplicationDataByID as jest.Mock;
export const mockSetApplicationDataKey = setApplicationDataKey as jest.Mock;
export const mockGetSessionData = getSessionData as jest.Mock;

export const mockID = 'c3931b00-a8b4-4d2d-a165-b9b4d148cd88';
export const mockUuidv4 = uuidv4 as jest.Mock;
