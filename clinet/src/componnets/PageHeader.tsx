import React from "react";

interface Props {
  title: string;
  subtitle: string;
}

export default function PageHeader(props: Props) {
  return (
    <div className="page-header">
      <h1 className="page-header__title">{props.title}</h1>
      <h2 className="page-header__subtitle">{props.subtitle}</h2>
    </div>
  );
}
