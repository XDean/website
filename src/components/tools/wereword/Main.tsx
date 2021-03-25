import {useMachine} from "@xstate/react";
import {createWerewordMachine} from "../../../tools/wereword/machine";

export const WerewordMain = () => {
  const [state, send] = useMachine(() => createWerewordMachine({}))
  return (
    <div>
      <pre>
      {JSON.stringify(state.toJSON(), null, '\t')}
      </pre>
    </div>
  )
}