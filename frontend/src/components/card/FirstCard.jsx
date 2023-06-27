const FirstCard = (props) => {
  return (
    <div className="sm:w-[384px] sm:h-[148px] bg-white px-[32px] py-[16px] space-y-2 shadow-md rounded-lg">
      <div className="flex item-center gap-4">
        <img
          src={props.image}
          alt=""
          className="w-[75px] h-[75px] rounded-md"
        />
        <div className="flex flex-col justify-center space-y-2">
          <h3 className="font-semibold">{props.title}</h3>
          <p className="text-sm opacity-60">{props.subTitle}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <h4 className="text-xs bg-[#5DC264] w-[75px] rounded-md flex justify-center items-center font-semibold text-white text-opacity-80">
          PROMO
        </h4>
        <h3 className="font-semibold ">40% OFF</h3>
      </div>
    </div>
  );
};

export default FirstCard;
