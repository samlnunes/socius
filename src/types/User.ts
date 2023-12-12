export default interface User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  profileImageUrl: string;
  enabled: boolean;
  accountNonLocked: boolean;
  authorities: [
    {
      authority: string;
    }
  ];
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}
