import { Checkbox } from "native-base";
import React, { useState } from "react";

export const OptionItem = ({ id, title, arr }: any) => {
    const [value, setValue] = useState<boolean>(true)
    if (value) {
        arr.push(id)
    }
    else {
        let index = arr.indexOf(id)
        arr.splice(index, 1)
    };
    return (
        <Checkbox onChange={setValue} value={id} accessibilityLabel='1' defaultIsChecked={true} >
            {title}
        </Checkbox>
    );
};
