import dynamic from "next/dynamic";
const TextBlockSlice = dynamic(() =>
  import("../../components/slices/TextBlockSlice")
);
const CodeSlice = dynamic(() => import("../../components/slices/CodeSlice"));
const SingleMediaSlice = dynamic(() =>
  import("../../components/slices/SingleMediaSlice")
);
const MultipleMediaSlice = dynamic(() =>
  import("../../components/slices/MultipleMediaSlice")
);

export const sliceComponentsHelper = slices => {
  if (!slice || !slice.length || slice.length === 0) return null;
  let componentsToDisplay = [];
  componentsToDisplay =
    !slices || !slices.length
      ? null
      : slices.map((slice, index) => {
          if (slice === null || !slice.type) return "";
          if (slice.type === "text_block")
            return <TextBlockSlice key={index} content={slice} />;
          if (slice.type === "code_component")
            return <CodeSlice key={index} content={slice} />;
          if (slice.type === "single_media_block")
            return <SingleMediaSlice key={index} content={slice} />;
          if (slice.type === "multiple_media_blocks")
            return <MultipleMediaSlice key={index} content={slice} />;
          return "";
        });
  return componentsToDisplay;
};
