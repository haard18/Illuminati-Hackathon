import { useState } from "react";
import { useWertWidget } from "@wert-io/module-react-component";
import type {
  GeneralOptions,
  ReactiveOptions,
} from "@wert-io/module-react-component";
export default function WertWidgetButton() {
  const options: GeneralOptions = {
    partner_id: "default",
    origin: "https://sandbox.wert.io", // Correct origin for sandbox mode
    commodity: "ETH",
    network: "sepolia",
    commodities: JSON.stringify([
      {
        commodity: "POL",
        network: "amoy",
      },
      {
        commodity: "ETH",
        network: "sepolia",
      },
    ]),
    // ...
  };
  const [reactiveOptions, setReactiveOptions] = useState<ReactiveOptions>({
    theme: "dark",
    listeners: {
      loaded: () => console.log("loaded"),
    },
  });

  const { open: openWertWidget, isWidgetOpen } = useWertWidget(reactiveOptions);

  return (
    <button
      onClick={() => {
        openWertWidget({ options });
        console.log(isWidgetOpen);
      }}
    >
      Make A Purchase
    </button>
  );
}