import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IProps {
    src: string;
    fallbackSrc?: string | StaticImport;
    alt?: string;
    width?: number | `${number}` | undefined;
    height?: number | `${number}` | undefined;
    className?: string;
    onClick?: () => void
    unoptimized?: boolean
}
export default function ImageFallBack({ src, fallbackSrc, alt, ...rest }: IProps) {
    const [img_src, setImgSrc] = useState<string | StaticImport>(src);
    useEffect(() => {
        setImgSrc(src)
    }, [src]);

    return <Image
        src={img_src ?? fallbackSrc}
        alt={alt ?? ""}
        {...rest}

        onLoad={(result) => {
            if (result.currentTarget.naturalWidth === 0 && fallbackSrc) {
                setImgSrc(fallbackSrc);
            }
        }}
        onError={() => {
            fallbackSrc && setImgSrc(fallbackSrc);
        }}
    ></Image>
}