import React, { useState } from "react";
import ConfigFragment from "./fragment/ConfigFragment";
import StudioFragment from "./fragment/StudioFragment";
import use from "./hooks";

export default function App() {
  const [config, setConfig] = use.state(false);
  const onSubmitted = use.callback((file, sefer, sidra) =>
    setConfig({ file, sefer, sidra })
  );

  return !config ? (
    <ConfigFragment onSubmitted={onSubmitted} />
  ) : (
    <StudioFragment config={config} />
  );
}
