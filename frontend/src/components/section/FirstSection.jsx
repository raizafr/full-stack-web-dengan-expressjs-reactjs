import FirstCard from "../card/FirstCard";

const FirstSection = () => {
  return (
    <section className="mt-5 container mx-auto px-2">
      <h1 className="font-bold text-2xl pb-3">Produk Unggulan</h1>
      <hr className="pb-3" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 place-items-center">
        <img
          src="http://localhost:3000/images\\slicing3_webp-1687956153093-952532926.webp"
          alt=""
        />
        <FirstCard
          title="Xbox Live Gold 3 Month"
          subTitle="Xbox Live Gold Card (BR)"
          image="https://placehold.co/75x75.png"
        />
        <FirstCard
          title="Xbox Live Gold 3 Month"
          subTitle="Xbox Live Gold Card (BR)"
          image="https://placehold.co/75x75.png"
        />
        <FirstCard
          title="Xbox Live Gold 3 Month"
          subTitle="Xbox Live Gold Card (BR)"
          image="https://placehold.co/75x75.png"
        />
        <FirstCard
          title="Xbox Live Gold 3 Month"
          subTitle="Xbox Live Gold Card (BR)"
          image="https://placehold.co/75x75.png"
        />
        <FirstCard
          title="Xbox Live Gold 3 Month"
          subTitle="Xbox Live Gold Card (BR)"
          image="https://placehold.co/75x75.png"
        />
        <FirstCard
          title="Xbox Live Gold 3 Month"
          subTitle="Xbox Live Gold Card (BR)"
          image="https://placehold.co/75x75.png"
        />
      </div>
    </section>
  );
};

export default FirstSection;
