import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favs_tracks')
export class FavTracks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trackId: string;
}
