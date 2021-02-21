import * as React from 'react';

type EmptyLayoutProps = {
  children: React.ReactNode,
};

function EmptyLayout(props: EmptyLayoutProps) {
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default EmptyLayout;
