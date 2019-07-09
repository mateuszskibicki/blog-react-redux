import React, { Suspense, ReactElement } from "react";

import { ISliceComponentProps } from "../../types";

const TextBlockSlice: React.FunctionComponent<
  ISliceComponentProps
> = React.lazy(
  (): Promise<any> => import("../../components/slices/TextBlockSlice")
);
const CodeSlice: React.FunctionComponent<ISliceComponentProps> = React.lazy(
  (): Promise<any> => import("../../components/slices/CodeSlice")
);
const SingleMediaSlice: React.FunctionComponent<
  ISliceComponentProps
> = React.lazy(
  (): Promise<any> => import("../../components/slices/SingleMediaSlice")
);
const MultipleMediaSlice: React.FunctionComponent<
  ISliceComponentProps
> = React.lazy(
  (): Promise<any> => import("../../components/slices/MultipleMediaSlice")
);

export const sliceComponentsHelper = (slices: any): ReactElement | null => {
  if (!slices || !slices.length || slices.length === 0) return null;
  let componentsToDisplay: Array<any> = [];
  componentsToDisplay =
    !slices || !slices.length
      ? null
      : slices.map((slice: any, index: string) => {
          if (slice === null || !slice.type) return "";
          if (slice.type === "text_block")
            return <TextBlockSlice key={index} content={slice} />;
          if (slice && slice.type === "code_component" && slice.language)
            return <CodeSlice key={index} content={slice} />;
          if (slice.type === "single_media_block")
            return <SingleMediaSlice key={index} content={slice} />;
          if (slice.type === "multiple_media_blocks")
            return <MultipleMediaSlice key={index} content={slice} />;
          return "";
        });
  return <Suspense fallback={null}>{componentsToDisplay}</Suspense>;
};
