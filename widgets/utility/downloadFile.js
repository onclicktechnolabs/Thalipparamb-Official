// export const downloadFile = (url, filename) => {
//   const anchor = document.createElement("a");
//   anchor.href = url;
//   anchor.download = filename || "download";
//   anchor.click();
// };

// export const downloadFile = async (url, filename) => {
//   try {
//     const res = await fetch(url);
//     const file = await res.blob();
//     const link = document.createElement("a");

//     link.download = filename || "downloaded_file";
//     link.href = URL.createObjectURL(file);

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(link.href);
//   } catch (error) {
//     console.error("Failed to download:", error);
//   }
// };

// export const downloadFile = () => {
//   try {
//     const url =
//       "https://firebasestorage.googleapis.com/v0/b/tahlipparamb.appspot.com/o/thalipparamb%2FGreetingssample.pdf?alt=media&token=9f9ca899-7d67-4e9f-92c9-af624a973efc";

//     window
//       .fetch(url)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Failed to fetch. Status: ${response.status}`);
//         }
//         return response.blob();
//       })
//       .then((blob) => {
//         const blobUrl = window.URL.createObjectURL(new Blob([blob]));
//         const fileName = url.split("/").pop();
//         console.log(
//           "🚀 ~ file: downloadFile.js:42 ~ .then ~ fileName:",
//           fileName
//         );
//         const aTag = document.createElement("a");
//         aTag.href = blobUrl;
//         aTag.setAttribute("download", fileName);
//         document.body.appendChild(aTag);
//         aTag.click();
//         aTag.remove();
//       })
//       .catch((error) => {
//         console.error("Error during fetch:", error.message);
//       });
//   } catch (error) {
//     console.error("Failed to download:", error);
//   }
// };
