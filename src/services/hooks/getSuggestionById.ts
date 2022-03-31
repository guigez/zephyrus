import { api } from "../api/api";

type Suggestion = {
  id: string,
  id_deliveryman: string,
  id_delivery: string,
  price: string,
  deliveryman: {
    id: string,
    id_google: string,
    email: string,
    name: string
  }
}

export async function getSuggestionById(id: string, token: string) {
  const { data } = await api.get(`suggestion/${id}`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });

  const suggestion: Suggestion = data.suggestion;

  return suggestion;
}