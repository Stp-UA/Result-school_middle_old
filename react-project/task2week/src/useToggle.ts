import { useState } from "react";

export function useToggle(defaultValue: boolean = false): [boolean, (value?: boolean)=>void] {
    const [toggle, setToggle] = useState(defaultValue)
    function switchToggle(value?: boolean) {
        setToggle((prev) => typeof value === "boolean" ?  value : !prev)
    }

    return [toggle, switchToggle]
}
