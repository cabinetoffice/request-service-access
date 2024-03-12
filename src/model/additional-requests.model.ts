export const AdditionalRequestsKey = 'additional_requests';

export const AdditionalRequestsMappingKeys: (keyof AdditionalRequests)[] = [
    'context',
    'description'
];

export interface AdditionalRequests {
  context?: string;
  description?: string;
}
