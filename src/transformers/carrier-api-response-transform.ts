import { parse } from 'date-fns';

import { CarrierApiResponse } from 'types/carrier-api-response';
import { OrderTracking } from 'types/order-tracking';

export const carrierApiTransform = (apiData: CarrierApiResponse): OrderTracking => {
  const format = 'dd-MM-yyyy HH:mm:ss';
  return {
    trackingCode: apiData.PedidoCliente,
    carrier: apiData.Cliente,
    events: apiData.Eventos.map((evento) => ({
      timestamp: parse(evento.Data, format, new Date()),
      status: evento.Status,
    })),
  };
};
