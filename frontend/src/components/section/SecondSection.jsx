import SecondCard from "../card/SecondCard";

const SecondSection = () => {
  return (
    <section className="mt-5 container mx-auto px-2">
      <div>
        <h1 className="font-bold text-2xl pb-3">Produk Unggulan</h1>
      </div>
      <hr className="pb-3" />
      <div className="px-2 grid grid-cols-2 md:grid-cols-5 gap-2 place-items-center">
        <SecondCard
          image="https://placehold.co/216x240.png"
          title="Mobile Legend"
        />
        <SecondCard
          image="https://placehold.co/216x240.png"
          title="Mobile Legend"
        />
        <SecondCard
          image="https://placehold.co/216x240.png"
          title="Mobile Legend"
        />
        <SecondCard
          image="https://placehold.co/216x240.png"
          title="Mobile Legend"
        />
        <SecondCard
          image="https://placehold.co/216x240.png"
          title="Mobile Legend"
        />
      </div>
    </section>
  );
};

export default SecondSection;
