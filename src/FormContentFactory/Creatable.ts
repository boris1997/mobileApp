import React from "react";

export interface ICreatable {
  create(config: string[] | string): React.ReactElement | null; //FIXME DurationTemplate может возвращать null
}
