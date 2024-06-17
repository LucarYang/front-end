import { useEffect, useState } from "react";
import { fetchChannelAPI, type ChannelItem } from "@/apis/list";

const useTabs = () => {
  const [channels, setChannels] = useState<ChannelItem[]>([]);
  useEffect(() => {
    const getChannels = async () => {
      try {
        const res = await fetchChannelAPI();
        setChannels(res.data.data.channels);
      } catch (error) {
        throw new Error("fatch channel err");
      }
    };
    getChannels();
  }, []);
  return { channels };
};
export { useTabs };
