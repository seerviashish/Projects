export enum ResponseStatus {
  SUCCESS,
  FAILED,
}

export type ResponseError = {
  trace?: any;
  message: string;
};

export type Response = {
  status: ResponseStatus;
  data?: any;
  error?: ResponseError;
};

export enum MessageType {
  IMAGE = "image",
  VIDEO = "video",
  TEXT = "text",
  DOCUMENT = "document",
}

export enum IUserStatusType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export type IMessageStatus = {
  type: string;
  url: string;
  id: string;
  createdAt: string;
};

export type IMessageUser = {
  name: string;
  userId: string;
};

export enum IMessageContentType {
  IMAGE = "IMAGE",
  DOCUMENT = "DOCUMENT",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  TEXT = "TEXT",
  LINK = "LINK",
  LOCATION = "LOCATION",
}

export type IMessageContent = {
  row: number;
  type: string;
  data: string;
};

export enum IMessageState {
  ERROR = "ERROR",
  SENT = "SENT",
  RECEIVED = "RECEIVED",
  READ = "READ",
}

export type IMessage = {
  id: string;
  beforeId: string;
  inReply?: string;
  sender: IMessageUser;
  recipient: IMessageUser;
  sentTime: string;
  state: string;
  content: IMessageContent[];
};

export type IGroupMember = {
  name: string;
  profile: string;
  role: string;
  userId: string;
};

export type IMessageData = {
  updatedAt: string;
  name: string;
  profile: string;
  userId?: string;
  isGroup: boolean;
  about: string;
  status: IMessageStatus[];
  messages: IMessage[];
  groupId?: string;
  members?: IGroupMember[];
};
