import { useQuery } from "react-query";
import { api } from "../api/api";
import { useGoogleAuth } from "./useGoogleAuth";

type Client = {
  id: string,
  id_google: string,
  name: string,
  email: string,
}


export async function getClient(id_client: string, token: string): Promise<Client> {
  const { data } = await api.get(`client/${id_client}`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })

  const client: Client = data.client;
  console.log(id_client, token)
  console.log(client)
  return client;

}

export function useClient(id_client: string, token: string) {
  return useQuery(['client', id_client, token], () => getClient(id_client, token), {
    staleTime: 1000 * 5,
  })
}