type JsonLdData = Record<string, unknown>;

const JsonLd = ({ data }: { data: JsonLdData }) => {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

export default JsonLd;
