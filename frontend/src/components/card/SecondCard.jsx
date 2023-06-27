const SecondCard = (props) => {
  return (
    <div className="w-fit">
      <img src={props.image} alt="" className="rounded-t-2xl" />
      <h3 className="bg-[#1B4397] text-white font-semibold py-2 text-center rounded-b-2xl">
        {props.title}
      </h3>
    </div>
  );
};

export default SecondCard;
