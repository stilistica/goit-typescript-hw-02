import axios from "axios";
import {Data} from '../components/App/App'

interface fetchGalleryProps{
    query: string;
    page: number;
    signal: AbortSignal;
}

export const fetchGallery = async ({query, page, signal} :fetchGalleryProps) : Promise<Data> => {
  const response = await axios.get<Data>(
    "https://api.unsplash.com/search/photos",
    {
      params: {
        client_id: "jjyVUDTaQyQuWgNQUX4uetG7WIlufpHdpCuKVKNQ-4g",
        query,
        page,
      },
      signal,
    },

  );
  return response.data;
};
