import { useQuery } from "react-query";
import { api } from "../api/api";

type Suggestion = {
  id: string,
  id_deliveryman: string,
  id_delivery: string,
  price: string,
}

export async function getSuggestionsAvailable(id_delivery: string, token: string): Promise<Suggestion[]> {
  const { data } = await api.get(`deliveries/suggestion/${id_delivery}`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })

  const suggestions: Suggestion[] = data.suggestions.map((suggestion: Suggestion) => {
    return {
      id: suggestion.id,
      id_deliveryman: suggestion.id_deliveryman,
      id_delivery: suggestion.id_delivery,
      price: suggestion.price
    }
  })

  return suggestions;
}

export function useSuggestionsAvailable(id_delivery: string, token: string) {
  return useQuery(['suggestions-availabe', id_delivery, token], () => getSuggestionsAvailable(id_delivery, token), {
    staleTime: 1000 * 5,
  })
}