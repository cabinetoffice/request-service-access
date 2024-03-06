import { log } from '../../src/utils/logger';

export const mockLogInfo = log.info as jest.Mock;
export const mockLogErrorRequest = log.errorRequest as jest.Mock;
