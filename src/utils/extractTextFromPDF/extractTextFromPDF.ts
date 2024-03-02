import pdfjsLib from "pdfjs-dist";

const extractTextFromPDF = async (url: string | null) => {
  let pageText = "";
  pdfjsLib.getDocument(url || "").promise.then((pdf) => {
   
  });

  return pageText;
};

export default extractTextFromPDF;

// import { createWorker } from "tesseract.js";

// const extractTextFromPDF = async (url: string | null) => {
//   let pageText = "";
//   const worker = await createWorker();
//   (async () => {
//     await worker.loadLanguage("eng");
//     await worker.initialize("eng");
//     const {
//       data: { text },
//     } = await worker.recognize(
//       url || "",
//       { pdfTitle: "Example PDF" },
//       { pdf: true }
//     );
//     console.log(text, "Text");
//     await worker.terminate();
//   })();

//   return pageText;
// };

// export default extractTextFromPDF;
