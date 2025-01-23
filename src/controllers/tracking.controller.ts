import { Request, Response } from 'express';

import SaveCarrierService from '../services/save-carrier.service';

export default class TrackingController {
  async getTracking(request: Request, response: Response): Promise<void> {
    const { trackingCode } = request.params;
    const saveCarrierService = new SaveCarrierService();
    try {
      const newCarrier = saveCarrierService.execute(trackingCode);

      response.status(201).json(newCarrier);
    } catch (error) {
      const status = error?.status ? error.status : 500;
      const message = error?.message ? error.message : 'Internal Server Error';
      response.status(status).json({ message });
    }
  }
}
