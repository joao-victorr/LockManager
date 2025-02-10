
import type { Request, Response } from 'express';

import { AuthDevice } from '../DevicesController/LoginDevice';
import { TimeDevice } from '../DevicesController/TimeZones/TimeZones';
import { prismaClient } from '../databases/PrismaClient';
import type { DataTimeZones, TimeSpans, TimeZones, TimeZonesBasicInfo } from '../helpers/Types/Times';
import { BadResquestError } from '../helpers/apiErrors';


export class TimesController {

  async create(req: Request, res: Response) {
    const dataTimes: DataTimeZones = req.body;

    console.log(dataTimes);

    if (!dataTimes) {
      throw new BadResquestError('Data not found');
    }

    if (dataTimes.devices.length === 0) {
      throw new BadResquestError('At least one device is required');
    }


    // Verificar se todos os devices existem
    const devicesExists = await Promise.all(
      dataTimes.devices.map((device) =>
        prismaClient.devices.findUnique({ where: { id: device.id } })
      )
    ).then((devices) => devices.every((device) => device));

    if (!devicesExists) {
      throw new BadResquestError('One or more devices do not exist');
    }

    // Verificar se todos os TimeSpans existem


    // 1️ Criar o TimeZone
    const newTimeZone: TimeZonesBasicInfo = await prismaClient.timeZones.create({
      data: { name: dataTimes.name },
    });

    // 2️ Associar TimeZone aos Devices
    await Promise.all(
      dataTimes.devices.map(async (device) => {

        const dataDevice = await prismaClient.devices.findUnique({ where: { id: device.id}})
        if (!dataDevice) {
          throw new BadResquestError(`Device not found: ${device.id}`);
        }
        const authDevice = new AuthDevice(dataDevice.ip, dataDevice.user, dataDevice.password);
        const isAuthenticatedData = await authDevice.login();

        if (isAuthenticatedData.session == null) {

          console.log(isAuthenticatedData)

          // Gerar logs
          throw new BadResquestError(`Teste 1 Error in association id: ${device.id} a session`);
        }

        const timeDevice = new TimeDevice({ id: dataDevice.id, ip: dataDevice.ip, session: isAuthenticatedData.session })

        const newTimeZoneInDevice = await timeDevice.createTimeZones(newTimeZone);
        if (!newTimeZoneInDevice) {
          throw new BadResquestError(`Error in association id: ${device.id} a timeZone`);
        }

        return (
          prismaClient.timeZonesDevices.create({
            data: {
              idDevices: device.id,
              idTimeZones: newTimeZone.id,
            },
          })
        )}
      )
    );

    // 3️ Criar TimeSpans e associar aos Devices
    const newTimeSpans = await Promise.all(
      dataTimes.timeSpans.map(async (timeSpan) => {
        const newTimeSpan: TimeSpans = await prismaClient.timeSpans.create({
          data: {
            timeZonesId: newTimeZone.id,
            startHors: timeSpan.startHors,
            endHors: timeSpan.endHors,
            sun: timeSpan.sun,
            mon: timeSpan.mon,
            tue: timeSpan.tue,
            wed: timeSpan.wed,
            thu: timeSpan.thu,
            fri: timeSpan.fri,
            sat: timeSpan.sat,
            hol1: timeSpan.hol1,
            hol2: timeSpan.hol2,
            hol3: timeSpan.hol3,
          },
        });

        // 4️ Associar TimeSpan aos Devices
        await Promise.all(
          dataTimes.devices.map( async (device) => {

            const dataDevice = await prismaClient.devices.findUnique({ where: { id: device.id}})
            if (!dataDevice) {
              throw new BadResquestError(`Device not found: ${device.id}`);
            }
            const authDevice = new AuthDevice(dataDevice.ip, dataDevice.user, dataDevice.password);
            const isAuthenticatedData = await authDevice.login();

            if (isAuthenticatedData.session == null) {

              console.log(isAuthenticatedData)

              // Gerar logs
              throw new BadResquestError(`Teste 1 Error in association id: ${device.id} a session`);
            }

            const timeDevice = new TimeDevice({ id: dataDevice.id, ip: dataDevice.ip, session: isAuthenticatedData.session })
            const timeSpansInDevice = timeDevice.createTimeSpans(newTimeSpan);
            
            if (!timeSpansInDevice) {
              throw new BadResquestError(`Error in association id: ${device.id} a timeZone`);
            }


            return (
              prismaClient.timeSpansDevices.create({
                data: {
                  idDevices: device.id,
                  idTimeSpans: newTimeSpan.id,
                },
              })
            )
          })
        );
      })
    );

    console.log("New Time Zones: ", newTimeZone)
    console.log("New Time Spans: ", newTimeSpans)

    return res.status(200).json(dataTimes)

  };

  async read(req: Request, res: Response) {


    const data: {timeId: number, timeName: string}  = req.body;


    if (data.timeId || data.timeName) {

      const dataTimes = await prismaClient.timeZones.findMany({
        where: {
          OR: [{ id: data.timeId }, { name: data.timeName }],
        },
        orderBy: {name: 'asc'},
        include: {
          timeZonesDevices: {
            include: {
              devices: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          timeSpans: true,
        }        
      })


      return res.status(200).json(dataTimes)

    }


    const dataTimes: Array<TimeZones> = await prismaClient.timeZones.findMany({
      orderBy: {name: 'asc'},
      include: {
        timeZonesDevices: {
          include: {
            devices: {
              select: {
                id: true,
                name: true,
                status: true
              },
            },
          },
        },
        timeSpans: true,
      }        
    })


    console.log(dataTimes)


    return res.status(200).json(dataTimes)


  };

  async update(req: Request, res: Response) {

  };

  async delete(req: Request, res: Response) {

  };

}