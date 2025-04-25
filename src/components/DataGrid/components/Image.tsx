import { Skeleton } from "@mui/material";
import React, { FC, Fragment, useState } from "react";

type ImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

interface ImageProps extends ImgProps {
  showSkeleton?: boolean;
}

const Image: FC<ImageProps> = ({ showSkeleton = true, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Fragment>
      {props.src && (
        <img
          {...props}
          style={{ ...props.style, display: loaded ? "block" : "none" }}
          onLoad={() => {
            setLoaded(true);
          }}
          alt={props.alt}
        />
      )}
      {(!loaded || !props.src) && showSkeleton ? (
        <Skeleton
          width={props.width}
          height={props.height}
          className={props.className}
          variant="rectangular"
        />
      ) : null}
    </Fragment>
  );
};

export default Image;
