import React from "react";

interface Props {
  title: string;
  subtitle: string;
}

export default function PageHeader(props: Props) {
  return (
    <>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </>
  );
}
