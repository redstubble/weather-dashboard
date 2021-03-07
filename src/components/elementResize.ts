import { useDetectElementResize } from "use-element-resize";

function ElementResize(target: { id: string }) {
  if (typeof window !== `undefined`) {
    return useDetectElementResize(target);
  }
  return [0, 0];
}
export { ElementResize };
