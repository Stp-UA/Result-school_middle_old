import { useState } from "react";

export function useToggle(defaultValue: boolean) {
    const [value, setValue] = useState(defaultValue)
    function toggleValue(val: boolean | undefined): void {
        setValue((prev) => typeof val === "boolean" ?  val : !prev)
    }

    return [value, toggleValue]
}
