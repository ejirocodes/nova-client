import Header from "~/components/common/header";

export function meta() {
  return [
    { title: "Nova" },
    { name: "description", content: "Welcome to Nova" },
  ];
}

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Welcome to Nova</h1>
        <p className="text-lg">
          Predict Bitcoin price and you might win something huge
        </p>
      </div>
    </div>
  );
}
