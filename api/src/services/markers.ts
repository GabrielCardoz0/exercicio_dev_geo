import { Prisma } from '@prisma/client';
import prisma from '../config/db';
import { IOSMInput, IUser, IMarker } from '../interfaces';


export class MarkersService {

  public getByIdOrFail = async (id: number) => {
    const marker = prisma.markers.findUnique({
      where: {
        id
      }
    })

    if(!marker) throw new Error('Não foi possível encontrar o marcador solicitado.');

    return marker;
  }

  public get = async (user_id: number) => {
    const markers = await prisma.markers.findMany({
      where: {
        user_id
      }
    });

    return markers;
  }

  private OSMInputToMarker = (user_id: number, marker: IOSMInput): Omit<IMarker, 'id' | 'created_at' | 'updated_at'> => {
    return {
      place_id: marker.place_id,
      lat: Number(marker.lat),
      lon: Number(marker.lon),
      display_name: marker.display_name,
      building: marker.address.building,
      city: marker.address.city,
      state: marker.address.state,
      country: marker.address.country,
      postcode: String(marker.address.postcode),
      user_id,
    };
  }

  public create = async (user: IUser, payload: IOSMInput) => {
    const data = this.OSMInputToMarker(user.id, payload);

    return prisma.markers.create({
      data
    });
  }

  public delete = async (user: IUser, marker_id: number) => {
    const marker = await this.getByIdOrFail(marker_id);

    if(marker!.user_id !== user.id) throw new Error('Marcador não encontrado.');

    return await prisma.markers.delete({
      where: {
        id: marker_id
      }
    })
  }

};
