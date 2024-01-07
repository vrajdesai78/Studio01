export interface PeerMetadata {
  displayName: string;
  avatarUrl?: string;
}

export type roomDetails = {
  audioRecordings: string[];
  videoRecordings: string[];
  backgrounds: string[];
  activeBackground: string;
  recordings: string[];
};

export interface RoomData {
  background: string;
}
