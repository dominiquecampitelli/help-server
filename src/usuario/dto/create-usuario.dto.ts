import { IsEmail, IsNotEmpty } from "class-validator";
export class SignUpDto {
    id?: number;
    name: string;
    lastName: string;
    @IsNotEmpty()
    password: string;
    address: string;
    cpf: string;
    rg: string;
    @IsEmail()
    email: string;
    cellphone: string;
    createdAt: Date;
}

export class SignInDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}
