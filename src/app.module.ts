import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [ConfigModule.forRoot(), UsuarioModule],
  controllers: [],
  providers: [
    PrismaService,
  ],
})
export class AppModule {}
