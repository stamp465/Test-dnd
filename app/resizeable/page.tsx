import ResizableComponent from "./Resizeable";

export default function ResizeablePage() {
  return (
    <div className=" w-screen h-screen bg-green-200 flex justify-center items-center gap-4">
      <ResizableComponent>Test</ResizableComponent>
    </div>
  );
}
