export interface PeerMetadata {
  displayName: string;
  avatarUrl?: string;
}

// create a type with key of string and value of string
export type Recording = Record<string, string>;

export type roomDetails = {
  audioRecordings: Recording[];
  videoRecordings: Recording[];
  backgrounds: string[];
  activeBackground: string;
  recordings: string[];
  layout: 1 | 2;
};

export interface RoomData {
  background: string;
}
