import { useQuery } from "react-query";
import { api } from "../api/api";

type Delivery = {
  id: String,
  id_client: String,
  id_deliveryman: String,
  id_order: String,
  origin: String,
  destiny: String,
  price?: String,
  status: String,
  created_at: String,
  update_at: String,
  order: {
    id: String,
    product_name: String,
    width: String,
    height: String,
    length: String,
    weight: String,
    description: String,
  }
}

export async function getDeliveriesAvailable(): Promise<Delivery[]>{
      const { data } = await api.get('deliveries', {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDY5MjU0MjUsImV4cCI6MTY0NzAxMTgyNSwic3ViIjoiNjIyYTEyZjBkNjZhODgwZWVhMjRiNzhiIn0.kWrP6ZHGIo1-B8ns_1RVUChD222JZkhsbpULANRt0U4`, 
        }
      })

      const deliveries: Delivery[] = data.deliveries.map((delivery: Delivery) => {
        return {
          id: delivery.id,
          id_client: delivery.id_client,
          id_deliveryman: delivery.id_deliveryman,
          id_order: delivery.id_order,
          origin: delivery.origin,
          destiny: delivery.destiny,
          price: delivery.price,
          status: delivery.status,
          created_at: delivery.created_at,
          uypdate_at: delivery.update_at,
          order: {
            id: delivery.order.id,
            product_name: delivery.order.product_name,
            width: delivery.order.width,
            height: delivery.order.height,
            lenght: delivery.order.length,
            weight: delivery.order.weight,
            description: delivery.order.description
          }
        }
      })

      console.log(deliveries)
      return deliveries; 
    
}

export function useDeliveriesAvailable() {
  return useQuery('deliveries-availabe', getDeliveriesAvailable,{
    staleTime: 1000 *5,
  })
}