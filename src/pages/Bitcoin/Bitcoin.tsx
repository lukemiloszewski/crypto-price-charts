import React, { Suspense, useEffect, useState } from "react";

import {
  BitcoinLoader,
  ChartContainer,
  Container,
  NavBar,
  Paragraph,
  TextContainer,
} from "@components";

interface jsonResponseProps {
  bpi: { [dateString: string]: number };
  disclaimer: string;
  time: {
    updated: string;
    updatedISO: string;
  };
}

export function Bitcoin() {
  const [data, setData] = useState({} as jsonResponseProps);
  // useEffect(() => {
  //   await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json() as Promise<{ data: jsonResponseProps }>;
  //     })
  //     .then((data) => {
  //       setData(await data.data);
  //     });
  // }, []);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.coindesk.com/v1/bpi/historical/close.json`
      );
      setData(await response.json());
    }

    fetchData();
  }, []);

  if (!data?.bpi) {
    return <div>HELP...</div>;
  }
  return (
    <Container>
      <TextContainer>
        <NavBar></NavBar>
        <Paragraph color={"white"} isBold={true}>
          Bitcoin: 30-Day Historical Price
        </Paragraph>
      </TextContainer>
      <ChartContainer>
        {data && data?.bpi && data?.disclaimer && data?.time && (
          <BitcoinLoader
            bpi={data.bpi}
            disclaimer={data.disclaimer}
            time={data.time}
          />
        )}
      </ChartContainer>
    </Container>
  );
}
