import React from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  draggable?: boolean;
  priority?: boolean;
  fill?: boolean;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      className,
      draggable = true,
      priority,
      fill,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={className}
        draggable={draggable}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={
          fill
            ? {
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit: "cover",
                ...style,
              }
            : style
        }
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
