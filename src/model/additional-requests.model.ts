export const AdditionalRequestsKey = 'additional_requests';

export const AdditionalRequestsMappingKeys: (keyof AdditionalRequests)[] = [
    'id',
    'context',
    'description'
];

export interface AdditionalRequests {
  id?: string;
  context?: string;
  description?: string;
}
