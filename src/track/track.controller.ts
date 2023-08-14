import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    if (
      !createTrackDto.name ||
      typeof createTrackDto.duration !== 'number' ||
      !createTrackDto.hasOwnProperty('artistId') ||
      !createTrackDto.hasOwnProperty('albumId')
    ) {
      throw new BadRequestException();
    } else {
      return await this.trackService.create(createTrackDto);
    }
  }

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.trackService.findOne(uuid);
    } catch {
      throw new NotFoundException();
    }
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return await this.trackService.update(uuid, updateTrackDto);
    } catch (e) {
      if (e.message === 'Bad request') {
        throw new BadRequestException();
      } else {
        throw new NotFoundException();
      }
    }
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.trackService.remove(uuid);
    } catch {
      throw new NotFoundException();
    }
  }
}
