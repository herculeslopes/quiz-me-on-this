import { useState } from "react"
import clsx from "clsx";
import n8nAPI, { N8N_API_URL, N8N_TEST_API_URL } from "@/clients/n8n-client";

export default function LiveButton() {
  const [live, setLive] = useState(true);

  const toggleLive = () => {
    setLive(prev => {
      const newValue = !prev;

      n8nAPI.defaults.baseURL = newValue ? N8N_API_URL : N8N_TEST_API_URL;

      return newValue;
    });
  }

  return <>
    {/* items-center justify-center h-13 w-25 */}
    <div className="flex fixed top-3 right-3" onClick={toggleLive}>
      <button className="flex items-center justify-center gap-2 rounded pt-1 pb-1 pl-3 pr-3 bg-white/30 opacity-50 backdrop-blur-sm transition hover:opacity-100 cursor-pointer active:scale-130">
        <div className={clsx('size-3 rounded-full border', {
          'bg-green-500': live,
          'bg-red-500': !live,
        })}></div>
        <span className="uppercase">Live</span>
      </button>
    </div>
  </>
}