import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { ArtistService } from 'src/artist/artist.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  constructor(private readonly artistService: ArtistService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const artists = this.artistService.findAll();
    const artist = artists.find(
      (artist) => artist.id === createAlbumDto.artistId,
    );

    const album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: artist ? artist.id : null,
    };

    this.albums.push(album);
    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (album) {
      return album;
    } else {
      throw new Error();
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (
      !updateAlbumDto.name ||
      typeof updateAlbumDto.year !== 'number' ||
      !updateAlbumDto.hasOwnProperty('artistId')
    ) {
      throw new Error('Bad request');
    }
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex !== -1) {
      const artists = this.artistService.findAll();
      const artist = artists.find(
        (artist) => artist.id === updateAlbumDto.artistId,
      );

      const album = {
        ...this.albums[albumIndex],
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artistId: artist ? artist.id : null,
      };

      this.albums.splice(albumIndex, 1, album);

      return album;
    } else {
      throw new Error();
    }
  }

  remove(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex !== -1) {
      this.albums.splice(albumIndex, 1);
      return null;
    } else {
      throw new Error();
    }
  }
}
