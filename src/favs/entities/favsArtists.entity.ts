import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favs_artists')
export class FavArtists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artistId: string;
}
