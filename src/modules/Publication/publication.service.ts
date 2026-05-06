import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
    BadRequestException
} from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreatePublicationDto) {
        try {
            return await this.prisma.publication.create({
                data,
            });
        } catch (error) {
            throw new InternalServerErrorException('Error creating publication');
        }
    }

    async findAll() {
        try {

            return await this.prisma.publication.findMany({
                include: { Group: true, createdBy: true },
            });
        } catch (error) {
            throw new InternalServerErrorException('Error fetching publications');
        }
    }

    async findOne(id: string) {
        try {
            const publication = await this.prisma.publication.findUnique({
                where: { id },
                include: { Group: true, createdBy: true },
            });

            if (!publication) {
                throw new NotFoundException(`Publication with ID ${id} not found`);
            }

            return publication;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error fetching publication ${id}`);
        }
    }

    async update(id: string, data: UpdatePublicationDto) {
        try {
            // O findOne já lança NotFoundException se não existir
            await this.findOne(id);

            return await this.prisma.publication.update({
                where: { id },
                data,
            });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException(`Could not update publication ${id}`);
        }
    }

    async remove(id: string) {
        try {
            await this.findOne(id);

            return await this.prisma.publication.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error deleting publication ${id}`);
        }
    }
}