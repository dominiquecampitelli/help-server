/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignInDTO, SignUpDTO } from './dtos/auth';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup(data: SignUpDTO) {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async signin(data: SignInDTO) {
    await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    return 'signin';
  }
}
