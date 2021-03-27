import {useEffect, useState} from "react";
import {ReturnedValue} from "use-sound/dist/types";
import useSound from "use-sound";

export const useBindSound = (deps?: any[]) => {
  const [lastPlay, setLastPlay] = useState<ReturnedValue>()
  return (url: string, match: () => boolean, moreDeps?: any[]) => {
    const sound = useSound(url)
    useEffect(() => {
      if ((!lastPlay || lastPlay[0] != sound[0]) && match() && !sound[1].isPlaying) {
        lastPlay && lastPlay[1].stop()
        sound[0]()
        setLastPlay(sound)
      }
    }, [...(deps || []), ...(moreDeps || []), sound[0]])
  }
}