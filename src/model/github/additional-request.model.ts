export const AdditionalRequestKey = 'additional_requests';

export const AdditionalRequestMappingKeys: (keyof AdditionalRequest)[] = [
    'id',
    'context',
    'description'
];

export interface AdditionalRequest {
  id?: string;
  context?: string;
  description?: string;
}
