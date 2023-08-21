import { Module, forwardRef } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { ArtistService } from 'src/artist/artist.service';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackService } from 'src/track/track.service';
import { TrackModule } from 'src/track/track.module';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album, Artist, Track]),
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, ArtistService, TrackService],
  exports: [AlbumService],
})
export class AlbumModule {}
