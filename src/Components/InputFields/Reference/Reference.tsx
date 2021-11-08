import React, { FC } from 'react';
import { Link } from "native-base"

interface IRef {
    isExternal: boolean;
    href: string;
    refText: string;
}

const LinkColor = {
    blue: 'blue',
    black: 'black'
}

export const Reference: FC<IRef> = ({ href: href, isExternal, refText }) => {
    if (isExternal === true) {
        return (
            <Link
                isUnderlined
                href={href}
                mt={4}>
                {refText}
            </Link>
        )
    }
    else {
        return (
            <Link>
                {refText}
            </Link>
        )
    }
};