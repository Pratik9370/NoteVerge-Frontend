function PdfminiPreview({ pdfUrl }) {
  if (!pdfUrl) {
    return <p>No PDF available</p>;
  }

  const thumbUrl = pdfUrl.includes("/raw/upload/")
    ? pdfUrl.replace("/raw/upload/", "/image/upload/page=1,w_200,h_250,c_fit/")
    : pdfUrl;

  return (
    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
      <img src={thumbUrl} alt="PDF preview" />
    </a>
  );
}


export default PdfminiPreview