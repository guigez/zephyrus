import { useQuery } from "react-query";
import { api } from "../api/api";

type Suggestion = {
  id: string,
  id_deliveryman: string,
  id_delivery: string,
  price: string,
}

export async function getSuggestionsAvailable({queryKey}): Promise<Suggestion[]>{
      const { id_delivery } = queryKey
      const { data } = await api.get(`deliveries/suggestion/${id_delivery}`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDc1MjQwMTcsImV4cCI6MTY0NzYxMDQxNywic3ViIjoiNjIyYTEyZjBkNjZhODgwZWVhMjRiNzhiIn0.y8S8G8D9VsOSRIgfTVimKl9E85Mv7iW2a6Yl0_iKHX8`, 
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

      console.log(suggestions)
      return suggestions; 
    
}

export function useSuggestionsAvailable(id_delivery: string) {
  return useQuery(['suggestions-availabe', id_delivery], getSuggestionsAvailable,{
    staleTime: 1000 *5,
  })
}