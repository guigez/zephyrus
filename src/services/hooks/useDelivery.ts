import { useQuery } from "react-query";
import { api } from "../api/api";
import { useGoogleAuth } from "./useGoogleAuth";

type data = {
  id: string,
  id_client: string,
  id_deliveryman: string,
  id_order: string,
  origin: string,
  destiny: string,
  price?: string,
  status: string,
  created_at: string,
  update_at: string,
  order: {
    id: string,
    product_name: string,
    width: string,
    height: string,
    length: string,
    weight: string,
    description: string,
  },
  deliveryman?: {
    name: string
  }
}


export async function getDelivery(id_delivery: string, token: string): Promise<data> {
  const { data } = await api.get(`deliveries/${id_delivery}`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })


  const delivery = {
    id: data.delivery.id,
    id_client: data.delivery.id_client,
    id_deliveryman: data.delivery.id_deliveryman,
    id_order: data.delivery.id_order,
    origin: data.delivery.origin,
    destiny: data.delivery.destiny,
    price: data.delivery.price,
    status: data.delivery.status,
    created_at: data.delivery.created_at,
    update_at: data.delivery.update_at,
    order: {
      id: data.delivery.order.id,
      product_name: data.delivery.order.product_name,
      width: data.delivery.order.width,
      height: data.delivery.order.height,
      length: data.delivery.order.length,
      weight: data.delivery.order.weight,
      description: data.delivery.order.description
    },
    deliveryman: {
      name: data.delivery.deliveryman?.name || null
    }
  }


  return delivery;

}

export function useDelivery(id_delivery: string, token: string) {
  return useQuery(['deliveries-availabe', id_delivery, token], () => getDelivery(id_delivery, token), {
    staleTime: 1000 * 5,
  })
}