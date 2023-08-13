import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = {
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    const createArtist = this.artistRepository.create(artist);

    return await this.artistRepository.save(createArtist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (artist) return artist;

    throw new Error();
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (typeof updateArtistDto.grammy !== 'boolean' || !updateArtistDto.name) {
      throw new Error('Bad request');
    }
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (artist) {
      await this.artistRepository.update(id, {
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      });

      return await this.artistRepository.findOne({ where: { id } });
    } else {
      throw new Error();
    }
  }

  async remove(id: string) {
    const removed = await this.artistRepository.delete(id);
    if (removed.affected === 0) throw new Error();
    await this.trackService.changeTrackArtistId(id);
    await this.albumService.changeAlbumArtistId(id);
    return null;
  }

  async findArtist(id: string) {
    return await this.artistRepository.findOne({ where: { id } });
  }
}
