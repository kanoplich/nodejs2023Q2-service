import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavArtists } from './entities/favsArtists.entity';
import { FavAlbums } from './entities/favsAlbums.entity';
import { FavTracks } from './entities/favsTracks.entity';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavArtists,
      FavAlbums,
      FavTracks,
      Track,
      Album,
      Artist,
    ]),
    AlbumModule,
    ArtistModule,
    TrackModule,
  ],
  controllers: [FavsController],
  providers: [FavsService, TrackService, AlbumService, ArtistService],
})
export class FavsModule {}
