import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Input from "./Input";
import { toast } from "react-toastify";
import { useGlobalHook } from "@/states/Context";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default function Modal() {
  const { open, setOpen, loadCards } = useGlobalHook();

  const cancelButtonRef = useRef(null);
  const [fields, setFields] = useState({
    id: "",
    download_url: "",
    author: "",
  });
  const addCard = async (e) => {
    e.preventDefault();
    if (!fields.id || !fields.download_url || !fields.author) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        loadCards();
        setFields({
          id: "",
          download_url: "",
          author: "",
        });
        setOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleClose = () => {
    setFields({
      id: "",
      download_url: "",
      author: "",
    });
    setOpen(false);
  };
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="absolute top-4 right-4 ">
                  <button
                    className="ml-4 outline-none hover:invert-[20%] transition-all duration-200"
                    onClick={ handleClose}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-8 h-8" src="/x-circle.svg" alt="" />
                  </button>
                </div>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mt-8">
                  <h3 className="mb-2 font-bold text-2xl text-center">
                    Add Card
                  </h3>
                  <form onSubmit={addCard} className="my-4 mx-8">
                    <div className="my-4">
                      <Input
                        handler={handleChange}
                        type={"text"}
                        hint={"Enter Id"}
                        name={"id"}
                        value={fields.id}
                      />
                    </div>
                    <div className="my-4">
                      <Input
                        handler={handleChange}
                        type={"text"}
                        hint={"Enter Author Name"}
                        name={"author"}
                        value={fields.author}
                      />
                    </div>
                    <div className="my-4">
                      <Input
                        handler={handleChange}
                        type={"url"}
                        hint={"Enter Image Url"}
                        name={"download_url"}
                        value={fields.download_url}
                      />
                    </div>
                    <div className="mt-8 text-center">
                      <Input
                        handler={handleChange}
                        type={"submit"}
                        value={"Add Card"}
                        classes={`bg-blue-500 !px-8 !py-2 text-white border-0 w-max text-center hover:bg-blue-600 cursor-pointer transition-all duration-200 rounded-md`}
                      />
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
