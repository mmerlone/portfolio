import { useEffect, useState, type ComponentType, createElement } from "react";

// Mock next/dynamic to render components immediately in tests
jest.mock("next/dynamic", () => {
  return (importFn: () => Promise<{ default: ComponentType<Record<string, unknown>> }>) => {
    return function DynamicComponent(props: Record<string, unknown>): React.ReactElement | null {
      const [ComponentToRender, setComponentToRender] = useState<ComponentType<Record<string, unknown>> | null>(null);
      useEffect(() => {
        const promise = importFn().then((mod) => {
          setComponentToRender(() => mod.default);
        });
        void promise.catch(() => {
          // noop
        });
      }, []);
      return ComponentToRender ? createElement(ComponentToRender, props) : null;
    };
  };
});