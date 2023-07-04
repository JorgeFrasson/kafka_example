export interface MessageServiceInterface {
  readMessage(request: ReadMessageRequest): Promise<ReadMessageResponse>;
}

export class ReadMessageRequest {
  firstName: string;
  lastName: string;
  level: string;
  id: number;
}

export class ReadMessageResponse {
  firstName: string;
  lastName: string;
  level: string;
  id: number;
}
