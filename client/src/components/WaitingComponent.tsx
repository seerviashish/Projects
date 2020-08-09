import React, { Suspense, ComponentType } from "react";

function WaitingComponent(Component: ComponentType<any>) {
  console.log("Waiting ==>", Component);
  return (props: any) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
}

export default WaitingComponent;
