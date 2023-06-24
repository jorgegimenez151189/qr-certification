import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import QRCode = require('qrcode');
import { v4 as uuidv4 } from 'uuid';

@Controller('qr')
export class QrController {
  @Post()
  @ApiOperation({ summary: 'Crear nuevo punto de venta' })
  async createQr() {
    try {
      console.log('sadas');
      const data = {
        id: uuidv4(),
        name: 'Jorge Gimenez',
        curso: 'NestJS',
        url: 'https://www.npmjs.com/package/qrcode#usage',
      };
      const strJson = JSON.stringify(data);
      const config = { type: 'terminal' };
      const qr = await QRCode.toDataURL(strJson, config);
      console.log(qr);
      return {
        status: 201,
        msj: 'QR GENERADO',
        id: data.id,
        base64: qr,
      };
    } catch (error) {}
  }
}
