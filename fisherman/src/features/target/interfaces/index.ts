import { BlobFile } from 'app/interfaces';

export interface CreateTargetRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  maldocContent: string;
  maldocFilename: string;
}

export interface CreateTargetResponse {
  id: string;
}

export interface DeleteTargetRequest {
  targetId: string;
}

export interface Target {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dateSent: string;
  isSent: boolean;
  dateRead: string;
  hasRead: boolean;
  dateDownloaded: string;
  hasDownloaded: boolean;
  maldoc: BlobFile;
}
