import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const artist = createAlbumDto.artistId
      ? await this.artistService.findArtist(createAlbumDto.artistId)
      : null;

    const album = {
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: artist ? artist.id : null,
    };

    const createAlbum = this.albumRepository.create(album);

    return await this.albumRepository.save(createAlbum);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) return album;

    throw new Error();
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (
      !updateAlbumDto.name ||
      typeof updateAlbumDto.year !== 'number' ||
      !updateAlbumDto.hasOwnProperty('artistId')
    ) {
      throw new Error('Bad request');
    }
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) {
      const artist = await this.artistService.findArtist(
        updateAlbumDto.artistId,
      );

      await this.albumRepository.update(id, {
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artistId: artist ? artist.id : null,
      });

      return await this.albumRepository.findOne({ where: { id } });
    } else {
      throw new Error();
    }
  }

  async remove(id: string) {
    const removed = await this.albumRepository.delete(id);
    if (removed.affected === 0) throw new Error();
    await this.trackService.changeTrackAlbumId(id);
  }

  async changeAlbumArtistId(id: string) {
    const albums = await this.albumRepository.find();
    for (const album of albums) {
      if (album.artistId === id) {
        await this.albumRepository.update(album.id, {
          artistId: null,
        });
      }
    }
  }

  async findAlbum(id: string) {
    return await this.albumRepository.findOne({ where: { id } });
  }
}
