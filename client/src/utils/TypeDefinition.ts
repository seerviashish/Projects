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

export type MessageSender = {
  name: string;
  email: string;
};

export type MessageRecipient = {
  name: string;
  email: string;
  isGroup?: boolean;
  groupId?: string;
};

export enum MessageType {
  IMAGE = "image",
  VIDEO = "video",
  TEXT = "text",
  DOCUMENT = "document",
}

export type MessageInfo = {
  lineNum: number;
  content: string;
  type: MessageType;
};

export type MessageContent = {
  id: string;
  message: MessageInfo[];
};

export type Message = {
  sender: MessageSender;
  recipient: MessageRecipient;
  messageContent: MessageContent[];
  sentTime: string;
  receivedTime: string;
  isRead: boolean;
  isReceived: boolean;
};

export type ChatViewItemType = {
  lastMessage: Message;
  userName: string;
  profileUrl: string;
  userId: string;
  isRead: boolean;
};
