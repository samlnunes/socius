import User from "./User";

export default interface Media {
  id: string;
  url: string;
  thumbnail: string;
  type: "image" | "video";
}

export default interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  user: User;
  likes?: User[] | null;
  media: Media[];
}
