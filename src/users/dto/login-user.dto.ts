export class LoginUserDto {
    email: string;
    password?: string;
    souvenir: boolean;
    type: string = 'normal';
}