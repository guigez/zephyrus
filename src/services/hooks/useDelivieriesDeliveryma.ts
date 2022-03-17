import { useQuery } from "react-query";
import { api } from "../api/api";

type Delivery = {
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
  }
}

export async function getDeliveriesDeliveryman(): Promise<Delivery[]>{
      const { data } = await api.get('deliveries/deliveryman', {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDc1Mjk4OTcsImV4cCI6MTY0NzYxNjI5Nywic3ViIjoiNjIyYTEyMzIzMWEyZjMzZjJmNzBkYWQ2In0.y1FB_WxIJBiRSBMNM7XpQtpQqXw9BVHTpw-QWX4X-SM`, 
        }
      })
      
      console.log(data)
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
          update_at: delivery.update_at,
          order: {
            id: delivery.order.id,
            product_name: delivery.order.product_name,
            width: delivery.order.width,
            height: delivery.order.height,
            length: delivery.order.length,
            weight: delivery.order.weight,
            description: delivery.order.description
          }
        }
      })

      console.log(deliveries)
      return deliveries; 
    
}

export function useDeliveriesDeliveryman() {
  return useQuery('deliveries-deliveryman', getDeliveriesDeliveryman,{
    staleTime: 1000 *5,
  })
}