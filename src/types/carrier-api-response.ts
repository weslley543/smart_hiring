type DataDelivery = {
  Recebedor: string;
  'Doc Recebedor': string;
  Parentesco: string;
  'Data Protocolo': Date;
};

type CarrierApiTrackResponse = {
  Data: string;
  Status: string;
  idStatus: number;
  Descricao: string;
};

export type CarrierApiResponse = {
  PedidoCliente: string;
  ValorFrete: number;
  idItemParceiro: number;
  Cliente: string;
  dtPrevista: string;
  Destinatario: string;
  codigoRastreio: string;
  Url: string;
  UrlProtocolo: string;
  DadosEntrega: DataDelivery;
  Eventos: CarrierApiTrackResponse[];
};
