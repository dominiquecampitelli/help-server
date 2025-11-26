import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email: createUsuarioDto.email,
      },
    });

    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    const cpfAlreadyExists = await this.prisma.user.findUnique({
      where: { cpf: createUsuarioDto.cpf },
    });

    if (cpfAlreadyExists) {
      throw new UnauthorizedException('CPF already registered');
    }

    const rgAlreadyExists = await this.prisma.user.findUnique({
      where: { rg: createUsuarioDto.rg },
    });

    if (rgAlreadyExists) {
      throw new UnauthorizedException('RG already registered');
    }

    const cellphoneAlreadyExists = await this.prisma.user.findUnique({
      where: { cellphone: createUsuarioDto.cellphone },
    });

    if (cellphoneAlreadyExists) {
      throw new UnauthorizedException('Cellphone already registered');
    }

    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUsuarioDto,
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
