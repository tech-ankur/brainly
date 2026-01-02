import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../config";

export function useContent() {
  const [content, setContent] = useState<any[]>([]);

  async function fetchContent() {
    const response = await axios.get(`${backendUrl}/app/v1/content`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setContent(response.data.content);
  }

  useEffect(() => {
    fetchContent();
  }, []);

  return { content, fetchContent };
}
