import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SignUpDto, SignInDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsuarioService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email: signUpDto.email,
      },
    });

    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    const cpfAlreadyExists = await this.prisma.user.findUnique({
      where: { cpf: signUpDto.cpf },
    });

    if (cpfAlreadyExists) {
      throw new UnauthorizedException('CPF already registered');
    }

    const rgAlreadyExists = await this.prisma.user.findUnique({
      where: { rg: signUpDto.rg },
    });

    if (rgAlreadyExists) {
      throw new UnauthorizedException('RG already registered');
    }

    const cellphoneAlreadyExists = await this.prisma.user.findUnique({
      where: { cellphone: signUpDto.cellphone },
    });

    if (cellphoneAlreadyExists) {
      throw new UnauthorizedException('Cellphone already registered');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...signUpDto,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      address: user.address,
      cpf: user.cpf,
      rg: user.rg,
      email: user.email,
      cellphone: user.cellphone,
      created_at: user.createdAt,
    };
  }

  async signin(signInDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      address: user.address,
      cpf: user.cpf,
      rg: user.rg,
      email: user.email,
      cellphone: user.cellphone,
      created_at: user.createdAt,
    });

    return {accessToken};
  }

  async findAll() {
    const user = await this.prisma.user.findMany();

    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
