import axios from "axios";

export const fetchGallery = async (query, page, signal) => {
  const response = await axios.get(
    "https://api.unsplash.com/search/photos",
    {
      params: {
        client_id: "jjyVUDTaQyQuWgNQUX4uetG7WIlufpHdpCuKVKNQ-4g",
        query: query,
        page: page,
      },
    },
    { signal }
  );
  return response.data;
};
