import html2canvas from "html2canvas-pro";

export const handleSaveAsImage = (ref, fileName) => {
  if (ref.current) {
    html2canvas(ref.current).then((canvas) => {
      // Create an image from the canvas
      const image = canvas.toDataURL("image/png");

      // Create an anchor element to download the image
      const link = document.createElement("a");
      link.href = image;
      link.download = fileName;
      link.click();
    });
  }
};
