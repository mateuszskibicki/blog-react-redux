import React, { Suspense } from "react";
const TextBlockSlice = React.lazy(() =>
  import("../../components/slices/TextBlockSlice")
);
const CodeSlice = React.lazy(() => import("../../components/slices/CodeSlice"));
const SingleMediaSlice = React.lazy(() =>
  import("../../components/slices/SingleMediaSlice")
);
const MultipleMediaSlice = React.lazy(() =>
  import("../../components/slices/MultipleMediaSlice")
);

export const sliceComponentsHelper = slices => {
  if (!slices || !slices.length || slices.length === 0) return null;
  let componentsToDisplay = [];
  componentsToDisplay =
    !slices || !slices.length
      ? null
      : slices.map((slice, index) => {
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
