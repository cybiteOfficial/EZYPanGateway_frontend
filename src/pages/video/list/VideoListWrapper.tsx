import React from "react";
import SideNavLayout from "src/components/layouts/SideNavLayout/SideNavLayout";
import Video from "./Video";

type Props = {};

const VideoListWrapper = (props: Props) => {
  return (
    <SideNavLayout>
      <Video />
    </SideNavLayout>
  );
};
export default VideoListWrapper
