import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    this.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (artist) {
      return artist;
    } else {
      throw new Error();
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (typeof updateArtistDto.grammy !== 'boolean' || !updateArtistDto.name) {
      throw new Error('Bad request');
    }
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex !== -1) {
      const artist = {
        ...this.artists[artistIndex],
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      };

      this.artists.splice(artistIndex, 1, artist);

      return artist;
    } else {
      throw new Error();
    }
  }

  remove(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex !== -1) {
      this.artists.splice(artistIndex, 1);
      return null;
    } else {
      throw new Error();
    }
  }
}
