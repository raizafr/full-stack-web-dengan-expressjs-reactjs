import { GrClose } from "react-icons/gr";
const ModalCheckOut = () => {
  return (
    <>
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-10">
        <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
          <div className="flex justify-center cursor-pointer" onClick={close}>
            <GrClose className="text-center scale-150 mt-5 hover:-translate-y-1 duration-300 hover:scale-[1.7]" />
          </div>
          <div className="w-full">
            <div className="m-8 my-4 max-w-[400px] mx-auto">
              <div className="mb-8">
                <h1 className="mb-4 text-3xl font-extrabold text-center">
                  tes
                </h1>
                <img src="datasasaas" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCheckOut;
